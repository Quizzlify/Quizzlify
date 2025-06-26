"use client";

import Breadcrumb from "@/components/Quiz/Breadcrumb";
import NavBar from "@/components/Utilities/NavBar";
import { useEffect, useState } from "react";
import Levels from "@/components/CreateQuiz/pages/Levels";
import Categories from "@/components/CreateQuiz/pages/Categories";
import Questions from "@/components/CreateQuiz/pages/Questions";
import Details from "@/components/CreateQuiz/pages/Details";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { Info } from "lucide-react";


export default function Page() {
    const { addToast } = useToast();
    const [activeStep, setActiveStep] = useState<string>("Catégorie");
    const [questionIndices, setQuestionIndices] = useState<number[]>([1]);
    const { user } = useUser();
    const [isVisible, setIsVisible] = useState(false);

    // Quiz information
    const [category, setCategory] = useState<string>("");
    const [level, setLevel] = useState<number>(1);
    const [title, setTitle] = useState<string>("");
    const [quizId, setQuizId] = useState<string>("");

    // Quiz content
    const [creerQuiz, setCreerQuiz] = useState<boolean>(false); // indicateur si l'utilisateur a cliqué sur le bouton "Créer le quiz"
    const [content, setContent] = useState<Quiz['content']>({});

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        async function createQuiz(category: string, level: number, title: string, content: Quiz['content']) {
            try {
                const res = await fetch("/api/create-quiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ category, level, title, content, author: user?._id })
                });
    
                const response = await res.json();
                if (response.success) {
                    addToast("Le quiz a été crée avec succès. Il sera accepté ou non durant la prochaine semaine.", "success");
                    setQuizId(response.quizId);
                } else {
                    addToast(`Une erreur est survenue: ${response.error}`, "error");
                }
            } catch (error) {
                addToast(`Une erreur est survenue avec la connexion à la DB: ${error}`, "error");
            }
        };

        if (category && level && title && creerQuiz) {
            createQuiz(category, level, title, content);
            setCreerQuiz(false);
        } else if (creerQuiz && (!category || !level )) {
            addToast("Veuillez remplir tous les champs avant de créer le quiz.", "error");
        }
    }, [category, level, title, content, creerQuiz, addToast, user?._id]);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categories nextStep={setActiveStep} setCategory={setCategory} />;
            case "Niveau":
                return <Levels nextStep={setActiveStep} setLevel={setLevel}/>;
            case "Détails":
                return <Details nextStep={setActiveStep} setTitle={setTitle} title={title}/>
            case "Questions":
                return <Questions questionIndices={questionIndices} setQuestionIndices={setQuestionIndices} content={content} setContent={setContent} setCreerQuiz={setCreerQuiz} level={level}/>;
        }
    };

    return (
        <div className="min-h-screen">
            <NavBar currentPage="create-quiz"/>
            <div className={`py-20 px-6 md:px-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient">Créez votre quiz</span>
                        </h1>
                        <h2 className="text-xl text-foreground-secondary">
                            Créez un quiz personnalisé et partagez-le avec vos amis !
                        </h2>
                    </div>
                </div>

                <div className="bg-background-secondary rounded-2xl p-8 shadow-lg border border-border">
                    <Breadcrumb
                        isCreateQuiz={true}
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                    />
                    {renderStepContent()}
                </div>
                {quizId && (
                    <div className="flex items-start gap-2 mt-3 bg-yellow-500/10 backdrop-blur-lg border border-yellow-500 text-yellow-500 rounded-lg px-4 py-2 animate-slide-up">
                        <Info size={18} />
                        <span className="text-sm">
                            Lorsque votre quiz sera accepté, vous pourrez le partager grâce à cette adresse <br />
                            <a
                                href={`${window.location.origin}/quiz/${quizId}`}
                                target="_blank"
                                className="ml-1 font-mono text-accent"
                            >
                                {typeof window !== "undefined" && quizId
                                    ? `${window.location.origin}/quiz/${quizId}`
                                    : ""}
                            </a>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}