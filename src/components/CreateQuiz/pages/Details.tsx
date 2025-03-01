import { Input } from "@heroui/input";
import QButton from "@/components/Utilities/QButton";

interface DetailsProps {
    setTitle: (title: string) => void;
    nextStep: (step: string) => void;
}


const Details: React.FC<DetailsProps> = ({ nextStep, setTitle }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col gap-10">
        <h2 className="text-xl mb-4">Quelques détails à propos du quiz que vous voulez créer.</h2>
        <div className="flex flex-row gap-5 w-full justify-center">
            <Input label="Nom du quiz" onChange={(e) => setTitle(e.target.value)} isInvalid={false} type="input" variant="bordered" size={"sm"} className="max-w-[15rem] [&>div]:!border-neutral-500 h-[3rem]" isRequired />
        </div>

        <QButton
            className="w-[300px]"
            text="Continuer"
            icon={<i className="fa-solid fa-arrow-right"></i>}
            disabled={false}
            iconPosition={'left'}
            onClick={() => nextStep('Niveau')}
        />
    </div>
);

export default Details;