"use client"
import {Github} from "lucide-react"

const NavBar: React.FC = () => {    
    return (
        <footer className="bg-background-tertiary py-10 text-center flex justify-center mt-auto">
            <div className="flex flex-row gap-2 max-w-5xl mx-auto px-6">
                <div className="flex flex-row">
                    <Github 
                        onClick={() => window.open("https://github.com/Quizzlify/Quizzlify", "_blank")} 
                        className="cursor-pointer"
                    />
                    {/* Discord */}
                </div>
                <p className="text-foreground-secondary">© 2025 QuizApp. Tous droits réservés.</p>
            </div>
        </footer>
    )
}

export default NavBar