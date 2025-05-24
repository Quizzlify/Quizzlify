import { useState, useEffect, useRef, useMemo } from "react";
import { Trophy, Star, XCircle, Check, X } from "lucide-react";
import { useUser } from "@/provider/UserProvider";
import { useToast } from "@/provider/ToastProvider";

interface ResultsProps {
    questions: Quiz['content'];
    selectedAnswers: number[];
    level: number;
}

const Results: React.FC<ResultsProps> = ({ questions, selectedAnswers, level }) => {
    const questionKeys = Object.keys(questions).map(Number);
    const [earnedPoints, setEarnedPoints] = useState<number>(0);
    const [currentScore, setCurrentScore] = useState<number | null>(null);
    const hasSetQuizCompleted = useRef(false);
    const { user } = useUser();
    const [didAddPoints, setDidAddPoints] = useState<boolean>(false);
    const { addToast } = useToast();

    // Calculate correct answers and score
    const { score, totalPossibleScore } = useMemo(() => {
        const correctAnswersCount = questionKeys.reduce((count, key, index) => {
            return questions[key].correctAnswers.includes(selectedAnswers[index]) ? count + 1 : count;
        }, 0);

        const calculatedScore = level === 3
            ? questionKeys.reduce((total, key, index) => {
                return questions[key].correctAnswers.includes(selectedAnswers[index])
                    ? total + (questions[key]?.points || 0) 
                    : total;
            }, 0)
            : correctAnswersCount;

        const totalScore = level === 3
            ? questionKeys.reduce((total, key) => total + (questions[key]?.points || 0), 0)
            : questionKeys.length;

        return {
            correctAnswers: correctAnswersCount,
            score: calculatedScore,
            totalPossibleScore: totalScore
        };
    }, [questions, selectedAnswers, level, questionKeys]);

    // Fetch user score
    useEffect(() => {
        async function getUserScore(id: string) {
            if (level !== 3) return;
            
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
                    console.error("Erreur lors de la récupération du score: ", response.error);
                }
            } catch (error) {
                console.error("Erreur de connexion à la DB: ", error);
            }
        }

        async function updateUserScore() {
            const points = questionKeys.reduce((total, key, index) => {
                return questions[key].correctAnswers.includes(selectedAnswers[index])
                    ? total + (questions[key]?.points || 0) 
                    : total;
            }, 0);

            if (points === 0 || currentScore === null) return;

            try {
                const res = await fetch("/api/user/setScore", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        id: user?._id, 
                        score: Number(currentScore) + Number(points) 
                    })
                });
                const response = await res.json();

                if (response.success) {
                    setEarnedPoints(points);
                    addToast(`Vous avez gagné ${points} points !`, "success");
                } else {
                    console.error("Erreur lors de la mise à jour du score: ", response.error);
                }
            } catch (error) {
                console.error("Erreur de connexion à la DB: ", error);
            }
        }

        if (user?._id) {
            getUserScore(user._id);
        }
        if (didAddPoints == false && currentScore !== null) {
            updateUserScore();
            setDidAddPoints(true);
        }
    }, [user, currentScore, questions, selectedAnswers, level, questionKeys, addToast, didAddPoints, setDidAddPoints]);

    // Mark quiz as completed
    useEffect(() => {
        async function setQuizCompleted(id: string) {
            try {
                const res = await fetch("/api/user/setQuizCompleted", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                const response = await res.json();
                if (!response.success) {
                    console.error("Erreur lors de la complétion du quiz: ", response.error);
                }
            } catch (error) {
                console.error("Erreur de connexion à la DB: ", error);
            }
        }

        if (user?._id && !hasSetQuizCompleted.current) {
            hasSetQuizCompleted.current = true;
            setQuizCompleted(user._id);
        }
    }, [user]);

    const scorePercentage = (score / totalPossibleScore) * 100;
    const resultTier = useMemo(() => {
        if (scorePercentage >= 90) {
            return {
                title: "Excellent !",
                description: "Bravo.",
                icon: <Trophy className="text-yellow-500" size={48} />,
                colorClass: "bg-yellow-500/20 border-yellow-500",
                titleColor: "text-yellow-500"
            };
        } else if (scorePercentage >= 70) {
            return {
                title: "Très bien !",
                description: "Vous êtes très forts.",
                icon: <Star className="text-accent" size={48} />,
                colorClass: "bg-accent/20 border-accent",
                titleColor: "text-accent"
            };
        } else if (scorePercentage >= 50) {
            return {
                title: "Pas mal !",
                description: "Continuez à vous améliorer.",
                icon: <Star className="text-blue-500" size={48} />,
                colorClass: "bg-blue-500/20 border-blue-500",
                titleColor: "text-blue-500"
            };
        } else {
            return {
                title: "Retentez !",
                description: "Vous pouvez le faire.",
                icon: <XCircle className="text-red-500" size={48} />,
                colorClass: "bg-red-500/20 border-red-500",
                titleColor: "text-red-500"
            };
        }
    }, [scorePercentage]);

    return (
        <div className="w-full max-w-4xl mx-auto animate-slide-up">
            <div className={`
                ${resultTier.colorClass} 
                border-2 rounded-2xl p-8 text-center 
                flex flex-col items-center justify-center 
                bg-background-tertiary shadow-lg
            `}>
                <div className="mb-6 animate-bounce">
                    {resultTier.icon}
                </div>

                <h1 className={`
                    text-4xl font-bold mb-4 
                    ${resultTier.titleColor}
                `}>
                    {resultTier.title}
                </h1>

                <p className="text-foreground-secondary mb-6 max-w-xl text-lg">
                    {resultTier.description}
                </p>

                <div className="bg-background-secondary rounded-xl p-6 w-full max-w-md shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-foreground-secondary text-lg">Score Total</span>
                        <span className="font-bold text-2xl">
                            {score} / {totalPossibleScore}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {questionKeys.map((key, index) => {
                            const isCorrect = questions[key].correctAnswers.includes(selectedAnswers[key - 1]);
                            return (
                                <div
                                    key={key}
                                    className={`
                                        p-3 rounded-lg flex items-center justify-between
                                        transition-all duration-300 ease-in-out
                                        ${isCorrect ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}
                                        hover:scale-105 cursor-default
                                    `}
                                >
                                    <span className="font-medium">
                                        Question {index + 1}
                                    </span>
                                    {isCorrect ? <Check size={24} /> : <X size={24} />}
                                </div>
                            );
                        })}
                    </div>

                    {level === 3 && earnedPoints > 0 && (
                        <div className="mt-4 text-center text-foreground-secondary">
                            <p className="text-sm">
                                Vous avez gagné <span className="font-bold text-accent">{earnedPoints} points</span> supplémentaires !
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Results;