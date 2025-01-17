import {ReactElement} from "react";

interface CardsProps {
    isNiveau?: boolean;
    nextStep: (step: string) => void;
}

interface Interface {
    title: string;
    icon: ReactElement;
}

const NiveauList: Interface[] = [
    {
        title: "Niveau 1",
        icon: <i className="fa-solid fa-1 text-4xl"></i>
    },
    {
        title: "Niveau 2",
        icon: <i className="fa-solid fa-2 text-4xl"></i>
    },
    {
        title: "Niveau 3",
        icon: <i className="fa-solid fa-3 text-4xl"></i>
    }
];

const CategoriesList: Interface[] = [
    {
        title: "Sports",
        icon: <i className="fa-solid fa-medal text-4xl"></i>
    },
    {
        title: "Histoire",
        icon: <i className="fa-solid fa-landmark text-4xl"></i>
    },
    {
        title: "Musique",
        icon: <i className="fa-solid fa-music text-4xl"></i>
    },
    {
        title: "Jeux vidéo",
        icon: <i className="fa-solid fa-gamepad text-4xl"></i>
    },
    {
        title: "Science",
        icon: <i className="fa-solid fa-flask-vial text-4xl"></i>
    },
    {
        title: "Autre",
        icon: <i className="fa-solid fa-dice-five text-4xl"></i>
    }
];

const Cards: React.FC<CardsProps> = ({ isNiveau, nextStep }) => {
    return (
        <div>
            {isNiveau ? (
                <div className="flex flex-row gap-4">
                    {NiveauList.map((niveau, index) => (
                        <button
                            className="w-[350px] h-[200px] bg-white rounded-2xl flex flex-col justify-center items-center gap-5 text-2xl group hover:text-accent transition"
                            key={index}
                            onClick={() => nextStep('Détails')}
                        >
                            <div className="flex items-center justify-center">{niveau.icon}</div>

                            <div className="flex flex-row relative items-center justify-center w-full">
                                <div>{niveau.title}</div>
                                <i className="fa-solid fa-arrow-right text-lg absolute right-[3rem] transition-all group-hover:right-[2rem]"></i>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-rows-2 grid-cols-3 gap-5 w-[70rem] h-auto">
                    {CategoriesList.map((categorie, index) => (
                        <button
                            className="w-[350px] h-[200px] bg-white rounded-2xl flex flex-col justify-center items-center gap-5 text-2xl group hover:text-accent transition"
                            key={index}
                            onClick={() => nextStep('Niveau')}
                        >
                            <div className="flex items-center justify-center">{categorie.icon}</div>

                            <div className="flex flex-row relative items-center justify-center w-full">
                                <div>{categorie.title}</div>
                                <i className="fa-solid fa-arrow-right text-lg absolute right-[3rem] transition-all group-hover:right-[2rem]"></i>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Cards;