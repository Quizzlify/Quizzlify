"use client";

import { useToast } from "@/provider/ToastProvider";
import { FC } from "react";
import Toast from "./Toast";

const ToastContainer: FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <>
            {toasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemove={removeToast}
                    index={index}
                />
            ))}
        </>
    );
}

export default ToastContainer;