"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function CandidateApplications() {
  const [selected, setSelected] = useState(0);

  const applications = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "Creative Studio",
      status: "Interviewing",
      statusColor: "bg-[var(--accent-green)] text-[var(--text-green)]",
      updated: "2h ago",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
    },
    {
      id: 2,
      title: "Lead UI/UX Architect",
      company: "TechNova Inc.",
      status: "Applied",
      statusColor: "bg-[var(--accent-blue)] text-[var(--text-blue)]",
      updated: "3d ago",
      logo: null
    },
    {
      id: 3,
      title: "Senior Frontend Engineer",
      company: "Global Systems",
      status: "Shortlisted",
      statusColor: "bg-[var(--accent-purple)] text-[var(--text-purple)]",
      updated: "5d ago",
      logo: null
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Swift Logistics",
      status: "Rejected",
      statusColor: "bg-[var(--accent-coral)] text-[var(--text-coral)]",
      updated: "Closed Oct 12",
      logo: null,
      disabled: true
    }
  ];

  const selectedApp = applications[selected] || applications[0];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#1a1a1a]">
      <div className="w-full max-w-[1440px] h-[900px] bg-white rounded-[40px] overflow-hidden flex shadow-2xl">
        <Sidebar />

        <main className="w-[480px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-8 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Applications</h1>
            <p className="text-sm text-gray-500">You have {applications.length} active applications</p>
            <div className="flex space-x-4 mt-6 text-sm font-semibold">
              <button className="text-black border-b-2 border-black pb-1">All</button>
              <button className="text-gray-400">Active</button>
              <button className="text-gray-400">Archived</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-4">
            {applications.map((app, i) => (
              <div
                key={app.id}
                onClick={() => !app.disabled && setSelected(i)}
                className={`bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${app.disabled ? 'opacity-75' : ''} ${selected === i ? 'border-2 border-blue-500' : 'border border-transparent'}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100 overflow-hidden shrink-0">
                    {app.logo ? (
                      <img alt="Company Logo" className="w-full h-full object-contain" src={app.logo} />
                    ) : (
                      <div className="w-full h-full bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">{app.company.charAt(0)}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-bold text-gray-900 leading-snug">{app.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{app.company}</p>
                    <div className="mt-3 flex items-center">
                      <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${app.statusColor}`}>{app.status}</span>
                      <span className="ml-auto text-[10px] text-gray-400 font-medium">Updated {app.updated}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="absolute top-8 right-8 z-10">
            <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-12 pt-16 pb-32 custom-scrollbar">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white p-3">
                  {selectedApp.logo ? (
                    <img alt="Company" className="w-full h-full object-contain" src={selectedApp.logo} />
                  ) : (
                    <img alt="Company" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedApp.title}</h1>
                  <p className="text-gray-500 font-medium text-lg">{selectedApp.company} • Full-time • Remote</p>
                </div>
              </div>

              <div className="mb-10 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Application Status</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-green-100"></div>
                      <div className="w-0.5 h-10 bg-green-100 mt-1"></div>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900">Applied Successfully</h5>
                      <p className="text-xs text-gray-400">Oct 12, 2023 • 10:45 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-green-100"></div>
                      <div className="w-0.5 h-10 bg-green-100 mt-1"></div>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900">Application Shortlisted</h5>
                      <p className="text-xs text-gray-400">Oct 15, 2023 • 2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 border-4 border-blue-100"></div>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900">Technical Interview</h5>
                      <p className="text-xs text-blue-500 font-medium">Scheduled for Oct 20, 2023 • 4:00 PM</p>
                      <button className="mt-2 text-xs font-bold text-blue-600 underline">Add to Calendar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're looking for a Senior Product Designer to join our core product team. You'll be responsible for leading the design of our new workspace collaboration features, focusing on high-contrast accessibility and modern aesthetic patterns.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm ml-2">
                  <li>Design scalable UI components and patterns</li>
                  <li>Collaborate with engineering on technical feasibility</li>
                  <li>Conduct user research and usability testing</li>
                  <li>Mentor junior designers in the team</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img alt="Recruiter" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" />
                  <div>
                    <h5 className="font-bold text-sm">Sarah Jenkins</h5>
                    <p className="text-xs text-gray-500">Lead Talent Partner</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white text-gray-900 text-xs font-bold rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50">
                  Message Sarah
                </button>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <div className="w-full max-w-2xl flex space-x-4 justify-center">
              <button className="w-[240px] h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl">View Job Posting</button>
              <button className="px-8 h-16 bg-white border-2 border-red-100 text-red-600 rounded-full font-bold text-sm hover:bg-red-50 transition-colors">Withdraw Application</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
