import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { useEffect } from "react";

interface CreateQuestionProps {
    questionNum: number;
    removeQuestion: (num: number) => void;
    content: Quiz['content'];
    setContent: (content: Quiz['content']) => void;
    level: number;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ questionNum, removeQuestion, content, setContent, level }) => {
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
      if (field === 'points') {
          // Convert points to number
          setContent({
            ...content,
            [questionNum]: {
              ...content[questionNum],
              [field]: Number(e.target.value)
            }
          });
        } else if (field !== 'answers') {
          // Handle regular fields
          setContent({
            ...content,
            [questionNum]: {
              ...content[questionNum],
              [field]: e.target.value
            }
          });
        }
    }

    function handleAnswerChange(e: React.ChangeEvent<HTMLInputElement>, answerIndex: number) {
        const newAnswers = [...(content[questionNum]?.answers || [])];
        newAnswers[answerIndex] = e.target.value;
        
        setContent({
          ...content,
          [questionNum]: {
            ...content[questionNum],
            answers: newAnswers
          }
        });
    }

    function handleCorrectAnswerChange(answerIndex: number, isSelected: boolean) {
        if (isSelected) {
          setContent({
            ...content,
            [questionNum]: {
              ...content[questionNum],
              correctAnswer: answerIndex
            }
          });
        }
    }

    useEffect(() => {
      if (level !== 3) {
        setContent({
          ...content,
          [questionNum]: {
            points: null
          }
        })
      }
    }, [])


    return (
        <div className="bg-secondary w-[1400px] pb-3 rounded-xl border-2 border-orange-600 relative">
            <div className="flex flex-row items-center ml-5 mt-5 gap-3">
                <h2 className="text-2xl">Question {questionNum}</h2>
                <Input label="Question" onChange={(e) => handleInputChange(e, 'question')} type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" isRequired />
                {level === 3 && (
                  <Input label="Nombre de points" onChange={(e) => handleInputChange(e, 'points')} type="input" variant="bordered" size={"sm"} className="max-w-[10rem] [&>div]:!border-neutral-500 absolute right-5" isRequired />
                )}
            </div>

            <div className="flex flex-col gap-3 ml-20 mt-5">
                <div className="flex flex-row gap-5">
                    <Input label="Réponse A" onChange={(e) => handleAnswerChange(e, 0)} type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" isRequired />
                    <Switch color={'warning'} onValueChange={(isSelected) => handleCorrectAnswerChange(0, isSelected)} >Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse B" onChange={(e) => handleAnswerChange(e, 1)} type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" isRequired />
                    <Switch color={'warning'} onValueChange={(isSelected) => handleCorrectAnswerChange(1, isSelected)}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse C" onChange={(e) => handleAnswerChange(e, 2)} type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" isRequired/>
                    <Switch color={'warning'} onValueChange={(isSelected) => handleCorrectAnswerChange(2, isSelected)}>Réponse vraie</Switch>
                </div>

                <div className="flex flex-row gap-5">
                    <Input label="Réponse D" onChange={(e) => handleAnswerChange(e, 3)} type="input" variant="bordered" size={"sm"} className="max-w-[480px] [&>div]:!border-neutral-500" isRequired/>
                    <Switch color={'warning'} onValueChange={(isSelected) => handleCorrectAnswerChange(3, isSelected)}>Réponse vraie</Switch>
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