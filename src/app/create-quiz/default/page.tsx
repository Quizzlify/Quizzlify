"use client";

import Breadcrumb from "@/components/Quiz/Breadcrumb";
import NavBar from "@/components/Home/NavBar";
import { useEffect, useState } from "react";
import Details from "@/components/CreateQuiz/pages/Details";
import Levels from "@/components/CreateQuiz/pages/Levels";
import Categories from "@/components/CreateQuiz/pages/Categories";
import Questions from "@/components/CreateQuiz/pages/Questions";

export default function Page() {
    const [activeStep, setActiveStep] = useState<string>("Détails");
    const [questionIndices, setQuestionIndices] = useState<number[]>([1]);

    // Quiz details
    const [category, setCategory] = useState<string>("");
    const [level, setLevel] = useState<number>();
    const [title, setTitle] = useState<string>("");

    // Quiz content
    const [create, setCreate] = useState<boolean>(false); // indicateur si l'utilisateur a cliqué sur le bouton "Créer le quiz"
    const [content, setContent] = useState<Quiz['content']>({});

    async function createQuiz(category: string, level: number, title:string) {
        try {
            const res = await fetch("/api/create-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, level, title, content })
            });

            const response = await res.json();
            if (response.success) {
                console.log("Quiz créé avec succès");
            } else {
                console.log("Une erreur est survenue: ", response.error);
            }
        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
        }
    };

    useEffect(() => {
        if (category && level && title && content && create) {
            createQuiz(category, level, title);
        } else {
            if (!category) console.log("Il manque la catégorie.");
            if (!level) console.log("Il manque le niveau.");
            if (!title) console.log("Il manque le titre.");
            if (!content) console.log("Il manque le contenu.");
        }
    }, [category, level, title, content, create]);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categories nextStep={setActiveStep} setCategory={setCategory} />;
            case "Niveau":
                return <Levels nextStep={setActiveStep} setLevel={setLevel}/>;
            case "Détails":
                return <Details nextStep={setActiveStep} setTitle={setTitle} />;
            case "Questions":
                return <Questions questionIndices={questionIndices} setQuestionIndices={setQuestionIndices} content={content} setContent={setContent} setCreerQuiz={setCreate}/>;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <NavBar currentPage="create-quiz"/>
            <div className="absolute top-40 w-full">
                <div className="flex flex-col items-center">
                    <Breadcrumb
                        isCreateQuiz={true}
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                    />
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
}