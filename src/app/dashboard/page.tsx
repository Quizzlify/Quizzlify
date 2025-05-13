"use client";

import { Sidebar } from '@/components/Dashboard/Sidebar';
import Loading from '@/components/Utilities/Loading';
import { useToast } from '@/provider/ToastProvider';
import { useUser } from '@/provider/UserProvider';
import { Book } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
    const { user, isAuthenticated, logout } = useUser();
    const router = useRouter();
    const { addToast } = useToast();

    const [quizCompleted, setQuizCompleted] = useState<number>(0);
    const [quizCreated, setQuizCreated] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/user/signin');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true); // début du chargement

            try {
                const [statsRes, quizRes] = await Promise.all([
                    fetch("/api/user/getStats", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: user?._id }),
                    }),
                    fetch("/api/quiz/getUserQuiz", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user?._id }),
                    }),
                ]);

                const statsData = await statsRes.json();
                const quizData = await quizRes.json();

                if (statsData.success) {
                    setQuizCompleted(statsData.quizCompleted);
                    setScore(statsData.score);
                } else {
                    console.log("Erreur stats: ", statsData.error);
                }

                if (quizData.success) {
                    setQuizCreated(quizData.data.length);
                } else {
                    console.log("Erreur quiz: ", quizData.error);
                }
            } catch (error) {
                console.log("Erreur lors du chargement des données: ", error);
            } finally {
                setIsLoading(false); // fin du chargement
            }
        }

        if (user?._id) {
            fetchData();
        }
    }, [user]);

    const stats = [
        { title: 'Quiz Créés', value: quizCreated },
        { title: 'Quiz Complétés', value: quizCompleted },
        { title: 'Score total', value: score },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            addToast('Déconnexion réussie !', 'success');
            router.push('/user/signin');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            addToast('Erreur lors de la déconnexion', 'error');
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="flex h-screen">
            <Sidebar user={user} nav='dashboard' handleLogout={handleLogout} />
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground">Tableau de bord</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.title} className="bg-background-tertiary p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium text-foreground-secondary">{stat.title}</p>
                                </div>
                                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-background-tertiary rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Activité Récente</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-accent-secondary last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-accent-secondary flex items-center justify-center">
                                            <Book size={20} className="text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground-secondary">Quiz Histoire Complété</p>
                                            <p className="text-sm text-foreground-secondary">Il y a {i * 2} heures</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-600">85% de réussite</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;