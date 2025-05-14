import { BarChart, Book, ChevronLeft, ChevronRight, Home, LogOut, MenuIcon, Settings, XIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Link from 'next/link';
import { getGravatarUserIcon } from "../Utilities/Utils";
import Image from "next/image";

interface SidebarProps {
    user: User | null;
    handleLogout: () => void;
    nav: 'dashboard' | 'quiz';
}


interface NavItem {
    name: string;
    nav: string;
    icon: JSX.Element;
    path: string;
}

export const Sidebar: FC<SidebarProps> = ({ user, nav, handleLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [gravatar, setGravatar] = useState<string | null>(null);

    const sidebarItems: NavItem[] = [
        { name: 'Tableau de bord', nav: 'dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { name: 'Mes Quiz', nav: 'quiz', icon: <Book size={20} />, path: '/dashboard/myquiz' },
        { name: 'Statistiques', nav: 'stats', icon: <BarChart size={20} />, path: '/dashboard/stats' },
        { name: 'Paramètres', nav: 'settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
    ]


    useEffect(() => {
        if (user && user.email) {
            getGravatarUserIcon(user.email).then(setGravatar);
        }
    }, [user]);

    return (
        <div className="relative h-screen">
            <aside className={`h-full bg-background-tertiary border-r border-white/10 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
                <div className="h-16 flex items-center justify-between border-b border-white/10 px-3">
                    {!collapsed && (
                        <Link href="/" className="flex items-center gap-2 overflow-hidden">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="text-xl font-bold text-accent truncate">Quizzlify</h1>
                        </Link>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary flex-shrink-0"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                            <span
                                className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out 
                                    ${collapsed ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`}
                            />
                            <span
                                className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out 
                                    ${collapsed ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out 
                                    ${collapsed ? "-rotate-45 -translate-y-0" : "translate-y-1.5"}`}
                            />
                        </div>
                    </button>
                </div>

                <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-2 rounded-lg transition-all group
                                ${nav === item.nav
                                    ? 'bg-accent/10 text-accent font-medium border border-white/10'
                                    : 'text-foreground-secondary hover:bg-background hover:text-foreground'
                                }`}
                        >
                            <span className={`${collapsed ? '' : 'mr-3'} flex-shrink-0`}>
                                {item.icon}
                            </span>
                            {!collapsed && (
                                <span className="truncate">{item.name}</span>
                            )}
                            {collapsed && (
                                <span className="absolute left-full bg-background-tertiary text-foreground rounded-md px-2 py-1 ml-2 text-sm opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className={`absolute bottom-4 w-full px-3 ${collapsed ? 'flex justify-center' : ''}`}>
                    {!collapsed ? (
                        <div className="bg-background p-3 rounded-lg border border-background-secondary">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-background-secondary">
                                    <Image
                                        src={gravatar || "https://www.gravatar.com/avatar/0?d=retro"}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="border border-white/10 object-cover w-full h-full rounded-full"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{user?.username || "Utilisateur"}</p>
                                    <p className="text-xs text-foreground-secondary truncate">{user?.email || "email@exemple.com"}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-foreground-secondary hover:bg-background-secondary rounded-lg hover:text-danger transition-colors flex-shrink-0"
                                    title="Se déconnecter"
                                    aria-label="Se déconnecter"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="group relative inline-block">
                            <button
                                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-background-secondary border border-white/10 transition-all"
                                title={user?.username || "Profil"}
                            >
                                <Image
                                    src={gravatar || "https://www.gravatar.com/avatar/0?d=retro"}
                                    alt="User Avatar"
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                            <div className="absolute top-1/2 left-full -translate-y-1/2 ml-1">
                                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-background-tertiary" />
                            </div>
                            <div className="absolute -top-1/2 left-full -translate-y-1/2 ml-3 bg-background-tertiary border border-background-secondary p-3 rounded-xl w-56 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-20">
                                <div className="text-center mb-3">
                                    <p className="font-semibold text-foreground truncate">{user?.username || "Utilisateur"}</p>
                                    <p className="text-xs text-foreground-secondary truncate">{user?.email || "email@exemple.com"}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-background hover:bg-background-secondary text-foreground-secondary hover:text-danger transition-colors text-sm"
                                >
                                    <LogOut size={16} />
                                    <span>Se déconnecter</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}