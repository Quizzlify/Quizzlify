"use client";

import { FC, useEffect, useState } from "react";
import type { Toast as ToastType } from "../../../provider/ToastProvider";
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

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          icon: <Check className="size-4" />,
          iconColor: "bg-emerald-100 text-emerald-600",
          barColor: "bg-emerald-500",
        };
      case "error":
        return {
          icon: <X className="size-4" />,
          iconColor: "bg-rose-100 text-rose-600",
          barColor: "bg-rose-500",
        };
      case "warning":
        return {
          icon: <AlertCircle className="size-4" />,
          iconColor: "bg-amber-100 text-amber-600",
          barColor: "bg-amber-500",
        };
      default:
        return {
          icon: <Info className="size-4" />,
          iconColor: "bg-sky-100 text-sky-600",
          barColor: "bg-sky-500",
        };
    }
  };

  const { icon, iconColor, barColor } = getStyles();

  return (
    <div
      className={`fixed right-4 w-full max-w-sm z-[9999] transition-all duration-300 ${
        isExiting ? "translate-x-full opacity-0" : "translate-x-0"
      }`}
      style={{
        bottom: `${1 + index * 5}rem`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-background shadow-xl border border-border rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className={`rounded-md p-2 ${iconColor}`}>{icon}</div>
          <div className="flex-1">
            <p className="text-sm text-foreground">{toast.message}</p>
          </div>
          <button
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => onRemove(toast.id), 300);
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="relative h-1 bg-muted">
          <div
            className={`${barColor} absolute top-0 left-0 h-full transition-all duration-100`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
