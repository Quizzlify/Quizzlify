"use client"

import NavBar from "@/components/Home/NavBar";
import LeaderBoard from "../../components/Leaderboard/Leaderboard";
import { useEffect, useState } from "react";
import { useUser } from "@/provider/UserProvider";

interface UserList {
    _id: string,
    username: string,
    rank: number,
    score: number,
    you: boolean
};

export default function Page() {
    const { user, isAuthenticated } = useUser();
    const [userList, setUserList] = useState<UserList[] | null>(null)

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch("/api/user/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({})
                });

                const response = await res.json();
                if (response.success) {
                    const formattedUsers = (response.data).map((userList: UserList) => {
                        return {
                            _id: userList._id,
                            username: userList.username,
                            rank: userList.rank,
                            score: userList.score,
                            you: isAuthenticated && user ? user._id === userList._id : false
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
                    {userList !== null ? <LeaderBoard list={userList} /> : <h1 className="text-2xl absolute ml-[15rem]">Il n'y a aucun utilisateurs.</h1>}
                </div>
            </div>
        </div>
    );
}