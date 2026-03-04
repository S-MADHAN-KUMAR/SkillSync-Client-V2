import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black">
      <div className="registration-container w-full max-w-5xl  rounded-5xl overflow-hidden flex shadow-2xl border border-white/5">
        {/* Left Side: Creative Section */}
        <div className="hidden lg:flex w-1/2 bg-reg-card p-12 flex-col justify-between relative overflow-hidden rounded-l-5xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="size-10 bg-accent-green rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold">work</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">SkillSync</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Find your <span className="text-accent-green">dream</span> career today.
            </h1>
            <p className="text-gray-400 mt-6 text-lg max-w-sm">
              Join over 10,000+ professionals and companies building the future of work.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4 w-72">
              <div className="size-12 rounded-full bg-accent-pink flex items-center justify-center overflow-hidden">
                <Image
                  alt="SkillSync Logo"
                  src={IMAGES.logo}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white text-sm font-bold">New Offer</p>
                <p className="text-gray-400 text-xs">Product Designer at Spotify</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4 w-72 translate-x-8">
              <div className="size-12 rounded-full bg-accent-yellow flex items-center justify-center">
                <span className="material-symbols-outlined text-black">star</span>
              </div>
              <div>
                <p className="text-white text-sm font-bold">Success!</p>
                <p className="text-gray-400 text-xs">Your application was viewed</p>
              </div>
            </div>
          </div>

          {/* Decorative Blurs */}
          <div className="absolute -bottom-24 -left-24 size-80 bg-accent-green/10 blur-[100px] rounded-full"></div>
          <div className="absolute -top-24 -right-24 size-80 bg-accent-pink/10 blur-[100px] rounded-full"></div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-black/40 auth-panel rounded-r-5xl">
          <div className="max-w-md mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
