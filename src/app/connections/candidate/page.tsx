"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function CandidateConnections() {
  const [tab, setTab] = useState<'connections'|'requests'>('connections');

  const requests = [
    { id: 1, name: 'Sarah Jenkins', title: 'Product Designer at Creative Studio', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U' }
  ];

  const people = [
    { id:1, name:'Marcus Johnson', title:'Engineering Lead', initials:'MJ' },
    { id:2, name:'Alex Rivers', title:'Senior React Developer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U' },
    { id:3, name:'Elena Rodriguez', title:'Full Stack Engineer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U' },
    { id:4, name:'Gary Kaspar', title:'DevOps Specialist', initials:'GK' }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]">
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <Sidebar />

        <main className="w-[720px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Network</h1>
            <div className="flex space-x-8 text-sm font-semibold border-b border-gray-200">
              <button onClick={()=>setTab('connections')} className={`${tab==='connections'? 'text-black border-b-2 border-black pb-4':'text-gray-400 pb-4'}`}>Connections</button>
              <button onClick={()=>setTab('requests')} className={`${tab==='requests'? 'text-black border-b-2 border-black pb-4':'text-gray-400 pb-4'}`}>Requests ({requests.length})</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-8">
            {tab === 'requests' && (
              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pending Requests</h3>
                <div className="space-y-3">
                  {requests.map(r => (
                    <div key={r.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                      <img alt={r.name} className="w-12 h-12 rounded-full object-cover mr-4" src={r.avatar} />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{r.name}</h4>
                        <p className="text-[11px] text-gray-500">{r.title}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-xs font-bold px-4 py-2 rounded-full text-gray-500 hover:bg-gray-50">Decline</button>
                        <button className="bg-[#252525] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-black transition-colors">Accept</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tab === 'connections' && (
              <section>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">People you may know</h3>
                <div className="grid grid-cols-2 gap-6">
                  {people.map(p => (
                    <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center text-center group">
                      <div className="w-full h-16 bg-gradient-to-r from-blue-100 to-indigo-100 relative"></div>
                      <div className="w-20 h-20 rounded-full border-4 border-white -mt-10 overflow-hidden shadow-sm z-10">
                        {p.avatar ? <img alt={p.name} className="w-full h-full object-cover" src={p.avatar} /> : <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl">{p.initials}</div>}
                      </div>
                      <div className="p-6 pt-3 flex flex-col flex-1 w-full">
                        <h4 className="text-base font-bold text-gray-900">{p.name}</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-6">{p.title}</p>
                        <button className="mt-auto bg-[#252525] text-white text-sm font-bold w-full py-2.5 rounded-2xl hover:bg-black transition-colors">Connect</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="p-10 pb-32 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-md mx-auto space-y-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Discovery</h2>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Find specific people..." type="text" />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center"><span className="material-symbols-outlined text-lg mr-2 text-blue-500">domain</span> Industry</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-full cursor-pointer hover:bg-blue-100 transition-colors">Technology</span>
                    <span className="px-4 py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded-full cursor-pointer hover:bg-purple-100 transition-colors">Fintech</span>
                    <span className="px-4 py-2 bg-green-50 text-green-600 text-xs font-bold rounded-full cursor-pointer hover:bg-green-100 transition-colors">Healthcare</span>
                    <span className="px-4 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-full cursor-pointer hover:bg-orange-100 transition-colors">AI/ML</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center"><span className="material-symbols-outlined text-lg mr-2 text-red-500">location_on</span> Location</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-full cursor-pointer hover:bg-red-100 transition-colors">Remote</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">San Francisco</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">London</span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full cursor-pointer hover:bg-gray-200 transition-colors">New York</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center"><span className="material-symbols-outlined text-lg mr-2 text-yellow-500">bolt</span> Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full cursor-pointer hover:bg-yellow-100 transition-colors">React</span>
                    <span className="px-4 py-2 bg-pink-50 text-pink-700 text-xs font-bold rounded-full cursor-pointer hover:bg-pink-100 transition-colors">Figma</span>
                    <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-full cursor-pointer hover:bg-blue-100 transition-colors">TypeScript</span>
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full cursor-pointer hover:bg-indigo-100 transition-colors">Python</span>
                    <span className="px-4 py-2 bg-teal-50 text-teal-700 text-xs font-bold rounded-full cursor-pointer hover:bg-teal-100 transition-colors">AWS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <button className="w-full max-w-xs h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-3">
              <span className="material-symbols-outlined">alternate_email</span>
              <span>Invite via Email</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
