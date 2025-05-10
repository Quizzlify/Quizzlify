"use client";

import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { BarChart3, BookOpen, LogOut, Settings, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SHA3 from "sha3";

type NavbarProp = {
    currentPage: 'leaderboard' | 'quiz' | 'create-quiz' | 'user' | 'home';
}

const NavBar: React.FC<NavbarProp> = ({ currentPage }) => {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useUser();
    const { addToast } = useToast();
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const [gravatar, setGravatar] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setIsScrolled(true);
            else setIsScrolled(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        try {
            await logout();
            addToast("Déconnexion réussie", "success");
            router.push("/");
        } catch (error) {
            addToast("Erreur lors de la déconnexion", "error");
        }
    }

    function goTo(route: string) {
        router.push(route);
    }

    function getGravatar(email: string): Promise<string> {
        const normalizedEmail = email.trim().toLowerCase();
        const encoder = new TextEncoder();
        const data = encoder.encode(normalizedEmail);

        return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            return `https://www.gravatar.com/avatar/${hashHex}?d=identicon`;
        }).catch(() => {
            return `https://www.gravatar.com/avatar/0?d=identicon`;
        });
    }

    useEffect(() => {
        if (user && user.email) {
            getGravatar(user.email).then(setGravatar);
        }
    }, [user]);

    return (
        <nav className={`fixed text-lg text-[#0f0f0f] p-5 font-semibold transition-all duration-200 z-[1000]
            ${isScrolled
                ? 'bg-[#ffffff70] shadow-navbar backdrop-blur-[6px] top-5 w-[calc(100%-5rem)] rounded-3xl'
                : 'bg-transparent backdrop-blur-[4px] top-0 w-screen'
            }`}>

            <ul className="flex w-full justify-between">
                <li className="hover:text-accent transition"><a href="/"><img src={'/logo.png'} className="w-10" alt="Logo" /></a></li>

                <li className="hover:text-accent transition">
                    <button className={`flex items-center gap-2.5 ${currentPage == "create-quiz" ? "text-accent" : ""}`} onClick={() => goTo('/create-quiz/default')}> {/* TODO: faudra check si l'user est connecté ou non*/}
                        <i className="fa-solid fa-square-plus"></i><a>Créer votre quiz</a>
                    </button>
                </li>

                <li className="hover:text-accent transition">
                    <button className={`flex items-center gap-2.5 ${currentPage == "quiz" ? "text-accent" : ""}`} onClick={() => goTo('/quiz')}>
                        <i className="fa-solid fa-lightbulb"></i><a>Quiz</a>
                    </button>
                </li>

                <li className="hover:text-accent transition">
                    <button className={`flex items-center gap-2.5 ${currentPage == "leaderboard" ? "text-accent" : ""}`} onClick={() => goTo('/leaderboard')}>
                        <i className="fa-solid fa-ranking-star"></i><a>Classement</a>
                    </button>
                </li>

                {isAuthenticated && user ? (
                    <li className="relative" ref={dropdownRef}>
                        <button
                            className={`flex items-center gap-2.5 ${currentPage == "user" ? "text-accent" : "hover:text-accent"} transition`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={gravatar || "https://www.gravatar.com/avatar/0?d=identicon"}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border-1 border-white shadow-sm"
                            />
                            <span className="max-w-[120px] truncate">{user?.username}</span>
                            <i className={`fa-solid fa-chevron-down text-sm ${dropdownOpen ? 'rotate-180' : ''} transition-all`}></i>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-transform origin-top-right">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm leading-5 text-gray-500">Connecté en tant que</p>
                                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">{user?.email}</p>
                                </div>

                                <div className="py-1">
                                    <button onClick={() => { goTo('/dashboard'); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center">
                                        <BarChart3 size={16} className="mr-3" /> Tableau de bord
                                    </button>
                                    <button onClick={() => { goTo('/dashboard/quiz'); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center">
                                        <BookOpen size={16} className="mr-3" /> Mes quiz
                                    </button>
                                    <button onClick={() => { goTo('/dashboard/settings'); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center">
                                        <Settings size={16} className="mr-3" /> Paramètres
                                    </button>
                                </div>

                                <div className="border-t border-gray-100">
                                    <button
                                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                                        className="w-full text-left block px-4 py-2 text-sm leading-5 text-red-600 hover:bg-gray-100 hover:text-red-700 flex items-center"
                                    >
                                        <LogOut size={16} className="mr-3" /> Se déconnecter
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ) : (
                    <li className={`hover:text-accent transition cursor-pointer ${currentPage == "user" ? "text-accent" : ""}`} onClick={() => goTo('/user/signin')}>
                        <UserIcon className="w-8 h-8" />
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar