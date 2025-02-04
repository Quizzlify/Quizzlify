"use client";

import NavBar from "@/app/components/NavBar";
import Breadcrumb from "@/app/components/Breadcrumb";
import Cards from "@/app/components/Cards";
import { useState } from "react";
import { Input } from "@heroui/input";
import QButton from "@/app/components/QButton";
import Question from "@/app/components/Question";

interface StepProps {
    nextStep: (step: string) => void;
}

const Categorie: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={false} />
    </div>
);

const Niveau: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={false} />
    </div>
);

const Details: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Quelques détails:</h2>
        <div className="flex flex-row gap-5">
            <Input label="Plus de détails sur le quiz ?" type="input" variant="bordered" size={"sm"} className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" />
            <Input label="Nombre de questions" isInvalid={false} type="input" variant="bordered" size={"sm"} defaultValue="1" className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" isRequired />
        </div>
        <QButton
            className="w-[300px]"
            text="Commencer le quiz"
            icon={<i className="fa-solid fa-play"></i>}
            disabled={false}
            iconPosition={'left'}
            onClick={() => nextStep('Questions')}
        />
    </div>
);

const questions = {
    'Question 1?': ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],
    'Question 2?': ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],
    'Question 3?': ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],
    'Question 4?': ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],
    'Question 5?': ['Réponse A', 'Réponse B', 'Réponse C', 'Réponse D'],

};

const questionKeys = Object.keys(questions); // return les clés du dictionnaire questions sous forme d'une array

const Questions = () => {
    const [questionIndex, setQuestionIndex] = useState(0);

    function incrementQuestionIndex(): void {
        if (questionIndex + 1 < questionKeys.length) {
            setQuestionIndex(questionIndex+1)
        }
    }

    return (
        <>
            <div className="flex flex-col mb-4 mt-[5rem]">
                <div className="flex flex-row justify-between w-[calc(100%-5rem)] items-center ml-5">
                    <h1 className="text-3xl font-bold">{questionKeys[questionIndex]}</h1>
                    <span className="text-lg text-gray-500">{questionIndex + 1}/{questionKeys.length}</span>
                </div>
                <Question answers={questions['Question 1?']} incrementQuestionIndex={incrementQuestionIndex} />
            </div>
        </>
    );
};

const Resultats = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Résultats</h2>
    </div>
)

const ErrorMessage = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center">
        <h2 className="text-xl mb-4">Une erreur est survenue.</h2>
    </div>
)

export default function Page() {
    const [activeStep, setActiveStep] = useState("Catégorie");

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categorie nextStep={setActiveStep} />;
            case "Niveau":
                return <Niveau nextStep={setActiveStep} />;
            case "Détails":
                return <Details nextStep={setActiveStep} />;
            case "Questions":
                return <Questions />;
            case "Résultats":
                return <Resultats />;
            default:
                return <ErrorMessage />;
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