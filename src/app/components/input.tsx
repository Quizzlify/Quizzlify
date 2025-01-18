import React from 'react';

interface InputProps {
    text: string;
}

const Input: React.FC<InputProps> = ({ text }) => {
    return (
        <div className="relative">
            <input
                type="text"
                className="w-full rounded-lg border border-gray-500 bg-transparent px-4 py-2 text-sm
                         placeholder-gray-400 focus:border-blue-500"
                placeholder={text}
            />
        </div>
    );
};

export default Input;