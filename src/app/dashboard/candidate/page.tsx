"use client";

export default function CandidateDashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <aside className="w-[280px] bg-[var(--deep-charcoal)] flex flex-col items-center py-10 text-white shrink-0">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
              <img alt="User Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
            </div>
            <h2 className="text-xl font-bold">Hi, George!</h2>
            <p className="text-xs text-gray-400 mt-1">Ready to make an impact?</p>
          </div>
          <nav className="flex-1 w-full px-6 space-y-2">
            <a className="flex items-center space-x-4 px-4 py-3 bg-white/10 rounded-2xl text-white transition-colors" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">mail</span>
              <span className="font-medium text-sm flex-1">Messages</span>
              <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">business_center</span>
              <span className="font-medium text-sm">Jobs</span>
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

        <main className="flex-1 bg-[var(--off-white)] flex flex-col border-r border-gray-200 overflow-hidden relative">
          <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Post</h2>
              <div className="bg-white p-6 rounded-[32px] shadow-sm">
                <div className="space-y-4">
                  <div>
                    <input className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Post Title" type="text" />
                  </div>
                  <div>
                    <textarea className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none h-24" placeholder="What's on your mind? Share your thoughts or achievements..."></textarea>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <button className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors shrink-0">
                      <span className="material-symbols-outlined">add_photo_alternate</span>
                    </button>
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative group cursor-pointer">
                      <span className="material-symbols-outlined text-gray-400">image</span>
                      <div className="absolute inset-0 bg-black/20 rounded-xl hidden group-hover:flex items-center justify-center">
                        <span className="material-symbols-outlined text-white">close</span>
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative group cursor-pointer">
                      <span className="material-symbols-outlined text-gray-400">image</span>
                    </div>
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 relative group cursor-pointer">
                      <span className="material-symbols-outlined text-gray-400">image</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-black transition-colors shadow-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">send</span>
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Total Applied</p>
                      <h3 className="text-3xl font-bold text-gray-900">42</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <span className="material-symbols-outlined">send</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-2 px-1">
                    <div className="w-full bg-blue-500 rounded-t-sm h-bar-1 opacity-40"></div>
                    <div className="w-full bg-blue-500 rounded-t-sm h-bar-2 opacity-60"></div>
                    <div className="w-full bg-blue-500 rounded-t-sm h-bar-3 opacity-50"></div>
                    <div className="w-full bg-blue-500 rounded-t-sm h-bar-4"></div>
                    <div className="w-full bg-blue-500 rounded-t-sm h-bar-5 opacity-70"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">Last 7 Days</p>
                </div>
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Profile Views</p>
                      <h3 className="text-3xl font-bold text-gray-900">1,208</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative">
                    <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                      <path d="M0,45 C20,40 40,10 60,25 S80,35 100,5" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="3"></path>
                      <circle cx="100" cy="5" fill="#ffffff" r="3" stroke="#4ade80" strokeWidth="2"></circle>
                    </svg>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    +12% this week
                  </p>
                </div>
                <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-56 justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Saved Items</p>
                      <h3 className="text-3xl font-bold text-gray-900">18</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                      <span className="material-symbols-outlined">bookmark</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                          <span className="material-symbols-outlined text-sm">work</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Jobs</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          <span className="material-symbols-outlined text-sm">article</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Posts</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-[380px] bg-[var(--preview-bg)] flex flex-col relative overflow-hidden border-l border-gray-100">
          <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3 mb-10">
              <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                    <span className="material-symbols-outlined">square</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">Middle UX/UI Designer</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Dropbox Inc.</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">Applied</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">$1.5k</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                    <span className="material-symbols-outlined">crop_din</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">Senior React Dev</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Spotify Inc.</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md">Remote</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">$3.2k</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">Product Manager</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Linear</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md">Contract</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-6 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Posts</h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer group">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img alt="Author" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8bWL2pjSvFph9iM9-Bd4s8sYYFtUqfRfRkD3sk_HD7fSpGf0MkqR1hLBklwLmAFrE7KdOcqscTZvd6rsshH7HhjnzqK35K2U1JgHKZ9xhYly9R5LmpxaQqXlaZnIY8H8bl5KRv8gm-ZC1FZQPK-PemjHEkNt9-8o3mKP-LsGql0NjHxCaqvSfZOoas-IDHl_f3ose9LmILOR3wb-p4j39MYxBgK5rdkUnsVDDUcm9tgmy9SVEQrqsf5ipOnsZVM3AXIc21prXuY" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-900">Sarah Jenkins</h4>
                      <span className="text-[10px] text-gray-400">2h ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">Just published a new case study on minimalist design systems for fintech apps. Check it out!</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-pink-50 text-pink-700 text-[10px] font-bold rounded-md">#Design</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-[20px] shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer group">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img alt="Author" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6zrUOgbKD3GLprvjHm1og1HuNnqoJiX2aZI_kejsCEyEPT76bAIdKTjyKvblGFbIpxACuC1IVPsKRBIOwwKqII3phrwLNQ-LRltTotZUSz9ajoUHpbQDkuhd2AgFS_TFTGAcOJ4s3tqDLMIltTSxezLyi34FVDebylZwQe0FasABXYc8sJAsj4SGrkK97mZlKAG7s5P7sFV9OXrbGYFAWhIsYfEqLtt0luxktnpVWSGEA1nEZCuWrqhXXMPA1GwlVzx0pvGdcTY0" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-gray-900">Tech Daily</h4>
                      <span className="text-[10px] text-gray-400">5h ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">Top 10 VS Code extensions you need in 2024. Productivity boosters inside.</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md">#Coding</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-20"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent pointer-events-none">
            <button className="w-full h-14 bg-gray-900 text-white rounded-full font-bold text-base hover:bg-black transition-colors shadow-xl pointer-events-auto flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">person</span>
              Manage Profile
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
