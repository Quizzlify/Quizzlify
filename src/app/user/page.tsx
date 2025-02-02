import NavBar from "@/app/components/NavBar";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <NavBar currentPage="user"/>
        </div>
    );
}