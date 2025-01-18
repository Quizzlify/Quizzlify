"use client"

import Breadcrumb from "@/app/components/breadcrumb";
import Cards from "@/app/components/Cards";
import NavBar from "@/app/components/NavBar";
import CreateQuestion from "@/app/components/CreateQuestion"
import { useState } from "react";
import QButton from "@/app/components/QButton"

interface StepProps {
    nextStep: (step: string) => void;
}

interface QuestionProps {
    questionNum: number;
}

const Details = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Quelques détails à propos du quiz que vous voulez créer.</h2>
    </div>
);

const Level: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={true} />
    </div>
);

const Categorie: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez créer le quiz.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={true} />
    </div>
);

const Questions: React.FC<QuestionProps> = ({questionNum}) => (
    <div className="mt-5 flex items-center w-screen flex-col">
        <h2 className="text-xl mb-4">Créez votre quiz.</h2>
        <CreateQuestion questionNum={questionNum}/>
        <div className="flex space-between items-center mt-14 w-screen">
            <hr className="bg-accent h-[5px] w-[30%] rounded-xl ml-5 mr-5"/>
            <QButton className="w-[40rem]" text="Ajouter une question" icon={<i className="fa-solid fa-plus"></i>} disabled={false} iconPosition={'left'}/>
            <hr className="bg-accent h-[5px] w-[30%] rounded-xl mr-5 ml-5"/>
        </div>
    </div>
);

const Error = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center">
        <h2 className="text-xl mb-4">Une erreur est survenue.</h2>
    </div>
)

export default function Page() {
    const [activeStep, setActiveStep] = useState("Détails");
    const questionNum = 1;

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categorie nextStep={setActiveStep} />;
            case "Niveau":
                return <Level nextStep={setActiveStep} />;
            case "Détails":
                return <Details />;
            case "Questions":
                return <Questions questionNum={questionNum}/>;
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