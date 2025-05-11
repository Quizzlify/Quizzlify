import Cards from "@/components/Quiz/Cards";

interface CategorieProps {
    setCategory: (category: string) => void;
    nextStep: (step: string) => void;
}

const Categories: React.FC<CategorieProps> = ({ nextStep, setCategory }) => (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
        <h2 className="text-2xl font-bold mb-8 text-center">
            <span className="text-gradient">Choisissez</span> une catégorie
        </h2>
        <div className="bg-background-tertiary p-6 rounded-2xl border border-border">
            <Cards 
                isNiveau={false} 
                nextStep={nextStep} 
                isCreateQuiz={false} 
                setCategory={setCategory} 
                setLevel={() => {}} 
            />
        </div>
    </div>
);

export default Categories;