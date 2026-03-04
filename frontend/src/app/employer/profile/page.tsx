"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
  is_onboarded: boolean;
}

interface EmployerData {
  id: number;
  user_id: number;
  companyname: string | null;
  brandname: string | null;
  industry: string | null;
  companylogo: string | null;
  companybanner: string | null;
  companytype: string | null;
  companysize: string | null;
  foundedyear: number | null;
  website: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  location: string | null;
  ispublic: boolean;
}

export default function EmployerProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"about" | "jobs" | "people">("about");
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
      if (userData.userType !== "employer") {
        router.push("/candidate");
        return;
      }
      setUser(userData);
      fetchEmployerData(userData.id);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const fetchEmployerData = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employers/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setEmployerData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch employer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="text-center">
          <div className="inline-block size-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading employer profile...</p>
        </div>
      </div>
    );
  }

  // Helper functions for data display
  const getCompanyInitials = () => {
    const name = employerData?.companyname || employerData?.brandname || "CO";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring (0, 2);
  };

  const getLocation = () => {
    const parts = [];
    if (employerData?.city) parts.push(employerData.city);
    if (employerData?.state) parts.push(employerData.state);
    return parts.join(', ') || 'Location not specified';
  };

  const getFullLocation = () => {
    const parts = [];
    if (employerData?.city) parts.push(employerData.city);
    if (employerData?.state) parts.push(employerData.state);
    if (employerData?.country) parts.push(employerData.country);
    return parts.join(', ') || 'Not specified';
  };

  return (
    <div className="flex items-center justify-center bg-[#1a1a1a]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <style jsx global>{`
        :root {
          --deep-charcoal: #252525;
          --off-white: #f5f7f9;
          --preview-bg: #f8fafc;
          --card-white: #ffffff;
          --accent-blue: #3b82f6;
          --accent-red: #ef4444;
          --accent-yellow: #facc15;
          --accent-pink: #f472b6;
          --accent-green: #4ade80;
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
      `}</style>

      <div className="w-full bg-white overflow-hidden flex shadow-2xl">
        <Sidebar user={user} onLogout={handleLogout} />

        <main className="w-[720px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-8 pb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => router.push('/employer/companies')}>
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="font-medium">Back to Companies</span>
            </div>
            <div className="flex space-x-8 text-sm font-semibold border-b border-gray-200">
              <button 
                className={`pb-4 ${activeTab === 'about' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button 
                className={`pb-4 ${activeTab === 'jobs' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}
                onClick={() => setActiveTab('jobs')}
              >
                Jobs
              </button>
              <button 
                className={`pb-4 ${activeTab === 'people' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600 transition-colors'}`}
                onClick={() => setActiveTab('people')}
              >
                People
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            <div className="relative w-full h-48 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[32px] overflow-hidden shadow-sm mb-16">
              {employerData?.companybanner ? (
                <img 
                  alt="Company Banner" 
                  className="w-full h-full object-cover" 
                  src={employerData.companybanner}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-teal-500" />
              )}
              <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center overflow-hidden border border-gray-100 z-10">
                {employerData?.companylogo ? (
                  <img 
                    alt="Company Logo" 
                    className="w-full h-full object-contain" 
                    src={employerData.companylogo}
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-black text-3xl">
                    {getCompanyInitials()}
                  </div>
                )}
              </div>
            </div>

            <div className="px-2 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {employerData?.companyname || employerData?.brandname || user.fullName}
              </h1>
              <p className="text-gray-500 font-medium text-lg mt-1">
                {employerData?.industry || 'Company Profile'}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {employerData?.industry && (
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">business</span> {employerData.industry}
                  </span>
                )}
                {(employerData?.city || employerData?.state) && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> {getLocation()}
                  </span>
                )}
                {employerData?.companysize && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center">
                    <span className="material-symbols-outlined text-[14px] mr-1">groups</span> {employerData.companysize} employees
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">info</span> About Us
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {employerData?.location || `Welcome to ${employerData?.companyname || employerData?.brandname || 'our company'}. We are ${employerData?.industry ? `in the ${employerData.industry} industry` : 'a growing company'} ${employerData?.foundedyear ? `founded in ${employerData.foundedyear}` : ''}. ${employerData?.companytype ? `We are a ${employerData.companytype} company` : ''} ${employerData?.companysize ? `with ${employerData.companysize} employees` : ''}.`}
              </p>
              {employerData?.website && (
                <div className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="material-symbols-outlined text-sm mr-2">language</span>
                  <a href={employerData.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium">
                    Visit our website
                  </a>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">track_changes</span> Company Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                  <span className="material-symbols-outlined text-emerald-500 text-3xl mb-3 block">business</span>
                  <h3 className="font-bold text-emerald-900 mb-2">Company Type</h3>
                  <p className="text-emerald-700 text-sm">{employerData?.companytype || 'Not specified'}</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <span className="material-symbols-outlined text-teal-500 text-3xl mb-3 block">groups</span>
                  <h3 className="font-bold text-teal-900 mb-2">Company Size</h3>
                  <p className="text-teal-700 text-sm">{employerData?.companysize ? `${employerData.companysize} employees` : 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">photo_library</span> Life at {employerData?.brandname || employerData?.companyname || 'Our Company'}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {employerData?.companybanner ? (
                  <>
                    <div className="h-32 rounded-2xl overflow-hidden">
                      <img 
                        alt="Company" 
                        className="w-full h-full object-cover" 
                        src={employerData.companybanner}
                      />
                    </div>
                    <div className="h-32 rounded-2xl overflow-hidden">
                      <img 
                        alt="Office" 
                        className="w-full h-full object-cover" 
                        src={employerData.companybanner}
                      />
                    </div>
                    <div className="h-32 rounded-2xl overflow-hidden relative">
                      <img 
                        alt="Team" 
                        className="w-full h-full object-cover" 
                        src={employerData.companybanner}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-black/50 transition-colors">
                        +12
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-3 flex items-center justify-center h-32 bg-gray-50 rounded-2xl text-gray-400 text-sm">
                    No photos available
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="p-8 pb-32 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Key Information</h2>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">business</span>
                      <span className="text-sm font-medium">Company Name</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {employerData?.companyname || employerData?.brandname || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">corporate_fare</span>
                      <span className="text-sm font-medium">Headquarters</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{getFullLocation()}</span>
                  </div>
                  {employerData?.foundedyear && (
                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <div className="flex items-center text-gray-500">
                        <span className="material-symbols-outlined text-lg mr-3">calendar_month</span>
                        <span className="text-sm font-medium">Founded</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{employerData.foundedyear}</span>
                    </div>
                  )}
                  {employerData?.companysize && (
                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <div className="flex items-center text-gray-500">
                        <span className="material-symbols-outlined text-lg mr-3">groups</span>
                        <span className="text-sm font-medium">Company Size</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{employerData.companysize} employees</span>
                    </div>
                  )}
                  {employerData?.industry && (
                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                      <div className="flex items-center text-gray-500">
                        <span className="material-symbols-outlined text-lg mr-3">category</span>
                        <span className="text-sm font-medium">Industry</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{employerData.industry}</span>
                    </div>
                  )}
                  {employerData?.companytype && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <span className="material-symbols-outlined text-lg mr-3">apartment</span>
                        <span className="text-sm font-medium">Company Type</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{employerData.companytype}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Job Openings</h2>
                  <a className="text-sm text-blue-500 font-bold hover:text-blue-600 transition-colors" href="#">View All</a>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Senior Solar Engineer</h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> San Francisco (Hybrid)
                      </p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      Quick Apply
                    </button>
                  </div>
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Sustainability Analyst</h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Remote
                      </p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      Quick Apply
                    </button>
                  </div>
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Product Manager</h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Austin, TX (On-site)
                      </p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <button className="w-full max-w-xs h-16 bg-[var(--deep-charcoal)] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-3">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Follow Company</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
