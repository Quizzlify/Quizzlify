"use client"

const NavBar: React.FC = () => {
    return (
        <footer className="bg-background-tertiary py-10 text-center mt-auto">
            <div className="max-w-5xl mx-auto px-6">
            <div className="flex justify-center space-x-8 mb-8">
                <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-foreground-secondary hover:text-accent transition-colors">
                <i className="fab fa-github text-xl"></i>
                </a>
            </div>
            <p className="text-foreground-secondary">© 2025 QuizApp. Tous droits réservés.</p>
            </div>
        </footer>
    )
}

export default NavBar