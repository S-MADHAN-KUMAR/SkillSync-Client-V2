"use client";

import React from "react";

export default function NotificationsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <aside className="w-[280px] bg-[var(--deep-charcoal)] flex flex-col items-center py-10 text-white shrink-0">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
              <img alt="User Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
            </div>
            <h2 className="text-xl font-bold">Hi, George!</h2>
            <p className="text-xs text-gray-400 mt-1">Your network is growing!</p>
          </div>

          <nav className="flex-1 w-full px-6 space-y-2">
            <a className="flex items-center space-x-4 px-4 py-3 bg-white/10 rounded-2xl text-white" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Feed</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">mail</span>
              <span className="font-medium text-sm flex-1">Messages</span>
              <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
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

        <main className="w-[480px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-6">
            <div className="bg-white rounded-[28px] p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <img alt="Avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                <input className="flex-1 bg-gray-50 border-none rounded-2xl h-11 text-sm focus:ring-1 focus:ring-blue-500" placeholder="Start a post..." type="text" />
              </div>
              <div className="flex justify-between mt-4 px-2">
                <button className="flex items-center text-xs font-semibold text-gray-500 hover:text-blue-500">
                  <span className="material-symbols-outlined text-lg mr-1 text-blue-400">image</span> Media
                </button>
                <button className="flex items-center text-xs font-semibold text-gray-500 hover:text-green-500">
                  <span className="material-symbols-outlined text-lg mr-1 text-green-400">event</span> Event
                </button>
                <button className="flex items-center text-xs font-semibold text-gray-500 hover:text-yellow-500">
                  <span className="material-symbols-outlined text-lg mr-1 text-yellow-400">article</span> Write article
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6 text-sm font-semibold">
              <button className="text-black border-b-2 border-black pb-1">Feed</button>
              <button className="text-gray-400">Trending</button>
              <button className="text-gray-400">Latest</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-4">
            <div className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-500 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100">
                    <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-none">Sarah Jenkins</h4>
                    <span className="text-[10px] text-gray-400">2 hours ago • Product Designer</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-900">
                  <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Just finished the new design system for our workspace app! Focused on high-contrast accessibility and pastel accents. <span className="text-blue-500 font-medium">#UXDesign #UI #DesignSystem</span>
              </p>
              <div className="mt-4 rounded-2xl overflow-hidden aspect-video bg-gray-100">
                <img alt="Post content" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYJttOIPkxBmPbV6AE8zUIyhclxkYGbgYrppaaDIfxQTPRnXnA9RT-LTX6DCL4XoGCUe5-0nE_-s17TcfVQoBFNi-WbiQybYqUjv5fqX1-PnMK5RzRv2nbdRJdzlL1RZTHg0YSFUrmFi4NYtAtd_CaPmxoQPSphLfmQ6K7QBKm6JrysJq7fQkP3aBk5ge0QOF4kusAVz-JxX9QqWl4QyxQbrhQIS122nDeKbN6nNRyCWw79vFjLfjssATzfDN382tZHPuDcUPFLxs" />
              </div>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    <span className="text-xs font-bold">1.2k</span>
                  </button>
                  <button className="flex items-center space-x-1 text-blue-600">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-bold">42</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                  <span className="material-symbols-outlined text-lg">share</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">MJ</div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-none">Marcus Johnson</h4>
                    <span className="text-[10px] text-gray-400">5 hours ago • Engineering Lead</span>
                  </div>
                </div>
                <button className="text-gray-400">
                  <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Excited to announce we are hiring for a Senior Frontend Role! Looking for someone who loves Tailwind and React. 🚀 <span className="text-blue-500 font-medium">#Hiring #TechJobs</span>
              </p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    <span className="text-xs font-bold">342</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-bold">12</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-gray-500">
                  <span className="material-symbols-outlined text-lg">share</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center p-8 pb-4">
            <h2 className="text-xl font-bold text-gray-900">Notifications & Requests</h2>
            <button className="text-gray-400 hover:text-gray-900">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Pending Invitations</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <img alt="Requester" className="w-12 h-12 rounded-full object-cover border border-gray-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">Emily Chen</h4>
                      <p className="text-xs text-gray-500 truncate">Senior Recruiter at TechFlow</p>
                      <div className="mt-1 flex items-center text-[10px] text-gray-400">
                        <span className="material-symbols-outlined text-sm mr-1">group</span>
                        <span>14 mutual connections</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-[var(--deep-charcoal)] text-white text-xs font-semibold py-2 rounded-xl hover:bg-black transition-colors">Accept</button>
                    <button className="flex-1 bg-gray-100 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:bg-gray-200 transition-colors">Ignore</button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined text-2xl">apartment</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">Design Co.</h4>
                      <p className="text-xs text-gray-500">Company • Design Services</p>
                      <p className="text-[10px] text-gray-400 mt-1">Invited you to follow</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-[var(--deep-charcoal)] text-white text-xs font-semibold py-2 rounded-xl hover:bg-black transition-colors">Accept</button>
                    <button className="flex-1 bg-gray-100 text-gray-600 text-xs font-semibold py-2 rounded-xl hover:bg-gray-200 transition-colors">Ignore</button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                  <div className="relative shrink-0">
                    <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="material-symbols-outlined text-white text-[10px]">chat_bubble</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1"><span className="font-bold text-gray-900">Sarah Jenkins</span> replied to your comment on her post regarding design systems.</p>
                    <p className="text-xs text-gray-400 mb-2">12 mins ago</p>
                    <button className="text-blue-600 text-xs font-bold flex items-center hover:underline">Reply <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span></button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">AL</div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="material-symbols-outlined text-white text-[10px]">repeat</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1"><span className="font-bold text-gray-900">Alex Lee</span> reposted your update about the frontend developer role.</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3">
                  <div className="relative shrink-0">
                    <img alt="User" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="material-symbols-outlined text-white text-[10px]">mail</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs text-gray-500 mb-1 font-medium"><span className="font-bold text-gray-900">Michael Scott</span></p>
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">Hey George, do you have a minute to chat about the Q3 roadmap? I have some ideas...</p>
                    <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
