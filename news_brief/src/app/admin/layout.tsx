"use client";


import AdminTopBar from "../../components/Admin_components/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminTopBar />
  
      <main className="flex-1 p-4 bg-gray-50 pt-16">{children}</main>
    
    </div>
  );
}
