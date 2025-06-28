"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/Utilities/NavBar";
import Breadcrumb from "@/components/Quiz/Breadcrumb";
import Questions from "@/components/Quiz/pages/Questions";
import Results from "@/components/Quiz/pages/Results";
import { useUser } from "@/provider/UserProvider";
import Loading from "@/components/Utilities/Loading";

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [activeStep, setActiveStep] = useState<string>("Questions");
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [valid, setValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

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

        async function getQuizById() {
            try {
                const res = await fetch("/api/quiz/getQuizById", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();
                if (data.success) {
                    setQuiz(data.quiz);
                    setError(null);
                } else {
                    setQuiz(null);
                    setError(data.error || "Une erreur est survenue lors de la récupération du quiz.");
                }
            } catch (error) {
                setQuiz(null);
                setError(error instanceof Error ? error.message : String(error));
            }
        }

        async function fetchData() {
            const [recentQuizIds] = await Promise.all([
                fetchRecentQuizIds(),
                getQuizById()
            ]);

            if (quiz?.level === 3) {
                if (recentQuizIds && recentQuizIds.includes(id)) {
                    setValid(false);
                } else {
                    setValid(true);
                }
            } else {
                setValid(true);
            }

            setLoading(false);
        }

        fetchData();
    }, [id, user.user?._id]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-2xl">{error || "Quiz introuvable."}</span>
            </div>
        );
    }

    if (!valid || !quiz) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <p className="text-2xl">Ce quiz fait partie de vos 3 derniers quiz joués.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <NavBar currentPage="quiz" />
            <div className="py-20 px-6 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumb
                        isCreateQuiz={false}
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                    />
                    <div className="mt-8">
                        {(() => {
                            switch (activeStep) {
                                case "Questions":
                                    return (
                                        <Questions
                                            questions={quiz.content}
                                            nextStep={setActiveStep}
                                            selectedAnswers={selectedAnswers}
                                            setSelectedAnswers={setSelectedAnswers}
                                            level={quiz.level}
                                        />
                                    );
                                case "Résultats":
                                    return (
                                        <Results
                                            questions={quiz.content}
                                            selectedAnswers={selectedAnswers}
                                            category={quiz.category}
                                            level={quiz.level}
                                            quizId={quiz._id}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}