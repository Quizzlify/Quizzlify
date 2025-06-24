"use client";

import { FC, useEffect, useState } from "react";
import { Users, Book, AlertTriangle } from "lucide-react";
import { useUser } from "@/provider/UserProvider";

const AdminDashboardPage: FC = () => {
    const [userCount, setUserCount] = useState<number>(0)
    const [totalPoints, setTotalPoints] = useState<number>(0);
    // const [pendingQuiz, setPendingQuiz] = useState<number>(0);
    const { user } = useUser();
    
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch("/api/user/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({})
                });

                const response = await res.json();
                if (response.success) {
                    setUserCount(response.data.length);
                    setTotalPoints(response.data.reduce((acc: number, curr: { score: number; role: string }) => {
                        if (curr.role === "admin") return acc;
                        acc += curr.score || 0;
                        return acc;
                    }, 0));
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            }
        }
        getUsers()
    }, [user]);

    const stats = [
        { title: 'Utilisateurs', value: userCount, icon: <Users className="text-accent w-5 h-5" /> },
        { title: 'Total de points', value: totalPoints, icon: <Book className="text-accent w-5 h-5" /> },
        { title: 'Quiz en attente', value: pendingQuiz, icon: <AlertTriangle className="text-warning w-5 h-5" /> },
    ];

    if (user?.role !== "admin") { return <div className="p-8">Accès refusé</div>; }

    return (
        <div className="flex-1 overflow-auto bg-background p-8">
            <h2 className="text-2xl font-bold mb-6">Panel Administrateur</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
        </div>
    );
};

export default AdminDashboardPage;
