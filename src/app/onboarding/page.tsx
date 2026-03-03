"use client";

import React, { useState } from "react";
import Link from "next/link";

type OnboardData = {
  fullName?: string;
  title?: string;
  email?: string;
  mobile?: string;
  skills?: string[];
  resume?: string;
  experience?: string;
  currentCompany?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  preferredLocation?: string;
  workMode?: string[];
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardData>({});

  function update(fields: Partial<OnboardData>) {
    setData((d) => ({ ...d, ...fields }));
  }

  function next() {
    setStep((s) => Math.min(6, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleFinish(e: React.FormEvent) {
    e.preventDefault();
    // TODO: submit to API
    // eslint-disable-next-line no-console
    console.log("Onboarding complete", data);
    next();
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black">
      <div className="registration-container w-full max-w-6xl h-[90vh] rounded-5xl overflow-hidden flex shadow-2xl border border-white/5">
        <div className="hidden lg:flex w-5/12 bg-reg-card p-12 flex-col justify-between relative overflow-hidden rounded-l-5xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="size-10 bg-accent-green rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold">work</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">SkillSync</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">Build your future profile.</h1>
            <p className="text-gray-400 mt-6 text-lg max-w-sm">Complete your professional profile to unlock personalized job recommendations.</p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
              <div className="size-12 rounded-2xl bg-accent-green/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-green">verified_user</span>
              </div>
              <div>
                <p className="text-white text-sm font-bold">Profile Strength</p>
                <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2">
                  <div className="w-3/4 h-full bg-accent-green rounded-full" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80 translate-x-12">
              <div className="size-12 rounded-full bg-accent-yellow flex items-center justify-center overflow-hidden">
                <img alt="User" className="w-full h-full object-cover" src="/vercel.svg" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Welcome!</p>
                <p className="text-gray-400 text-xs italic">Let's set up your profile</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-10 lg:p-14 flex flex-col justify-start bg-black/40 overflow-y-auto custom-scrollbar rounded-r-5xl">
          <div className="max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-accent-green' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-accent-green' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-accent-green' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1.5 rounded-full ${step >= 4 ? 'bg-accent-green' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1.5 rounded-full ${step >= 5 ? 'bg-accent-green' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1.5 rounded-full ${step >= 6 ? 'bg-accent-green' : 'bg-white/10'}`} />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-2">{step === 6 ? 'All Set!' : step === 5 ? 'Review & Submit' : step === 4 ? 'Preferences' : step === 3 ? 'Skills & Resume' : step === 2 ? 'Professional Details' : 'Basic Info'}</h2>
              <p className="text-gray-500 font-medium">{step === 6 ? 'Your profile is ready.' : 'Follow the steps to complete your onboarding.'}</p>
            </div>

            <form onSubmit={handleFinish} className="space-y-6">
              {step === 1 && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input name="fullName" value={data.fullName ?? ''} onChange={(e) => update({ fullName: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="George Wilson" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Desired Job Title</label>
                  <input name="title" value={data.title ?? ''} onChange={(e) => update({ title: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. Senior Product Designer" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Email</label>
                  <input name="email" value={data.email ?? ''} onChange={(e) => update({ email: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="you@example.com" />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Total Experience</label>
                  <select value={data.experience ?? ''} onChange={(e) => update({ experience: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm appearance-none">
                    <option value="">Select</option>
                    <option>0-1 Year</option>
                    <option>1-2 Years</option>
                    <option>2-4 Years</option>
                    <option>4-7 Years</option>
                    <option>7+ Years</option>
                  </select>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Current Job Title</label>
                  <input value={data.currentCompany ?? ''} onChange={(e) => update({ currentCompany: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. Senior UI Designer" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Notice Period</label>
                  <select value={data.noticePeriod ?? ''} onChange={(e) => update({ noticePeriod: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm">
                    <option value="">Select</option>
                    <option>Immediate</option>
                    <option>15 Days</option>
                    <option>30 Days</option>
                    <option>60 Days</option>
                    <option>90 Days</option>
                  </select>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Core Skills</label>
                  <input value={(data.skills || []).join(', ')} onChange={(e) => update({ skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="Add skills comma separated" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Resume (URL or filename)</label>
                  <input value={data.resume ?? ''} onChange={(e) => update({ resume: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="https://... or resume.pdf" />
                </div>
              )}

              {step === 4 && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Preferred Location</label>
                  <input value={data.preferredLocation ?? ''} onChange={(e) => update({ preferredLocation: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. San Francisco / Remote" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Expected Salary</label>
                  <input value={data.expectedSalary ?? ''} onChange={(e) => update({ expectedSalary: e.target.value })} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-green/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. 120,000" />
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1 mt-4">Work Mode</label>
                  <div className="flex gap-3">
                    {['Remote','Hybrid','On-site'].map(mode => (
                      <label key={mode} className="cursor-pointer">
                        <input type="checkbox" checked={(data.workMode||[]).includes(mode)} onChange={(e)=>{
                          const prev = data.workMode||[];
                          if(e.target.checked) update({ workMode: [...prev, mode] }); else update({ workMode: prev.filter(m=>m!==mode) });
                        }} className="peer sr-only" />
                        <div className="px-6 py-3 bg-input-bg border border-transparent rounded-full text-sm font-bold text-gray-400 peer-checked:bg-accent-pink/10 peer-checked:border-accent-pink/30 peer-checked:text-accent-pink">{mode}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Review your info</h3>
                  <pre className="bg-input-bg p-4 rounded-lg text-xs text-white overflow-auto">{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}

              {step === 6 && (
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold text-accent-green mb-4">You're all set 🎉</h3>
                  <p className="text-gray-400 mb-6">Your profile has been created. You can edit details later from your dashboard.</p>
                  <div className="flex justify-center gap-3">
                    <Link href="/" className="px-6 py-3 bg-white text-black rounded-full font-bold">Go to Home</Link>
                    <Link href="/register" className="px-6 py-3 bg-white/5 text-white rounded-full">Edit Profile</Link>
                  </div>
                </div>
              )}

              {step < 6 && (
                <div className="flex items-center gap-4 pt-6">
                  <button type="button" onClick={back} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-widest border border-white/5">Back</button>
                  {step < 5 ? (
                    <button type="button" onClick={next} className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-widest">Continue</button>
                  ) : (
                    <button type="submit" className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-widest">Finish</button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
