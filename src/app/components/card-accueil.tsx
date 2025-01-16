type CardProps = {
    title: string,
    description: string,
    right: boolean
}

const CardAccueil: React.FC<CardProps> = ({ title, description, right }) => {
    return (
        <div className="flex flex-row justify-center items-center">
            {right ? (
                <>
                    <div className="flex flex-col mr-10">
                        <h2 className="font-bold text-3xl underline">{title}</h2>
                        <p className="text-2xl max-w-[28rem]">{description}</p>
                    </div>
                    <div className="w-[730px] h-[400px] bg-[#D9D9D9] rounded-xl"></div>
                </>
            ) : (
                <>
                    <div className="w-[730px] h-[400px] bg-[#D9D9D9] rounded-xl mr-10"></div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-3xl underline">{title}</h2>
                        <p className="text-2xl max-w-[28rem]">{description}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default CardAccueil;
