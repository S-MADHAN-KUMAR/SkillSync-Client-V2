"use client";

import React from "react";

const PostsArchive: React.FC = () => {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex">
      {/* Sidebar List */}
      <main className="w-[420px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0 relative h-full">
        <div className="p-6">
          <div className="relative group">
            <input
              className="w-full h-14 bg-white border-none rounded-2xl pl-12 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-inter"
              placeholder="Search posts..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-400 text-xl">
                filter_list
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar space-y-4">
          <div className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 group">
            <div className="flex items-center space-x-3 mb-3">
              <img
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-gray-900 truncate font-inter">
                  The Future of Design Systems in 2024
                </h3>
                <p className="text-[10px] text-gray-400 font-inter">2h ago • Design</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full font-inter">
                New
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full font-inter">
                UI/UX
              </span>
            </div>
          </div>

          {[
            {
              title: "Why Minimalism is still King of UI",
              time: "5h ago",
              category: "Case Study",
              tag: "Trending",
              tagBg: "bg-pink-100",
              tagText: "text-pink-700",
            },
            {
              title: "Mastering Dark Mode in Complex Apps",
              time: "1d ago",
              category: "Development",
              tag: "In-depth",
              tagBg: "bg-yellow-100",
              tagText: "text-yellow-700",
            },
            {
              title: "User Research 101: Starting Small",
              time: "2d ago",
              category: "Research",
              tag: "Basic",
              tagBg: "bg-blue-100",
              tagText: "text-blue-700",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent font-inter"
            >
              <div className="flex items-center space-x-3 mb-3">
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 truncate">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {post.time} • {post.category}
                  </p>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <span
                  className={`px-3 py-1 ${post.tagBg} ${post.tagText} text-[10px] font-bold rounded-full`}
                >
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--off-white)] via-[var(--off-white)] to-transparent">
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">
              Page 1 of 10
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Preview Section */}
      <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden h-full font-inter">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="w-full h-64 overflow-hidden relative">
            <img
              alt="Featured"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
            />
            <div className="absolute top-6 right-6">
              <button className="w-10 h-10 bg-white/90 backdrop-blur text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all">
                <span className="material-symbols-outlined text-xl">bookmark</span>
              </button>
            </div>
          </div>

          <div className="px-16 py-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <img
                  alt="Author"
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
                />
                <div>
                  <h4 className="font-bold text-gray-900">George Anderson</h4>
                  <p className="text-sm text-gray-500 font-inter">
                    Senior Product Designer • 2h ago
                  </p>
                </div>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-red-500">
                    favorite
                  </span>
                  <span className="font-bold">1.2k</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-blue-500">
                    chat_bubble
                  </span>
                  <span className="font-bold">84</span>
                </div>
              </div>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                The Future of Design Systems in 2024
              </h1>
              <div className="flex space-x-3 mb-8">
                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  Design Trends
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  Systems
                </span>
                <span className="px-4 py-1.5 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">
                  Prototyping
                </span>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-inter">
                <p>
                  Design systems are no longer just a collection of components. In
                  2024, they are the backbone of product strategy. We're seeing a
                  massive shift towards AI-integrated documentation and automated
                  cross-platform updates.
                </p>
                <p>
                  As we scale our products, the friction between design and
                  engineering needs to decrease. This post explores how
                  next-generation tokens and headless design architectures are
                  changing the landscape.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-900 font-medium">
                  "The best design systems are the ones that disappear into the
                  background and let creativity flourish."
                </blockquote>
                <p>
                  We've been experimenting with several new workflows that
                  prioritize accessibility first. It's not just about how it
                  looks, but how it feels for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent shrink-0">
          <button className="w-full max-w-[400px] h-16 bg-[var(--deep-charcoal)] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center space-x-3">
            <span className="material-symbols-outlined">forum</span>
            <span>View Discussion</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PostsArchive;
