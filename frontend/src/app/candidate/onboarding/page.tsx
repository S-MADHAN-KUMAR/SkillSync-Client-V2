"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    email: string;
    fullName: string;
    userType: "candidate" | "employer";
    is_onboarded: boolean;
}

interface Education {
    institution: string;
    degree: string;
    focus: string;
    year: string;
    cgpa: string;
}

export default function CandidateOnboarding() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const hasChecked = useRef(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Professional Info
        jobTitle: "",
        skills: ["UI DESIGN", "FIGMA", "REACT"],
        resume: null as File | null,
        // Step 2: Personal Details
        dob: "",
        gender: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        linkedin: "",
        portfolio: "",
        // Step 3: Professional Details
        experienceStatus: "experienced",
        totalExperience: "2-4 Years",
        currentTitle: "",
        currentCompany: "",
        noticePeriod: "Immediate",
        expectedSalary: "",
        preferredLocation: "",
        workMode: ["Remote", "Hybrid"],
        // Step 4: Education
        education: [
            { institution: "Stanford University", degree: "Bachelor of Science", focus: "Computer Science", year: "2023", cgpa: "3.9/4.0" }
        ] as Education[]
    });

    const resumeRef = useRef<HTMLInputElement>(null);
    const profileRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);
    const [skillInput, setSkillInput] = useState("");

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
                router.push("/employer/onboarding");
                return;
            }
            setUser(userData);
        } catch {
            router.push("/login");
        }
    }, [router]);

    const handleNext = async () => {
        // Save at every step
        await saveStepProfile();

        if (step < 4) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const saveStepProfile = async () => {
        if (!user) return;

        try {
            const profileData: any = {};

            // Map data based on what's available
            if (step === 1) {
                profileData.jobtitle = formData.jobTitle;
                profileData.coreskills = formData.skills;
                profileData.resumecv = (formData as any).resumeBase64 || "";
            } else if (step === 2) {
                profileData.profileimage = (formData as any).profileImage || "";
                profileData.bannerimage = (formData as any).bannerImage || "";
                profileData.dob = formData.dob || null;
                profileData.gender = formData.gender;
                profileData.city = formData.city;
                profileData.state = formData.state;
                profileData.country = formData.country;
                profileData.pincode = formData.pincode;
            } else if (step === 3) {
                profileData.experiencestatus = formData.experienceStatus;
                profileData.totalexperience = formData.totalExperience;
                profileData.currentcompany = formData.currentCompany;
                profileData.expectedsalary = formData.expectedSalary;
                profileData.noticeperiod = formData.noticePeriod;
                profileData.workmode = formData.workMode;
            } else if (step === 4) {
                profileData.education = formData.education;
            }

            const response = await fetch(`http://localhost:3000/api/candidates/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                console.error("Step save failed");
            }
        } catch (error) {
            console.error("Error in saveStepProfile:", error);
        }
    };

    const handleComplete = async () => {
        if (!user) return;

        try {
            // Final save for the last step
            await saveStepProfile();

            // 2. Mark User as Onboarded
            const userResponse = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    is_onboarded: true
                }),
            });

            if (userResponse.ok) {
                const updatedUser = { ...user, is_onboarded: true };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                router.push("/candidate/dashboard");
            }
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
            // Optionally show an error toast here
        }
    };

    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(skillInput.trim().toUpperCase())) {
                setFormData({ ...formData, skills: [...formData.skills, skillInput.trim().toUpperCase()] });
            }
            setSkillInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
    };

    const toggleWorkMode = (mode: string) => {
        if (formData.workMode.includes(mode)) {
            setFormData({ ...formData, workMode: formData.workMode.filter(m => m !== mode) });
        } else {
            setFormData({ ...formData, workMode: [...formData.workMode, mode] });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "resume" | "logo" | "banner") => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (field === "resume") {
            setFormData({ ...formData, resume: file });
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update based on field name in State
                if (field === "logo") setFormData({ ...formData, logo: reader.result as string } as any);
                if (field === "banner") setFormData({ ...formData, banner: reader.result as string } as any);
                // Note: Candidate state uses profileImage and bannerImage in some places, 
                // but let's check current Candidate state labels.
            };
            reader.readAsDataURL(file);
        }
    };

    // Candidate Specific File Handlers
    const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, resume: file, resumeBase64: reader.result as string } as any));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result as string } as any));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, bannerImage: reader.result as string } as any));
            };
            reader.readAsDataURL(file);
        }
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { institution: "", degree: "", focus: "", year: "2024", cgpa: "" }]
        });
    };

    const removeEducation = (index: number) => {
        setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== index)
        });
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const newEdu = [...formData.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        setFormData({ ...formData, education: newEdu });
    };

    if (!user) return null;

    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-6 font-display">
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style jsx global>{`
                .registration-container {
                    background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
                .neon-glow-btn {
                    box-shadow: 0 0 15px rgba(193, 231, 209, 0.15);
                }
                .neon-glow-btn:hover {
                    box-shadow: 0 0 25px rgba(193, 231, 209, 0.3);
                }
            `}</style>

            <div className="registration-container w-full max-w-5xl h-[90vh] rounded-[3.5rem] overflow-hidden flex shadow-2xl border border-white/5">

                {/* Sidebar Section */}
                <div className="hidden lg:flex w-5/12 bg-[#1a1a1a] p-12 flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className="size-10 bg-[#c1e7d1] rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-black font-bold">work</span>
                            </div>
                            <span className="text-white font-extrabold text-xl tracking-tight">SkillSync</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white leading-tight">
                            {step === 2 ? (
                                <>Complete your <span className="text-[#f9e8b1]">identity</span>.</>
                            ) : (
                                <>Build your <span className="text-[#f6c3cc]">future</span> profile.</>
                            )}
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-sm leading-relaxed">
                            {step === 1 && "Complete your professional profile to unlock personalized job recommendations."}
                            {step === 2 && "Personal details help us verify your profile and connect you with global opportunities."}
                            {step === 3 && "This helps us match you with the right opportunities at top companies."}
                            {step === 4 && "Adding your education helps employers understand your academic background and foundations."}
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
                            <div className={`size-12 rounded-2xl flex items-center justify-center ${step === 2 ? 'bg-[#f9e8b1]/20' : 'bg-[#c1e7d1]/20'}`}>
                                <span className={`material-symbols-outlined ${step === 2 ? 'text-[#f9e8b1]' : 'text-[#c1e7d1]'}`}>
                                    {step === 2 ? 'badge' : 'verified_user'}
                                </span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold uppercase tracking-wider">
                                    {step === 2 ? 'Identity Verified' : 'Profile Strength'}
                                </p>
                                <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${step === 2 ? 'bg-[#f9e8b1] shadow-[0_0_8px_rgba(249,232,177,0.5)]' : 'bg-[#c1e7d1]'}`}
                                        style={{ width: `${(step / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80 translate-x-12">
                            <div className={`size-12 rounded-full flex items-center justify-center overflow-hidden border border-white/20 ${step === 2 ? 'bg-[#f6c3cc]' : 'bg-[#f9e8b1]'}`}>
                                <img
                                    alt="User"
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                                />
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">{user.fullName}</p>
                                <p className="text-gray-400 text-xs italic">
                                    {step === 4 ? "Almost there!" : "Completing profile..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-24 -left-24 size-80 bg-[#c1e7d1]/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-24 -right-24 size-80 bg-[#f6c3cc]/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-7/12 p-10 lg:p-14 flex flex-col justify-start bg-black/40 overflow-y-auto custom-scrollbar">
                    <div className="max-w-xl mx-auto w-full">

                        {/* Progress Stepper */}
                        <div className="flex items-center gap-3 mb-10">
                            {[1, 2, 3, 4].map(s => (
                                <div
                                    key={s}
                                    className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#c1e7d1] shadow-[0_0_10px_rgba(193,231,209,0.3)]' : 'bg-white/10'}`}
                                ></div>
                            ))}
                        </div>

                        {/* Step 1: Professional Info */}
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Professional Info</h2>
                                    <p className="text-gray-500 font-medium">Help us tailor your career opportunities.</p>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Desired Job Title</label>
                                        <input
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                            placeholder="e.g. Senior Product Designer"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Core Skills</label>
                                        <div className="flex flex-wrap gap-2 p-3 bg-[#262626] rounded-2xl min-h-[110px] content-start">
                                            {formData.skills.map(skill => (
                                                <span key={skill} className="bg-[#c1e7d1]/10 text-[#c1e7d1] text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#c1e7d1]/20">
                                                    {skill}
                                                    <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-xs cursor-pointer">close</span>
                                                </span>
                                            ))}
                                            <input
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={addSkill}
                                                className="bg-transparent border-none focus:ring-0 text-white text-sm font-medium py-1 px-2 flex-grow min-w-[100px]"
                                                placeholder="Add skill..."
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Resume / CV</label>
                                        <input
                                            type="file"
                                            ref={resumeRef}
                                            onChange={handleResumeSelect}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <div
                                            onClick={() => resumeRef.current?.click()}
                                            className="border-2 border-dashed border-white/10 hover:border-[#c1e7d1]/50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group"
                                        >
                                            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#c1e7d1]/10 transition-colors">
                                                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#c1e7d1]">
                                                    {formData.resume ? "check_circle" : "cloud_upload"}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-white text-sm font-bold">
                                                    {formData.resume ? formData.resume.name : "Drag and drop file"}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">PDF or DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Personal Details */}
                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Personal Details</h2>
                                    <p className="text-gray-500 font-medium text-sm">Let recruiters know who you are beyond your skills.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Profile & Banner</label>
                                        <input type="file" ref={bannerRef} onChange={handleBannerSelect} className="hidden" accept="image/*" />
                                        <input type="file" ref={profileRef} onChange={handleProfileSelect} className="hidden" accept="image/*" />

                                        <div className="relative">
                                            <div
                                                onClick={() => bannerRef.current?.click()}
                                                className="w-full h-32 rounded-3xl bg-[#262626] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group hover:border-[#f6c3cc]/50 transition-colors cursor-pointer"
                                            >
                                                {(formData as any).bannerImage ? (
                                                    <img src={(formData as any).bannerImage} className="w-full h-full object-cover" alt="Banner" />
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-gray-600 group-hover:text-[#f6c3cc]">add_a_photo</span>
                                                        <p className="absolute bottom-2 right-4 text-[10px] text-gray-500 font-bold uppercase">Upload Banner</p>
                                                    </>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-6 left-8">
                                                <div
                                                    onClick={() => profileRef.current?.click()}
                                                    className="size-20 rounded-2xl bg-[#1a1a1a] border-4 border-black flex items-center justify-center overflow-hidden group hover:border-[#c1e7d1]/50 transition-colors cursor-pointer relative"
                                                >
                                                    {(formData as any).profileImage ? (
                                                        <img src={(formData as any).profileImage} className="w-full h-full object-cover" alt="Profile" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-gray-600 group-hover:text-[#c1e7d1]">person_add</span>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-12">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Date of Birth</label>
                                            <input
                                                value={formData.dob}
                                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-3.5 text-sm font-medium transition-all"
                                                type="date"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Gender</label>
                                            <select
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Address</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="bg-[#262626] border-none rounded-2xl px-5 py-3.5 text-sm text-white" placeholder="City" />
                                            <input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="bg-[#262626] border-none rounded-2xl px-5 py-3.5 text-sm text-white" placeholder="State" />
                                            <input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="bg-[#262626] border-none rounded-2xl px-5 py-3.5 text-sm text-white" placeholder="Country" />
                                            <input value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="bg-[#262626] border-none rounded-2xl px-5 py-3.5 text-sm text-white" placeholder="Pincode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Professional Details */}
                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Professional Details</h2>
                                    <p className="text-gray-500 font-medium">This helps us match you with the right opportunities.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Experience Status</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio" name="status" value="fresher"
                                                    checked={formData.experienceStatus === "fresher"}
                                                    onChange={() => setFormData({ ...formData, experienceStatus: "fresher" })}
                                                    className="peer sr-only"
                                                />
                                                <div className="p-4 bg-[#262626] border border-transparent rounded-2xl text-center transition-all peer-checked:border-[#c1e7d1]/50 peer-checked:bg-[#c1e7d1]/5">
                                                    <span className="text-sm font-bold text-gray-400 peer-checked:text-[#c1e7d1]">Fresher</span>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio" name="status" value="experienced"
                                                    checked={formData.experienceStatus === "experienced"}
                                                    onChange={() => setFormData({ ...formData, experienceStatus: "experienced" })}
                                                    className="peer sr-only"
                                                />
                                                <div className="p-4 bg-[#262626] border border-transparent rounded-2xl text-center transition-all peer-checked:border-[#c1e7d1]/50 peer-checked:bg-[#c1e7d1]/5">
                                                    <span className="text-sm font-bold text-gray-400 peer-checked:text-[#c1e7d1]">Experienced</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Total Experience</label>
                                            <select className="w-full bg-[#262626] border-none text-white rounded-2xl px-5 py-4 text-sm appearance-none">
                                                <option>2-4 Years</option>
                                                <option>0-1 Year</option>
                                                <option>7+ Years</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Current Company</label>
                                            <input value={formData.currentCompany} onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })} className="w-full bg-[#262626] border-none rounded-2xl px-5 py-4 text-sm text-white" placeholder="e.g. Google" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Expected Salary (Annual)</label>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                                <input value={formData.expectedSalary} onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })} className="w-full bg-[#262626] border-none rounded-2xl pl-10 pr-5 py-4 text-sm text-white" placeholder="e.g. 120,000" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Notice Period</label>
                                            <select className="w-full bg-[#262626] border-none text-white rounded-2xl px-5 py-4 text-sm">
                                                <option>Immediate</option>
                                                <option>30 Days</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Work Mode</label>
                                        <div className="flex gap-3">
                                            {["Remote", "Hybrid", "On-site"].map(mode => (
                                                <div
                                                    key={mode}
                                                    onClick={() => toggleWorkMode(mode)}
                                                    className={`px-6 py-3 rounded-full text-sm font-bold cursor-pointer transition-all border ${formData.workMode.includes(mode) ? 'bg-[#f6c3cc]/10 border-[#f6c3cc]/30 text-[#f6c3cc]' : 'bg-[#262626] border-transparent text-gray-400'}`}
                                                >
                                                    {mode}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Education */}
                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Education History</h2>
                                    <p className="text-gray-500 font-medium text-sm">List your academic achievements.</p>
                                </div>
                                <div className="space-y-6 max-h-[45vh] overflow-y-auto pr-4 custom-scrollbar">
                                    {formData.education.map((edu, idx) => (
                                        <div key={idx} className="relative p-6 bg-white/5 rounded-3xl border border-white/10 group">
                                            <button onClick={() => removeEducation(idx)} className="absolute top-4 right-4 text-gray-500 hover:text-[#f6c3cc] transition-colors">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="col-span-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Institution</label>
                                                    <input value={edu.institution} onChange={(e) => updateEducation(idx, 'institution', e.target.value)} className="w-full bg-[#262626] border-none rounded-2xl px-5 py-4 text-sm text-white" placeholder="Stanford University" />
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Degree</label>
                                                    <input value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} className="w-full bg-[#262626] border-none rounded-2xl px-5 py-4 text-sm text-white" placeholder="B.S." />
                                                </div>
                                                <div className="col-span-1">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Focus</label>
                                                    <input value={edu.focus} onChange={(e) => updateEducation(idx, 'focus', e.target.value)} className="w-full bg-[#262626] border-none rounded-2xl px-5 py-4 text-sm text-white" placeholder="CS" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-[#c1e7d1]/20 rounded-3xl flex items-center justify-center gap-2 text-[#c1e7d1] font-bold text-sm uppercase tracking-wider hover:bg-[#c1e7d1]/5 transition-all neon-glow-btn">
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Add Education
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 pt-10">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                {step === 4 ? "Complete Profile" : "Save & Continue"}
                            </button>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-600">
                            Step {step} of 4 • {step === 4 ? "Finalizing setup" : "Your privacy is important to us."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
