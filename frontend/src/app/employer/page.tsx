"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
  is_onboarded: boolean;
}

interface Post {
  id: number;
  user_id: number;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
  full_name: string;
  user_type: string;
  user_image: string | null;
}

export default function EmployerFeed() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasChecked = useRef(false);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Get user initials
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetails(true);
  };

  // Handle close button click
  const handleCloseDetails = () => {
    setShowPostDetails(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData: User = JSON.parse(storedUser);
      if (userData.userType !== "employer") {
        router.push("/candidate");
        return;
      }
      if (!userData.is_onboarded) {
        router.push("/employer/onboarding");
        return;
      }
      setUser(userData);
      fetchPosts();
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="text-center">
          <div className="inline-block size-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <style jsx global>{`
        :root {
          --off-white: #f5f7f9;
          --preview-bg: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

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
            {posts.length > 0 ? posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white p-5 rounded-[28px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100">
                      {post.user_image ? (
                        <img alt={post.full_name} className="w-full h-full object-cover" src={post.user_image} />
                      ) : (
                        <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs">
                          {getInitials(post.full_name)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 leading-none">{post.full_name}</h4>
                      <span className="text-[10px] text-gray-400">{getTimeAgo(post.created_at)} • {post.user_type === 'employer' ? 'Employer' : 'Candidate'}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900">
                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                  </button>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                {post.images && post.images.length > 0 && (
                  <div className="mt-4 rounded-2xl overflow-hidden aspect-video bg-gray-100">
                    <img alt="Post content" className="w-full h-full object-cover" src={post.images[0]} />
                  </div>
                )}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                      <span className="text-xs font-bold">0</span>
                    </button>
                    <button className="flex items-center space-x-1 text-blue-600">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      <span className="text-xs font-bold">0</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-900">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No posts yet. Be the first to post!</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel - Post Details */}
        {showPostDetails && selectedPost && (
          <section className="flex-1 bg-[var(--preview-bg)] flex flex-col relative overflow-hidden">
            <div className="absolute top-8 right-8">
              <button 
                onClick={handleCloseDetails}
                className="w-10 h-10 bg-white border border-gray-100 text-gray-900 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-12 pt-16 pb-32 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                {/* Post Header */}
                <div className="flex items-center space-x-4 mb-6">
                  {selectedPost.user_image ? (
                    <img
                      alt={selectedPost.full_name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      src={selectedPost.user_image}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-4 border-white shadow-lg text-pink-600 font-bold text-sm">
                      {getInitials(selectedPost.full_name)}
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedPost.full_name}</h1>
                    <p className="text-gray-500 font-medium">{selectedPost.user_type === 'employer' ? 'Employer' : 'Candidate'}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPost.title}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPost.description}</p>
                  
                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {selectedPost.images.map((image, index) => (
                        <div key={index} className="rounded-2xl overflow-hidden bg-gray-100">
                          <img alt={`Post image ${index + 1}`} className="w-full h-auto object-cover" src={image} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comments Section */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-bold text-gray-900">Comments (0)</h2>
                    <button className="text-sm font-semibold text-gray-500 flex items-center hover:text-gray-900">
                      Most Relevant <span className="material-symbols-outlined text-base ml-1">expand_more</span>
                    </button>
                  </div>

                  <div className="text-center py-12">
                    <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
                  </div>
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
        )}
      </div>
    </div>
  );
}
