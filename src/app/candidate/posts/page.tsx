"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PostsArchive from "@/components/PostsArchive";

interface User {
    id: number;
    email: string;
    fullName: string;
    userType: "candidate" | "employer";
}

export default function PostsPage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const hasChecked = useRef(false);

    useEffect(() => {
        if (hasChecked.current) return;
        hasChecked.current = true;

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            router.push("/login");
            return;
        }

        try {
            const userData: User = JSON.parse(storedUser);
            if (userData.userType !== "candidate") {
                router.push("/employer");
                return;
            }
            setUser(userData);
        } catch {
            router.push("/login");
        }
    }, [router]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            <div className="w-full bg-white overflow-hidden flex">
                <Sidebar user={user} onLogout={() => {
                    localStorage.removeItem("user");
                    router.push("/login");
                }} />

                <main className="flex-1 bg-[var(--off-white)] flex flex-col border-r border-gray-200 overflow-hidden relative h-screen">
                    <div className="p-8 h-full">
                        <div className="mb-6">
                            <h1 className="text-3xl font-extrabold text-gray-900">Post Archive</h1>
                            <p className="text-gray-500 text-sm mt-1">Discover and manage community stories</p>
                        </div>

                        <div className="h-[calc(100vh-160px)] ">
                            <PostsArchive />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
