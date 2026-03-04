"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

const candidateNavItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/candidate" },
  { icon: "dashboard", label: "Dashboard", href: "/candidate/dashboard" },
  { icon: "mail", label: "Messages", href: "/candidate/messages", badge: 4 },
  { icon: "group", label: "Connections", href: "/candidate/connections" },
  { icon: "business", label: "Companies", href: "/candidate/companies" },
  { icon: "work", label: "Jobs", href: "/candidate/jobs" },
  { icon: "person", label: "Profile", href: "/candidate/profile" },
];

const employerNavItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/employer" },
  { icon: "mail", label: "Messages", href: "/employer/messages" },
  { icon: "person", label: "Profile", href: "/employer/profile" },
  { icon: "dashboard", label: "Dashboard", href: "/employer/dashboard" },
  { icon: "description", label: "Applications", href: "/employer/applications" },
  { icon: "group", label: "Connections", href: "/employer/connections" },
  { icon: "business", label: "Companies", href: "/employer/companies" },
];

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

interface SidebarProps {
  userName?: string;
  userImage?: string;
  user?: User;
  onLogout?: () => void;
}

export default function Sidebar({ userName, userImage, user, onLogout }: SidebarProps = {}) {
  const pathname = usePathname();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U";

  // Select navigation items based on user type
  const navItems = user?.userType === "employer" ? employerNavItems : candidateNavItems;

  useEffect(() => {
    // Fetch profile image if user object is provided
    if (user?.id && !userImage) {
      fetchProfileImage(user.id, user.userType);
    }
  }, [user?.id, user?.userType, userImage]);

  const fetchProfileImage = async (userId: number, userType: "candidate" | "employer") => {
    try {
      const endpoint = userType === "employer" 
        ? `http://localhost:5000/api/employers/${userId}`
        : `http://localhost:5000/api/candidates/${userId}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        const imageField = userType === "employer" ? "companylogo" : "profileimage";
        if (data.data?.[imageField]) {
          setProfileImage(data.data[imageField]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch profile image:", error);
    }
  };

  const displayName = userName || user?.fullName || "User";
  const displayImage = userImage || profileImage || defaultImage;
  const welcomeMessage = user?.userType === "employer" 
    ? "Discover top talent today!"
    : "Your job is waiting for you!";

  return (
    <aside className="w-[280px] bg-[#252525] flex flex-col items-center py-10 text-white shrink-0">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            src={displayImage}
          />
        </div>
        <h2 className="text-xl font-bold">Hi, {displayName.split(' ')[0]}!</h2>
        <p className="text-xs text-gray-400 mt-1">{welcomeMessage}</p>
      </div>

      <nav className="flex-1 w-full px-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-4 px-4 py-3 rounded-2xl transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium text-sm flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto w-full px-8 pb-8 flex flex-col items-center">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
