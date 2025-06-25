"use client";

import { FC, useEffect, useState } from "react";
import { Users, Book, AlertTriangle } from "lucide-react";
import { useUser } from "@/provider/UserProvider";
import QButton from "@/components/Utilities/QButton";
import Modal from "@/components/Admin/Modal";
import { useToast } from "@/provider/ToastProvider";
import NavBar from "@/components/Utilities/NavBar";

const AdminDashboardPage: FC = () => {
    const [userCount, setUserCount] = useState<number>(0)
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [pendingQuiz, setPendingQuiz] = useState<Quiz[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { addToast } = useToast();
    const { user } = useUser();
    
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch("/api/user/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({})
                });

                const response = await res.json();
                if (response.success) {
                    setUserCount(response.data.length);
                    setTotalPoints(response.data.reduce((acc: number, curr: { score: number; role: string }) => {
                        if (curr.role === "admin") return acc;
                        acc += curr.score || 0;
                        return acc;
                    }, 0));
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            }
        }

        async function getQuiz() {
            try {
                const res = await fetch("/api/quiz/getQuiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({})
                });

                const response = await res.json();
                if (response.success) {
                    const filteredQuizzes = response.data.filter((quiz: Quiz) => quiz.status === "pending");
                    setPendingQuiz(filteredQuizzes);
                    console.log("Quiz en attente: ", filteredQuizzes);
                    console.log("Quiz", response.data);
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            }
        }
        
        getUsers()
        getQuiz()
    }, [user]);

    const stats = [
        { title: 'Utilisateurs', value: userCount, icon: <Users className="text-accent w-5 h-5" /> },
        { title: 'Total de points', value: totalPoints, icon: <Book className="text-accent w-5 h-5" /> },
        { title: 'Quiz en attente', value: pendingQuiz.length, icon: <AlertTriangle className="text-warning w-5 h-5" /> },
    ];

    if (user?.role !== "admin") { return <div className="p-8">Accès refusé</div>; }

    function rejectQuiz(quizId: string | null): void {
        if (quizId === null) {
            addToast("L'ID du quiz est invalide.", "error");
            return;
        }

        async function reject() {
            try {
                const res = await fetch("/api/quiz/reviewQuiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quizId, action: "rejected" })
                });

                const response = await res.json();
                if (response.success) {
                    setPendingQuiz((prev) => prev.filter((quiz) => quiz._id !== quizId));
                    addToast("Le quiz a été rejeté avec succès.", "success");
                } else {
                    addToast("Une erreur est survenue lors du rejet du quiz.", "error");
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
                addToast("Une erreur est survenue lors de la connexion au serveur.", "error");
            }
        }
        reject();
    }

    function acceptQuiz(quizId: string | null): void {
        if (quizId === null) {
            addToast("L'ID du quiz est invalide.", "error");
            return;
        }

        async function accept() {
            try {
                const res = await fetch("/api/quiz/reviewQuiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quizId, action: "published" })
                });

                const response = await res.json();
                if (response.success) {
                    setPendingQuiz((prev) => prev.filter((quiz) => quiz._id !== quizId));
                    addToast("Le quiz a été publié avec succès.", "success");
                } else {
                    addToast("Une erreur est survenue lors de la publication du quiz.", "error");
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
                addToast("Une erreur est survenue lors de la connexion au serveur.", "error");
            }
        }
        accept();
    }

    return (
        <div className="flex justify-center w-full h-full">
            <NavBar currentPage="admin" />

            <div className="w-full h-full py-[7rem] px-[5rem]">
                <h2 className="text-2xl font-bold mb-6">Panel Administrateur</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="bg-background-tertiary border border-white/10 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div className="text-accent bg-accent/10 rounded-md p-1.5">
                                    {stat.icon}
                                </div>
                                <p className="text-sm text-foreground-secondary font-medium">{stat.title}</p>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-warning w-5 h-5" />
                        Quiz en attente de validation
                    </h3>
                    {pendingQuiz.length === 0 ? (
                        <p className="text-foreground-secondary">Aucun quiz en attente.</p>
                    ) : (
                        <div className="space-y-3">
                            {pendingQuiz.map((quiz) => (
                                <div key={quiz._id} className="flex items-center justify-between bg-background-tertiary border border-white/10 rounded-md p-4">
                                    <div>
                                        <p className="font-medium text-foreground">{quiz.title}</p>
                                        <p className="text-sm text-foreground-secondary">Auteur: {quiz.author}</p>
                                    </div>
                                    <QButton
                                        onClick={() => setIsOpen(true)}
                                    >
                                        Voir le quiz
                                    </QButton>
                                    {isOpen && <Modal quiz={quiz} onClose={() => setIsOpen(false)} isOpen={isOpen} onReject={() => rejectQuiz(quiz._id)} onAccept={() => acceptQuiz(quiz._id)} />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
