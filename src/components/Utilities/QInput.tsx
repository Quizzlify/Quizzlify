import { InputHTMLAttributes, ReactNode } from "react";

interface QInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
}

export default function QInput({ label, icon, required, ...props }: QInput) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-sm text-foreground-secondary">
                    {label}
                    {required && <span className="text-danger ml-1">*</span>}
                </label>
            )}
            <div className="relative w-full">
                <input
                    {...props}
                    className={`bg-[#1A1B1E] border border-[#2D2E32] text-foreground placeholder-foreground-secondary px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ${icon ? 'pl-10' : ''} w-full`}
                />
                {icon && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 text-foreground-secondary">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
