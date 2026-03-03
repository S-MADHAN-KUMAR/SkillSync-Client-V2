"use client";

import Link from "next/link";

export default function CompaniesCandidate() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <aside className="w-[280px] bg-[var(--deep-charcoal)] flex flex-col items-center py-10 text-white shrink-0">
          <div className="mb-8 flex flex-col items-center text-center px-4">
            <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
              <img alt="User Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
            </div>
            <h2 className="text-xl font-bold">Hi, George!</h2>
            <p className="text-xs text-gray-400 mt-1">Discover your next dream company.</p>
          </div>
          <nav className="flex-1 w-full px-6 space-y-2">
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Feed</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">mail</span>
              <span className="font-medium text-sm flex-1">Messages</span>
              <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 bg-white/10 rounded-2xl text-white" href="#">
              <span className="material-symbols-outlined">domain</span>
              <span className="font-medium text-sm">Companies</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">group</span>
              <span className="font-medium text-sm">Network</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">notifications</span>
              <span className="font-medium text-sm">Notifications</span>
            </a>
          </nav>
          <div className="mt-auto w-full px-8 pb-8 flex flex-col items-center">
            <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        </aside>

        <main className="w-[720px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Top Companies for You</h1>
            <div className="flex space-x-8 text-sm font-semibold border-b border-gray-200">
              <button className="text-black border-b-2 border-black pb-4">Recommended</button>
              <button className="text-gray-400 pb-4 hover:text-gray-600 transition-colors">Following</button>
              <button className="text-gray-400 pb-4 hover:text-gray-600 transition-colors">Trending</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            <div className="grid grid-cols-2 gap-6 mt-4">
              <Link href="/companies/greenroot" className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                <div className="w-full h-24 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                  <img alt="Banner" className="w-full h-full object-cover opacity-50 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 -mt-8 shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <img alt="Logo" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">TechFlow Systems</h4>
                  <p className="text-sm text-gray-500 font-medium">Tech &amp; Innovation</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <span className="material-symbols-outlined text-sm mr-1">groups</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">10,000+ employees</span>
                  </div>
                  <div className="mt-8">
                    <button className="bg-[var(--deep-charcoal)] text-white text-sm font-bold w-full py-3 rounded-2xl hover:bg-black transition-colors">Follow</button>
                  </div>
                </div>
              </Link>

              <Link href="/companies/greenroot" className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                <div className="w-full h-24 bg-gradient-to-r from-emerald-400 to-teal-500 relative">
                  <img alt="Banner" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 -mt-8 shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-black text-xl">GR</div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">GreenRoot</h4>
                  <p className="text-sm text-gray-500 font-medium">Sustainable Energy</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <span className="material-symbols-outlined text-sm mr-1">groups</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">2,500+ employees</span>
                  </div>
                  <div className="mt-8">
                    <button className="bg-[var(--deep-charcoal)] text-white text-sm font-bold w-full py-3 rounded-2xl hover:bg-black transition-colors">Follow</button>
                  </div>
                </div>
              </Link>

              <Link href="/companies/greenroot" className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                <div className="w-full h-24 bg-gradient-to-r from-purple-400 to-pink-500 relative">
                  <img alt="Banner" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 -mt-8 shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-black text-xl">NV</div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Nova Vision</h4>
                  <p className="text-sm text-gray-500 font-medium">AI &amp; Robotics</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <span className="material-symbols-outlined text-sm mr-1">groups</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">500+ employees</span>
                  </div>
                  <div className="mt-8">
                    <button className="bg-[var(--deep-charcoal)] text-white text-sm font-bold w-full py-3 rounded-2xl hover:bg-black transition-colors">Follow</button>
                  </div>
                </div>
              </Link>

              <Link href="/companies/greenroot" className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                <div className="w-full h-24 bg-gradient-to-r from-orange-400 to-red-400 relative">
                  <img alt="Banner" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 -mt-8 shadow-md mb-4 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-black text-xl">ZP</div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Zenith Pay</h4>
                  <p className="text-sm text-gray-500 font-medium">Fintech Solutions</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <span className="material-symbols-outlined text-sm mr-1">groups</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider">1,200+ employees</span>
                  </div>
                  <div className="mt-8">
                    <button className="bg-[var(--deep-charcoal)] text-white text-sm font-bold w-full py-3 rounded-2xl hover:bg-black transition-colors">Follow</button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="p-10 pb-32 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-md mx-auto space-y-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Company Spotlight</h2>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Search companies..." type="text" />
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <span className="material-symbols-outlined text-lg mr-2 text-blue-500">domain</span> Industry
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full cursor-pointer hover:bg-blue-100 transition-colors">Software</span>
                    <span className="px-4 py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded-full cursor-pointer hover:bg-purple-100 transition-colors">Design</span>
                    <span className="px-4 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-full cursor-pointer hover:bg-green-100 transition-colors">Finance</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-full cursor-pointer hover:bg-orange-100 transition-colors">Healthcare</span>
                    <span className="px-4 py-2 bg-pink-50 text-pink-600 text-xs font-bold rounded-full cursor-pointer hover:bg-pink-100 transition-colors">Retail</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <span className="material-symbols-outlined text-lg mr-2 text-red-500">groups_3</span> Company Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-full cursor-pointer hover:bg-red-100 transition-colors">1-50</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">51-200</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">201-500</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">500+</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                    <span className="material-symbols-outlined text-lg mr-2 text-yellow-500">laptop_mac</span> Work Mode
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full cursor-pointer hover:bg-yellow-100 transition-colors">Remote First</span>
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full cursor-pointer hover:bg-indigo-100 transition-colors">On-site</span>
                    <span className="px-4 py-2 bg-teal-50 text-teal-700 text-xs font-bold rounded-full cursor-pointer hover:bg-teal-100 transition-colors">Hybrid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <button className="w-full max-w-xs h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-3">
              <span className="material-symbols-outlined">work</span>
              <span>View Jobs from Following</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
