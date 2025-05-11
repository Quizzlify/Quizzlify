"use client";

import Breadcrumb from "@/components/Quiz/Breadcrumb";
import NavBar from "@/components/Utilities/NavBar";
import { useEffect, useState } from "react";
import Levels from "@/components/CreateQuiz/pages/Levels";
import Categories from "@/components/CreateQuiz/pages/Categories";
import Questions from "@/components/CreateQuiz/pages/Questions";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";


export default function Page() {
    const { addToast } = useToast();
    const [activeStep, setActiveStep] = useState<string>("Niveau");
    const [questionIndices, setQuestionIndices] = useState<number[]>([1]);
    const { user } = useUser();

    // Quiz details
    const [category, setCategory] = useState<string>("");
    const [level, setLevel] = useState<number>(1);

    // Quiz content
    const [create, setCreate] = useState<boolean>(false); // indicateur si l'utilisateur a cliqué sur le bouton "Créer le quiz"
    const [content, setContent] = useState<Quiz['content']>({});

    async function createQuiz(category: string, level: number) {
        try {
            const res = await fetch("/api/create-quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, level, content, author: user?._id })
            });

            const response = await res.json();
            if (response.success) {
                addToast("Le quiz a été crée avec succès.", "success");
            } else {
                addToast(`Une erreur est survenue: ${response.error}`, "error");
            }

            setCreate(false);
        } catch (error) {
            addToast(`Une erreur est survenue avec la connexion à la DB: ${error}`, "error");
        }
    };

    useEffect(() => {
        if (category && level && content && create) {
            createQuiz(category, level);
        } else if (!category && create || !level && create) {
            addToast("Veuillez remplir tous les champs avant de créer le quiz.", "error");
        }
    }, [category, level, content, create]);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Niveau":
                return <Levels nextStep={setActiveStep} setLevel={setLevel}/>;
            case "Catégorie":
                return <Categories nextStep={setActiveStep} setCategory={setCategory} />;
            case "Questions":
                return <Questions questionIndices={questionIndices} setQuestionIndices={setQuestionIndices} content={content} setContent={setContent} setCreerQuiz={setCreate} level={level}/>;
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