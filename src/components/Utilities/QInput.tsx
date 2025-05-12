import { InputHTMLAttributes } from "react";

interface QInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function QInput({ label, required, ...props }: QInput) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-foreground-secondary">
                {label}
                {required && <span className="text-danger ml-1">*</span>}
            </label>
            <input
                {...props}
                className="bg-[#1A1B1E] border border-[#2D2E32] text-foreground placeholder-foreground-secondary px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
            />
        </div>
    );
}
