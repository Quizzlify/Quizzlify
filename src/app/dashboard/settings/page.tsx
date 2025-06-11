"use client"

import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";
import { div } from "framer-motion/client";
import { Save, UserPlus } from "lucide-react";
import { useState } from "react";

const Settings = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isSaving, setIsSaving] = useState(false);

    async function handleChange() {
        setIsSaving(true);

    }

    return (
        <>
        <h2 className="text-2xl font-bold text-foreground ml-5 mt-5">Paramètres utilisateur</h2>

        <div className="flex flex-row gap-[10rem] justify-center">
            <div className="bg-background-tertiary rounded-lg shadow-sm border border-border p-6 w-[30rem]">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>

                        {/* En-tête du profil avec avatar */}
                        <div className="flex items-center gap-4 mb-8 bg-background-tertiary">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                            <img 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover"
                            />
                            </div>
                            <div>
                            <h3 className="text-2xl font-bold text-gray-900">axeno</h3>
                            <span className="text-sm text-blue-600 font-medium">admin</span>
                            </div>
                        </div>

                        {/* Formulaire */}
                        <div className="space-y-6">
                            {/* Pseudo */}
                            <div>
                            <QInput
                                label="Pseudo"
                                type="text"
                                className="w-full"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            </div>

                            {/* Email */}
                            <div>
                            <QInput
                                label="Email"
                                type="email"
                                className="w-full"
                                value={"azdazd"}
                                disabled={true}
                            />
                            </div>

                            {/* Mot de passe */}
                            <div>
                            <QInput
                                label="Change password"
                                type="password"
                                className="w-full"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="My secret password"
                            />
                            </div>

                            {/* Bouton de sauvegarde */}
                            <div className="flex justify-center pt-4">
                            <QButton
                                className="btn-primary flex items-center gap-2 px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={!newUsername}
                                onClick={handleChange}
                                text={isSaving ? "Saving..." : "Save Changes"}
                                icon={<Save size={18} />}
                                variant="primary"
                            />
                            </div>
                        </div>
            </div>

            <div className="bg-background-tertiary rounded-lg shadow-sm border border-border p-6 w-[30rem]">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>

                        {/* En-tête du profil avec avatar */}
                        <div className="flex items-center gap-4 mb-8 bg-background-tertiary">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                            <img 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover"
                            />
                            </div>
                            <div>
                            <h3 className="text-2xl font-bold text-gray-900">axeno</h3>
                            <span className="text-sm text-blue-600 font-medium">admin</span>
                            </div>
                        </div>

                        {/* Formulaire */}
                        <div className="space-y-6">
                            {/* Pseudo */}
                            <div>
                            <QInput
                                label="Pseudo"
                                type="text"
                                className="w-full"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            </div>

                            {/* Email */}
                            <div>
                            <QInput
                                label="Email"
                                type="email"
                                className="w-full"
                                value={"azdazd"}
                                disabled={true}
                            />
                            </div>

                            {/* Mot de passe */}
                            <div>
                            <QInput
                                label="Change password"
                                type="password"
                                className="w-full"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="My secret password"
                            />
                            </div>

                            {/* Bouton de sauvegarde */}
                            <div className="flex justify-center pt-4">
                            <QButton
                                className="btn-primary flex items-center gap-2 px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={!newUsername}
                                onClick={handleChange}
                                text={isSaving ? "Saving..." : "Save Changes"}
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