"use client"

import NavBar from "@/app/components/NavBar";
import LeaderBoard from "../components/LeaderBoard";

export default function Page() {

    const list = [
        {
            name: "John Doe",
            score: 100,
        },
        {
            name: "Jane Doe",
            score: 90,
        },
        {
            name: "John Smith",
            score: 80,
        },
        {
            name: "Jane Smith",
            score: 70,
        },
        {
            name: "John Doe",
            score: 60,
        },
        {
            name: "Jane Doe",
            score: 50,
        },
        {
            name: "John Smith",
            score: 40,
        },
        {
            name: "Jane Smith",
            score: 30,
        },
        {
            name: "John Doe",
            score: 20,
        },
        {
            name: "Jane Doe",
            score: 10,
        },
        {
            name: "John Smith",
            score: 5,
        },
        {
            name: "Jane Smith",
            score: 1,
        },
        {
            name: "John Doe",
            score: 0,
        },
        {
            name: "Jane Doe",
            score: 0,
        },
        {
            name: "John Smith",
            score: 0,
        },
        {
            name: "Jane Smith",
            score: 20000,
        },
        {
            name: "John Doe",
            score: 10000,
        },
        {
            name: "Jane Doe",
            score: 9000,
        },
        {
            name: "John Smith",
            score: 8000,
            you: true,
        },
        {
            name: "Jane Smith",
            score: 7000,
        },
        {
            name: "John Doe",
            score: 6000,
        },
        {
            name: "Jane Doe",
            score: 5000,
        },
        {
            name: "John Smith",
            score: 4000,
        },
        {
            name: "Jane Smith",
            score: 3000,
        },
        {
            name: "John Doe",
            score: 2000,
        },
        {
            name: "Jane Doe",
            score: 1000,
        },
        {
            name: "John Smith",
            score: 500,
        },
        {
            name: "Jane Smith",
            score: 100,
        }
    ]

    return (
        <div className="flex justify-center w-full h-full">
            <NavBar currentPage="leaderboard" />
            <div className="w-full h-full py-[90px]">
                <div className="flex w-[calc(100%-16rem)] pb-8 justify-between items-center mx-auto">
                    <h1 className="flex text-4xl font-bold text-center justify-start">Classement</h1>
                    <h1 className="flex text-center text-2xl font-semibold justify-end">Votre place: #4</h1>
                </div>
                <div className="flex-1 w-full h-full justify-center">
                    <LeaderBoard list={list} />
                </div>
            </div>
        </div>
    );
}