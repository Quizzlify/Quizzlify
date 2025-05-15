import React from "react";
import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";

interface DetailsProps {
    nextStep: (step: string) => void;
    setTitle: (title: string) => void;
}

const Details: React.FC<DetailsProps> = ({ nextStep, setTitle = () => { } }) => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-slide-up">
            <h2 className="text-2xl font-bold mb-8 text-center">
                <span className="text-gradient">Ajouter</span> des détails au quiz
            </h2>

            <div className="bg-background-tertiary p-8 rounded-2xl border border-border flex flex-col items-center gap-8">
                <QInput
                    label="Nom du quiz"
                    placeholder="Entrez le nom du quiz"
                    className="w-full"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <QButton
                    className="btn-primary text-lg py-3 px-8 shadow-glow hover:scale-105 transform transition mt-4"
                    text="Créer les questions"
                    icon={<i className="fa-solid fa-play"></i>}
                    disabled={false}
                    iconPosition="left"
                    onClick={() => nextStep('Questions')}
                    variant="primary"
                />
            </div>
        </div>
    );
};

export default Details;