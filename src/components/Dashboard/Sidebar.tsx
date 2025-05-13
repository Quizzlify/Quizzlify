import { BarChart, Book, Home, LogOut, Settings } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Link from 'next/link';
import { getGravatarUserIcon } from "../Utilities/Utils";
import Image from "next/image";

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
    const [gravatar, setGravatar] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.email) {
            getGravatarUserIcon(user.email).then(setGravatar);
        }
    }, [user]);

    return (
        <aside className="w-64 bg-background-tertiary border-r border-background-secondary">
            <div className="h-16 flex items-center justify-center border-b border-accent-secondary">
                <h1 className="text-xl font-bold text-accent">Quizzlify</h1>
            </div>

            <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center space-x-3 p-3 ${nav === item.nav ? 'bg-background text-accent border border-accent-secondary' : 'text-foreground-secondary hover:bg-background'} rounded-lg`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="flex flex-row justify-between absolute bottom-4 w-64 px-4 inset-x-0">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <Image
                            src={gravatar || 'https://www.gravatar.com/avatar/0?d=identicon'}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <p className="font-medium">{user?.username}</p>
                        <p className="text-xs text-foreground-secondary">{user?.email}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="p-3 text-foreground-secondary hover:bg-background rounded-lg w-fit hover:text-danger transition-colors">
                    <LogOut size={20} />
                </button>
            </div>

            <div className="p-4 ">

            </div>
        </aside>
    );
}