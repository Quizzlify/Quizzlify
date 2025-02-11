import { BarChart, Book, Home, LogOut, Settings, Users } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
    const stats = [
        { title: 'Quiz Créés', value: '124', change: '+12%' },
        { title: 'Quiz Complétés', value: '3,467', change: '+8%' },
        { title: 'Utilisateurs Actifs', value: '1,294', change: '+23%' },
        { title: 'Temps Moyen', value: '4.2min', change: '-2%' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-bold text-orange-600">Quizzlify</h1>
                </div>

                <nav className="p-4 space-y-2">
                    <Link href="#" className="flex items-center space-x-3 p-3 text-orange-600 bg-orange-50 rounded-lg">
                        <Home size={20} />
                        <span className="font-medium">Tableau de bord</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg">
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
                        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                            Nouveau Quiz
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                            <Book size={20} className="text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Quiz Histoire Complété</p>
                                            <p className="text-sm text-gray-500">Il y a {i * 2} heures</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-600">85% de réussite</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;