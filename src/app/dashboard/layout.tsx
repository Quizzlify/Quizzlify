"use client";

import { Sidebar } from "@/components/Dashboard/Sidebar";
import Loading from "@/components/Utilities/Loading";
import { useUser } from "@/provider/UserProvider";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const { isLoadingUser, isAuthenticated, user } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        if (!isLoadingUser && !isAuthenticated) {
            router.push("/user/signin");
        }
    }, [isLoadingUser, isAuthenticated, router]);

    if (isLoadingUser) {
        return <Loading />;
    }

    const currentPage: string = pathname.split("/").pop() || "dashboard";

    return (
        <div className="flex h-full bg-background">
            <Sidebar user={user} nav={currentPage} />

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}