"use client"

import Modal from "@/components/Dashboard/Modal";
import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { Edit, PlusCircle, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

type EditedQuiz = {
    level: number | null;
    title: string | null;
    content: {
      [key: string]: {
        question: string | null;
        points: number | null;
        correctAnswers: number[] | null;
        answers: string[] | null;
      };
    } | null;
    category: string | null;
}

const MyQuiz: FC = () => {
    const router = useRouter();
    const { addToast } = useToast();
    const { user, isAuthenticated, isLoadingUser } = useUser();
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    const [search, setSearch] = useState("");
    const [deleteQuizBtn, setDeleteQuizBtn] = useState<boolean>(false);
    const [saveQuizBtn, setSaveQuizBtn] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>();

    if (!isAuthenticated || !user) {
        router.push("/user/signin");
    }

    useEffect(() => {
        if (isLoadingUser) return;

        async function fetchData() {
            try {
                const response = await fetch("/api/user/getQuiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user?._id.toString() }),
                });

                const data = await response.json();

                if (data.success) {
                    setQuiz(data.quiz);
                    setDeleteQuizBtn(false);
                } else {
                    console.error("Erreur lors de la récupération des quiz:", data.error);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des quiz:", error);
            }
        }

        fetchData();
    }, [user, deleteQuizBtn, isLoadingUser, saveQuizBtn]);

    async function deleteQuiz(quizId: string) {
        try {
            const response = await fetch("/api/quiz/deleteQuiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quizId }),
            });

            const data = await response.json();

            if (data.success) {
                addToast("Quiz supprimé avec succès", "success");
                setDeleteQuizBtn(true);
            } else {
                console.error("Erreur lors de la suppression du quiz:", data.error);
                addToast("Erreur lors de la suppression du quiz", "error");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du quiz:", error);
            addToast("Erreur lors de la suppression du quiz", "error");
        }
    }   

    async function editQuiz(editedQuiz: EditedQuiz) {
        if (!selectedQuiz) return;
        console.log("editedQuiz", editedQuiz);

        const updatedQuiz = { ...selectedQuiz };

        if (editedQuiz.level !== null) updatedQuiz.level = editedQuiz.level;
        if (editedQuiz.title !== null) updatedQuiz.title = editedQuiz.title;
        if (editedQuiz.category !== null) updatedQuiz.category = editedQuiz.category;
        if ("_id" in updatedQuiz) {
            delete (updatedQuiz as { [key: string]: unknown })._id;
        }
        
        if (updatedQuiz.level !== 3) {
            if (updatedQuiz.content && typeof updatedQuiz.content === "object") {
                Object.keys(updatedQuiz.content).forEach((key) => {
                    if (updatedQuiz.content && updatedQuiz.content[key]) {
                        delete (updatedQuiz.content[key] as { points?: number }).points;
                    }
                });
            }
        }

        // Mise à jour du contenu du quiz (questions)
        if (editedQuiz.content !== null) {
            updatedQuiz.content = { ...updatedQuiz.content };
            
            for (const key in editedQuiz.content) {
                // Fusion des propriétés existantes avec les propriétés modifiées
                // en ignorant les valeurs null

                const existingQuestion = updatedQuiz.content[key];

                const questionEdits = editedQuiz.content[key];
                // on ignore les propriétés null
                const validEdits: { [property: string]: string | number | string[] | number[] | null } = {};
                for (const [property, value] of Object.entries(questionEdits)) {
                    if (value !== null) {
                        validEdits[property] = value;
                    }
                }

                updatedQuiz.content[key] = {
                    ...existingQuestion,
                    ...validEdits
                };
            }
        }
        
        try {
            const response = await fetch("/api/quiz/editQuiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedQuiz?._id, updatedQuiz }),
            });

            const data = await response.json();

            if (data.success) {
                addToast("Quiz mis à jour avec succès", "success");
            } else {
                console.error("Erreur lors de la mise à jour du quiz:", data.error);
                addToast("Erreur lors de la mise à jour du quiz", "error");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du quiz:", error);
            addToast("Erreur lors de la mise à jour du quiz", "error");
        }
        setSaveQuizBtn(false);
    };

    const filteredQuiz = quiz.filter(q =>
        q.title.toLowerCase().includes(search.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            weekday: "long"
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", options);
    };

    const isQuizEmpty = filteredQuiz.length === 0;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Mes Quiz</h2>
                <QButton
                    icon={<PlusCircle size={20} />}
                    as="button"
                    text="Créer un Quiz"
                    onClick={() => router.push("/createQuiz/default")}
                    variant="primary"
                />
            </div>

            <div className="relative mb-6">
                <QInput
                    icon={<Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />}
                    type="text"
                    placeholder="Rechercher un quiz..."
                    className="w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {!isQuizEmpty ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuiz.map((q) => (
                        <div
                            key={q._id}
                            className="bg-background-tertiary border-2 border-accent-secondary rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-accent">{q.title}</h3>
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-background-secondary transition-all"
                                        onClick={() => { setSelectedQuiz(q); setIsOpen(true); console.log('aa');}}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-background-secondary transition-all"
                                        onClick={() => { deleteQuiz(q._id); setDeleteQuizBtn(true); }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-200 mb-1">Catégorie : <span className="font-medium">{q.category}</span></p>
                            <p className="text-sm text-gray-200 mb-1">Niveau : <span className="font-medium">{q.level}</span></p>
                            <p className="text-sm text-gray-200">Créé le : <span className="font-medium">{formatDate(q.created_at)}</span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <p className="text-gray-500">Aucun quiz trouvé.</p>
                </div>
            )}

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={(editedQuiz: EditedQuiz) => {
                    editQuiz(editedQuiz);
                    setSelectedQuiz(null);
                    setIsOpen(false);
                    setSaveQuizBtn(true);
                }}
                quiz={selectedQuiz || null}
            />
        </div>
    );
};

export default MyQuiz;
