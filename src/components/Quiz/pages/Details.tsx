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
        <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
            <Switch color={'warning'} checked={isSwitchOn}onChange={() => setIsSwitchOn(!isSwitchOn)}>Jouer à un quiz généré par IA?</Switch>
            {isSwitchOn && (
                <div className="flex flex-row gap-5">
                    <Input label="Plus de détails sur le quiz ?" type="input" variant="bordered" size={"sm"} className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" />
                    <Input label="Nombre de questions" isInvalid={false} type="input" variant="bordered" size={"sm"} defaultValue="1" className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" isRequired />
                </div>
            )}
            
            <QButton
                className="w-[300px]"
                text="Commencer le quiz"
                icon={<i className="fa-solid fa-play"></i>}
                disabled={false}
                iconPosition={'left'}
                onClick={() => nextStep('Questions')}
            />
        </div>
    );
};

export default Details;