import {Input} from "@heroui/input";
import {Switch} from "@heroui/switch";

interface QuestionProps {
    questionNum: number;
}

const CreateQuestion: React.FC<QuestionProps> = ({questionNum}) => {
    return(
        <div className="bg-secondary w-[1200px] h-[350px] rounded-xl border-2 border-orange-600">
            <div className="flex flex-row items-center ml-5 mt-5 gap-3 relative">
                <h2 className="text-2xl">Question {questionNum}</h2>
                <Input label="Question*" type="input" variant="bordered" size={"sm"} className="max-w-xs [&>div]:!border-neutral-500" />
                <Input label="Nombre de points*" type="input" variant="bordered" size={"sm"} className="max-w-[10rem] [&>div]:!border-neutral-500 absolute right-5" />
            </div>

            <div className="flex flex-col gap-3 ml-20 mt-5">
                <div className="flex flex-row gap-5">
                    <Input label="Réponse A*" type="input" variant="bordered" size={"sm"} className="max-w-xs [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse B*" type="input" variant="bordered" size={"sm"}className="max-w-xs [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse C*" type="input" variant="bordered" size={"sm"} className="max-w-xs [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse D*" type="input" variant="bordered" size={"sm"} className="max-w-xs [&>div]:!border-neutral-500" />
                    <Switch color={'warning'}>Réponse vraie</Switch>
                </div>
            </div>
        </div>
    )
}

export default CreateQuestion;