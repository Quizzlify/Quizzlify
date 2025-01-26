import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";

interface QuestionProps {
    questionNum: number;
    removeQuestion: (num: number) => void;
}

const CreateQuestion: React.FC<QuestionProps> = ({ questionNum, removeQuestion }) => {
    return (
        <div className="bg-secondary w-[1400px] pb-3 rounded-xl border-2 border-orange-600 relative">
            <div className="flex flex-row items-center ml-5 mt-5 gap-3">
                <h2 className="text-2xl">Question {questionNum}</h2>
                <Input label="Question*" type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" />
                <Input label="Nombre de points*" type="input" variant="bordered" size={"sm"} className="max-w-[10rem] [&>div]:!border-neutral-500 absolute right-5" />
            </div>

            <div className="flex flex-col gap-3 ml-20 mt-5">
                <div className="flex flex-row gap-5">
                    <Input label="Réponse A*" type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse B*" type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse C*" type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse D*" type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>
            </div>

            {questionNum > 1 && (
                <button onClick={() => removeQuestion(questionNum)}
                    className="absolute bottom-3 right-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Supprimer la question
                </button>
            )}
        </div>
    )
}

export default CreateQuestion;