
"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { BarChart, Book, Edit, Home, LogOut, PlusCircle, Search, Settings, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const MesQuizPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const { addToast } = useToast();
    const { user, isAuthenticated, logout } = useUser();
    
    const quizzes = [
        { id: 1, title: 'Histoire de France', questions: 15, completions: 234, avgScore: '78%' },
        { id: 2, title: 'Géographie Mondiale', questions: 20, completions: 156, avgScore: '82%' },
        { id: 3, title: 'Sciences', questions: 25, completions: 89, avgScore: '75%' }
    ];

    if (!isAuthenticated || !user) {
        router.push("/user/signin");
    }

    const handleLogout = async () => {
        try {
            await logout();
            addToast("Déconnexion réussie", "success");
            router.push("/user/signin");
        } catch (error) {
            addToast("Erreur lors de la déconnexion", "error");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar user={user} nav="quiz" handleLogout={handleLogout} />

            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Mes Quiz</h2>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                            <PlusCircle className="inline-block mr-2" size={20} />
                            Créer un Quiz
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="p-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un quiz..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complétions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Moyen</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{user.username}</div>
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.questions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.completions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.avgScore}</td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MesQuizPage;