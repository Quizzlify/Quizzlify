import React from "react";

interface BreadcrumbProps {
    isCreateQuiz: boolean;
    activeStep: string;
    onStepChange: (step: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ isCreateQuiz, activeStep, onStepChange }) => {
    const steps = ["Catégorie", "Niveau", "Détails", "Questions", "Résultats"];
    
    const isClickable = (step: string) => {
        const stepIndex = steps.indexOf(step);
        const activeIndex = steps.indexOf(activeStep);
        return stepIndex < activeIndex;
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-6">
            <div className="flex flex-wrap justify-center items-center">
                {steps.map((step, index) => {
                    const isActive = step === activeStep;
                    const isPreviousActive = isClickable(step);
                    
                    return (
                        <div key={step}>
                            <div 
                                className={`flex items-center ${isPreviousActive ? 'cursor-pointer' : 'cursor-default'}`}
                                onClick={() => isPreviousActive ? onStepChange(step) : null}
                            >
                                <div 
                                    className={`flex items-center justify-center w-10 h-10 rounded-full font-medium text-sm
                                    ${isActive ? 'bg-accent text-white' : 
                                      isPreviousActive ? 'bg-accent-secondary text-accent border border-accent' : 
                                      'bg-background text-foreground-secondary border border-border'}`}
                                >
                                    {index + 1}
                                </div>
                                <span 
                                    className={`mx-2 hidden md:block 
                                    ${isActive ? 'text-accent font-medium' : 
                                      isPreviousActive ? 'text-accent' : 
                                      'text-foreground-secondary'}`}
                                >
                                    {step}
                                </span>
                            </div>
                            
                            {index < steps.length - 1 && (
                                <div 
                                    className={`w-8 h-[2px] mx-1 hidden md:block
                                    ${index < steps.indexOf(activeStep) ? 'bg-accent' : 'bg-border'}`}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Breadcrumb;