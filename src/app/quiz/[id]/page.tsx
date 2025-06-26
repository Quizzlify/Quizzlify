"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/Utilities/NavBar";
import Breadcrumb from "@/components/Quiz/Breadcrumb";
import Questions from "@/components/Quiz/pages/Questions";
import Results from "@/components/Quiz/pages/Results";

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [activeStep, setActiveStep] = useState<string>("Questions");
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchQuiz() {
            const res = await fetch("/api/quiz/getQuizById", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                setQuiz(data.quiz)
            } else {
                setError(data.error || "Une erreur est survenue lors de la récupération du quiz.");
            };
        }
        if (id) fetchQuiz();
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-2xl">{error}</span>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-2xl">Chargement...</span>
            </div>
        );
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
                        {activeStep === "Questions" && (
                            <Questions
                                questions={quiz.content}
                                nextStep={setActiveStep}
                                selectedAnswers={selectedAnswers}
                                setSelectedAnswers={setSelectedAnswers}
                                level={quiz.level}
                            />
                        )}
                        {activeStep === "Résultats" && (
                            <Results
                                questions={quiz.content}
                                selectedAnswers={selectedAnswers}
                                category={quiz.category}
                                level={quiz.level}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}