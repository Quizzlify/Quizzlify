interface QuestionProps {
    answers: string[];
    onAnswerSelect: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({answers, onAnswerSelect}) => {

    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 mt-5">
            {answers.map((answer, index) => (
                <div
                    key={index}
                    onClick={() => onAnswerSelect(index)}
                    className={`${index === 0 ? 'bg-[#FD6161] hover:bg-[#D84747]' : index === 1 ? 'bg-accent hover:bg-[#E3855C]' : index === 2 ? 'bg-[#AD61FD] hover:bg-[#8F52D0]' : index === 3 ? 'bg-[#6169FD] hover:bg-[#545AD1]' : ''}
                        w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md transition-all`}
                >
                    <strong>{index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : index === 3 ? 'D' : ''}. </strong>{answer}
                </div>
            ))}
        </div>
    )
}

export default Question