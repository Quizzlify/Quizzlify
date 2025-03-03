import { X, Check } from "lucide-react";

interface QuestionProps {
    answers: string[];
    correctAnswer: number;
    selectedAnswer: number | null;
    showAnswer: boolean;
    onAnswerSelect: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({ answers, correctAnswer, selectedAnswer, showAnswer, onAnswerSelect }) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
            {answers.map((answer, index) => {
                const isSelected = index === selectedAnswer;
                const isCorrect = index === correctAnswer;
                const baseClass = index === 0 ? 'bg-[#FD6161]' : index === 1 ? 'bg-accent' : index === 2 ? 'bg-[#AD61FD]' : index === 3 ? 'bg-[#6169FD]' : '';
                const opacityClass = showAnswer && !isSelected && !isCorrect ? 'opacity-70' : 'opacity-100';

                return (
                    <div
                        key={index}
                        onClick={() => !showAnswer && onAnswerSelect(index)}
                        className={`
                            ${baseClass}
                            ${opacityClass}
                            w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md transition-all
                        `}
                    >
                        {isCorrect && showAnswer ? <Check color="green" /> : isSelected ? <X color="red" /> : null}
                        <strong>{index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : index === 3 ? 'D' : ''}. </strong>{answer}
                    </div>
                );
            })}
        </div>
    );
}

export default Question;