import { useState, useEffect, useRef } from "react";
import Question from "@/components/Quiz/Question";
import { useUser } from "@/provider/UserProvider";
import { useToast } from "@/provider/ToastProvider";

interface ResultsProps {
    questions: Quiz['content'];
    selectedAnswers: number[];
    level: number;
}

interface UserList {
    username: string,
    score: number,
    rank: number,
    you: boolean
};

const Results: React.FC<ResultsProps> = ({ questions, selectedAnswers, level }) => {
    const questionKeys = Object.keys(questions).map(Number);
    const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
    const [currentScore, setCurrentScore] = useState<number | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const hasSetQuizCompleted = useRef(false);
    const { user, isAuthenticated } = useUser();
    const { addToast } = useToast();

    useEffect(() => {
        async function getUserScore(id: string) {
            try {
                const res = await fetch("/api/user/getScore", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                const response = await res.json();
                
                if (response.success) {
                    setCurrentScore(response.score);
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            }
        }
        getUserScore(user?._id);
    }, [user]);

    async function setUserScore(id: string, score: number) {
        try {
            const res = await fetch("/api/user/setScore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, score })
            });
            const response = await res.json();
            if (!response.success) {
                console.log("Une erreur est survenue: ", response.error);
            }

        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
        }
    }

    useEffect(() => {
        let points = 0;
        questionKeys.forEach((key, index) => {
            if (questions[key].correctAnswer === selectedAnswers[index]) {
                points += questions[key].points;
            }
        });
        setEarnedPoints(points);
        if (user && level === 3 && currentScore !== null && earnedPoints !== null) {
            setUserScore(user._id, currentScore + earnedPoints);
            addToast(earnedPoints + " points ont été ajouté !", "success");
        }
    }, [currentScore, earnedPoints]);

    useEffect(() => {
        setCorrectAnswers(questionKeys.reduce((count, key, index) => {
            const isCorrectAnswer = (questions[key].correctAnswer === selectedAnswers[index])
            return count + (isCorrectAnswer ? 1 : 0);
        }, 0));
    }, [questions, selectedAnswers]);

    useEffect(() => {
        if (user?._id && !hasSetQuizCompleted.current ) {
            hasSetQuizCompleted.current = true;
            setQuizCompleted(user._id);
        }
    }, [user]);

    async function setQuizCompleted(id: string) {
        try {
            const res = await fetch("/api/user/setQuizCompleted", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const response = await res.json();
            if (!response.success) {
                console.log("Une erreur est survenue: ", response.error);
            }

        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
        }
    }

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