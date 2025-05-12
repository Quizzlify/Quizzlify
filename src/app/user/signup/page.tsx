"use client";

import NavBar from "@/components/Utilities/NavBar";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { CircleAlert, UserPlus2, UserPlus } from "lucide-react";
import QInput from "@/components/Utilities/QInput";

export default function Page() {
    const router = useRouter();
    const { signup, isAuthenticated } = useUser();
    const { addToast } = useToast();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

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

    async function handleSignup() {
        setIsSubmitting(true);
        try {
            await signup(username, email, password);
            addToast("Inscription réussie !", "success");
            router.push("/user/signin");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue.";
            addToast("Échec de l'inscription : " + errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <NavBar currentPage="user" />
            <main className="flex justify-center items-center min-h-screen px-4 animate-fade-in">
                <section className="card bg-background-tertiary glass-effect max-w-xl w-full space-y-6">
                    <div className="text-center animate-slide-up">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <UserPlus2 size={30} className="text-accent" />
                            <h1 className="text-3xl font-bold">Créer un compte</h1>
                        </div>
                        <p className="text-foreground-secondary text-sm">Remplissez les champs ci-dessous pour vous inscrire.</p>
                    </div>

                    <div className="space-y-4">
                        <QInput label="Pseudonyme" className="w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <QInput label="Adresse e-mail" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <QInput label="Mot de passe" type="password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <QInput label="Confirmation du mot de passe" type="password" className="w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {showAlert && (
                        <div className="flex items-start gap-2 bg-red-500/10 backdrop-blur-lg border border-danger text-danger rounded-lg px-4 py-2 animate-slide-up">
                            <CircleAlert size={18} />
                            <span className="text-sm">{alertMessage}</span>
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={
                                !username || !email || !password || !confirmPassword ||
                                password !== confirmPassword ||
                                password.length < 6 ||
                                !/\d/.test(password) ||
                                !/[a-z]/.test(password) ||
                                !/[A-Z]/.test(password) ||
                                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                            }
                            onClick={handleSignup}
                        >
                            <UserPlus size={18} />
                            {isSubmitting ? "Création du compte..." : "Créer un compte"}
                        </button>
                    </div>

                    <div className="text-center text-sm text-foreground-secondary">
                        Vous avez déjà un compte ?{" "}
                        <span
                            className="text-accent hover:underline cursor-pointer"
                            onClick={() => router.push("/user/signin")}
                        >
                            Connectez-vous
                        </span>.
                    </div>
                </section>
            </main>
        </>
    );
}
