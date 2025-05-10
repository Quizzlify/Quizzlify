"use client"

import NavBar from "@/components/Home/NavBar";
import LeaderBoard from "../../components/Leaderboard/Leaderboard";
import { useEffect, useState } from "react";
import { useUser } from "@/provider/UserProvider";
import Loading from "@/components/Utilities/Loading";

interface UserList {
    _id: string,
    username: string,
    score: number,
    you: boolean
};

export default function Page() {
    const { user } = useUser();
    const [userList, setUserList] = useState<UserList[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUsers() {
            try {
                setIsLoading(true);
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
                            score: userList.score,
                            you: user?._id === userList._id
                        };
                    });

                    setUserList(formattedUsers);
                } else {
                    console.log("Une erreur est survenue: ", response.error);
                }
            } catch (error) {
                console.log("Une erreur est survenue avec la connexion à la DB: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        getUsers()
    }, [])

    function getUserRank() {
        if (userList !== null && user) {
            const sortedList = userList.sort((a, b) => b.score - a.score);
            const userRank = sortedList.findIndex((userList) => userList._id === user._id);
            if (userRank === -1) return 0;

            return userRank + 1;
        }
        return 0;
    }

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="flex justify-center w-full h-full">
            <NavBar currentPage="leaderboard" />
            <div className="w-full h-full py-[90px]">
                <div className="flex w-[calc(100%-16rem)] pb-8 justify-between items-center mx-auto">
                    <h1 className="flex text-4xl font-bold text-center justify-start">Classement</h1>
                    <h1 className="flex text-center text-2xl font-semibold justify-end">Votre place: {getUserRank()}</h1>
                </div>
                <div className="flex-1 w-full h-full justify-center">
                    {userList !== null ? <LeaderBoard list={userList} /> : <h1 className="text-2xl absolute ml-[15rem]">Il n'y a aucun utilisateurs.</h1>}
                </div>
            </div>
        </div>
    );
}