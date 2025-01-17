"use client"

import { useState } from "react";
import Breadcrumb from "@/app/components/breadcrumb";
import NavBar from "@/app/components/NavBar";


const Details = () => (
    <div className="mt-5 w-full max-w-2xl flex justify-center">
        <h2 className="text-xl mb-4">Quelques détails à propos du quiz que vous voulez créer.</h2>
    </div>
);

const Level = () => (
    <div className="mt-5 w-full max-w-2xl flex justify-center">
        <h2 className="text-xl mb-4">Choisissez le niveau dans laquelle vous voulez jouer.</h2>
    </div>
);

const Categories = () => (
    <div className="mt-5 w-full max-w-2xl flex justify-center">
        <h2 className="text-xl mb-4">Choisissez la catégorie dans laquelle vous voulez créer le quiz.</h2>
    </div>
);

const Questions = () => (
    <div className="mt-5 w-full max-w-2xl flex justify-center">
        <h2 className="text-xl mb-4">Créez votre quiz.</h2>
    </div>
);

export default function Page() {
    const [activeItem, setActiveItem] = useState("Détails");

    const renderItemContent = () => {
        switch (activeItem) {
            case "Détails":
                return <Details />;
            case "Niveau":
                return <Level />;
            case "Catégories":
                return <Categories />;
            case "Questions":
                return <Questions />;
            default:
                return <Details />;
        }
    };

    return (
        <>
            <NavBar />
            <div className="absolute top-40 w-full">
                <div className="flex flex-col items-center">
                    <Breadcrumb
                        isCreateQuiz={true}
                        activeItem={activeItem}
                        onItemChange={setActiveItem}
                    />
                    {renderItemContent()}
                </div>
            </div>
        </>
    );
}