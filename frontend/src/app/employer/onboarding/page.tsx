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

export default function EmployerOnboarding() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const hasChecked = useRef(false);

    // Refs for file uploads
    const logoRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Branding & Basics
        legalName: "",
        brandName: "",
        industry: "",
        logo: null as string | null,
        banner: null as string | null,
        // Step 2: Company Structure
        companyType: "",
        companySize: "1-10",
        foundedYear: "",
        websiteUrl: "",
        // Step 3: Headquarters
        hqCountry: "United States",
        hqState: "",
        hqCity: "",
        hqPincode: "",
        hqAddress: ""
    });

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
                router.push("/candidate/onboarding");
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

        if (step < 3) {
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

            if (step === 1) {
                profileData.companyname = formData.legalName;
                profileData.brandname = formData.brandName;
                profileData.industry = formData.industry;
                profileData.companylogo = formData.logo;
                profileData.companybanner = formData.banner;
            } else if (step === 2) {
                profileData.companytype = formData.companyType;
                profileData.companysize = formData.companySize;
                profileData.foundedyear = parseInt(formData.foundedYear) || null;
                profileData.website = formData.websiteUrl;
            } else if (step === 3) {
                profileData.country = formData.hqCountry;
                profileData.state = formData.hqState;
                profileData.city = formData.hqCity;
                profileData.pincode = formData.hqPincode;
                profileData.location = formData.hqAddress;
                profileData.ispublic = true;
            }

            const response = await fetch(`http://localhost:3000/api/employers/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                console.error("Employer step save failed");
            }
        } catch (error) {
            console.error("Error in saveStepProfile:", error);
        }
    };

    const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, banner: reader.result as string }));
            };
            reader.readAsDataURL(file);
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
                router.push("/employer");
            }
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
        }
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
                .pill-radio:checked + label {
                    background-color: #c1e7d1;
                    color: #000;
                    border-color: #c1e7d1;
                }
                .neon-glow {
                    box-shadow: 0 0 15px rgba(193, 231, 209, 0.2);
                }
                .neon-glow:hover {
                    box-shadow: 0 0 25px rgba(193, 231, 209, 0.4);
                }
            `}</style>

            <div className="registration-container w-full max-w-6xl h-[90vh] rounded-[3.5rem] overflow-hidden flex shadow-2xl border border-white/5">

                {/* Sidebar Section */}
                <div className="hidden lg:flex w-5/12 bg-[#1a1a1a] p-12 flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-12">
                            <div className={`size-10 ${step === 1 ? 'bg-[#f6c3cc]' : 'bg-[#c1e7d1]'} rounded-xl flex items-center justify-center`}>
                                <span className="material-symbols-outlined text-black font-bold">business_center</span>
                            </div>
                            <span className="text-white font-extrabold text-xl tracking-tight">HireFlow <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded ml-2 font-medium">Business</span></span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-white leading-tight">
                            {step === 1 && <>Build your <span className="text-[#c1e7d1]">brand</span> identity.</>}
                            {step === 2 && <>Scale your <span className="text-[#f6c3cc]">dream</span> team.</>}
                            {step === 3 && <>Establish your <span className="text-[#f6c3cc]">Global</span> Presence.</>}
                        </h1>
                        <p className="text-gray-400 mt-6 text-lg max-w-sm leading-relaxed">
                            {step === 1 && "Attract top talent with a compelling company profile. First impressions matter."}
                            {step === 2 && "Set up your company profile to start attracting the world's top talent."}
                            {step === 3 && "Define your headquarters and regional offices to attract talent from specific locations."}
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
                            <div className={`size-12 rounded-2xl ${step === 1 ? 'bg-[#f6c3cc]/20' : 'bg-[#c1e7d1]/20'} flex items-center justify-center`}>
                                <span className={`material-symbols-outlined ${step === 1 ? 'text-[#f6c3cc]' : 'text-[#c1e7d1]'}`}>
                                    {step === 1 ? 'rocket_launch' : step === 2 ? 'apartment' : 'public'}
                                </span>
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold uppercase tracking-wider">
                                    {step === 2 ? "Company Setup" : step === 3 ? "12+ Countries" : "Company Strength"}
                                </p>
                                <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${step === 1 ? 'bg-[#f6c3cc]' : 'bg-[#c1e7d1]'}`}
                                        style={{ width: `${(step / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-3 w-72 translate-x-12">
                            <div className="size-10 rounded-xl bg-[#f9e8b1]/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#f9e8b1] text-xl">star</span>
                            </div>
                            <p className="text-white text-xs font-medium">92% higher reach with a brand profile</p>
                        </div>
                    </div>

                    <div className="absolute -bottom-24 -left-24 size-80 bg-[#f6c3cc]/10 blur-[100px] rounded-full"></div>
                    <div className="absolute -top-24 -right-24 size-80 bg-[#c1e7d1]/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-7/12 p-8 lg:p-14 flex flex-col justify-start bg-black/40 overflow-y-auto custom-scrollbar transition-all duration-500">
                    <div className="max-w-xl mx-auto w-full">

                        {/* Progress Stepper */}
                        <div className="flex items-center gap-4 mb-10">
                            {[1, 2, 3].map(s => (
                                <div
                                    key={s}
                                    className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= s ? (step === 1 ? 'bg-[#f6c3cc]' : 'bg-[#c1e7d1]') : 'bg-white/10'}`}
                                ></div>
                            ))}
                        </div>

                        {/* Step 1: Branding & Basics */}
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Branding & Basics</h2>
                                    <p className="text-gray-500 font-medium text-sm">Set up your public-facing company presence.</p>
                                </div>
                                <div className="space-y-8">
                                    <div className="relative">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Brand Assets</label>

                                        <input type="file" ref={bannerRef} onChange={handleBannerSelect} className="hidden" accept="image/*" />
                                        <input type="file" ref={logoRef} onChange={handleLogoSelect} className="hidden" accept="image/*" />

                                        <div
                                            onClick={() => bannerRef.current?.click()}
                                            className="relative w-full h-44 rounded-3xl overflow-hidden bg-[#262626] border-2 border-dashed border-white/10 hover:border-[#f6c3cc]/50 transition-all cursor-pointer group"
                                        >
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                                <span className="material-symbols-outlined text-gray-500 group-hover:text-[#f6c3cc] transition-colors">add_a_photo</span>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Upload Banner</span>
                                            </div>
                                            {formData.banner && <img className="w-full h-full object-cover" src={formData.banner} alt="Banner" />}
                                        </div>
                                        <div className="absolute -bottom-6 left-8 group">
                                            <div className="size-24 rounded-full bg-[#1a1a1a] p-1.5 ring-4 ring-black/40 shadow-xl">
                                                <div
                                                    onClick={(e) => { e.stopPropagation(); logoRef.current?.click(); }}
                                                    className="w-full h-full rounded-full bg-[#262626] border-2 border-dashed border-white/20 hover:border-[#f6c3cc]/50 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative"
                                                >
                                                    <span className="material-symbols-outlined text-gray-500 text-lg group-hover:text-[#f6c3cc]">add</span>
                                                    <span className="text-[8px] font-bold text-gray-500 uppercase">Logo</span>
                                                    {formData.logo && <img className="absolute inset-0 w-full h-full object-cover" src={formData.logo} alt="Logo" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Legal Company Name</label>
                                            <input
                                                value={formData.legalName}
                                                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#f6c3cc]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="e.g. Acme Corporation Ltd."
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Brand Name</label>
                                            <input
                                                value={formData.brandName}
                                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#f6c3cc]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="e.g. Acme"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Industry</label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#f6c3cc]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select industry</option>
                                                <option>Technology</option>
                                                <option>Finance</option>
                                                <option>Healthcare</option>
                                                <option>Manufacturing</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Company Structure */}
                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Company Structure</h2>
                                    <p className="text-gray-500 font-medium text-sm">Tell us about your organization's foundation.</p>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Company Type</label>
                                        <select
                                            value={formData.companyType}
                                            onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                                            className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select company type</option>
                                            <option value="startup">Startup</option>
                                            <option value="private">Private Company</option>
                                            <option value="public">Public Company</option>
                                            <option value="mnc">MNC</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Company Size (Employees)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["1-10", "11-50", "51-200", "201-500", "500+"].map(size => (
                                                <div key={size} className="relative">
                                                    <input
                                                        type="radio" id={size} name="company_size"
                                                        className="hidden pill-radio"
                                                        checked={formData.companySize === size}
                                                        onChange={() => setFormData({ ...formData, companySize: size })}
                                                    />
                                                    <label htmlFor={size} className="px-4 py-2 bg-[#262626] border border-white/5 rounded-full text-xs font-bold text-gray-400 cursor-pointer hover:border-[#c1e7d1]/30 transition-all block">{size}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Founded Year</label>
                                            <input
                                                value={formData.foundedYear}
                                                onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="YYYY" type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Website URL</label>
                                            <input
                                                value={formData.websiteUrl}
                                                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="https://..." type="url"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Headquarters */}
                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Headquarters</h2>
                                    <p className="text-gray-500 font-medium text-sm">Tell us where your main operations are based.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Country</label>
                                            <select
                                                value={formData.hqCountry}
                                                onChange={(e) => setFormData({ ...formData, hqCountry: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-4 py-4 text-sm font-medium transition-all appearance-none"
                                            >
                                                <option>United States</option>
                                                <option>United Kingdom</option>
                                                <option>Germany</option>
                                                <option>Singapore</option>
                                                <option>India</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">State / Province</label>
                                            <input
                                                value={formData.hqState}
                                                onChange={(e) => setFormData({ ...formData, hqState: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="e.g. California" type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">City</label>
                                            <input
                                                value={formData.hqCity}
                                                onChange={(e) => setFormData({ ...formData, hqCity: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="e.g. San Francisco" type="text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Pincode / ZIP</label>
                                            <input
                                                value={formData.hqPincode}
                                                onChange={(e) => setFormData({ ...formData, hqPincode: e.target.value })}
                                                className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all"
                                                placeholder="94103" type="text"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Office Address</label>
                                        <textarea
                                            value={formData.hqAddress}
                                            onChange={(e) => setFormData({ ...formData, hqAddress: e.target.value })}
                                            className="w-full bg-[#262626] border-none focus:ring-2 focus:ring-[#c1e7d1]/50 text-white rounded-2xl px-5 py-4 text-sm font-medium transition-all h-24 resize-none"
                                            placeholder="Enter complete street address..."
                                        ></textarea>
                                    </div>
                                    <button className="w-full mt-2 py-6 border-2 border-dashed border-[#c1e7d1]/30 rounded-2xl flex items-center justify-center gap-3 group hover:border-[#c1e7d1]/60 transition-all neon-glow bg-[#c1e7d1]/5" type="button">
                                        <span className="material-symbols-outlined text-[#c1e7d1] group-hover:scale-110 transition-transform">add_location_alt</span>
                                        <span className="text-[#c1e7d1] font-bold text-sm uppercase tracking-wider">Add Multiple Office Locations</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 pt-10">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5"
                                >
                                    Back
                                </button>
                            ) : (
                                <button
                                    onClick={() => router.push("/login")}
                                    className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className={`flex-[2] ${step === 1 ? 'bg-white text-black' : 'bg-white text-black'} font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                            >
                                {step === 3 ? "Complete Business Profile" : "Save & Continue"}
                            </button>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-600 font-medium">
                            Step {step} of 3 • {step === 3 ? "Finalizing company setup" : "Your brand and details are secure."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
