import { ReactElement, useState } from "react";

interface CardsProps {
    isNiveau?: boolean;
    nextStep: (step: string) => void;
    isCreateQuiz?: boolean;
}

interface Interface {
    title: string;
    icon: ReactElement;
}

const maxLevel = 3;

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

const Cards: React.FC<CardsProps> = ({ isNiveau, nextStep, isCreateQuiz }) => {

    const [isHovering, setIsHovering] = useState(false);

    return (
        <div>
            {isNiveau ? (
                <div className="grid grid-rows-2 grid-cols-3 gap-5 w-[70rem] h-auto">
                    {[...Array(maxLevel)].map((_, index) => {
                        const level = index + 1;
                        return (
                            <div
                                className="w-[350px] h-[200px] bg-[#ffffff99] hover:bg-white rounded-2xl flex flex-col justify-center items-center gap-5 text-2xl group hover:text-accent transition relative"
                                key={level}
                                onClick={() => isCreateQuiz ? nextStep('Catégorie') : nextStep('Détails')}
                            >
                                {level >= 3 && (
                                    <button
                                        className="absolute top-3 right-4 text-lg"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                        aria-label={`Information Niveau ${level}`}
                                    >
                                        <i className="fa-solid fa-info-circle"></i>

                                        {isHovering && (
                                            <div className="absolute top-1/2 right-[-16.5rem] transform -translate-y-1/2 w-64 p-4 bg-white rounded-lg shadow-lg text-sm text-gray-700 z-50 border border-gray-00">
                                                <div className="absolute top-1/2 left-[-0.5rem] transform -translate-y-1/2 w-4 h-4 bg-white rotate-[315deg] border-t border-l border-gray-300" />
                                                <div className="relative">
                                                    <h3 className="font-semibold text-base mb-2">Information Niveau {level}</h3>
                                                    <p className="leading-relaxed">
                                                        Ce niveau contient des questions plus complexes et demande une bonne
                                                        maîtrise du sujet.
                                                        Il permet de rentrer dans le classement général du site.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                )}

                                <div className="flex items-center justify-center"><i className={`fa-solid fa-${level} text-4xl`}></i></div>

                                <div className="flex flex-row relative items-center justify-center w-full">
                                    <div>Niveau {level}</div>
                                    <i className="fa-solid fa-arrow-right text-lg absolute right-[3rem] transition-all group-hover:right-[2rem] group-hover:text-accent"></i>
                                </div>
                            </div>
                        )
                    })}
                </div>

            ) : (

                <div className="grid grid-rows-2 grid-cols-3 gap-5 w-[70rem] h-auto">
                    {CategoriesList.map((categorie, index) => (
                        <button
                            className="w-[350px] h-[200px] bg-white rounded-2xl flex flex-col justify-center items-center gap-5 text-2xl group hover:text-accent transition"
                            key={index}
                            onClick={() => isCreateQuiz ? nextStep('Questions') : nextStep('Niveau')}
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