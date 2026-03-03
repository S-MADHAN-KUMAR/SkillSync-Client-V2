"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
  { icon: "mail", label: "Messages", href: "/messages", badge: 4 },
  { icon: "business_center", label: "Jobs", href: "/jobs" },
  { icon: "notifications", label: "Notifications", href: "/notifications" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#252525] flex flex-col items-center py-10 text-white shrink-0">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-gray-600 p-1 mb-4 overflow-hidden">
          <img
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jg-Q0OOhOOQN96b3xn72SWWysBb9KtKnKs3mdA9LOQmmUAAS0p0G18S2x3EQWxSg4C2lW2pzgCLzKMutQ4-Z9V1m90gIv2-Gs7hN5t5unLzYABo3W_1ciu7bPW95kvkSfjw97qfhPPRydckGW4yIGKyvOyQ_yhI1SC2LH9PdOwhoBD4FDOGL8h4hrWGhpLnzSELtOL3NapOMXYuS4OVXFK_5I-y9sfgRhUDhaG4z2CrbUIWVCIcercZaRmiK6nEWRTwOvIxD0U"
          />
        </div>
        <h2 className="text-xl font-bold">Hi, George!</h2>
        <p className="text-xs text-gray-400 mt-1">Your job is waiting for you!</p>
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
        <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
