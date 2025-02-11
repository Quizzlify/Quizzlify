
"use client";

import { BarChart, Book, Edit, Home, LogOut, PlusCircle, Search, Settings, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MesQuizPage = () => {
    const [users, setUsers] = useState([]);
    
    const quizzes = [
        { id: 1, title: 'Histoire de France', questions: 15, completions: 234, avgScore: '78%' },
        { id: 2, title: 'Géographie Mondiale', questions: 20, completions: 156, avgScore: '82%' },
        { id: 3, title: 'Sciences', questions: 25, completions: 89, avgScore: '75%' }
    ];

    useEffect(() => {
        const requests = async () => {
            const response = await fetch("/api/test");
            const data = await response.json();
            setUsers(data.users);
        }

        requests();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-bold text-orange-600">Quizzlify</h1>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg">
                        <Home size={20} />
                        <span className="font-medium">Tableau de bord</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 p-3 text-orange-600 bg-orange-50 rounded-lg">
                        <Book size={20} />
                        <span>Mes Quiz</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg">
                        <BarChart size={20} />
                        <span>Statistiques</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg">
                        <Users size={20} />
                        <span>Utilisateurs</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg">
                        <Settings size={20} />
                        <span>Paramètres</span>
                    </Link>
                </nav>

                <div className="absolute bottom-4 w-64 px-4">
                    <button className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg w-full">
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

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
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{user.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.questions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.completions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.avgScore}</td>
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