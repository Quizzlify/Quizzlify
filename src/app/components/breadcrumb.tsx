"use client"

import { ReactElement, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface BreadCrumbInterface {
    title: string;
    icon: ReactElement;
}

interface BreadcrumbProps {
    isCreateQuiz?: boolean;
}

const BreadcrumbList: BreadCrumbInterface[] = [
    {
        title: "Détails",
        icon: <i className="fa-solid fa-layer-group"></i>
    },
    {
        title: "Niveau",
        icon: <i className="fa-solid fa-baby-carriage"></i>
    },
    {
        title: "Catégories",
        icon: <i className="fa-solid fa-circle-info"></i>
    },
    {
        title: "Questions",
        icon: <i className="fa-solid fa-circle-question"></i>
    },
    {
        title: "Résultats",
        icon: <i className="fa-solid fa-square-poll-horizontal"></i>
    }
];

const Breadcrumb: React.FC<BreadcrumbProps> = ({ isCreateQuiz = false }) => {
    const displayedItems = isCreateQuiz
        ? BreadcrumbList.slice(0, 4) // correspond à Détails, Niveau, Catégories et Questions
        : BreadcrumbList;

    const [activeItem, setActiveItem] = useState<string>("Détails");

    return (
        <div className="flex flex-row items-center gap-2">
            {displayedItems.map((item) => (
                <div
                    className={`p-2 rounded-lg flex gap-2 items-center ${activeItem === item.title ? "bg-accent" : ""}`}
                    onClick={() => setActiveItem(item.title)}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
};

export default Breadcrumb;