'use client'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from "next/navigation";
import HomeCard from '../components/Home/HomeCard';
import NavBar from "@/components/Home/NavBar";

export default function Home() {
    const router = useRouter();

    function goTo(route: string) {
        router.push(route);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <NavBar currentPage='home'/>
                <h1 className="text-[40px] font-bold">
                    Améliorez vos connaissances, tout en vous amusant.
                </h1>

                <h2 className="mt-3 text-[30px] flex justify-center items-center flex-col">
                    Un quiz à la fois.
                    <svg width="244" height="19" viewBox="0 0 244 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 14C26 5.50003 52.7129 1.81453 84.5 5.50007C124 10.0799 121.688 19.5002 161.5 11.5002C201.312 3.50023 225.275 5.50002 240 5.50002"
                            stroke="#FD9061" strokeWidth="8" strokeLinecap="round"/>
                    </svg>
                </h2>

                <button onClick={() => goTo('/user/signup')} className="w-[300px] h-[55px] bg-accent rounded-2xl text-[25px] mt-10 shadow-default hover:shadow transition">
                    Créer un compte
                </button>
                
                <hr className="bg-accent h-[5px] w-[calc(100%-8rem)] rounded-xl bottom-20 absolute"/>
            </div>

            <div className="flex flex-col justify-center items-center gap-[8rem] pb-8">
                <HomeCard title={"Jouez à des quiz originaux !"} description={"Générez vos quiz par IA dans tous les domaines possibles."} position='right' image="/home/quiz.png"/>
                <HomeCard title={"Créez vos propres quiz !"} description={"En créant gratuitement un compte, générez vos quiz entièrement personnalisés."} position='left' image="/home/create-quiz.png"/>
                <HomeCard title={"Soyez parmi les plus haut classés !"} description={"Grâce au classement, vous pouvez voir (ou faire partie) des meilleurs de nos joueurs."} position='right' image="/home/leaderboard.png"/>
            </div>

        </>
    );
}
