"use client"

import Breadcrumb from "@/app/components/breadcrumb";
import Cards from "@/app/components/Cards";
import NavBar from "@/app/components/NavBar";
import { useState } from "react";

interface Props {
    nextStep: (step: string) => void;
}

const Details = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Quelques détails à propos du quiz que vous voulez créer.</h2>
    </div>
);

const Level: React.FC<Props> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={true} />
    </div>
);

const Categorie: React.FC<Props> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez créer le quiz.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={true} />
    </div>
);

const Questions = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Créez votre quiz.</h2>
    </div>
);

const Error = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center">
        <h2 className="text-xl mb-4">Une erreur est survenue.</h2>
    </div>
)

export default function Page() {
    const [activeStep, setActiveStep] = useState("Détails");

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categorie nextStep={setActiveStep} />;
            case "Niveau":
                return <Level nextStep={setActiveStep} />;
            case "Détails":
                return <Details />;
            case "Questions":
                return <Questions />;
            default:
                return <Error />;
        }
    };

    return (
        <>
            <NavBar />
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
        </>
    );
}