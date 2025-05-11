'use client'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import HomeCard from '../components/Home/HomeCard';
import NavBar from "@/components/Utilities/NavBar";
import Loading from '@/components/Utilities/Loading';
import { Play, Plus, PlusCircle, PlusSquare, Trophy } from 'lucide-react';

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function goTo(route: string) {
        setLoading(true);
        router.push(route);
    }

    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-background min-h-screen text-foreground">
            <NavBar currentPage='home' />

            <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="relative z-10 text-center max-w-4xl animate-slide-up">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-gradient">Améliorez</span> vos connaissances,
                        <br />tout en vous <span className="text-gradient">amusant</span>.
                    </h1>

                    <h2 className="mt-6 text-2xl md:text-3xl text-foreground-secondary mb-12">
                        Un quiz à la fois.
                    </h2>

                    <button
                        onClick={() => goTo('/user/signup')}
                        className="btn-primary text-xl py-4 px-12 shadow-glow hover:scale-105 transform transition"
                    >
                        Créer un compte
                    </button>
                </div>
            </div>

            <div className="py-20 px-6 md:px-10 bg-background-secondary">
                <div className="max-w-7xl mx-auto space-y-32">
                    <HomeCard
                        title="Jouez à des quiz originaux !"
                        description="Générez vos quiz par IA dans tous les domaines possibles. Notre système intelligent crée des questions adaptées à votre niveau."
                        position='right'
                        image="/home/quiz.png"
                        icon={<Play />}
                    />

                    <HomeCard
                        title="Créez vos propres quiz !"
                        description="En créant gratuitement un compte, générez vos quiz entièrement personnalisés. Partagez-les avec vos amis ou gardez-les privés."
                        position='left'
                        image="/home/create-quiz.png"
                        icon={<Plus />}
                    />

                    <HomeCard
                        title="Soyez parmi les plus haut classés !"
                        description="Grâce au classement, vous pouvez voir (ou faire partie) des meilleurs de nos joueurs. Obtenez des badges et débloquez des récompenses exclusives."
                        position='right'
                        image="/home/leaderboard.png"
                        icon={<Trophy />}
                    />
                </div>
            </div>

            <footer className="bg-background-tertiary py-10 text-center">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex justify-center space-x-8 mb-8">
                        <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                            <i className="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                            <i className="fab fa-github text-xl"></i>
                        </a>
                    </div>
                    <p className="text-foreground-secondary">© 2025 QuizApp. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}