"use client";

import NavBar from "@/app/components/NavBar";
import Breadcrumb from "@/app/components/Breadcrumb";
import Cards from "@/app/components/Cards";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import QButton from "@/app/components/QButton";
import Question from "@/app/components/Question";
import CountdownTimer from "@/app/components/Clock";

interface StepProps {
    nextStep: (step: string) => void;
}

interface QuestionComponentProps extends StepProps {
    questions: Quiz['content'];
}

interface CategorieProps extends StepProps {
    setCategory: (category: string) => void;
}

interface LevelProps extends StepProps {
    setLevel: (niveau: number) => void;
}

const Categorie: React.FC<CategorieProps> = ({ nextStep, setCategory }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={false} setCategory={setCategory} setLevel={() => {}} />
    </div>
);

const Niveau: React.FC<LevelProps> = ({ nextStep, setLevel }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={false} setCategory={() => {}} setLevel={setLevel} />
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

const Questions: React.FC<QuestionComponentProps> = ({ questions, nextStep }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const questionKeys = Object.keys(questions).map(Number);

    function handleAnswerSelection(answerIndex: number) {
        setSelectedAnswer(answerIndex);
        setShowAnswer(true);
    }
  
    function incrementQuestionIndex(): void {
      if (questionIndex + 1 < questionKeys.length) {
        setQuestionIndex(questionIndex + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      }
    }

    const isLastQuestion = questionIndex+1 === questionKeys.length
    return (
        <div className="flex flex-col mb-4 mt-[5rem]">
            <div className="flex flex-row justify-between w-[calc(100%-5rem)] items-center ml-5">
            <h1 className="text-3xl font-bold">{questions[questionKeys[questionIndex]].question}{showAnswer ? " Correction" : ""}</h1>
            <span className="text-lg text-gray-500">{questionIndex + 1}/{questionKeys.length}</span>
        </div>
        {!showAnswer ? (
            <Question
                answers={questions[questionKeys[questionIndex]].answers}
                correctAnswer={questions[questionKeys[questionIndex]].correctAnswer}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
                onAnswerSelect={handleAnswerSelection}
            />

        ) : (

        <div className="flex flex-col p-4">
            <Question
                answers={questions[questionKeys[questionIndex]].answers}
                correctAnswer={questions[questionKeys[questionIndex]].correctAnswer}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
                onAnswerSelect={handleAnswerSelection}
            />

            <button onClick={isLastQuestion ? () => nextStep('Résultats') : incrementQuestionIndex} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 w-fit">
                {isLastQuestion ? 'Voir les résultats.': 'Question suivante.'}
            </button>
        </div>
      )}

      {!showAnswer && (
        <CountdownTimer onTimeout={incrementQuestionIndex} />
      )}
      </div>

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
    const [category, setCategory] = useState<string>('');
    const [level, setLevel] = useState<number>(0);
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
                return <Categorie nextStep={setActiveStep} setCategory={setCategory} />;
            case "Niveau":
                return <Niveau nextStep={setActiveStep} setLevel={setLevel} />;
            case "Détails":
                return <Details nextStep={setActiveStep} />;
            case "Questions":
                return quiz && quiz.content ? <Questions questions={quiz.content} nextStep={setActiveStep} /> : null;
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