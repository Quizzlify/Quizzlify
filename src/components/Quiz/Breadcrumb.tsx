import React from "react";

interface BreadcrumbProps {
    isCreateQuiz: boolean;
    activeStep: string;
    onStepChange: (step: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ isCreateQuiz, activeStep, onStepChange }) => {
    const steps = isCreateQuiz ? ["Catégorie", "Niveau", "Détails", "Questions"] : ["Catégorie", "Niveau", "Détails", "Questions", "Résultats"];

    const getStepStatus = (step: string) => {
        const current = steps.indexOf(activeStep);
        const active = steps.indexOf(step);
        return {
            isActive: active === current,
            isCompleted: active < current,
            isUpcoming: active > current,
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto mb-6 px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                {steps.map((step, index) => {
                    const { isActive, isCompleted } = getStepStatus(step);

                    return (
                        <React.Fragment key={step}>
                            <div
                                className={`flex items-center gap-2 transition-all duration-200 ${isCompleted ? "cursor-pointer group" : "cursor-default"
                                    }`}
                                onClick={() => {
                                    if (isCompleted && !(activeStep === "Résultats"))
                                        onStepChange(step);
                                }}
                            >
                                <div
                                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200
                                    ${isActive
                                            ? "bg-accent text-white"
                                            : isCompleted
                                                ? "bg-accent-secondary text-accent border border-accent group-hover:brightness-110"
                                                : "bg-background text-foreground-secondary border border-border"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <span
                                    className={`hidden md:block text-sm transition-colors duration-200 ${isActive
                                            ? "text-accent font-semibold"
                                            : isCompleted
                                                ? "text-accent"
                                                : "text-foreground-secondary"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`hidden md:block h-[2px] w-8 transition-colors duration-200 ${index < steps.indexOf(activeStep) ? "bg-accent" : "bg-border"
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Breadcrumb;