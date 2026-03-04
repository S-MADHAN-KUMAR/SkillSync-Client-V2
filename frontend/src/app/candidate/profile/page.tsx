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

interface CandidateProfile {
  id: number;
  user_id: number;
  jobtitle?: string;
  coreskills?: string[];
  resumecv?: string;
  profileimage?: string;
  bannerimage?: string;
  dob?: string;
  gender?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  linkedin?: string;
  portfolio?: string;
  experiencestatus?: string;
  totalexperience?: string;
  currenttitle?: string;
  currentcompany?: string;
  noticeperiod?: string;
  expectedsalary?: string;
  preferredlocation?: string;
  workmode?: string[];
  education?: Array<{
    institution: string;
    degree: string;
    focus: string;
    year: string;
    cgpa: string;
  }>;
}

export default function CandidateProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
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
      fetchCandidateProfile(userData.id);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const fetchCandidateProfile = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/candidates/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch candidate profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleEditProfile = () => {
    router.push("/candidate/onboarding");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  const location = [profile?.city, profile?.state, profile?.country].filter(Boolean).join(", ");
  const defaultBanner = "https://lh3.googleusercontent.com/aida-public/AB6AXuDYJttOIPkxBmPbV6AE8zUIyhclxkYGbgYrppaaDIfxQTPRnXnA9RT-LTX6DCL4XoGCUe5-0nE_-s17TcfVQoBFNi-WbiQybYqUjv5fqX1-PnMK5RzRv2nbdRJdzlL1RZTHg0YSFUrmFi4NYtAtd_CaPmxoQPSphLfmQ6K7QBKm6JrysJq7fQkP3aBk5ge0QOF4kusAVz-JxX9QqWl4QyxQbrhQIS122nDeKbN6nNRyCWw79vFjLfjssATzfDN382tZHPuDcUPFLxs";
  const defaultProfile = "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U";

  return (
    <div className="flex items-center justify-center bg-[#1a1a1a]">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
      `}</style>
      <div className="w-full bg-white overflow-hidden flex">
        <Sidebar userName={user?.fullName} userImage={profile?.profileimage} />

        <main className="w-[680px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 overflow-y-auto custom-scrollbar shrink-0">
          <div className="relative mb-20 shrink-0">
            <div className="h-48 w-full bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
              <img 
                alt="Banner" 
                className="w-full h-full object-cover opacity-60" 
                src={profile?.bannerimage || defaultBanner} 
              />
            </div>

            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-[6px] border-[var(--off-white)] overflow-hidden shadow-xl bg-white">
                <img 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover" 
                  src={profile?.profileimage || defaultProfile} 
                />
              </div>
            </div>
          </div>

          <div className="px-8 space-y-6 pb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">{user?.fullName || "Not provided"}</h1>
              <p className="text-lg text-gray-600 font-medium">{profile?.jobtitle || "Job title not set"}</p>
              {location && (
                <div className="flex items-center text-gray-400 text-sm mt-2">
                  <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                  {location}
                </div>
              )}
            </div>

            {profile?.currentcompany && (
              <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Current Position</h3>
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <span className="material-symbols-outlined text-gray-400">business</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900">{profile.currenttitle || profile.jobtitle}</h4>
                    <p className="text-xs text-gray-500 font-medium">{profile.currentcompany} • {profile.experiencestatus}</p>
                    <p className="text-xs text-gray-400 mt-1">Total Experience: {profile.totalexperience || "Not specified"}</p>
                    {profile.expectedsalary && (
                      <p className="text-sm text-gray-600 mt-2">Expected Salary: ${profile.expectedsalary}</p>
                    )}
                    {profile.noticeperiod && (
                      <p className="text-xs text-gray-500 mt-1">Notice Period: {profile.noticeperiod}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {profile?.education && profile.education.length > 0 && (
              <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Education</h3>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                        <span className="material-symbols-outlined text-gray-400">school</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{edu.institution}</h4>
                        <p className="text-xs text-gray-500 font-medium">{edu.degree} - {edu.focus}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Graduated: {edu.year} {edu.cgpa && `• CGPA: ${edu.cgpa}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {profile?.workmode && profile.workmode.length > 0 && (
              <section className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Work Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-2">Preferred Work Mode:</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.workmode.map((mode, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                  {profile.preferredlocation && (
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Preferred Location:</p>
                      <p className="text-sm text-gray-700 mt-1">{profile.preferredlocation}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto px-10 pt-16 pb-32 custom-scrollbar">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Professional Details</h2>
            
            {profile?.coreskills && profile.coreskills.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.coreskills.map((skill, index) => (
                    <span key={index} className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Info</h3>
              <div className="space-y-4">
                {profile?.dob && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Date of Birth</span>
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(profile.dob).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {profile?.gender && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Gender</span>
                    <span className="text-xs text-gray-400 font-medium capitalize">{profile.gender}</span>
                  </div>
                )}
                {profile?.pincode && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Postal Code</span>
                    <span className="text-xs text-gray-400 font-medium">{profile.pincode}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Info</h3>
              <div className="space-y-4">
                {user?.email && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                )}
                {profile?.linkedin && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="material-symbols-outlined text-lg">link</span>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 underline">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {profile?.portfolio && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="material-symbols-outlined text-lg">language</span>
                    <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 underline">
                      Portfolio
                    </a>
                  </div>
                )}
              </div>
            </div>

            {profile?.resumecv && (
              <div className="mb-10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Resume</h3>
                <a 
                  href={profile.resumecv} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
                >
                  <span className="material-symbols-outlined text-blue-600">description</span>
                  <span className="text-sm font-medium text-gray-700 flex-1">View Resume</span>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-blue-600 transition-colors">open_in_new</span>
                </a>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <div className="w-full max-w-xs">
              <button 
                onClick={handleEditProfile}
                className="w-full h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl flex items-center justify-center space-x-2"
              >
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
