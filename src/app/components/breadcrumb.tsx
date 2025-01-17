"use client"

import '@fortawesome/fontawesome-free/css/all.min.css';
import { Fragment, ReactElement } from "react";

interface BreadCrumbInterface {
    title: string;
    icon: ReactElement;
}

interface BreadcrumbProps {
    isCreateQuiz?: boolean;
    activeStep: string;
    onStepChange: (step: string) => void;
}

export const BreadcrumbList: BreadCrumbInterface[] = [
    {
        title: "Catégorie",
        icon: <i className="fa-solid fa-layer-group fa-xl"></i>
    },
    {
        title: "Niveau",
        icon: <i className="fa-solid fa-baby-carriage fa-xl"></i>
    },
    {
        title: "Détails",
        icon: <i className="fa-solid fa-circle-info fa-xl"></i>
    },
    {
        title: "Questions",
        icon: <i className="fa-solid fa-circle-question fa-xl"></i>
    },
    {
        title: "Résultats",
        icon: <i className="fa-solid fa-square-poll-horizontal fa-xl"></i>
    }
];

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    isCreateQuiz = false,
    activeStep,
    onStepChange
}) => {
    const displayedItems = isCreateQuiz
        ? BreadcrumbList.slice(0, 4)
        : BreadcrumbList;

    const currentLevel = displayedItems.findIndex(
        (breadcrumb) => breadcrumb.title === activeStep
    ) + 1;

    const handleSetActiveStep = (step: string) => {
        onStepChange(step);
    }

    return (
        <div className="flex flex-row items-center gap-2 text-[#333333] font-semibold">
            {displayedItems.map((step, index) => {
                const isActive = activeStep === step.title;
                const isBeforeOrEqualCurrentLevel = index < currentLevel;

                return (
                    <Fragment key={step.title}>
                        <div className="flex flex-row items-center text-[20px] font-semibold">
                            <button
                                className={`px-[16px] py-[11px] rounded-xl flex gap-[16px] items-center ${
                                    isActive
                                        ? "bg-accent text-white"
                                        : isBeforeOrEqualCurrentLevel ? "text-accent" : ""
                                }`}
                                onClick={() => handleSetActiveStep(step.title)}
                                tabIndex={0}
                            >
                                {step.icon}
                                <span>{step.title}</span>
                            </button>
                            {index < displayedItems.length - 1 && (
                                <span className={`mx-2 ${index < currentLevel - 1 ? "text-accent" : ""}`}>
                                    <i className="fa-solid fa-caret-right fa-xs"></i>
                                </span>
                            )}
                        </div>
                    </Fragment>
                )
            })}
        </div>
    );
};

export default Breadcrumb;