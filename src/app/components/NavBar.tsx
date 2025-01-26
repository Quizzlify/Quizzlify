"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {

    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

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

    function goTo(route: string) {
        router.push(route);
    }

    return (
        <nav className={`fixed text-xl text-[#0f0f0f] p-5 font-semibold transition-all duration-200 z-[1000]
            ${isScrolled
                ? 'bg-[#ffffff70] shadow-navbar backdrop-blur-[6px] top-5 w-[calc(100%-5rem)] rounded-3xl'
                : 'bg-transparent backdrop-blur-[4px] top-0 w-screen'
            }`}>

            <ul className="flex w-full justify-between">
                <li className="hover:text-accent transition"><a href="/">Logo</a></li>

                <li className="hover:text-accent transition">
                    <button className="flex items-center gap-2.5" onClick={() => goTo('/creer-quiz')}>
                        <i className="fa-solid fa-square-plus"></i><a href="#create_quiz"> Créer votre quiz</a>
                    </button>
                </li>

                <li className="hover:text-accent transition">
                    <button className="flex items-center gap-2.5" onClick={() => goTo('/quiz')}>
                        <i className="fa-solid fa-lightbulb"></i><a href="#quiz"> Quiz</a>
                    </button>
                </li>

                <li className="hover:text-accent transition">
                    <button className="flex items-center gap-2.5" onClick={() => goTo('/leaderboard')}>
                        <i className="fa-solid fa-ranking-star"></i><a href="#leaderboard">Classement</a>
                    </button>
                </li>

                <li className="hover:text-accent transition">
                    <i className="fa-regular fa-user fa-xl"></i>
                </li>
            </ul>
        </nav>
    )
}