"use client";

import Loading from '@/components/Utilities/Loading';
import { useToast } from '@/provider/ToastProvider';
import { useUser } from '@/provider/UserProvider';
import { Book, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type HistoryEntry = {
    _id: string;
    userId: string;
    category: string;
    at: Date;
    answers: Record<string, boolean>;
};

const DashboardPage = () => {
    const { user } = useUser();
    const { addToast } = useToast();

    const [quizCompleted, setQuizCompleted] = useState<number>(0);
    const [quizCreated, setQuizCreated] = useState<number>(0);
    const [history, setHistory] = useState<HistoryEntry[]>();
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const [statsRes, quizRes, historyRes] = await Promise.all([
                    fetch("/api/user/getStats", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user?._id }),
                    }),
                    fetch("/api/quiz/getUserQuiz", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user?._id }),
                    }),
                    fetch("api/user/getHistory", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user?._id, limit: 5 }),
                    }),
                ]);

                const statsData = await statsRes.json();
                const quizData = await quizRes.json();
                const historyData = await historyRes.json();

                if (statsData.success) {
                    setQuizCompleted(statsData.quizCompleted);
                    setScore(statsData.score);
                }
                if (quizData.success) {
                    setQuizCreated(quizData.data.length);
                }
                if (historyData.success) {
                    setHistory(historyData.data);
                }
            } catch (error) {
                console.log("Erreur chargement données: ", error);
                addToast("Erreur lors du chargement des données", "error");
            } finally {
                setIsLoading(false);
            }
        }

        if (user?._id) fetchData();
    }, [user, addToast]);

    const stats = [
        { title: 'Quiz Créés', value: quizCreated, icon: <Book className="text-accent w-5 h-5" /> },
        { title: 'Quiz Complétés', value: quizCompleted, icon: <Book className="text-green-500 w-5 h-5" /> },
        { title: 'Score total', value: score, icon: <Star className="text-yellow-500 w-5 h-5" /> },
    ];

    const getTimeAgo = (date: Date) => {
        const hoursAgo = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
        if (hoursAgo > 0) {
            return `Il y a ${hoursAgo} heure${hoursAgo > 1 ? 's' : ''}`;
        } else {
            const minutesAgo = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60));
            return `Il y a ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''}`;
        }
    };

    const getPercentage = (answers: Record<string, boolean>) => {
        const total = Object.keys(answers).length;
        const correct = Object.values(answers).filter(answer => answer === true).length;
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    };

    if (isLoading) return <Loading />;

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex-1 overflow-auto bg-background p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">Tableau de bord</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-background-tertiary border border-white/10 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                        <div className="flex items-center gap-3 mb-1">
                            <div className="text-accent bg-accent/10 rounded-md p-1.5">
                                {stat.icon}
                            </div>
                            <p className="text-sm text-foreground-secondary font-medium">{stat.title}</p>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-background-tertiary border border-white/10 p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold text-foreground mb-6">Activité Récente</h3>
                <div className="space-y-4">
                    {history?.map((entry, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-white/10 last:border-none">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                                    <Book className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="text-base text-foreground font-medium">Quiz {entry.category} Complété</p>
                                    <p className="text-sm text-foreground-secondary">
                                        {getTimeAgo(new Date(entry.at))}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-green-400">{getPercentage(entry.answers)}% de réussite</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;