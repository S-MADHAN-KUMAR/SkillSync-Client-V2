"use client";

export default function AIMockInterviewSession() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <aside className="w-[280px] bg-[var(--deep-charcoal)] flex flex-col items-center py-10 text-white shrink-0 z-10">
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
              <span className="material-symbols-outlined">mic</span>
              <span className="font-medium text-sm">Mock Interview</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">description</span>
              <span className="font-medium text-sm">Resumes</span>
            </a>
            <a className="flex items-center space-x-4 px-4 py-3 text-gray-400 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">history</span>
              <span className="font-medium text-sm">History</span>
            </a>
          </nav>
          <div className="mt-auto w-full px-8 pb-8 flex flex-col items-center">
            <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-semibold text-sm">End Session</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 bg-[var(--off-white)] flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-8 left-8 flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recording Active</span>
          </div>
          <div className="absolute top-8 right-8 text-gray-400 text-sm font-mono">00:42 / 02:00</div>
          <div className="w-full max-w-2xl px-8 flex flex-col items-center text-center z-10">
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100 w-full mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-4">Question 1 of 5</span>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">How do you handle conflict within a design team?</h1>
              <p className="text-gray-500 mt-4 text-lg">Speak clearly and take your time to answer.</p>
            </div>

            <div className="flex items-center justify-center h-16 w-full space-x-1 mb-8">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-1.5 bg-blue-400 rounded-full h-6 waveform-bar" style={{ animationDelay: `${(i % 5) * 0.1}s` }} />
              ))}
            </div>

            <button className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mic-pulse hover:bg-blue-600 transition-colors group relative">
              <span className="material-symbols-outlined text-4xl">mic</span>
            </button>
            <p className="mt-4 text-gray-400 text-sm">Listening...</p>
          </div>
        </main>

        <section className="w-[400px] bg-white border-l border-gray-100 flex flex-col shrink-0 relative">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Session Transcript</h3>
            <button className="text-gray-400 hover:text-gray-900">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pb-32">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase">AI Interviewer</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none text-gray-700 text-sm leading-relaxed">Hello George. Let's start with a behavioral question. How do you handle conflict within a design team?</div>
            </div>

            <div className="flex flex-col space-y-2 items-end">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-500 uppercase">You</span>
                <img alt="User" className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
              </div>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl rounded-tr-none text-blue-900 text-sm leading-relaxed w-full">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="flex space-x-1">
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </span>
                  <span className="text-xs font-semibold text-blue-400">Transcription in progress...</span>
                </div>
                <p className="opacity-70">Well, I believe the most important first step is to listen to all parties involved...</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
            <button className="w-full h-14 bg-[var(--deep-charcoal)] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg flex items-center justify-center space-x-2">
              <span>Submit Answer</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <button className="w-full mt-3 text-gray-400 text-xs font-medium hover:text-red-500 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-sm mr-1">restart_alt</span>
              Reset this question
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
