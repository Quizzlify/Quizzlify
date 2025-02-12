"use client"

import NavBar from "@/app/components/NavBar";
import QButton from "@/app/components/QButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {Input} from "@heroui/input";
import { Alert } from "@heroui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  function goTo(route: string) {
    router.push(route);
  }

  async function handleLogin() {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const response = await res.json();
      
      if (response.success) {
        console.log("Connexion établie.");
        setAlertMessage("Vous avez bien été connecté.");
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

  return (
    <>
      <NavBar currentPage="user" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col w-[574px] h-fit bg-secondary rounded-3xl border border-4 border-accent">
          <div className="flex flex-row gap-10 justify-center mt-10">
            <i className="fa-regular fa-user text-6xl text-accent"></i>
            <h2 className="text-4xl font-semibold">Se Connecter</h2>
          </div>
          
          <div className="flex flex-col gap-3 items-center mt-[4rem]">
          <Input label="Adresse e-mail" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input label="Mot de passe" type="input" variant="bordered" size={"sm"} className="max-w-[20rem] [&>div]:!border-neutral-500" isRequired
                value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <div className="mt-5 mr-6 self-end">
            <QButton
              className="w-[200px] h-[45px]"
              text="Connexion"
              icon={<i className="fa-solid fa-right-to-bracket"></i>}
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