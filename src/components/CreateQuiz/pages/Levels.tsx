import Cards from "@/components/Quiz/Cards";

interface LevelsProps {
    setLevel: (niveau: number) => void;
    nextStep: (step: string) => void;
}

const Levels: React.FC<LevelsProps> = ({ nextStep, setLevel }) => {
    return (
        <div className="w-full max-w-4xl mx-auto animate-slide-up">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                <span className="text-gradient">Choisissez</span> un niveau pour votre quiz
            </h2>
            <div className="bg-background-tertiary p-6 rounded-2xl border border-border">
                <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={true} setCategory={() => { }} setLevel={setLevel} />
            </div>
        </div>
    );
};

export default Levels;