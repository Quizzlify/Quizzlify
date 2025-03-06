type CardProps = {
    title: string,
    description: string,
    position: 'left' | 'right',
    image: string
}

const HomeCard: React.FC<CardProps> = ({ title, description, position, image }) => {
    return (
        <div className="flex flex-row justify-center items-center">
            {position === 'right' ? (
                <>
                    <div className="flex flex-col mr-10">
                        <h2 className="font-bold text-3xl underline">{title}</h2>
                        <p className="text-2xl max-w-[28rem]">{description}</p>
                    </div>
                    <img className="w-[740px] h-[380px] rounded-xl object-cover object-left border-3 border-accent shadow-[0_0_10px_5px_rgba(0,0,0,0.5)]" src={image} />
                </>
            ) : (
                <>
                    <img className="w-[740px] h-[380px] rounded-xl object-cover mr-10 object-right border-3 border-accent shadow-[0_0_10px_5px_rgba(0,0,0,0.5)]" src={image} alt={title} />
                    <div className="flex flex-col">
                        <h2 className="font-bold text-3xl underline">{title}</h2>
                        <p className="text-2xl max-w-[28rem]">{description}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomeCard;
