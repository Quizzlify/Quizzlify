"use client"

import NavBar from "@/components/Utilities/NavBar";
import QButton from "@/components/Utilities/QButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useToast } from "@/provider/ToastProvider";
import { useUser } from "@/provider/UserProvider";
import { LogInIcon } from "lucide-react";

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
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-[574px] h-fit bg-accent-secondary rounded-3xl border-4 border-accent">
          <div className="flex flex-row gap-10 justify-center mt-10">
            <i className="fa-regular fa-user text-6xl text-accent"></i>
            <h2 className="text-4xl font-semibold">Se Connecter</h2>
          </div>

          <div className="flex flex-col gap-3 items-center mt-[4rem]">
            <Input label="Adresse e-mail" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Mot de passe" type="password" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="hover:text-[var(--accent)] transition-all cursor-pointer" onClick={() => goTo('./reset')}>J'ai oublié mon mot de passe.</p>
          </div>

          <div className="mt-5 mr-6 self-end">
            <QButton
              text={isSubmitting ? "Connexion..." : "Se connecter"}
              icon={<LogInIcon className="w-12" />}
              disabled={false}
              iconPosition="left"
              onClick={handleLogin}
            />
          </div>

          {showAlert && (
            <Alert color="primary" variant="faded" className="mt-2">
              {alertMessage}
            </Alert>
          )}

          <p className="mt-5 ml-auto mr-auto mb-3">
            Vous n'avez pas encore de compte?{" "}
            <a
              className="text-accent font-bold cursor-pointer"
              onClick={() => goTo('/user/signup')}
            >
              Créez-en un gratuitement
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}