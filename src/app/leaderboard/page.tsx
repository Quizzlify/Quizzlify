"use client"

import NavBar from "@/app/components/NavBar";
import LeaderBoard from "../components/LeaderBoard";
import { useEffect, useState } from "react";

interface UserList {
    username: string,
    score: number,
    rank: number,
    you: boolean
}

export default function Page() {
    const [userList, setUserList] = useState<UserList[] | null>(null)

    async function getUsers() {
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            const response = await res.json();
            if (response.success) {
                const formattedUsers = (response.data).map((user: {username: string, score: number, rank:number, you: boolean}) => {
                    return {
                        username: user.username,
                        score: user.score,
                        rank: user.rank,
                        you: false
                    };
                });

                setUserList(formattedUsers);
            } else {
                console.log("Une erreur est survenue: ", response.error);
            }
        } catch (error) {
            console.log("Une erreur est survenue avec la connexion à la DB: ", error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="flex justify-center w-full h-full">
            <NavBar currentPage="leaderboard" />
            <div className="w-full h-full py-[90px]">
                <div className="flex w-[calc(100%-16rem)] pb-8 justify-between items-center mx-auto">
                    <h1 className="flex text-4xl font-bold text-center justify-start">Classement</h1>
                    <h1 className="flex text-center text-2xl font-semibold justify-end">Votre place: {userList?.find(user => user.you)?.rank ?? "N/A"}</h1>
                </div>
                <div className="flex-1 w-full h-full justify-center">
                    {userList !== null ? <LeaderBoard list={userList} /> : null}
                </div>
            </div>
        </div>
    );
}