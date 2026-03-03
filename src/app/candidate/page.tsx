"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

const CandidateFeed: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (userData.userType !== "candidate") {
        router.push("/employer");
        return;
      }
      setUser(userData);
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const posts = [
    {
      id: 1,
      author: "Sarah Jenkins",
      role: "Product Designer",
      time: "2 hours ago",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U",
      content: "Just finished the new design system for our workspace app! Focused on high-contrast accessibility and pastel accents.",
      hashtags: ["#UXDesign", "#UI", "#DesignSystem"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYJttOIPkxBmPbV6AE8zUIyhclxkYGbgYrppaaDIfxQTPRnXnA9RT-LTX6DCL4XoGCUe5-0nE_-s17TcfVQoBFNi-WbiQybYqUjv5fqX1-PnMK5RzRv2nbdRJdzlL1RZTHg0YSFUrmFi4NYtAtd_CaPmxoQPSphLfmQ6K7QBKm6JrysJq7fQkP3aBk5ge0QOF4kusAVz-JxX9QqWl4QyxQbrhQIS122nDeKbN6nNRyCWw79vFjLfjssATzfDN382tZHPuDcUPFLxs",
      likes: "1.2k",
      comments: "42",
      isFeatured: true,
    },
    {
      id: 2,
      author: "Marcus Johnson",
      role: "Engineering Lead",
      time: "5 hours ago",
      avatar: null,
      initials: "MJ",
      content: "Excited to announce we are hiring for a Senior Frontend Role! Looking for someone who loves Tailwind and React. 🚀",
      hashtags: ["#Hiring", "#TechJobs"],
      image: null,
      likes: "342",
      comments: "12",
      isFeatured: false,
    },
  ];

  const comments = [
    {
      id: 1,
      author: "George K.",
      time: "12m ago",
      avatar: "GK",
      text: "The high-contrast approach is exactly what we need for the dashboard. Those pastel tags really pop against the dark sidebar!",
      isReply: false,
      replies: [
        {
          id: 2,
          author: "Sarah Jenkins",
          time: "5m ago",
          avatar: "SJ",
          text: "Thanks George! Trying to balance aesthetics with usability is always the goal.",
          isAuthor: true,
        },
      ],
    },
    {
      id: 3,
      author: "Alex Rivers",
      time: "1h ago",
      avatar: null,
      text: "Which font are you using for the headings? Looks very clean.",
      isReply: false,
      replies: [],
    },
  ];

  const selectedPost = posts[0];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 flex items-stretch">
        {/* Left Panel - Feed */}
        <main className="w-[480px] bg-[var(--off-white)] flex flex-col border-r border-gray-200 shrink-0">
          <div className="p-6">
            {/* Post Creation */}
            <div className="bg-white rounded-[28px] p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  alt="Your Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.id ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U" : ""}
                />
                <input
                  className="flex-1 bg-gray-50 border-none rounded-2xl h-11 text-sm focus:ring-1 focus:ring-blue-500 px-4"
                  placeholder="Start a post..."
                  type="text"
                />
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

            {/* Tabs */}
            <div className="flex space-x-4 mt-6 text-sm font-semibold">
              <button className="text-black border-b-2 border-black pb-1">Feed</button>
              <button className="text-gray-400">Trending</button>
              <button className="text-gray-400">Latest</button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  post.isFeatured ? "border-2 border-blue-500" : "border border-transparent"
                } group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100">
                      {post.avatar ? (
                        <img alt={post.author} className="w-full h-full object-cover" src={post.avatar} />
                      ) : (
                        <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                          {post.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-none">{post.author}</h4>
                      <span className="text-[10px] text-gray-400">{post.time} • {post.role}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900">
                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.content} <span className="text-blue-500 font-medium">{post.hashtags.join(" ")}</span>
                </p>
                {post.image && (
                  <div className="mt-4 rounded-2xl overflow-hidden aspect-video bg-gray-100">
                    <img alt="Post content" className="w-full h-full object-cover" src={post.image} />
                  </div>
                )}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-600">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Panel - Comments */}
        <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
          <div className="absolute top-8 right-8">
            <button className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-12 pt-16 pb-32 custom-scrollbar">
            <div className="max-w-2xl mx-auto">
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-6">
                {selectedPost.avatar ? (
                  <img
                    alt={selectedPost.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    src={selectedPost.avatar}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-4 border-white shadow-lg text-pink-600 font-bold text-sm">
                    {selectedPost.initials}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedPost.author}</h1>
                  <p className="text-gray-500 font-medium">{selectedPost.role}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-10">
                <p className="text-lg text-gray-700 leading-relaxed">{selectedPost.content}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedPost.hashtags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-bold text-gray-900">Comments ({comments.length})</h2>
                  <button className="text-sm font-semibold text-gray-500 flex items-center hover:text-gray-900">
                    Most Relevant <span className="material-symbols-outlined text-base ml-1">expand_more</span>
                  </button>
                </div>

                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className={`w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-white text-xs font-bold ${
                      comment.avatar === "GK" ? "bg-blue-500" : "bg-gray-200"
                    }`}>
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-bold text-sm">{comment.author}</h5>
                          <span className="text-[10px] text-gray-400">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{comment.text}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 ml-4">
                        <button className="text-xs font-bold text-gray-400 hover:text-blue-500">Like</button>
                        <button className="text-xs font-bold text-gray-400 hover:text-blue-500">Reply</button>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex space-x-4 mt-4 ml-4 border-l-2 border-gray-100 pl-4">
                          <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${
                            reply.isAuthor ? "bg-gray-900" : "bg-gray-400"
                          }`}>
                            {reply.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 p-4 rounded-3xl">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-bold text-sm">
                                  {reply.author}
                                  {reply.isAuthor && (
                                    <span className="text-[10px] font-normal text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded ml-1">Author</span>
                                  )}
                                </h5>
                                <span className="text-[10px] text-gray-400">{reply.time}</span>
                              </div>
                              <p className="text-sm text-gray-600">{reply.text}</p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <button className="text-xs font-bold text-gray-400 hover:text-blue-500">Like</button>
                              <button className="text-xs font-bold text-gray-400 hover:text-blue-500">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comment Button */}
          <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-[var(--preview-bg)] via-[var(--preview-bg)] to-transparent">
            <div className="w-full max-w-2xl flex flex-col items-center">
              <button className="w-[320px] h-16 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl">
                Post Comment
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CandidateFeed;