"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Newspaper,
  Shield,
} from "lucide-react";

const AdminTopBar = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `flex items-center gap-1 px-2 py-1 rounded-full transition ${
      pathname === href
        ? "bg-gray-100 shadow-sm"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-6 h-6" />
        <span className="font-bold text-lg">News Brief</span>
      </div>

      {/* Right: Navigation */}
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link href="/admin" className={linkClasses("/admin")}>
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link href="/admin/sources" className={linkClasses("/admin/sources")}>
          <FileText size={16} />
          Sources
        </Link>

        <Link href="/admin/topics" className={linkClasses("/admin/topics")}>
          <Tag size={16} />
          Topics
        </Link>

        <Link href="/admin/news" className={linkClasses("/admin/news")}>
          <Newspaper size={16} />
          News
        </Link>

        <Link
          href="/admin"
          className={linkClasses("/admin")}
          style={{ color: "blue" }}
        >
          <Shield size={16} />
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default AdminTopBar;
