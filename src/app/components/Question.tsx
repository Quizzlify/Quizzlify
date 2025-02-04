interface QuestionProps {
    answers: string[];
    incrementQuestionIndex: () => void;
}

const Question: React.FC<QuestionProps> = ({answers, incrementQuestionIndex}) => {

    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 mt-5">
            <div onClick={incrementQuestionIndex} className="bg-[#FD6161] w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md hover:bg-[#D84747] transition-all"><strong>A.&nbsp;</strong>{answers[0]}
</div>
            <div onClick={incrementQuestionIndex} className="bg-accent w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md hover:bg-[#E3855C] transition-all"><strong>B.&nbsp;</strong>{answers[1]}
</div>
            <div onClick={incrementQuestionIndex} className="bg-[#AD61FD] w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md hover:bg-[#8F52D0] transition-all"><strong>C.&nbsp;</strong>{answers[2]}
</div>
            <div onClick={incrementQuestionIndex} className="bg-[#6169FD] w-[423px] h-[79px] text-white p-6 flex items-center justify-center rounded-lg shadow-md hover:bg-[#545AD1] transition-all"><strong>D.&nbsp;</strong>{answers[3]}
</div>
        </div>
    )
}

export default Question