import { X, Check } from "lucide-react";

interface QuestionProps {
    answers: string[];
    correctAnswers: number[];
    selectedAnswer: number | null;
    showAnswer: boolean;
    onAnswerSelect: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({
    answers,
    correctAnswers,
    selectedAnswer,
    showAnswer,
    onAnswerSelect
}) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {answers.map((answer, index) => {
                const isSelected = index === selectedAnswer;
                const isCorrect = correctAnswers.includes(index);

                const stateClasses = showAnswer
                    ? (isCorrect
                        ? "bg-green-500/20 border-green-500 text-green-500"
                        : (isSelected
                            ? "bg-red-500/20 border-red-500 text-red-500 opacity-80"
                            : "opacity-50 border-border"))
                    : (isSelected
                        ? "bg-accent/20 border-accent"
                        : "bg-background-secondary border-border hover:border-accent cursor-pointer");

                return (
                    <div
                        key={index}
                        onClick={() => !showAnswer && onAnswerSelect(index)}
                        className={`relative w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 text-foreground ${stateClasses}`}
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-background-tertiary text-foreground-secondary font-bold">
                            {String.fromCharCode(65 + index)}
                        </div>

                        <span className="flex-grow text-left">{answer}</span>

                        {showAnswer && (
                            <div className="absolute right-4">
                                {isCorrect ? (
                                    <Check className="text-green-500" size={24} />
                                ) : (isSelected && !isCorrect) ? (
                                    <X className="text-red-500" size={24} />
                                ) : null}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Question;