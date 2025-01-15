'use client'

import { useRouter } from "next/navigation";
import NavBar from "./components/NavBar"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {

    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <NavBar/>
                <h1 className="text-[40px] font-bold">
                    Améliorez vos connaissances, un quiz à la fois.
                </h1>

                <h2 className="mt-3 text-[30px] flex justify-center items-center flex-col">
                    Tout en s&apos;amusant.
                    <svg width="244" height="19" viewBox="0 0 244 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 14C26 5.50003 52.7129 1.81453 84.5 5.50007C124 10.0799 121.688 19.5002 161.5 11.5002C201.312 3.50023 225.275 5.50002 240 5.50002"
                            stroke="#FD9061" stroke-width="8" stroke-linecap="round"/>
                    </svg>
                </h2>

                <button className="w-[300px] h-[55px] bg-accent rounded-2xl text-[25px] mt-10 shadow-default hover:bg-[#CE6B40] hover:shadow-hover transition ">
                    Créer un compte
                </button>

                <hr className="bg-accent h-[6px] w-[calc(100%-8rem)] rounded-xl bottom-20 absolute"/>
            </div>

        </>
    );
}
