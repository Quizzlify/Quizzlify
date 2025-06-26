"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/Utilities/NavBar";
import Breadcrumb from "@/components/Quiz/Breadcrumb";
import Categories from "@/components/Quiz/pages/Categories";
import Levels from "@/components/Quiz/pages/Levels";

export default function Page() {
    const [activeStep, setActiveStep] = useState<string>("Catégorie");
    const [category, setCategory] = useState<string>('');
    const [level, setLevel] = useState<number | null>(null);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    async function getQuiz(category: string, level: number) {
        try {
            const res = await fetch("/api/quiz/getQuiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, level })
            });

            const response = await res.json();
            if (response.success) {
                const randomIndex = Math.floor(Math.random() * response.data.length);
                const randomQuiz = response.data[randomIndex];
                setQuiz(randomQuiz);
            } else {
                console.log("Une erreur est survenue: ", response.error);
            }
        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
        }
    }

    useEffect(() => {
        if (category && level) {
            setQuiz(null);
            getQuiz(category, level);
        }
    }, [category, level]);

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
                if (!quiz) {
                    return null
                }
                if (quiz && typeof window !== "undefined") {
                    window.location.href = `/quiz/${quiz._id}`;
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