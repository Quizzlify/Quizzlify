"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import Cards from "@/app/components/Cards";
import CreateQuestion from "@/app/components/CreateQuestion";
import NavBar from "@/app/components/NavBar";
import QButton from "@/app/components/QButton";
import { useState } from "react";
import { Input } from "@heroui/input";


interface StepProps {
    nextStep: (step: string) => void;
}

interface QuestionProps {
    questionIndices: number[];
    setQuestionIndices: (indices: number[]) => void;
}

const Details: React.FC<StepProps> = ({ nextStep }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Quelques détails à propos du quiz que vous voulez créer.</h2>
        <div className="flex flex-row gap-5 w-full justify-center">
            <Input label="Nom du quiz" isInvalid={false} type="input" variant="bordered" size={"sm"} className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" isRequired />
            <Input type="file" id="files" className="hidden"/>
            <label htmlFor="files" className="border border-2 border-neutral-500 rounded-lg p-3 w-[15rem] h-[3rem]"><i className="fa-solid fa-upload"></i>
                {"\u200A"} Image du quiz
                <span className="relative -bottom-8 -left-[9rem] text-xs text-neutral-500">Facultatif</span>
            </label>
        </div>

        <QButton
            className="w-[300px]"
            text="Continuer"
            icon={<i className="fa-solid fa-arrow-right"></i>}
            disabled={false}
            iconPosition={'left'}
            onClick={() => nextStep('Niveau')}
        />

        
    </div>
);

const Niveau: React.FC<StepProps> = ({ nextStep }) => (
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

const Questions: React.FC<QuestionProps> = ({ questionIndices, setQuestionIndices }) => {

    const addQuestions = () => {
        const newId = Date.now();
        setQuestionIndices([...questionIndices, newId]);
    }

    const removeQuestion = (id: number) => {
        setQuestionIndices(questionIndices.filter((questionId) => questionId !== id));
    };

    return (
        <div className="mt-5 flex items-center w-screen flex-col">
            <h2 className="text-xl mb-4">Créez votre quiz.</h2>
            {questionIndices.map((id, index) => (
                <div className="p-2" key={`q-${id}`}>
                    <CreateQuestion questionNum={index + 1} removeQuestion={() => removeQuestion(id)} />
                </div>
            ))}
            <div className="flex items-center justify-center my-14 w-full">
                <div className="flex items-center w-full">
                    <hr className="bg-accent h-[5px] flex-grow rounded-xl mx-5" />
                    <QButton
                        className="w-[40rem]"
                        text="Ajouter une question"
                        icon={<i className="fa-solid fa-plus"></i>}
                        disabled={false}
                        iconPosition={'left'}
                        onClick={addQuestions}
                    />
                    <hr className="bg-accent h-[5px] flex-grow rounded-xl mx-5" />
                </div>
            </div>
        </div>
    )
};

const ErrorMessage = () => (
    <div className="mt-5 w-full max-w-2xl flex items-center">
        <h2 className="text-xl mb-4">Une erreur est survenue.</h2>
    </div>
)

export default function Page() {
    const [activeStep, setActiveStep] = useState("Détails");
    const [questionIndices, setQuestionIndices] = useState<number[]>([1]);

    const renderStepContent = () => {
        switch (activeStep) {
            case "Catégorie":
                return <Categorie nextStep={setActiveStep} />;
            case "Niveau":
                return <Niveau nextStep={setActiveStep} />;
            case "Détails":
                return <Details nextStep={setActiveStep} />;
            case "Questions":
                return <Questions questionIndices={questionIndices} setQuestionIndices={setQuestionIndices} />;
            default:
                return <ErrorMessage />;
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