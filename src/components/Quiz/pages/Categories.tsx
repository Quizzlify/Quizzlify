import Cards from "@/components/Quiz/Cards";

interface CategorieProps {
    setCategory: (category: string) => void;
    nextStep: (step: string) => void;
}

const Categories: React.FC<CategorieProps> = ({ nextStep, setCategory }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez jouer.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={false} setCategory={setCategory} setLevel={() => {}} />
    </div>
);

export default Categories;