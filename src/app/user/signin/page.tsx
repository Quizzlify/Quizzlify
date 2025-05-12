"use client";

import NavBar from "@/components/Utilities/NavBar";
import QButton from "@/components/Utilities/QButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { LogInIcon } from "lucide-react";
import QInput from "@/components/Utilities/QInput";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  function goTo(route: string) {
    router.push(route);
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  async function handleLogin() {
    setIsSubmitting(true);
    try {
      if (!email || !password) {
        addToast("Veuillez remplir tous les champs", "error");
        return;
      }
      await login(email, password);
      addToast("Connexion réussie !", "success");
      router.push("/");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue.";
      addToast("Echec de la connexion: " + errorMessage, "error");
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
              <LogInIcon size={30} className="text-accent" />
              <h1 className="text-3xl font-bold">Se connecter</h1>
            </div>
            <p className="text-foreground-secondary text-sm">Entrez vos identifiants pour vous connecter.</p>
          </div>

          <div className="space-y-4">
            <QInput label="Adresse e-mail" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            <QInput label="Mot de passe" type="password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="flex justify-end">
            <button
              className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!email || !password || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6 || isSubmitting}
              onClick={handleLogin}
            >
              <LogInIcon size={18} />
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
          </div>

          <div className="text-center text-sm text-foreground-secondary">
            Pas encore de compte ?{" "}
            <span
              className="text-accent hover:underline cursor-pointer"
              onClick={() => router.push("/user/signup")}
            >
              Inscrivez-vous
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
