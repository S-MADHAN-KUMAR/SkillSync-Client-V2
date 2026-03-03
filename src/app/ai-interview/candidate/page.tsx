"use client";

import Link from "next/link";

export default function AIMockInterviewSetup() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full  bg-white  overflow-hidden flex shadow-2xl">
        <aside className="w-[280px] bg-[var(--deep-charcoal)] flex flex-col items-center py-10 text-white shrink-0">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
              <img alt="User Avatar" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
            </div>
            <h2 className="text-xl font-bold">Hi, George!</h2>
            <p className="text-xs text-gray-400 mt-1">Ready for your interview?</p>
          </div>
          <nav className="flex-1 w-full px-6 space-y-2">
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 bg-white/10 rounded-2xl text-white" href="#">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="font-medium text-sm">AI Interview</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">work</span>
              <span className="font-medium text-sm">Jobs</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">assessment</span>
              <span className="font-medium text-sm">My Stats</span>
            </a>
          </nav>
          <div className="mt-auto w-full px-8 pb-8 flex flex-col items-center">
            <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        </aside>

        <main className="w-[500px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">New Session</h1>
            <p className="text-gray-500 text-sm">Configure your AI mock interview parameters.</p>
          </div>

          <div className="flex-1 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden">
            <form className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2 pb-20">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Target Role</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                  <input className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="e.g. Senior Product Designer" type="text" defaultValue="Frontend Engineer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Years of Experience</label>
                <div className="relative">
                  <select defaultValue="mid" className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-gray-700">
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Senior (3-5 years)</option>
                    <option value="senior">Senior (5-8 years)</option>
                    <option value="lead">Lead / Manager (8+ years)</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Focus Skills</label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-2xl min-h-[60px] flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">React</span>
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">System Design</span>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">CSS</span>
                  <input className="bg-transparent text-sm outline-none placeholder-gray-400 flex-1 min-w-[80px]" placeholder="Add skill..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Number of Questions</label>
                <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl p-2">
                  <button className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors" type="button">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="text-lg font-bold text-gray-900">5 Questions</span>
                  <button className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors" type="button">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Difficulty Level</label>
                <div className="bg-gray-100 p-1.5 rounded-2xl flex">
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-200 transition-all" type="button">Easy</button>
                  <button className="flex-1 py-2.5 bg-white shadow-sm rounded-xl text-sm font-bold text-gray-900 transition-all border border-gray-200" type="button">Medium</button>
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-200 transition-all" type="button">Hard</button>
                </div>
              </div>
            </form>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent pt-12">
              <Link href="/ai-interview/candidate/session" className="w-full bg-[var(--deep-charcoal)] text-white h-14 rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-xl flex items-center justify-center space-x-2">
                <span className="material-symbols-outlined">play_arrow</span>
                <span>Start Interview</span>
              </Link>
            </div>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Performance</h2>
              <p className="text-gray-500 text-sm">Analysis from your last 3 sessions</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 shadow-sm">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 shadow-sm">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-8">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Skill Analysis</h3>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full flex items-center">Improvising</span>
              </div>
              <div className="relative h-64 w-full flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 border border-gray-100 rounded-full"></div>
                  <div className="absolute inset-8 border border-gray-100 rounded-full"></div>
                  <div className="absolute inset-16 border border-gray-100 rounded-full"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gray-100"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-100"></div>
                  <div className="absolute top-1/2 left-1/2 w-full h-px bg-gray-100 rotate-45 -translate-x-1/2 -translate-y-1/2 origin-top-left"></div>
                  <div className="absolute top-1/2 left-1/2 w-full h-px bg-gray-100 -rotate-45 -translate-x-1/2 -translate-y-1/2 origin-top-left"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                      <polygon className="text-blue-500/20 fill-current stroke-blue-500 stroke-2" points="50,10 90,40 80,80 20,80 10,40"></polygon>
                      <circle className="fill-blue-600" cx="50" cy="10" r="3"></circle>
                      <circle className="fill-blue-600" cx="90" cy="40" r="3"></circle>
                      <circle className="fill-blue-600" cx="80" cy="80" r="3"></circle>
                      <circle className="fill-blue-600" cx="20" cy="80" r="3"></circle>
                      <circle className="fill-blue-600" cx="10" cy="40" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Current
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span> Average
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[32px] p-6 shadow-sm border border-indigo-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <h3 className="font-bold text-gray-900">Pro Tips for Today</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5">check_circle</span>
                  <p className="text-sm text-gray-700 leading-snug">Focus on the <span className="font-bold text-indigo-700">STAR method</span> (Situation, Task, Action, Result) for behavioral questions.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5">check_circle</span>
                  <p className="text-sm text-gray-700 leading-snug">Keep your answers concise. Ideally between <span className="font-bold text-indigo-700">1-2 minutes</span> per response.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5">check_circle</span>
                  <p className="text-sm text-gray-700 leading-snug">Review your notes on <span className="font-bold text-indigo-700">System Design</span> principles before starting.</p>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">8.5</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Avg Score</div>
              </div>
              <div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Sessions</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
