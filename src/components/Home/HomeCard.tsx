import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { ReactElement } from "react";

type CardProps = {
    title: string,
    description: string,
    position: 'left' | 'right',
    image: string
    icon: ReactElement
}

const HomeCard: React.FC<CardProps> = ({ title, description, position, image, icon }) => {
    return (
        <div className={`flex flex-col ${position === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 animate-slide-up`}>
            <div className={`flex-1 ${position === 'right' ? 'md:pr-8' : 'md:pl-8'} text-center md:text-left`}>
                <h2 className="font-bold text-3xl md:text-4xl mb-6">
                    <span className="text-gradient">{title}</span>
                </h2>
                <p className="text-xl text-foreground-secondary max-w-2xl mx-auto md:mx-0">
                    {description}
                </p>
                <div className="mt-8">
                    <button className="px-6 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-foreground transition-all duration-300">
                        <PlusIcon className="w-4 inline-block mr-2" />
                        En savoir plus
                    </button>
                </div>
            </div>

            <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300"></div>
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-2xl shadow-glow transition-transform duration-500 group-hover:scale-[1.02] object-cover border border-border"
                />
                <div className="absolute -bottom-4 -right-4 text-accent bg-background-secondary rounded-full p-4 transition-transform duration-500 group-hover:scale-110">
                    {icon && (
                        React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeCard;