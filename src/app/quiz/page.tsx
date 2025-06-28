"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/Utilities/NavBar";
import Breadcrumb from "@/components/Quiz/Breadcrumb";
import Categories from "@/components/Quiz/pages/Categories";
import Levels from "@/components/Quiz/pages/Levels";
import { useUser } from "@/provider/UserProvider";

export default function Page() {
    const [activeStep, setActiveStep] = useState<string>("Catégorie");
    const [category, setCategory] = useState<string>('');
    const [level, setLevel] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const [playableQuiz, setPlayableQuiz] = useState<Quiz | null>(null)

    const user = useUser();

    useEffect(() => {
        async function fetchRecentQuizIds() {
            try {
                const res = await fetch("/api/user/getHistory", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.user?._id, limit: 3 })
                });
                const response = await res.json();
                if (response.success) {
                    return response.data.map((q: History) => q.quizId?.toString?.() ?? q.quizId);
                }
            } catch (error) {
                console.log("Erreur lors de la récupération de l'historique :", error);
            }
            return [];
        }

        async function getQuiz() {
            try {
                const res = await fetch("/api/quiz/getQuiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ category, level })
                });
                const response = await res.json();
                if (response.success && response.data.length > 0) {
                    return response.data;
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            }
            return [];
        }

        async function findUniqueQuiz() {
            if (!category || !level) return;

            const recentIds = await fetchRecentQuizIds();
            const quizzes = await getQuiz();
            if (!quizzes.length) {
                setPlayableQuiz(null);
                return;
            }

            let uniqueQuiz: Quiz | null = null;
            let tries = 0;
            while (tries < 3 && quizzes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quizzes.length);
                const candidate = quizzes[randomIndex];
                if (!recentIds.includes(candidate._id)) {
                    uniqueQuiz = candidate;
                    break;
                } else {
                    quizzes.splice(randomIndex, 1);
                }
                tries++;
            }
            setPlayableQuiz(uniqueQuiz);
        }

        findUniqueQuiz();
    }, [category, level, user.user?._id]);


    useEffect(() => {
        setIsVisible(true);
    }, []);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categories nextStep={setActiveStep} setCategory={setCategory} />;
            case "Niveau":
                return <Levels nextStep={setActiveStep} setLevel={setLevel} />;
            case "Questions":
                if (playableQuiz === null) {
                    <p className="text-2xl">Impossible de trouver un quiz disponible pour cette catégorie et ce niveau. Veuillez réessayer ou choisir d&apos;autres options.</p>
                }
                if (playableQuiz && typeof window !== "undefined") {
                    window.location.href = `/quiz/${playableQuiz._id}`;
                    return null;
                }
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <NavBar currentPage="quiz" />
            <div className={`py-20 px-6 md:px-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient">Quiz</span>
                        </h1>
                        <h2 className="text-xl text-foreground-secondary">
                            Testez vos connaissances et amusez-vous !
                        </h2>
                    </div>

                    <div className="bg-background-secondary rounded-2xl p-8 shadow-lg border border-border">
                        <Breadcrumb
                            isCreateQuiz={false}
                            activeStep={activeStep}
                            onStepChange={setActiveStep}
                        />
                        <div className="mt-8">
                            {renderStepContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}