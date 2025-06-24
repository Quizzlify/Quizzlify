"use client"

import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";
import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getGravatarUserIcon } from "@/components/Utilities/Utils";
import { useUser } from "@/provider/UserProvider";


const Settings = () => {
    const [currentUsername, setCurrentUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [gravatar, setGravatar] = useState("");

    async function handleChange() {
        setIsSaving(true);
        try {
            const response = await fetch("/api/user/setUsername", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?._id.toString(), password, newUsername }),
            });

            const data = await response.json();

            if (data.success) {
                setNewUsername("");
                setCurrentUsername(newUsername);
            } else {
                console.error("Erreur lors de la récupération des quiz:", data.error);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des quiz:", error);
        }
        setIsSaving(false);
    }

    const { user } = useUser();
    useEffect(() => {
        if (user && user.email) {
            getGravatarUserIcon(user.email).then(setGravatar);
            setCurrentUsername(user.username);
        }
    }, [user]);

    return (
        <>
        <h2 className="text-2xl font-bold text-foreground ml-5 mt-5">Paramètres utilisateur</h2>

        <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
            <div className="bg-background-tertiary rounded-lg shadow-sm border border-border p-6 w-[30rem]">
            <h2 className="text-xl font-semibold mb-6">Profil</h2>
            <div className="flex items-center gap-4 mb-8 bg-background-tertiary">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image src={gravatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold transition-colors duration-300">{currentUsername}</h3>
                    <span className="text-sm font-medium">{user?.role}</span>
                </div>
            </div>

            {/* Formulaire */}
            <div className="space-y-6">
                <div>
                <QInput
                    label="Pseudonyme"
                    type="text"
                    className="w-full"
                    value={newUsername}
                    placeholder={currentUsername || ""}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                </div>

                <div>
                <QInput
                    label="Email"
                    type="email"
                    className="w-full"
                    value={user?.email || ""}
                    disabled={true}
                />
                </div>

                <div>
                <QInput
                    label="Mot de passe"
                    type="password"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="entrez votre mot de passe"
                />
                </div>

                <div className="flex justify-center pt-4">
                <QButton
                    className="btn-primary flex items-center gap-2 px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={!newUsername}
                    onClick={handleChange}
                    text={isSaving ? "Enregistrement..." : "Enregistrer"}
                    icon={<Save size={18} />}
                    variant="primary"
                />
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Settings;