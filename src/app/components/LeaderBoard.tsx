
interface CardsProps {
    list: { name: string; score: number; }[];
}

const LeaderBoard: React.FC<CardsProps> = ({ list }) => {

    return (
        <div>
            {list.map((item: any, index: number) => {
                return (
                    <button
                        className="w-[calc(100%-8rem)]
                                    h-[90px]
                                    bg-[#ffffff]
                                    rounded-2xl
                                    flex
                                    flex-col
                                    justify-center
                                    items-center
                                    gap-5
                                    text-2xl
                                    group
                                    transition"
                        key={index}
                    >
                        {item.name}
                        <span>{item.score}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default LeaderBoard;