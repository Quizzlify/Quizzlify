export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-background text-accent gap-4">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-accent animate-spin" />
            </div>
            <p className="text-sm font-medium animate-pulse">Chargement...</p>
        </div>
    );
}
