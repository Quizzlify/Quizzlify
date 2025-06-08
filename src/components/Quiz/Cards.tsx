import { ArrowRight, Dice1, Dice2, Dice3, Dice5, FlaskConical, Gamepad, InfoIcon, Landmark, MedalIcon, Music } from "lucide-react";
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
        icon: <MedalIcon className="text-4xl" />
    },
    {
        title: "Histoire",
        icon: <Landmark className="text-4xl" />
    },
    {
        title: "Musique",
        icon: <Music className="text-4xl" />
    },
    {
        title: "Jeux vidéo",
        icon: <Gamepad className="text-4xl" />
    },
    {
        title: "Science",
        icon: <FlaskConical className="text-4xl" />
    },
    {
        title: "Autre",
        icon: <Dice5 className="text-4xl" />
    }
];

const Cards: React.FC<CardsProps> = ({ isNiveau, nextStep, setCategory, setLevel, isCreateQuiz }) => {
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
                                onClick={() => {
                                    isCreateQuiz ? nextStep('Détails') : nextStep('Questions');
                                    setLevel(level);
                                }}
                            >
                                <div className="flex w-full h-full relative">
                                    {level >= 3 && (
                                        <div className="absolute -top-2 -right-2">
                                            <button
                                                className="text-lg text-[#424149] hover:text-accent transition-color duration-100"
                                                onMouseEnter={() => setIsHovering(true)}
                                                onMouseLeave={() => setIsHovering(false)}
                                                aria-label="Information Niveau 3"
                                            >
                                                <InfoIcon className="text-2xl" />
                                                {isHovering && (
                                                    <div className="absolute -top-3/4 left-8 mt-2 p-4 w-64 bg-background border-border border-1 rounded shadow-lg z-10">
                                                        <div className="relative">
                                                            <h3 className="font-semibold text-foreground mb-2">Information Niveau 3</h3>
                                                            <p className="text-sm leading-relaxed text-white">
                                                                Ce niveau contient des questions plus complexes.
                                                                Il permet de rentrer dans le classement général du site.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center text-accent">
                                    {level === 1 && <Dice1 className="text-4xl" />}
                                    {level === 2 && <Dice2 className="text-4xl" />}
                                    {level === 3 && <Dice3 className="text-4xl" />}
                                </div>

                                <div className="flex flex-row relative items-center justify-center w-full text-xl">
                                    <div>Niveau {level}</div>
                                    <ArrowRight size={16} className="absolute right-10 opacity-0 group-hover:opacity-100 group-hover:right-[-5px] transition-all duration-300 text-accent" />
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
                                nextStep('Niveau')
                                setCategory(categorie.title)
                            }}
                        >
                            <div className="flex items-center justify-center text-accent">
                                {categorie.icon}
                            </div>

                            <div className="flex flex-row relative items-center justify-center w-full text-xl">
                                <div>{categorie.title}</div>
                                <ArrowRight size={16} className="absolute right-10 opacity-0 group-hover:opacity-100 group-hover:right-[-5px] transition-all duration-300 text-accent" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cards;