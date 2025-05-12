import { ReactElement, useState } from "react";

interface CardsProps {
    isNiveau?: boolean;
    nextStep: (step: string) => void;
    isCreateQuiz?: boolean;
    setCategory: (category: string) => void;
    setLevel: (niveau: number) => void;
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

const Cards: React.FC<CardsProps> = ({ isNiveau, nextStep, isCreateQuiz, setCategory, setLevel }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div>
            {isNiveau ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(maxLevel)].map((_, index) => {
                        const level = index + 1;
                        return (
                            <div
                                className="bg-background p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 flex flex-col justify-center items-center gap-5 group cursor-pointer hover:shadow-lg"
                                key={level}
                                onClick={() => isCreateQuiz ? (nextStep('Catégorie'), setLevel(level)) : (nextStep('Détails'), setLevel(level))}
                            >
                                {level >= 3 && (
                                    <button
                                        className="absolute top-3 right-4 text-lg text-foreground-secondary hover:text-accent"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                        aria-label={`Information Niveau ${level}`}
                                    >
                                        <i className="fa-solid fa-info-circle"></i>

                                        {isHovering && (
                                            <div className="absolute top-1/2 right-[-16.5rem] transform -translate-y-1/2 w-64 p-4 bg-background rounded-lg shadow-lg text-sm text-foreground-secondary z-50 border border-border">
                                                <div className="absolute top-1/2 left-[-0.5rem] transform -translate-y-1/2 w-4 h-4 bg-background rotate-[315deg] border-t border-l border-border" />
                                                <div className="relative">
                                                    <h3 className="font-semibold text-base mb-2 text-foreground">Information Niveau {level}</h3>
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

                                <div className="flex items-center justify-center text-accent">
                                    <i className={`fa-solid fa-${level} text-4xl`}></i>
                                </div>

                                <div className="flex flex-row relative items-center justify-center w-full text-xl">
                                    <div>Niveau {level}</div>
                                    <i className="fa-solid fa-arrow-right text-lg absolute right-10 opacity-0 group-hover:opacity-100 group-hover:right-[-5px] transition-all duration-300 text-accent"></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CategoriesList.map((categorie, index) => (
                        <div
                            className="bg-background p-6 rounded-xl border border-border hover:border-accent transition-all duration-300 flex flex-col justify-center items-center gap-5 group cursor-pointer hover:shadow-lg"
                            key={index}
                            onClick={() => {
                                isCreateQuiz ? nextStep('Questions') : nextStep('Niveau')
                                setCategory(categorie.title)
                            }}
                        >
                            <div className="flex items-center justify-center text-accent">
                                {categorie.icon}
                            </div>

                            <div className="flex flex-row relative items-center justify-center w-full text-xl">
                                <div>{categorie.title}</div>
                                <i className="fa-solid fa-arrow-right text-lg absolute right-10 opacity-0 group-hover:opacity-100 group-hover:right-[-5px] transition-all duration-300 text-accent"></i>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cards;