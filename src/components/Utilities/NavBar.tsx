"use client";

import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { BarChart3, BookOpen, LogOut, Settings, UserIcon, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavbarProp = {
    currentPage: 'leaderboard' | 'quiz' | 'create-quiz' | 'user' | 'home';
}

const NavBar: React.FC<NavbarProp> = ({ currentPage }) => {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useUser();
    const { addToast } = useToast();

    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dropdownRef = useRef<HTMLLIElement>(null);
    const [gravatar, setGravatar] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setIsScrolled(true);
            else setIsScrolled(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
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
        setMobileMenuOpen(false);
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

    const navLinkClass = (page: string) =>
        `relative font-medium transition-colors px-3 py-2 rounded-lg ${currentPage === page
            ? "text-accent"
            : "text-foreground hover:text-accent hover:bg-background-tertiary"
        }`;

    const ActiveIndicator = ({ isActive }: { isActive: boolean }) => (
        isActive ? (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full mx-auto w-2/3"></span>
        ) : null
    );

    return (
        <>
            <nav className={`fixed z-50 text-foreground w-full transition-all duration-300 ${isScrolled
                    ? 'py-3 px-6'
                    : 'px-6 py-5'
                }`}>
                <div className={`mx-auto transition-all duration-300 ${isScrolled
                        ? 'max-w-7xl bg-nav-bg backdrop-blur-lg rounded-2xl shadow-navbar py-3 px-6'
                        : 'max-w-7xl bg-transparent'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <img src='/logo.png' className="w-10 h-10 mr-3" alt="Logo" />
                                <span className="text-xl font-semibold hidden sm:block">Quizzlify</span>
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg bg-background-tertiary"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                className={navLinkClass("create-quiz")}
                                onClick={() => isAuthenticated ? goTo('/createQuiz/default') : goTo('/createQuiz/noAccount')}
                            >
                                <div className="flex items-center space-x-2">
                                    <i className="fa-solid fa-square-plus"></i>
                                    <span>Créer votre quiz</span>
                                </div>
                                <ActiveIndicator isActive={currentPage === "create-quiz"} />
                            </button>

                            <button
                                className={navLinkClass("quiz")}
                                onClick={() => goTo('/quiz')}
                            >
                                <div className="flex items-center space-x-2">
                                    <i className="fa-solid fa-lightbulb"></i>
                                    <span>Quiz</span>
                                </div>
                                <ActiveIndicator isActive={currentPage === "quiz"} />
                            </button>

                            <button
                                className={navLinkClass("leaderboard")}
                                onClick={() => goTo('/leaderboard')}
                            >
                                <div className="flex items-center space-x-2">
                                    <i className="fa-solid fa-ranking-star"></i>
                                    <span>Classement</span>
                                </div>
                                <ActiveIndicator isActive={currentPage === "leaderboard"} />
                            </button>

                            {isAuthenticated && user ? (
                                <li className="relative list-none" ref={dropdownRef}>
                                    <button
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${currentPage === "user" ? "text-accent" : ""} hover:bg-background-tertiary`}
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <img
                                            src={gravatar || "https://www.gravatar.com/avatar/0?d=identicon"}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full border border-border"
                                        />
                                        <span className="max-w-[120px] truncate hidden sm:block">{user?.username}</span>
                                        <i className={`fa-solid fa-chevron-down text-sm transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-1 bg-background-secondary border border-border animate-fade-in z-50">
                                            <div className="px-4 py-3 border-b border-border">
                                                <p className="text-sm text-foreground-secondary">Connecté en tant que</p>
                                                <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                                            </div>

                                            <div className="py-1">
                                                <button onClick={() => { goTo('/dashboard'); setDropdownOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-background-tertiary flex items-center">
                                                    <BarChart3 size={16} className="mr-3 text-accent" /> Tableau de bord
                                                </button>
                                                <button onClick={() => { goTo('/dashboard/quiz'); setDropdownOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-background-tertiary flex items-center">
                                                    <BookOpen size={16} className="mr-3 text-accent" /> Mes quiz
                                                </button>
                                                <button onClick={() => { goTo('/dashboard/settings'); setDropdownOpen(false); }}
                                                    className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-background-tertiary flex items-center">
                                                    <Settings size={16} className="mr-3 text-accent" /> Paramètres
                                                </button>
                                            </div>

                                            <div className="border-t border-border">
                                                <button
                                                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                                                    className="w-full text-left block px-4 py-3 text-sm text-danger hover:bg-background-tertiary flex items-center"
                                                >
                                                    <LogOut size={16} className="mr-3" /> Se déconnecter
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <button
                                    onClick={() => goTo('/user/signin')}
                                    className="bg-accent text-white px-5 py-2 rounded-full hover:bg-accent-hover transition-colors"
                                >
                                    Connexion
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background-tertiary bg-opacity-95 md:hidden animate-fade-in">
                    <div className="flex flex-col h-full pt-20 pb-6 px-6">
                        <div className="flex flex-col space-y-4">
                            <button
                                className={`p-4 rounded-lg ${currentPage === "create-quiz" ? "bg-accent-secondary text-accent" : "text-foreground"}`}
                                onClick={() => isAuthenticated ? goTo('/createQuiz/default') : goTo('/createQuiz/noAccount')}
                            >
                                <div className="flex items-center space-x-3">
                                    <i className="fa-solid fa-square-plus text-xl"></i>
                                    <span className="text-lg">Créer votre quiz</span>
                                </div>
                            </button>

                            <button
                                className={`p-4 rounded-lg ${currentPage === "quiz" ? "bg-accent-secondary text-accent" : "text-foreground"}`}
                                onClick={() => goTo('/quiz')}
                            >
                                <div className="flex items-center space-x-3">
                                    <i className="fa-solid fa-lightbulb text-xl"></i>
                                    <span className="text-lg">Quiz</span>
                                </div>
                            </button>

                            <button
                                className={`p-4 rounded-lg ${currentPage === "leaderboard" ? "bg-accent-secondary text-accent" : "text-foreground"}`}
                                onClick={() => goTo('/leaderboard')}
                            >
                                <div className="flex items-center space-x-3">
                                    <i className="fa-solid fa-ranking-star text-xl"></i>
                                    <span className="text-lg">Classement</span>
                                </div>
                            </button>
                        </div>

                        <div className="mt-auto border-t border-border pt-4">
                            {isAuthenticated && user ? (
                                <div>
                                    <div className="flex items-center p-4 border-b border-border">
                                        <img
                                            src={gravatar || "https://www.gravatar.com/avatar/0?d=identicon"}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full border border-border mr-3"
                                        />
                                        <div>
                                            <p className="font-medium">{user?.username}</p>
                                            <p className="text-sm text-foreground-secondary">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <button onClick={() => goTo('/dashboard')}
                                            className="w-full text-left p-3 rounded-lg hover:bg-background-tertiary flex items-center">
                                            <BarChart3 size={18} className="mr-3 text-accent" /> Tableau de bord
                                        </button>
                                        <button onClick={() => goTo('/dashboard/quiz')}
                                            className="w-full text-left p-3 rounded-lg hover:bg-background-tertiary flex items-center">
                                            <BookOpen size={18} className="mr-3 text-accent" /> Mes quiz
                                        </button>
                                        <button onClick={() => goTo('/dashboard/settings')}
                                            className="w-full text-left p-3 rounded-lg hover:bg-background-tertiary flex items-center">
                                            <Settings size={18} className="mr-3 text-accent" /> Paramètres
                                        </button>

                                        <button onClick={handleLogout}
                                            className="w-full mt-6 text-left p-3 rounded-lg bg-danger bg-opacity-10 text-danger flex items-center">
                                            <LogOut size={18} className="mr-3" /> Se déconnecter
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => goTo('/user/signin')}
                                    className="w-full p-4 bg-accent text-white rounded-lg flex justify-center items-center space-x-2"
                                >
                                    <UserIcon size={18} />
                                    <span>Connexion</span>
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-background-tertiary"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar;