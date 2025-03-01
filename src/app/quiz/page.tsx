"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/Home/NavBar";
import Breadcrumb from "@/components/Quiz/Breadcrumb";
import Categories from "@/components/Quiz/pages/Categories";
import Levels from "@/components/Quiz/pages/Levels";
import Results from "@/components/Quiz/pages/Results";
import Details from "@/components/Quiz/pages/Details";
import Questions from "@/components/Quiz/pages/Questions";

export default function Page() {
    const [activeStep, setActiveStep] = useState<string>("Catégorie");
    const [category, setCategory] = useState<string>('');
    const [level, setLevel] = useState<number>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    async function getQuiz(category: string, level: number) {
        try {
            const res = await fetch("/api/quiz", {
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
            getQuiz(category, level);
        }
    }, [category, level]);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categories nextStep={setActiveStep} setCategory={setCategory} />;
            case "Niveau":
                return <Levels nextStep={setActiveStep} setLevel={setLevel} />;
            case "Détails":
                return <Details nextStep={setActiveStep} />;
            case "Questions":
                return quiz?.content ? <Questions questions={quiz.content} nextStep={setActiveStep} /> : <h1 className="text-2xl mt-10">Aucun quiz ne correspond à la catégorie ou au niveau choisi.</h1>;
            case "Résultats":
                return <Results />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <NavBar currentPage="quiz"/>
            <div className="absolute top-40 w-full">
                <div className="flex flex-col items-center">
                    <Breadcrumb
                        isCreateQuiz={false}
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                    />
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
}