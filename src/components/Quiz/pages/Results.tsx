import { useState, useEffect } from "react";
import Question from "@/components/Quiz/Question";

interface ResultsProps {
    questions: Quiz['content'];
    selectedAnswers: number[];
}

interface UserList {
    username: string,
    score: number,
    rank: number,
    you: boolean
};

const Results: React.FC<ResultsProps> = ({ questions, selectedAnswers }) => {
    const questionKeys = Object.keys(questions).map(Number);
    const [earnedPoints, setEarnedPoints] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);

    useEffect(() => {
        let points = 0;
        questionKeys.forEach((key, index) => {
            if (questions[key].correctAnswer === selectedAnswers[index]) {
                points += questions[key].points;
            }
        });
        setEarnedPoints(points);

        setCorrectAnswers(questionKeys.reduce((count, key, index) => {
            const isCorrectAnswer = (questions[key].correctAnswer === selectedAnswers[index])
            return count + (isCorrectAnswer ? 1 : 0);
        }, 0));
    }, [questions, selectedAnswers]);

    return (
        <div className="mt-5 flex items-center flex-col gap-10">
            {Object.values(questions).map((question, index) => (
                <div key={questionKeys[index]} className="flex flex-col">
                    <div className="flex flex-row gap-5 items-center w-full">
                        <h1 className="text-3xl">Question {index + 1}</h1>
                        <span className="text-lg ml-auto mr-5">Points: {questions[questionKeys[index]].points}</span>
                    </div>

                    <Question
                        key={questionKeys[index]}
                        answers={question.answers}
                        correctAnswer={question.correctAnswer}
                        selectedAnswer={selectedAnswers[index]}
                        showAnswer={true}
                        onAnswerSelect={() => {}}
                    />
                </div>
            ))}

            <h1 className="text-3xl w-[45rem] text-center mb-10">Vous avez gagné <span className="font-semibold">{earnedPoints} points</span> grâce à ce quiz, en répondant correctement à <span className="font-semibold">{(correctAnswers / questionKeys.length) * 100} %</span> des questions.</h1>
        </div>
    );
}

export default Results;