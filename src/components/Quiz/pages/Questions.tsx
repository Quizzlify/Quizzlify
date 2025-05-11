import { useEffect, useState } from "react";
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
        setQuestionIndex(questionIndex + 1);
        setShowAnswer(false);
        setSelectedAnswer(null);
      }
    }

    const isLastQuestion = questionIndex + 1 === questionKeys.length;

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
        <div className="flex items-center justify-center p-6 h-[4rem] bg-white rounded-lg shadow-md">
            <CountdownTimer onTimeout={incrementQuestionIndex} />
            { level == 3 ?
                <div className="ml-auto">
                    <span className="text-lg font-semibold">Points: {questions[questionKeys[questionIndex]].points}</span>
                </div>
                : null
            }
        </div>
      )}
      </div>

    );
};

export default Questions;