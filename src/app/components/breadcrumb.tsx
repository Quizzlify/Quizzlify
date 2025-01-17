"use client"

import { ReactElement } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface BreadCrumbInterface {
    title: string;
    icon: ReactElement;
}

interface BreadcrumbProps {
    isCreateQuiz?: boolean;
    activeItem: string;
    onItemChange: (item: string) => void;
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

const Breadcrumb: React.FC<BreadcrumbProps> = ({
                                                   isCreateQuiz = false,
                                                   activeItem,
                                                   onItemChange
                                               }) => {
    const displayedItems = isCreateQuiz
        ? BreadcrumbList.slice(0, 4) : BreadcrumbList;

    return (
        <div className="flex flex-row items-center gap-4">
            {displayedItems.map((item, index) => (
                <div key={item.title} className="flex flex-row items-center">
                    <div
                        className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer
                            ${activeItem === item.title ? "bg-accent" : ""}`}
                        onClick={() => onItemChange(item.title)}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {index !== displayedItems.length - 1 && (
                        <i className="fa-solid fa-caret-right ml-4"></i>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumb;