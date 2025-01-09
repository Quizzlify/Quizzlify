'use client'

import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-6xl font-bold">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className="mt-3 text-2xl">
                    Get started by editing{" "}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        pages/index.js
                    </code>
                </p>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <a
                        href="https://nextjs.org/docs"
                        className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                    >
                        <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
                        <p className="mt-4 text-xl">
                            Find in-depth information about Next.js features and API.
                        </p>
                    </a>

                    <a
                        href="https://nextjs.org/learn"
                        className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                    >
                        <h3 className="text-2xl font-bold">Learn &rarr;</h3>
                        <p className="mt-4 text-xl">
                            Learn about Next.js in an interactive course with quizzes!
                        </p>
                    </a>
                </div>
            </div>
        </>
    );
}
