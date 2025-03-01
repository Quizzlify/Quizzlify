import Cards from "@/components/Quiz/Cards";

interface CategoryProps {
    setCategory: (category: string) => void;
    nextStep: (step: string) => void;
}

const Categories: React.FC<CategoryProps> = ({ nextStep, setCategory }) => (
    <div className="mt-5 w-full max-w-2xl flex items-center flex-col">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez créer le quiz.</h2>
        <Cards isNiveau={false} nextStep={nextStep} isCreateQuiz={true} setCategory={setCategory} setLevel={() => {}} />
    </div>
);

export default Categories;