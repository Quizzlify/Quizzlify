
interface CardsProps {
    list: { name: string; score: number; }[];
}

const LeaderBoard: React.FC<CardsProps> = ({ list }) => {

    const sortedList = [...list].sort((a, b) => b.score - a.score);

    return (
        <div className="w-full flex flex-col items-center">
            {sortedList.map((item: { name: string; score: number; you?: boolean; }, index: number) => {
                return (
                    <div
                        className={`w-[calc(100%-16rem)]
                                    flex
                                    my-2
                                    h-[80px]
                                    rounded-2xl
                                    justify-between
                                    text-2xl
                                    group
                                    transition
                                    drop-shadow-leaderboard
                                    items-center
                                    p-4
                                    ${item.you ? 'bg-[#FDD18D]' : 'bg-[#ffffff]'}
                                `}
                        key={index}
                    >
                        <span className="flex justify-start items-center gap-4 font-bold">
                            <div className="w-[60px] h-[60px] rounded-2xl bg-[#404040] flex  text-center text-white items-center justify-center">
                                #{index + 1}
                            </div>
                            {item?.you ? <span className="text-[#7B61FF] font-bold">Toi</span> : <span>{item.name}</span>}
                        </span>
                        <span className="flex justify-end text-[#7B61FF] font-medium italic">{item.score}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default LeaderBoard;