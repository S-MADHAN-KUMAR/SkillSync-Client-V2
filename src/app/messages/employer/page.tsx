"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function EmployerMessages() {
  const [selected, setSelected] = useState(0);

  const chats = [
    { id: 1, name: "Sarah Jenkins", time: "2m ago", preview: "Typing...", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" },
    { id: 2, name: "Marcus Johnson", time: "1h ago", preview: "We reviewed your application and have next steps.", avatar: null, initials: "MJ" },
    { id: 3, name: "Alex Rivers", time: "4h ago", preview: "Can you share the design file?", avatar: null, initials: "AR" },
  ];

  const messages = [
    { from: 'other', text: "Hey — thanks for applying. We loved your portfolio.", time: '9:10 AM' },
    { from: 'me', text: "Wonderful — happy to discuss next steps.", time: '9:12 AM' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen  bg-[#1a1a1a]">
      <div className="w-full  bg-white overflow-hidden flex  min-h-[100vh] ">
        <Sidebar />

        <main className="w-[420px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input className="w-full bg-white border-none rounded-2xl h-12 pl-12 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm" placeholder="Search chats..." type="text" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 custom-scrollbar space-y-3">
            {chats.map((c, i) => (
              <div key={c.id} onClick={() => setSelected(i)} className={`bg-white p-4 rounded-[28px] shadow-sm ${selected === i ? 'border-2 border-blue-500' : 'hover:shadow-md transition-shadow cursor-pointer border border-transparent'}`}>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {c.avatar ? (
                      <img alt={c.name} className="w-12 h-12 rounded-full object-cover" src={c.avatar} />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">{c.initials}</div>
                    )}
                    {i === 0 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{c.name}</h4>
                      <span className="text-[10px] text-gray-400">{c.time}</span>
                    </div>
                    <p className={`text-xs ${i===0? 'text-blue-600 font-medium':'text-gray-500'} truncate`}>{c.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <section className="flex-1 bg-white flex flex-col relative overflow-hidden">
          <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img alt={chats[selected].name} className="w-10 h-10 rounded-full object-cover" src={chats[selected].avatar || 'https://via.placeholder.com/40'} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{chats[selected].name}</h3>
                <p className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">Active Now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-400 transition-colors">
                <span className="material-symbols-outlined">call</span>
              </button>
              <button className="w-10 h-10 hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-400 transition-colors">
                <span className="material-symbols-outlined">videocam</span>
              </button>
              <button className="w-10 h-10 hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-400 transition-colors">
                <span className="material-symbols-outlined">info</span>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6 bg-[#f8fafc]">
            <div className="flex justify-center mb-8">
              <span className="px-3 py-1 bg-white text-gray-400 text-[10px] font-bold rounded-full shadow-sm border border-gray-100">TODAY</span>
            </div>

            {messages.map((m, idx) => (
              m.from === 'other' ? (
                <div key={idx} className="flex items-end space-x-3 max-w-[80%]">
                  <img alt="other" className="w-8 h-8 rounded-full object-cover shrink-0 mb-1" src={chats[selected].avatar || 'https://via.placeholder.com/64'} />
                  <div className="space-y-1">
                    <div className="bg-white p-4 rounded-3xl rounded-bl-none shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">{m.text}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 ml-1">{m.time}</span>
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex flex-col items-end space-y-1 max-w-[80%] ml-auto">
                  <div className="bg-[#252525] p-4 rounded-3xl rounded-br-none shadow-md">
                    <p className="text-sm text-white leading-relaxed">{m.text}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-gray-400 mr-1">
                    <span>{m.time}</span>
                    <span className="material-symbols-outlined text-xs text-blue-500">done_all</span>
                  </div>
                </div>
              )
            ))}

            <div className="flex items-center space-x-2 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-[10px] font-medium">{chats[selected].name} is typing...</span>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto flex items-center space-x-4 bg-gray-50 rounded-[32px] p-2 pl-6 shadow-inner border border-gray-100">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <input className="flex-1 bg-transparent border-none text-sm focus:ring-0 py-3" placeholder="Write a message..." type="text" />
              <div className="flex items-center space-x-2 px-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="material-symbols-outlined">sentiment_satisfied</span>
                </button>
                <button className="h-12 w-32 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-black transition-all shadow-lg flex items-center justify-center space-x-2 group">
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
