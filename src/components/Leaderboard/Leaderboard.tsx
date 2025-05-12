
interface CardsProps {
    list: { username: string; score: number; }[];
}

const LeaderBoard: React.FC<CardsProps> = ({ list }) => {
    const sortedList = [...list].sort((a, b) => b.score - a.score);

    const getRankColor = (index: number) => {
        switch (index) {
            case 0: return 'bg-amber-500';
            case 1: return 'bg-gray-400';
            case 2: return 'bg-orange-600';
            default: return 'bg-[#2a2a2a]';
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {sortedList.map((item: { username: string; score: number; you?: boolean; }, index: number) => {
                return (
                    <div
                        key={index}
                        className={`card w-[calc(100%-8rem)] flex justify-between items-center h-[80px] transition-all duration-300
                                ${item.you ? 'bg-accent-secondary border-accent' : 'glass-effect bg-card-bg border-border'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-white font-bold text-xl ${getRankColor(index)}`}>
                                #{index + 1}
                            </div>
                            <div className={`text-lg ${item.you ? 'text-accent font-bold' : 'text-foreground'}`}>
                                {item.you ? 'Toi' : item.username}
                            </div>
                        </div>
                        <div className="text-gradient font-semibold italic text-xl">
                            {item.score}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LeaderBoard;