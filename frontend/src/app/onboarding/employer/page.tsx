"use client";

import React, { useState } from "react";

type EmployerData = {
  legalName?: string;
  brandName?: string;
  industry?: string;
  banner?: string;
  logo?: string;
  overview?: string;
  hiringNeeds?: string;
  billingEmail?: string;
};

export default function EmployerOnboarding() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<EmployerData>({});

  function update(fields: Partial<EmployerData>) {
    setData((d) => ({ ...d, ...fields }));
  }

  function next() {
    setStep((s) => Math.min(4, s + 1));
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // mock save
    setTimeout(() => {
      setSaving(false);
      next();
    }, 600);
  }

  function handleFinish(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // final submit (TODO: API)
    // eslint-disable-next-line no-console
    console.log("Employer onboarding complete", data);
    setTimeout(() => {
      setSaving(false);
      setStep(4);
    }, 800);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black">
      <div className="registration-container w-full max-w-6xl h-[90vh] rounded-5xl overflow-hidden flex shadow-2xl border border-white/5">
        <div className="hidden lg:flex w-5/12 bg-reg-card p-12 flex-col justify-between relative overflow-hidden rounded-l-5xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="size-10 bg-accent-pink rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold">business_center</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">SkillSync <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded ml-2 font-medium">Business</span></span>
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">Build your <span className="text-accent-green">brand</span> identity.</h1>
            <p className="text-gray-400 mt-6 text-lg max-w-sm">Attract top talent with a compelling company profile. First impressions matter.</p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-4 w-80">
              <div className="size-12 rounded-2xl bg-accent-pink/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-pink">rocket_launch</span>
              </div>
              <div>
                <p className="text-white text-sm font-bold">Company Strength</p>
                <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2">
                  <div className="w-1/4 h-full bg-accent-pink rounded-full" />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-3 w-72 translate-x-12">
              <div className="size-10 rounded-xl bg-accent-yellow/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent-yellow text-xl">star</span>
              </div>
              <p className="text-white text-xs font-medium">92% higher reach with a banner</p>
            </div>
          </div>

          <div className="absolute -bottom-24 -left-24 size-80 bg-accent-pink/10 blur-[100px] rounded-full" />
          <div className="absolute -top-24 -right-24 size-80 bg-accent-green/10 blur-[100px] rounded-full" />
        </div>

        <div className="w-full lg:w-7/12 p-8 lg:p-14 flex flex-col justify-start bg-black/40 overflow-y-auto custom-scrollbar rounded-r-5xl">
          <div className="max-w-xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-accent-pink' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-accent-pink' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-accent-pink' : 'bg-white/10'}`} />
              <div className={`flex-1 h-1 rounded-full ${step >= 4 ? 'bg-accent-pink' : 'bg-white/10'}`} />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-2">{step === 1 ? 'Branding & Basics' : step === 2 ? 'Company Profile' : step === 3 ? 'Hiring Preferences' : 'Billing & Review'}</h2>
              <p className="text-gray-500 font-medium text-sm">{step === 1 ? 'Set up your public-facing company presence.' : 'Provide company details and overview.'}</p>
            </div>

            {step === 1 && (
              <form onSubmit={handleSave} className="space-y-8">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Brand Assets</label>
                  <div className="relative w-full h-44 rounded-3xl overflow-hidden bg-input-bg border-2 border-dashed border-white/10 hover:border-accent-pink/50 transition-all cursor-pointer group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-gray-500 group-hover:text-accent-pink transition-colors">add_a_photo</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Upload Banner</span>
                    </div>
                    <img alt="Banner Preview" className="w-full h-full object-cover opacity-30" src="/vercel.svg" />
                  </div>

                  <div className="absolute -bottom-6 left-8 group">
                    <div className="size-24 rounded-full bg-reg-card p-1.5 ring-4 ring-black/40 shadow-xl">
                      <div className="w-full h-full rounded-full bg-input-bg border-2 border-dashed border-white/20 hover:border-accent-pink/50 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative">
                        <span className="material-symbols-outlined text-gray-500 text-lg group-hover:text-accent-pink">add</span>
                        <span className="text-[8px] font-bold text-gray-500 uppercase">Logo</span>
                        <img alt="Logo Preview" className="absolute inset-0 w-full h-full object-cover opacity-0" src="/vercel.svg" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Legal Company Name</label>
                    <input value={data.legalName ?? ''} onChange={(e)=>update({legalName: e.target.value})} name="legalName" className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm font-medium" placeholder="e.g. Acme Corporation Ltd." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Brand Name</label>
                    <input value={data.brandName ?? ''} onChange={(e)=>update({brandName: e.target.value})} name="brandName" className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm font-medium" placeholder="e.g. Acme" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Industry</label>
                    <select value={data.industry ?? ''} onChange={(e)=>update({industry: e.target.value})} name="industry" className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm font-medium appearance-none">
                      <option value="">Select industry</option>
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button type="button" onClick={()=>{/* cancel */}} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5">Cancel</button>
                  <button type="submit" className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(246,195,204,0.2)]">{saving ? 'Saving...' : 'Save & Continue'}</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={(e)=>{e.preventDefault(); next();}} className="space-y-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Company Overview</label>
                <textarea value={data.overview ?? ''} onChange={(e)=>update({overview: e.target.value})} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm h-36" placeholder="Write a short description about your company" />

                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Hiring Needs</label>
                <input value={data.hiringNeeds ?? ''} onChange={(e)=>update({hiringNeeds: e.target.value})} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. 2 frontend engineers, 1 product designer" />

                <div className="flex items-center gap-4 pt-4">
                  <button type="button" onClick={back} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5">Back</button>
                  <button type="submit" className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide">Save & Continue</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={(e)=>{e.preventDefault(); next();}} className="space-y-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Preferred Candidate Location</label>
                <input className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. Remote / San Francisco" />

                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Interview Availability</label>
                <input className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="e.g. Weekdays 9AM-5PM" />

                <div className="flex items-center gap-4 pt-4">
                  <button type="button" onClick={back} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5">Back</button>
                  <button type="submit" className="flex-[2] bg-white text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wide">Save & Continue</button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <h3 className="text-xl font-bold text-white">Billing & Review</h3>
                <p className="text-gray-400">Provide billing email and review your details before going live.</p>
                <input value={data.billingEmail ?? ''} onChange={(e)=>update({billingEmail: e.target.value})} className="w-full bg-input-bg border-none focus:ring-2 focus:ring-accent-pink/50 text-white rounded-2xl px-5 py-4 text-sm" placeholder="Billing email" />

                <pre className="bg-input-bg p-4 rounded-lg text-xs text-white overflow-auto">{JSON.stringify(data, null, 2)}</pre>

                <div className="flex items-center gap-4 pt-4">
                  <button type="button" onClick={back} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all text-sm uppercase tracking-wide border border-white/5">Back</button>
                  <button onClick={handleFinish} className="flex-[2] bg-accent-pink text-black font-extrabold py-4 rounded-2xl hover:brightness-105 transition-all text-sm uppercase tracking-wide">{saving ? 'Submitting...' : 'Finish & Publish'}</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
