import Cards from "@/components/Quiz/Cards";

interface LevelProps {
    setLevel: (niveau: number) => void;
    nextStep: (step: string) => void;
}

const Level: React.FC<LevelProps> = ({ nextStep, setLevel }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={true} setCategory={() => {}} setLevel={setLevel} />
    </div>
);

export default Level;