import CreateQuestion from "@/components/CreateQuiz/CreateQuestion";
import QButton from "@/components/Utilities/QButton";
import { Info } from "lucide-react";

interface QuestionsProps {
    questionIndices: number[];
    setQuestionIndices: (indices: number[]) => void;
    content: Quiz['content'];
    setContent: (content: Quiz['content']) => void;
    setCreerQuiz: (creerQuiz: boolean) => void;
    level: number;
}

const Questions: React.FC<QuestionsProps> = ({ questionIndices, setQuestionIndices, content, setContent, setCreerQuiz, level }) => {
    const addQuestions = () => {
        const newId = Date.now();
        setQuestionIndices([...questionIndices, newId]);
    }

    const removeQuestion = (id: number) => {
        setQuestionIndices(questionIndices.filter((questionId) => questionId !== id));
    };

    const isDisabled =
        Object.values(content).some(q =>
            !q.question ||
            !q.answers ||
            q.answers.some(answer => !answer) ||
            !Array.isArray(q.correctAnswers) ||
            q.correctAnswers.length === 0 ||
            (level === 3 && (q.points === null))
        );

    return (
        <div className="mt-5 flex items-center w-full flex-col">
            <h2 className="text-xl mb-4">Créez votre quiz.</h2>
            
            {questionIndices.map((id, index) => (
                <div className="p-2 w-full" key={`q-${id}`}>
                    <CreateQuestion questionNum={index + 1} removeQuestion={() => removeQuestion(id)} content={content} setContent={setContent} level={level} />
                </div>
            ))}

            <div className="flex items-center justify-center my-14 w-full">
                <div className="flex items-center w-full justify-evenly">
                    <QButton
                        className="w-[40rem]"
                        text="Ajouter une question"
                        icon={<i className="fa-solid fa-plus"></i>}
                        disabled={false}
                        iconPosition={'left'}
                        onClick={addQuestions}
                        variant="secondary"
                    />
                    <QButton
                        className="w-[40rem]"
                        text="Créer le quiz"
                        icon={<i className="fa-solid fa-plus"></i>}
                        disabled={isDisabled}
                        iconPosition={'left'}
                        onClick={() => setCreerQuiz(true)}
                        variant="primary"
                    />
                </div>
            </div>
        </div>
    )
};

export default Questions;