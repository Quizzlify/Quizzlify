"use client"

import NavBar from "@/components/Utilities/NavBar";
import { Input } from "@heroui/input";
import QButton from "@/components/Utilities/QButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@heroui/alert";
import { useToast } from "@/provider/ToastProvider";
import { useEffect } from "react";
import { useUser } from "@/provider/UserProvider";

export default function Page() {
    const router = useRouter();
    const { signup, isAuthenticated } = useUser();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    async function handleSignup() {
        setIsSubmitting(true);
        try {
            await signup(username, email, password);
            addToast("Inscription réussie !", "success");
            router.push("/user/signin");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue.";
            addToast("Echec de l'inscription: " + errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    }

    function goTo(route: string) {
        router.push(route);
    }

    useEffect(() => {
        if (password.length < 6 && password.length !== 0) {
            setAlertMessage("Votre mot de passe doit avoir plus de 6 caractères");
            setShowAlert(true);
        } else if (!/\d/.test(password) && password.length !== 0) {
            setAlertMessage("Votre mot de passe doit contenir au moins un chiffre");
            setShowAlert(true);
        } else if (!/[a-z]/.test(password) && password.length !== 0) {
            setAlertMessage("Votre mot de passe doit contenir au moins une lettre minuscule");
            setShowAlert(true);
        } else if (!/[A-Z]/.test(password) && password.length !== 0) {
            setAlertMessage("Votre mot de passe doit contenir au moins une lettre majuscule");
            setShowAlert(true);
        } else if (password !== confirmPassword && password.length !== 0) {
            setAlertMessage("Les mots de passe ne correspondent pas.");
            setShowAlert(true);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length !== 0) {
            setAlertMessage("L'adresse e-mail n'est pas valide.");
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [password, confirmPassword, email]);

    return (
        <>
            <NavBar currentPage="user" />
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col w-[574px] h-fit bg-secondary rounded-3xl border border-4 border-accent">
                    <div className="flex flex-row gap-10 justify-center mt-10">
                        <i className="fa-regular fa-user text-6xl text-accent"></i>
                        <h2 className="text-4xl font-semibold">Créer un compte</h2>
                    </div>


                    <div className="flex flex-col gap-3 items-center mt-[2rem]">
                        <Input label="Pseudonyme" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input label="Adresse e-mail" type="mail" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Mot de passe" type="password" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input label="Confirmation du mot de passe" type="password" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="mt-5 mb-[2rem] mr-6 self-end">
                        <QButton
                            className="w-[270px] h-[45px]"
                            text={isSubmitting ? "Création du compte..." : "Créer un compte"}
                            icon={<i className="fa-solid fa-right-to-bracket"></i>}
                            disabled={
                                username.length === 0 ||
                                email.length === 0 ||
                                password.length === 0 ||
                                confirmPassword.length === 0 ||
                                password !== confirmPassword ||
                                password.length < 6 ||
                                !/\d/.test(password) ||
                                !/[a-z]/.test(password) ||
                                !/[A-Z]/.test(password) ||
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                            }
                            iconPosition="left"
                            onClick={handleSignup}
                        />
                    </div>

                    {showAlert && (
                        <Alert color="danger" variant="faded" className="mt-2">
                            {alertMessage}
                        </Alert>
                    )}

                    <p className="mt-5 ml-auto mr-auto mb-3">Vous avez déjà un compte? <a className="text-accent font-bold cursor-pointer" onClick={() => goTo('/user/signin')}>Connectez-vous</a>.</p>

                </div>
            </div>
        </>
    );
}