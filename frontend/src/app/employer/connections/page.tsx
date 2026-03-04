"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface User {
    id: number;
    email: string;
    fullName: string;
    userType: "candidate" | "employer";
    is_onboarded: boolean;
}

interface Candidate {
    id: number;
    user_id: number;
    jobtitle: string | null;
    coreskills: string[] | null;
    profileimage: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    currentcompany: string | null;
    full_name: string;
    email: string;
    user_type: string;
}

export default function ConnectionsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const hasChecked = useRef(false);

    // Fetch candidates from API
    const fetchCandidates = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/candidates");
            if (response.ok) {
                const data = await response.json();
                setCandidates(data.data || []);
                if (data.data && data.data.length > 0) {
                    setSelectedCandidate(data.data[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get user initials
    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    };

    // Get location string
    const getLocation = (candidate: Candidate) => {
        const parts = [];
        if (candidate.city) parts.push(candidate.city);
        if (candidate.state) parts.push(candidate.state);
        if (candidate.country) parts.push(candidate.country);
        return parts.join(', ') || 'Location not specified';
    };

    // Handle candidate click
    const handleCandidateClick = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

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
            if (userData.userType !== "employer") {
                router.push("/candidate");
                return;
            }
            setUser(userData);
            fetchCandidates();
        } catch {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (!user || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
                <div className="text-center">
                    <div className="inline-block size-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                    <p className="text-white text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-[#1a1a1a] min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
        :root {
            --deep-charcoal: #252525;
            --off-white: #f5f7f9;
            --preview-bg: #f8fafc;
            --card-white: #ffffff;
            --accent-blue: #3b82f6;
            --accent-indigo: #6366f1;
            --accent-green: #22c55e;
        }
        body {
            font-family: 'Inter', sans-serif;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      ` }} />

            <Sidebar user={user} onLogout={handleLogout} />

            <div className="flex-1 bg-white overflow-hidden flex">
                <main className="w-[500px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Network Hub</h1>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input
                                className="w-full bg-white border-none rounded-2xl h-12 pl-12 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="Search by name, role, or company..."
                                type="text"
                            />
                        </div>
                        <div className="flex space-x-6 mt-6 text-sm font-semibold">
                            <button className="text-black border-b-2 border-black pb-2 px-1">Discover</button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1 flex items-center">
                                Pending
                                <span className="ml-2 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors pb-2 px-1">My Network</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Suggestions for you</p>

                        {candidates.length > 0 ? candidates.map((candidate) => (
                            <div 
                                key={candidate.id} 
                                onClick={() => handleCandidateClick(candidate)}
                                className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-indigo-100 group flex items-center space-x-4"
                            >
                                <div className="relative shrink-0">
                                    {candidate.profileimage ? (
                                        <img src={candidate.profileimage} className="w-14 h-14 rounded-2xl object-cover" alt={candidate.full_name} />
                                    ) : (
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                            {getInitials(candidate.full_name)}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{candidate.full_name}</h4>
                                    <p className="text-xs text-gray-500 truncate">
                                        {candidate.jobtitle || 'Job Seeker'}
                                        {candidate.currentcompany && ` @ ${candidate.currentcompany}`}
                                    </p>
                                    <p className="text-[10px] text-indigo-500 font-semibold mt-1 flex items-center">
                                        <span className="material-symbols-outlined text-[12px] mr-1">location_on</span>
                                        {candidate.city || candidate.state || candidate.country || 'Location not set'}
                                    </p>
                                </div>
                                <button className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white">
                                    <span className="material-symbols-outlined">person_add</span>
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-sm">No candidates found.</p>
                            </div>
                        )}
                    </div>
                </main>

                <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
                    {selectedCandidate ? (
                        <>
                            <div className="absolute top-8 right-8 z-10 flex space-x-2">
                                <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-xl">share</span>
                                </button>
                                <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-12 pt-16 pb-32 custom-scrollbar">
                                <div className="max-w-2xl mx-auto flex flex-col items-center">
                                    {/* Profile Card */}
                                    <div className="w-full bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden mb-10">
                                        <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                                        </div>
                                        <div className="px-10 pb-10 relative">
                                            <div className="absolute -top-16 left-10">
                                                {selectedCandidate.profileimage ? (
                                                    <img src={selectedCandidate.profileimage} className="w-32 h-32 rounded-[32px] border-4 border-white shadow-2xl object-cover" alt={selectedCandidate.full_name} />
                                                ) : (
                                                    <div className="w-32 h-32 rounded-[32px] border-4 border-white shadow-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-3xl">
                                                        {getInitials(selectedCandidate.full_name)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-20 flex justify-between items-start">
                                                <div>
                                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{selectedCandidate.full_name}</h1>
                                                    <p className="text-lg font-medium text-gray-600 mt-1">
                                                        {selectedCandidate.jobtitle || 'Job Seeker'}
                                                        {selectedCandidate.currentcompany && ` at ${selectedCandidate.currentcompany}`}
                                                    </p>
                                                    <div className="flex items-center space-x-3 mt-4">
                                                        <span className="text-sm font-semibold text-gray-400 flex items-center">
                                                            <span className="material-symbols-outlined text-base mr-1 text-indigo-500">location_on</span>
                                                            {getLocation(selectedCandidate)}
                                                        </span>
                                                        <span className="text-gray-300">•</span>
                                                        <span className="text-sm font-semibold text-gray-400">{selectedCandidate.email}</span>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-3">
                                                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                                                        Message
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            {/* Skills Section */}
                            {selectedCandidate.coreskills && selectedCandidate.coreskills.length > 0 && (
                                <div className="w-full mb-10">
                                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Core Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.coreskills.map((skill, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bio Section */}
                            <div className="w-full space-y-10">
                                <div>
                                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">About</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                        Professional {selectedCandidate.user_type} looking for opportunities.
                                        {selectedCandidate.jobtitle && ` Currently working as ${selectedCandidate.jobtitle}.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent pt-12">
                        <button className="w-full max-w-md h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 transform hover:-translate-y-1">
                            <span className="material-symbols-outlined">person_add</span>
                            Connect with {selectedCandidate.full_name.split(' ')[0]}
                        </button>
                    </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-lg">Select a candidate to view details</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
