export default function NavBar() {
    return (
        <nav className="top-5 fixed w-[calc(100%-5rem)] text-xl bg-white p-5 rounded-3xl shadow-2xl font-semibold backdrop-blur-[35px] opacity-85">
            <ul className="flex w-full justify-between">
                <li className="hover:text-accent transition"><a href="#home">Logo</a></li>

                <li className="hover:text-accent transition">
                    <i className="fa-solid fa-square-plus"></i><a href="#create_quiz"> Créer votre quiz</a>
                </li>

                <li className="hover:text-accent transition">
                    <i className="fa-solid fa-question"></i><a href="#quiz"> Quiz</a>
                </li>

                <li className="hover:text-accent transition">
                    <i className="fa-solid fa-ranking-star"></i><a href="#leaderboard"> Classement</a>
                </li>

                <li className="hover:text-accent transition">
                    <i className="fa-regular fa-user fa-xl"></i>
                </li>
            </ul>
        </nav>

    )
}