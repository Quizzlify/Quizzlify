'use client'

import NavBar from "@/components/Utilities/NavBar";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    
    function goTo(route: string) {
        router.push(route);
    }
    
    return (
        <div className="min-h-screen">
            <NavBar currentPage="create-quiz" />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl w-[40rem] text-center">
                    Il vous faut <strong className="text-accent">créer un compte</strong> pour créer des quiz.
                    Si vous avez déjà compte, connectez-vous.
                    Sinon, vous pouvez en créer <strong className="text-accent">gratuitement</strong>.
                </h1>

                <button
                        onClick={() => goTo('/user/signup')}
                        className="btn-primary text-xl py-4 px-12 shadow-glow hover:scale-105 transform transition my-10"
                    >
                        Créer un compte
                </button>
            </div>
        </div>
    );
}