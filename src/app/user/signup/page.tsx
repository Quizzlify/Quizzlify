"use client"

import NavBar from "@/components/Home/NavBar";
import { Input } from "@heroui/input";
import QButton from "@/components/Utilities/QButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@heroui/alert";

export default function Page() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    async function handleSignup() {
        try {
          const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
          });
          const response = await res.json();
          
          if (response.success) {
            console.log("Inscription réussie.");
            setAlertMessage("Le compte a été créé avec succès.");
            setShowAlert(true);
            
          } else {
            console.log("Une erreur est survenue: ", response.error);
            setAlertMessage(`Échec de la connexion: ${response.error}`);
            setShowAlert(true);

          }
        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            setAlertMessage(`Erreur de connexion au serveur: ${error}`);
            setShowAlert(true);
        }
    }

    function goTo(route: string) {
        router.push(route);
    }

    return (
        <>
            <NavBar currentPage="user"/>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col w-[574px] h-fit bg-secondary rounded-3xl border border-4 border-accent">
                    <div className="flex flex-row gap-10 justify-center mt-10">
                        <i className="fa-regular fa-user text-6xl text-accent"></i>
                        <h2 className="text-4xl font-semibold">Créer un compte</h2>
                    </div>

                
                    <div className="flex flex-col gap-3 items-center mt-[2rem]">
                        <Input label="Pseudonyme" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <Input label="Adresse e-mail" type="mail" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input label="Mot de passe" type="password" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Input label="Confirmation du mot de passe" type="password" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>

                    <div className="mt-5 mb-[2rem] mr-6 self-end">
                        <QButton
                        className="w-[250px] h-[45px]"
                        text="Créer un compte"
                        icon={<i className="fa-solid fa-right-to-bracket"></i>}
                        disabled={false}
                        iconPosition="left"
                        onClick={handleSignup}
                        />
                    </div>

                    {showAlert && (
                        <Alert color="primary" variant="faded" className="mt-2">
                        {alertMessage}
                        </Alert>
                    )}

                    <p className="mt-5 ml-auto mr-auto mb-3">Vous avez déjà un compte? <a className="text-accent font-bold cursor-pointer" onClick={() => goTo('/user/signin')}>Connectez-vous</a>.</p>

                </div>
            </div>
        </>
    );
}