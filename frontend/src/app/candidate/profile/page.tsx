"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

export default function CandidateProfile() {
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
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center bg-[#1a1a1a]">
      <div className="w-full bg-white  overflow-hidden flex ">
        <Sidebar user={user} onLogout={handleLogout} />

        <main className="w-[680px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 overflow-y-auto custom-scrollbar shrink-0">
          <div className="relative mb-20 shrink-0">
            <div className="h-48 w-full bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
              <img alt="Banner" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYJttOIPkxBmPbV6AE8zUIyhclxkYGbgYrppaaDIfxQTPRnXnA9RT-LTX6DCL4XoGCUe5-0nE_-s17TcfVQoBFNi-WbiQybYqUjv5fqX1-PnMK5RzRv2nbdRJdzlL1RZTHg0YSFUrmFi4NYtAtd_CaPmxoQPSphLfmQ6K7QBKm6JrysJq7fQkP3aBk5ge0QOF4kusAVz-JxX9QqWl4QyxQbrhQIS122nDeKbN6nNRyCWw79vFjLfjssATzfDN382tZHPuDcUPFLxs" />
            </div>

            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-[6px] border-[var(--off-white)] overflow-hidden shadow-xl bg-white">
                <img alt="Profile Photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
              </div>
            </div>
          </div>

          <div className="px-8 space-y-6 pb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">George Jenkins</h1>
              <p className="text-lg text-gray-600 font-medium">Senior Product Designer &amp; UI Architect</p>
              <div className="flex items-center text-gray-400 text-sm mt-2">
                <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                San Francisco, California
              </div>
            </div>

            <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Passionate Product Designer with over 8 years of experience in building user-centric digital products. Specializing in high-fidelity prototyping, design systems, and accessible interfaces. Proven track record of leading design teams in fast-paced startup environments.
              </p>
            </section>

            <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Experience</h3>
              <div className="space-y-8">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <img alt="Company Logo" className="w-8 h-8 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">Senior Product Designer</h4>
                    <p className="text-xs text-gray-500 font-medium">Creative Studio • Full-time</p>
                    <p className="text-xs text-gray-400 mt-1">Jan 2021 - Present • 3 yrs 4 mos</p>
                    <p className="text-sm text-gray-600 mt-3">Leading the redesign of the core workspace platform, increasing user engagement by 40%.</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs text-center">MS</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">UI/UX Designer</h4>
                    <p className="text-xs text-gray-500 font-medium">Motion Systems • Full-time</p>
                    <p className="text-xs text-gray-400 mt-1">Jun 2018 - Dec 2020 • 2 yrs 7 mos</p>
                    <p className="text-sm text-gray-600 mt-3">Developed and maintained a comprehensive design system used across 4 cross-platform apps.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Education</h3>
              <div className="flex space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  <span className="material-symbols-outlined text-gray-400">school</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900">Rhode Island School of Design</h4>
                  <p className="text-xs text-gray-500 font-medium">Bachelor of Fine Arts - BFA, Graphic Design</p>
                  <p className="text-xs text-gray-400 mt-1">2014 - 2018</p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto px-10 pt-16 pb-32 custom-scrollbar">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Professional Sidebar</h2>
            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Product Design</span>
                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Figma</span>
                <span className="px-4 py-1.5 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">UX Research</span>
                <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Prototyping</span>
                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Design Systems</span>
                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Tailwind CSS</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Languages</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">English</span>
                  <span className="text-xs text-gray-400 font-medium">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">German</span>
                  <span className="text-xs text-gray-400 font-medium">Professional</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Spanish</span>
                  <span className="text-xs text-gray-400 font-medium">Elementary</span>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="material-symbols-outlined text-lg">mail</span>
                  <span className="text-sm">george.jenkins@design.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="material-symbols-outlined text-lg">phone</span>
                  <span className="text-sm">+1 (555) 000-1234</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="material-symbols-outlined text-lg">link</span>
                  <span className="text-sm">georgedesign.io</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <div className="w-full max-w-xs">
              <button className="w-full h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl flex items-center justify-center space-x-2">
                <span className="material-symbols-outlined">edit</span>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
