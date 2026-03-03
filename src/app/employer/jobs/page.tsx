"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tags: Array<{ label: string; bg: string; text: string }>;
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Middle UX/UI Designer",
    company: "Dropbox Inc.",
    location: "Remote",
    salary: "$1,200 - $1,500",
    icon: "square",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    tags: [
      { label: "Canada", bg: "bg-green-100", text: "text-green-700" },
      { label: "Toronto", bg: "bg-pink-100", text: "text-pink-700" },
      { label: "IT", bg: "bg-yellow-100", text: "text-yellow-700" },
    ],
  },
  {
    id: 2,
    title: "Java Script Developer",
    company: "Spotify Inc.",
    location: "Remote, Office",
    salary: "$1,200 - $1,500",
    icon: "crop_din",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    tags: [{ label: "Remote", bg: "bg-blue-50", text: "text-blue-600" }],
  },
  {
    id: 3,
    title: "Content Manager (SMM)",
    company: "Airbnb Agency",
    location: "Office",
    salary: "$55/h - $75/h",
    icon: "circle",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-900",
    tags: [{ label: "Marketing", bg: "bg-gray-100", text: "text-gray-600" }],
  },
  {
    id: 4,
    title: "Marketing Analyst",
    company: "Netflix Etc.",
    location: "Remote, Office",
    salary: "$2,400 - $2,800",
    icon: "favorite",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    tags: [{ label: "New York", bg: "bg-green-100", text: "text-green-700" }],
  },
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job>(jobsData[0]);
  const [activeTab, setActiveTab] = useState<"new" | "hot" | "near">("new");

  return (
    <div className="flex items-center justify-center  bg-[#1a1a1a]" style={{ fontFamily: 'Inter, var(--font-inter), sans-serif' }}>
      <div className="w-full bg-white min-h-[100vh] overflow-hidden flex shadow-2xl">
        <Sidebar />

        {/* Job List Panel */}
        <main className="w-[420px] bg-[#f5f7f9] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-6">
            <div className="relative group">
              <input
                className="w-full h-14 bg-white border-none rounded-2xl pl-12 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Search jobs, people..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-400 text-xl">
                  tune
                </span>
              </button>
            </div>

            <div className="flex space-x-4 mt-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("new")}
                className={
                  activeTab === "new"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }
              >
                New
              </button>
              <button
                onClick={() => setActiveTab("hot")}
                className={
                  activeTab === "hot"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }
              >
                Hot
              </button>
              <button
                onClick={() => setActiveTab("near")}
                className={
                  activeTab === "near"
                    ? "text-black border-b-2 border-black pb-1"
                    : "text-gray-400"
                }
              >
                Near
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-4">
            {jobsData.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${
                  selectedJob.id === job.id
                    ? "border-blue-500"
                    : "border-transparent hover:border-blue-500"
                } group`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-sm font-bold mt-2">{job.salary}</p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl ${job.iconBg} flex items-center justify-center ${job.iconColor}`}
                  >
                    <span className="material-symbols-outlined">{job.icon}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 ${tag.bg} ${tag.text} text-[10px] font-bold rounded-full`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Job Detail Panel */}
        <section className="flex-1 bg-[#f8fafc] flex flex-col relative overflow-hidden">
          <div className="absolute top-8 right-8 z-10">
            <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-colors">
              <span className="material-symbols-outlined text-xl">star</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-16 pt-20 pb-24 custom-scrollbar">
            <div className="flex justify-center space-x-[-12px] mb-8">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-xl">
                <span className="material-symbols-outlined text-4xl">square</span>
              </div>
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black border-4 border-white shadow-xl">
                <span className="material-symbols-outlined text-4xl">bolt</span>
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900">
                {selectedJob.title}
              </h1>
              <p className="text-xl text-gray-500 font-semibold mt-2">
                $1,700 - $2,100
              </p>
              <div className="flex justify-center space-x-3 mt-6">
                <span className="px-5 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                  Canada
                </span>
                <span className="px-5 py-2 bg-pink-100 text-pink-700 text-sm font-bold rounded-full">
                  Toronto
                </span>
                <span className="px-5 py-2 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-full">
                  IT
                </span>
                <span className="px-5 py-2 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                  Remote
                </span>
              </div>
            </div>

            <div className="space-y-10 max-w-2xl mx-auto">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  A global leader is looking for a talented designer, illustrator
                  to expand our team 🧑‍💻🎨🦄
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  No experience - come to us for practice, do tasks of our link -{" "}
                  <br />
                  <a
                    className="text-blue-600 underline font-medium"
                    href="#"
                  >
                    Learn more about tasks
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-gray-400 font-bold mr-4">1</span>
                    <span className="text-gray-600">
                      Developing original designs and illustrations for
                      promotional materials, websites, social media, email
                      newsletters, and other company projects;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 font-bold mr-4">2</span>
                    <span className="text-gray-600">
                      Creating visual concepts and designs for the company's
                      products and brands;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 font-bold mr-4">3</span>
                    <span className="text-gray-600">
                      Editing and optimizing graphic elements for publication in
                      various media;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 font-bold mr-4">4</span>
                    <span className="text-gray-600">
                      Ensuring high quality and design compliance with the
                      company's brand;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] to-transparent">
            <button className="w-[320px] h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl">
              Send Resume
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
