"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  id: number;
  email: string;
  fullName: string;
  userType: "candidate" | "employer";
}

interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

const candidateNavItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/candidate" },
  { icon: "dashboard", label: "Dashboard", href: "/candidate/dashboard" },
  { icon: "business_center", label: "Jobs", href: "/candidate/jobs" },
  { icon: "mail", label: "Messages", href: "/candidate/messages", badge: 4 },
  { icon: "person", label: "Profile", href: "/candidate/profile" },
];

const employerNavItems: NavItem[] = [
  { icon: "home", label: "Home", href: "/employer" },
  { icon: "business_center", label: "Postings", href: "/employer/jobs" },
  { icon: "mail", label: "Messages", href: "/employer/messages", badge: 2 },
  { icon: "person", label: "Profile", href: "/employer/profile" },
];

interface SidebarProps {
  user?: User | null;
  onLogout?: () => void;
  onSelect?: (panel: string) => void;
  activePanel?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, onSelect, activePanel }) => {
  const pathname = usePathname();
  const firstName = user?.fullName.split(" ")[0] || "User";
  const userType = user?.userType || "candidate";

  const sidebarRef = useRef<HTMLElement | null>(null);
  const isDragging = useRef(false);
  const [width, setWidth] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("sidebarWidth");
      return stored ? Number(stored) : 280;
    } catch {
      return 280;
    }
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !sidebarRef.current) return;
      const rect = sidebarRef.current.getBoundingClientRect();
      const newWidth = Math.max(200, Math.min(520, e.clientX - rect.left));
      setWidth(newWidth);
    };

    const onUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        try {
          localStorage.setItem("sidebarWidth", String(width));
        } catch {}
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }
    };

    if (isDragging.current) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [width]);

  const startDrag = (e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  };

  const resetWidth = () => {
    setWidth(280);
    try {
      localStorage.setItem("sidebarWidth", "280");
    } catch {}
  };

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className="bg-[#252525] flex flex-col items-center py-10 text-white shrink-0 relative"
    >
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
          />
        </div>
        <h2 className="text-xl font-bold">Hi, {firstName}!</h2>
        <p className="text-xs text-gray-400 mt-1">
          {userType === "employer" ? "Manage your postings" : "Ready to make an impact?"}
        </p>
      </div>

      <nav className="flex-1 w-full px-6 space-y-2">
        {(userType === "candidate" ? candidateNavItems : employerNavItems).map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-4 px-4 py-3 rounded-2xl transition-colors ${
                isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
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

      {/* Resizer */}
      <div
        onMouseDown={startDrag}
        onDoubleClick={resetWidth}
        className="absolute top-0 right-0 h-full w-1 cursor-col-resize z-20"
        title="Drag to resize. Double-click to reset."
      />
    </aside>
  );
};

export default Sidebar;
