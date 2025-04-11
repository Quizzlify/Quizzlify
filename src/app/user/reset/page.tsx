"use client"

import NavBar from "@/components/Home/NavBar";

export default function LoginPage() {
  return (
    <>
      <NavBar currentPage="user" />
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-center">
          Cette fonctionnalité n'a pas encore été implementée par les développeurs.<br />
          Veuillez contacter les administrateurs.
        </h1>
      </div>
    </>
  );
}