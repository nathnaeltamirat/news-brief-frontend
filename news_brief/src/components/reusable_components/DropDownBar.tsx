import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, Bookmark, Settings, Bell } from "lucide-react";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setOpen((prev) => !prev)}
      >
        <User size={16} />
        <span>Profile</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-50  border border-gray-200  rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="text-sm">
            <li>
              <Link href="/foryou" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <User size={14} /> For You
              </Link>
            </li>
            <li>
              <Link href="news/saved" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bookmark size={14} /> Saved
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Settings size={14} /> Settings
              </Link>
            </li>
            <li>
              <Link href="/subscriptions" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell size={14} /> Subscriptions
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
              >
                <LogOut size={14} className="text-red-600" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
