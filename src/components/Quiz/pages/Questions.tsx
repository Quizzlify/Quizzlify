import { useState } from "react";
import Question from "@/components/Quiz/Question";
import CountdownTimer from "@/components/Quiz/Countdown";

interface QuestionsProps {
    nextStep: (step: string) => void;
    questions: Quiz['content'];
    selectedAnswers: number[];
    setSelectedAnswers: (update: (prevSelectedAnswers: number[]) => number[]) => void;
    level: number | null;
}

const Questions: React.FC<QuestionsProps> = ({ nextStep, questions, selectedAnswers, setSelectedAnswers, level }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [fadeIn, setFadeIn] = useState(true);

    const questionKeys = Object.keys(questions).map(Number);

    function handleAnswerSelection(answerIndex: number) {
        setSelectedAnswer(answerIndex);
        if (selectedAnswers.length < questionKeys.length) {
            const content = (prevSelectedAnswers: number[]) => [...prevSelectedAnswers, answerIndex];
            setSelectedAnswers(content);
        } else {
            setSelectedAnswers(() => [answerIndex]);
        }
        setShowAnswer(true);
    }
  
    function incrementQuestionIndex(): void {
      if (questionIndex + 1 < questionKeys.length) {
        setFadeIn(false);
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1);
          setShowAnswer(false);
          setSelectedAnswer(null);
          setFadeIn(true);
        }, 300);
      }
    }

    const isLastQuestion = questionIndex + 1 === questionKeys.length;

    return (
        <div className={`w-full max-w-4xl mx-auto ${fadeIn ? 'animate-fade-in' : 'opacity-0'} transition-opacity duration-300`}>
            <div className="bg-background-tertiary p-6 rounded-2xl border border-border">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        <span className="text-gradient">Question</span> {questionIndex + 1}/{questionKeys.length}
                    </h1>
                    {!showAnswer && level === 3 && (
                        <div className="flex items-center">
                            <span className="text-lg font-semibold text-accent">Points: {questions[questionKeys[questionIndex]].points}</span>
                        </div>
                    )}
                </div>

                <div className="bg-background-secondary p-6 rounded-xl mb-6">
                    <h2 className="text-xl mb-4">{questions[questionKeys[questionIndex]].question}{showAnswer ? " - Correction" : ""}</h2>
                    
                    <Question
                        answers={questions[questionKeys[questionIndex]].answers}
                        correctAnswers={questions[questionKeys[questionIndex]].correctAnswers}
                        selectedAnswer={selectedAnswer}
                        showAnswer={showAnswer}
                        onAnswerSelect={handleAnswerSelection}
                    />
                </div>

                {showAnswer && (
                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={isLastQuestion ? () => nextStep('Résultats') : incrementQuestionIndex} 
                            className="btn-primary text-lg py-3 px-8 shadow-glow hover:scale-105 transform transition"
                        >
                            {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
                        </button>
                    </div>
                )}

                {!showAnswer && (
                    <div className="bg-background-secondary h-[5rem] p-4 rounded-xl flex items-center justify-center">
                        <CountdownTimer onTimeout={incrementQuestionIndex} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Questions;