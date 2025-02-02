"use client"

import NavBar from "@/app/components/NavBar";
import { Input } from "@heroui/input";
import QButton from "@/app/components/QButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    function goTo(route: string) {
        router.push(route);
    }

    return (
        <>
            <NavBar currentPage="user"/>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col w-[574px] h-[447px] bg-secondary rounded-3xl border border-4 border-accent">
                    <div className="flex flex-row gap-10 justify-center mt-10">
                        <i className="fa-regular fa-user text-6xl text-accent"></i>
                        <h2 className="text-4xl font-semibold">Se Connnecter</h2>
                    </div>

                
                    <div className="flex flex-col gap-3 items-center mt-[4rem]">
                        <Input label="Adresse e-mail" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired/>
                        <Input label="Mot de passe" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired/>
                    </div>

                    <div className="mt-5 mr-6 self-end">
                        <QButton
                        className="w-[200px] h-[45px]"
                        text="Connexion"
                        icon={<i className="fa-solid fa-right-to-bracket"></i>}
                        disabled={false}
                        iconPosition="left"
                        //onClick={() => }
                        />
                    </div>

                    <p className="mt-[4rem] ml-auto mr-auto">Vous n'avez pas encore de compte? <a className="text-accent font-bold cursor-pointer" onClick={() => goTo('/user/inscription')}>Créez-en un gratuitement</a>.</p>
                </div>
            </div>
        </>
    );
}