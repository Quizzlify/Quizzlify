'use client'

import NavBar from "@/app/components/NavBar";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    
    function goTo(route: string) {
        router.push(route);
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <NavBar currentPage="create-quiz"/>

            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-2xl w-[30rem] text-center">
                    Il vous faut <strong className="text-accent">créer un compte</strong> pour créer des quiz.
                    Si vous avez déjà compte, connectez-vous.
                    Sinon, vous pouvez en créer <strong className="text-accent">gratuitement</strong>.
                </h1>

                <button onClick={() => goTo('/user/signup')} className="w-[300px] h-[55px] bg-accent rounded-2xl text-[25px] mt-10 shadow-default hover:shadow transition">
                    Créer un compte
                </button>
            </div>
        </div>
    );
}