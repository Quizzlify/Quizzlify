"use client";

import { FC, useEffect, useState } from "react";
import type { Toast as ToastType } from "../../provider/ToastProvider";
import { AlertCircle, Check, Info, X } from "lucide-react";

interface ToastProps {
    toast: ToastType;
    onRemove: (id: string) => void;
    index: number;
}

const Toast: FC<ToastProps> = ({ toast, onRemove, index }) => {
    const [progress, setProgress] = useState(100);
    const [isExiting, setIsExiting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalId);
                    setIsExiting(true);
                    setTimeout(() => onRemove(toast.id), 300);
                    return 0;
                }
                return prev - (100 / (toast.duration / 100));
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [toast.id, toast.duration, onRemove, isHovered]);

    const getToastStyles = () => {
        switch (toast.type) {
            case 'success':
                return {
                    icon: <Check className="size-5" />,
                    containerClass: 'bg-white border border-slate-200',
                    iconBg: 'bg-emerald-50',
                    iconClass: 'text-emerald-600',
                    progressClass: 'bg-emerald-500'
                };
            case 'error':
                return {
                    icon: <X className="size-5" />,
                    containerClass: 'bg-white border border-slate-200',
                    iconBg: 'bg-rose-50',
                    iconClass: 'text-rose-600',
                    progressClass: 'bg-rose-500'
                };
            case 'warning':
                return {
                    icon: <AlertCircle className="size-5" />,
                    containerClass: 'bg-white border border-slate-200',
                    iconBg: 'bg-amber-50',
                    iconClass: 'text-amber-600',
                    progressClass: 'bg-amber-500'
                };
            default:
                return {
                    icon: <Info className="size-5" />,
                    containerClass: 'bg-white border border-slate-200',
                    iconBg: 'bg-sky-50',
                    iconClass: 'text-sky-600',
                    progressClass: 'bg-sky-500'
                };
        }
    };

    const { icon, containerClass, iconBg, iconClass, progressClass } = getToastStyles();

    const opacity = isHovered ? 1 : isExiting ? 0 : index >= 2 ? 1 : 1 - Math.min(0.3, (2 - index) * 0.1);

    return (
        <div
            className={`fixed right-4 max-w-sm w-full transform transition-all duration-300 ease-in-out ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0'
                }`}
            style={{
                bottom: `${index * 0.25}rem`,
                zIndex: isHovered ? 1050 : 1000 + index,
                transform: `translateY(-${index * 12}px)`,
                opacity
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`${containerClass} rounded-t-xl shadow-lg transition-all duration-300 transform ${isHovered ? 'scale-105' : ''
                    } text-slate-800`}
                style={{ transformOrigin: 'bottom center' }}
            >
                <div className="flex items-center p-4">
                    <div className={`${iconBg} ${iconClass} p-2 rounded-full mr-3 flex-shrink-0`}>
                        {icon}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm text-slate-700">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => {
                            setIsExiting(true);
                            setTimeout(() => onRemove(toast.id), 300);
                        }}
                        className="ml-2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Fermer la notification"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="w-full bg-slate-100 h-1 rounded-b-full">
                    <div
                        className={`${progressClass} h-full rounded-full`}
                        style={{
                            width: `${progress}%`,
                            transition: 'width 100ms linear'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toast;