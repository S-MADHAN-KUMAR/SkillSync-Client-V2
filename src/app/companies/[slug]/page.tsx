export default function CompanyDetails({ params }: { params: { slug: string } }) {
  // Using static content (GreenRoot) for demo — can fetch by params.slug
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
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4 cursor-pointer hover:text-gray-900 transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <a href="/companies/" className="font-medium">Back to Companies</a>
            </div>
            <div className="flex space-x-8 text-sm font-semibold border-b border-gray-200">
              <button className="text-black border-b-2 border-black pb-4">About</button>
              <button className="text-gray-400 pb-4 hover:text-gray-600 transition-colors">Jobs</button>
              <button className="text-gray-400 pb-4 hover:text-gray-600 transition-colors">People</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            <div className="relative w-full h-48 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[32px] overflow-hidden shadow-sm mb-16">
              <img alt="Company Banner" className="w-full h-full object-cover opacity-60 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
              <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center overflow-hidden border border-gray-100 z-10">
                <div className="w-full h-full bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-black text-3xl">GR</div>
              </div>
            </div>

            <div className="px-2 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">GreenRoot</h1>
              <p className="text-gray-500 font-medium text-lg mt-1">Pioneering Sustainable Energy Solutions</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">eco</span> Sustainable Energy</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">location_on</span> San Francisco, CA</span>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">info</span> About Us
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                GreenRoot is at the forefront of the renewable energy revolution. Founded in 2012, our mission is to accelerate the global transition to clean, sustainable power sources. We design and implement innovative solar and wind technology solutions for commercial and residential applications, reducing carbon footprints while optimizing energy efficiency.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our team of visionary engineers, environmental scientists, and business leaders are united by a common goal: protecting our planet for future generations. With operations across North America and Europe, GreenRoot is committed to building a brighter, greener tomorrow through cutting-edge technology and sustainable practices.
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">track_changes</span> Our Mission &amp; Vision
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                  <span className="material-symbols-outlined text-emerald-500 text-3xl mb-3 block">rocket_launch</span>
                  <h3 className="font-bold text-emerald-900 mb-2">Mission</h3>
                  <p className="text-emerald-700 text-sm">To empower communities and businesses globally with accessible, affordable, and highly efficient renewable energy solutions.</p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <span className="material-symbols-outlined text-teal-500 text-3xl mb-3 block">visibility</span>
                  <h3 className="font-bold text-teal-900 mb-2">Vision</h3>
                  <p className="text-teal-700 text-sm">A world completely powered by clean energy, where environmental sustainability and economic growth exist in perfect harmony.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-gray-400">photo_library</span> Life at GreenRoot
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-32 rounded-2xl overflow-hidden">
                  <img alt="Office" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="h-32 rounded-2xl overflow-hidden">
                  <img alt="Team" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                </div>
                <div className="h-32 rounded-2xl overflow-hidden relative">
                  <img alt="Event" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-black/50 transition-colors">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="p-8 pb-32 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-md mx-auto space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Key Information</h2>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">person</span>
                      <span className="text-sm font-medium">Founder</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">Elena Rostova</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">corporate_fare</span>
                      <span className="text-sm font-medium">Headquarters</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">calendar_month</span>
                      <span className="text-sm font-medium">Founded</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">2012</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <span className="material-symbols-outlined text-lg mr-3">groups</span>
                      <span className="text-sm font-medium">Company Size</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">2,500+ employees</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Job Openings</h2>
                  <a className="text-sm text-blue-500 font-bold hover:text-blue-600 transition-colors" href="#">View All</a>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Senior Solar Engineer</h4>
                      <p className="text-xs text-gray-500 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">location_on</span> San Francisco (Hybrid)</p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">Quick Apply</button>
                  </div>
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Sustainability Analyst</h4>
                      <p className="text-xs text-gray-500 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Remote</p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">Quick Apply</button>
                  </div>
                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Product Manager</h4>
                      <p className="text-xs text-gray-500 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">location_on</span> Austin, TX (On-site)</p>
                    </div>
                    <button className="bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">Quick Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <button className="w-full max-w-xs h-16 bg-[var(--deep-charcoal)] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-3">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Follow Company</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
