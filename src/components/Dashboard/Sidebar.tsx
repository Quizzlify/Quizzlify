import { BarChart, Book, Home, LogOut, Settings, Users } from "lucide-react";
import { FC } from "react";
import Link from 'next/link';

interface SidebarProps {
    user: User | null;
    handleLogout: () => void;
    nav: 'dashboard' | 'quiz';
}

const sidebarItems = [
    { name: 'Tableau de bord', nav: 'dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Mes Quiz', nav: 'quiz', icon: <Book size={20} />, path: '/dashboard/myquiz' },
    { name: 'Statistiques', nav: 'stats', icon: <BarChart size={20} />, path: '/dashboard/stats' },
    { name: 'Paramètres', nav: 'settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
]

export const Sidebar: FC<SidebarProps> = ({ user, nav, handleLogout }) => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200">
            <div className="h-16 flex items-center justify-center border-b">
                <h1 className="text-xl font-bold text-orange-600">Quizzlify</h1>
            </div>

            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="font-semibold text-orange-600">{user?.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="font-medium">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>
            </div>

            <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center space-x-3 p-3 ${nav === item.nav ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-orange-50'} rounded-lg`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-4 w-64 px-4">
                <button onClick={handleLogout} className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-orange-50 rounded-lg w-full">
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}