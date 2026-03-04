import { IMAGES } from "@/constants/images";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-charcoal to-black text-white selection:bg-accent-green selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-accent-green rounded-full" />
            <span className="text-xl font-extrabold tracking-tight">SkillSync</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-semibold hover:text-accent-green transition-colors">Log In</a>
          <a href="/register" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent-green transition-all">Sign Up</a>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col justify-center px-12 pt-20">
        <div className="grid grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
          <div className="col-span-12 lg:col-span-6 relative z-10">
            <div className="relative inline-block mb-6">
              <div className="absolute -top-12 -left-12 size-32 progress-ring opacity-80 blur-[2px]">
                <div className="absolute inset-4 bg-charcoal rounded-full flex items-center justify-center">
                  <span className="text-accent-green material-symbols-outlined text-2xl">trending_up</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8">
                Your career <br /> journey <br /> <span className="text-accent-green">starts here</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-400 max-w-md mb-10 leading-relaxed">
              Connect with the world's leading companies and discover opportunities that match your potential.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 relative perspective-1000">
            <div className="relative transform -rotate-3 md:rotate-[-5deg] scale-100 md:scale-110 translate-x-0 md:translate-x-12 translate-y-8 shadow-2xl rounded-5xl overflow-hidden border border-white/10 bg-sidebar-dark">
              <div className="flex h-[420px] md:h-[500px] w-full bg-[#111] overflow-hidden">
                <aside className="w-20 border-r border-white/5 flex flex-col items-center py-6 gap-8">
                  <div className="size-10 rounded-xl bg-white/10" />
                  <div className="size-10 rounded-xl bg-accent-green/20 text-accent-green flex items-center justify-center">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div className="size-10 rounded-xl bg-white/5" />
                  <div className="size-10 rounded-xl bg-white/5" />
                </aside>
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-white/10 rounded-full" />
                    <div className="size-10 rounded-full bg-white/10 overflow-hidden">
                      <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlZhpmmj5Yqf0_TpIwZTpFjqgsnpIsQRcwKCpVg-83X-FhsYgk4vewyJK1-jOJ5gpPexl0PCzkiBMHtfy_gCH6AhHHCT6VFVBeZsxInJhFHVI2BjNQp1ACGmO1o_smkriFGeNKt-gYSqtlxJ5ZfPi3lUCoBlX6JK40BdeaTRnTBJn5NiXNXRJH1l8hSkaid_ThKxPGlLYqJuugGV0mHiz3WfuqyjrQEagseO36yvER_JYxFoWjpxay3gsuwlGhOAkJACj00JGung4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-3xl h-32 border border-white/5">
                      <div className="size-8 rounded-lg bg-accent-pink/20 mb-4" />
                      <div className="h-3 w-16 bg-white/20 rounded-full" />
                    </div>
                    <div className="bg-white/5 p-4 rounded-3xl h-32 border border-white/5">
                      <div className="size-8 rounded-lg bg-accent-yellow/20 mb-4" />
                      <div className="h-3 w-20 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl h-48 border border-white/5">
                    <div className="h-4 w-40 bg-white/20 rounded-full mb-4" />
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded-full" />
                      <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full mt-20 relative z-20">
          <div className="glass-search p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-6 gap-3">
              <span className="material-symbols-outlined text-gray-400">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-white w-full placeholder:text-gray-500 font-medium py-4" placeholder="Job title or keywords" type="text" />
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="flex-1 flex items-center px-6 gap-3">
              <span className="material-symbols-outlined text-gray-400">location_on</span>
              <input className="bg-transparent border-none focus:ring-0 text-white w-full placeholder:text-gray-500 font-medium py-4" placeholder="Location" type="text" />
            </div>
            <button className="bg-accent-green text-black px-10 py-4 rounded-full font-bold hover:brightness-110 transition-all w-full md:w-auto">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">Explore top categories</h2>
              <p className="text-gray-500 font-medium max-w-sm">Hand-picked opportunities across various industries tailored for your expertise.</p>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2">
              View All <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-5xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="size-14 bg-accent-green rounded-3xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-2xl">design_services</span>
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Design &amp; Arts</h3>
              <p className="text-gray-400 text-sm mb-6">452 open positions</p>
              <div className="flex gap-2 mb-8">
                <span className="px-3 py-1 bg-accent-green/30 text-emerald-900 rounded-full text-[10px] font-bold">UI/UX</span>
                <span className="px-3 py-1 bg-accent-pink/30 text-rose-900 rounded-full text-[10px] font-bold">Graphic</span>
              </div>
              <div className="size-10 bg-black text-white rounded-full flex items-center justify-center ml-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-5xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="size-14 bg-accent-yellow rounded-3xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-2xl">code</span>
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Development</h3>
              <p className="text-gray-400 text-sm mb-6">890 open positions</p>
              <div className="flex gap-2 mb-8">
                <span className="px-3 py-1 bg-accent-yellow/30 text-amber-900 rounded-full text-[10px] font-bold">Python</span>
                <span className="px-3 py-1 bg-accent-blue/30 text-blue-900 rounded-full text-[10px] font-bold">React</span>
              </div>
              <div className="size-10 bg-black text-white rounded-full flex items-center justify-center ml-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-5xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="size-14 bg-accent-pink rounded-3xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-2xl">monitoring</span>
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Marketing</h3>
              <p className="text-gray-400 text-sm mb-6">215 open positions</p>
              <div className="flex gap-2 mb-8">
                <span className="px-3 py-1 bg-accent-pink/30 text-rose-900 rounded-full text-[10px] font-bold">SEO</span>
                <span className="px-3 py-1 bg-accent-green/30 text-emerald-900 rounded-full text-[10px] font-bold">Social</span>
              </div>
              <div className="size-10 bg-black text-white rounded-full flex items-center justify-center ml-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-5xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
              <div className="size-14 bg-accent-blue rounded-3xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-black text-2xl">finance</span>
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Finance</h3>
              <p className="text-gray-400 text-sm mb-6">128 open positions</p>
              <div className="flex gap-2 mb-8">
                <span className="px-3 py-1 bg-accent-blue/30 text-blue-900 rounded-full text-[10px] font-bold">Audit</span>
                <span className="px-3 py-1 bg-accent-yellow/30 text-amber-900 rounded-full text-[10px] font-bold">Tax</span>
              </div>
              <div className="size-10 bg-black text-white rounded-full flex items-center justify-center ml-auto group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-black mb-12 text-center">Latest opportunities</h2>
          <div className="space-y-4">
            <div className="bg-card-gray p-6 rounded-[2rem] flex items-center justify-between hover:translate-x-2 transition-transform cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="size-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <img alt="TechFlow Logo" className="size-8" src={IMAGES.logo} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black">Senior Product Designer</h4>
                  <p className="text-sm text-gray-500">TechFlow • San Francisco, CA (Remote)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-accent-green rounded-full text-xs font-bold text-emerald-900">Full-time</span>
                </div>
                <button className="size-12 bg-black text-white rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="bg-card-gray p-6 rounded-[2rem] flex items-center justify-between hover:translate-x-2 transition-transform cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="size-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <img alt="CloudSphere Logo" className="size-8" src={IMAGES.logo} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black">Backend Engineer (Go)</h4>
                  <p className="text-sm text-gray-500">CloudSphere • London, UK</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-accent-blue rounded-full text-xs font-bold text-blue-900">Contract</span>
                </div>
                <button className="size-12 bg-black text-white rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="bg-card-gray p-6 rounded-[2rem] flex items-center justify-between hover:translate-x-2 transition-transform cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="size-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <img alt="Vista Apps Logo" className="size-8" src={IMAGES.logo} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black">Growth Marketer</h4>
                  <p className="text-sm text-gray-500">Vista Apps • Remote</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-accent-pink rounded-full text-xs font-bold text-rose-900">Full-time</span>
                </div>
                <button className="size-12 bg-black text-white rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-20 px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="size-6 bg-accent-green rounded-full" />
              <span className="text-lg font-extrabold">SkillSync</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              We're building the future of recruitment, connecting high-impact talent with the most innovative companies on the planet.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a className="hover:text-white" href="#">About Us</a></li>
              <li><a className="hover:text-white" href="#">Careers</a></li>
              <li><a className="hover:text-white" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a className="hover:text-white" href="#">Help Center</a></li>
              <li><a className="hover:text-white" href="#">Terms of Service</a></li>
              <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 SkillSync Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#">Twitter</a>
            <a className="hover:text-white" href="#">LinkedIn</a>
            <a className="hover:text-white" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
