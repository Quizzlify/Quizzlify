import React, { useState } from "react";
import QButton from "@/components/Utilities/QButton";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";

interface DetailsProps {
    nextStep: (step: string) => void;
}

const Details: React.FC<DetailsProps> = ({ nextStep }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto animate-slide-up">
            <h2 className="text-2xl font-bold mb-8 text-center">
                <span className="text-gradient">Personnalisez</span> votre expérience
            </h2>
            
            <div className="bg-background-tertiary p-8 rounded-2xl border border-border flex flex-col items-center gap-8">
                <div className="w-full flex justify-center">
                    <Switch 
                        color="warning" 
                        checked={isSwitchOn} 
                        onChange={() => setIsSwitchOn(!isSwitchOn)}
                        className="text-foreground"
                    >
                        Jouer à un quiz généré par IA?
                    </Switch>
                </div>
                
                {isSwitchOn && (
                    <div className="flex flex-col md:flex-row gap-5 w-full max-w-md">
                        <Input 
                            label="Plus de détails sur le quiz ?" 
                            type="input" 
                            variant="bordered" 
                            size="sm" 
                            className="[&>div]:!border-accent bg-background-secondary text-foreground" 
                        />
                        <Input 
                            label="Nombre de questions" 
                            isInvalid={false} 
                            type="input" 
                            variant="bordered" 
                            size="sm" 
                            defaultValue="1" 
                            className="[&>div]:!border-accent bg-background-secondary text-foreground" 
                            isRequired 
                        />
                    </div>
                )}
                
                <QButton
                    className="btn-primary text-lg py-3 px-8 shadow-glow hover:scale-105 transform transition mt-4"
                    text="Commencer le quiz"
                    icon={<i className="fa-solid fa-play"></i>}
                    disabled={false}
                    iconPosition="left"
                    onClick={() => nextStep('Questions')}
                />
            </div>
        </div>
    );
};

export default Details;