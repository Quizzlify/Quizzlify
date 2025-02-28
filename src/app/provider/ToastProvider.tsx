"use client";

import { createContext, FC, ReactNode, useContext, useReducer } from "react";

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

type ToastAction = 
    | { type: 'ADD_TOAST'; payload: Toast }
    | { type: 'REMOVE_TOAST'; payload: { id: string; } };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastReducer = (state: Toast[], action: ToastAction) => {
    switch (action.type) {
        case 'ADD_TOAST':
            return [...state, action.payload];
        case 'REMOVE_TOAST':
            return state.filter(toast => toast.id !== action.payload.id);
        default:
            return state;
    }
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const addToast = (message: string, type: ToastType, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        dispatch({ type: 'ADD_TOAST', payload: { id, message, type, duration } });
    };

    const removeToast = (id: string) => {
        dispatch({ type: 'REMOVE_TOAST', payload: { id } });
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}