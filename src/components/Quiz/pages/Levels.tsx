import Cards from "@/components/Quiz/Cards";

interface LevelsProps {
    setLevel: (niveau: number) => void;
    nextStep: (step: string) => void;
}

const Levels: React.FC<LevelsProps> = ({ nextStep, setLevel }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={true} nextStep={nextStep} isCreateQuiz={false} setCategory={() => {}} setLevel={setLevel} />
    </div>
);

export default Levels;