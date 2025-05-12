import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
            <div className="relative">
                <div className="absolute inset-0 bg-accent-secondary rounded-full animate-pulse-slow"></div>

                <div className="relative z-10 p-4">
                    <Image src="/logo.png" alt="Logo" width={64} />
                </div>
            </div>

            <div className="mt-8 relative">
                <div className="w-12 h-12 rounded-full border-4 border-accent-secondary border-t-accent animate-spin"></div>
            </div>

            <p className="mt-6 text-foreground-secondary">Chargement en cours...</p>
        </div>
    );
};

export default Loading;