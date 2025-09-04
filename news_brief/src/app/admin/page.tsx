"use client";

import { useEffect, useState } from "react";
import { Charts } from "@/components/reusable_components/Chart";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-22 py-6">
      <h1 className="text-lg font-semibold mb-4">Admin Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-4 border border-gray-100 w-70"
          >
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                {i === 1 && (
                  <>
                    <p className="text-sm font-medium mb-3">Total News</p>
                    <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">Published</span>
                      <span className="text-lg font-semibold text-gray-900">
                        12,584
                      </span>
                    </div>
                  </>
                )}
                {i === 2 && (
                  <>
                    <p className="text-sm font-medium mb-3">Total Topics</p>
                    <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">Active</span>
                      <span className="text-lg font-semibold text-gray-900">
                        47
                      </span>
                    </div>
                  </>
                )}
                {i === 3 && (
                  <>
                    <p className="text-sm font-medium mb-3">Total Sources</p>
                    <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">Verified</span>
                      <span className="text-lg font-semibold text-gray-900">
                        125
                      </span>
                    </div>
                  </>
                )}
                {i === 4 && (
                  <>
                    <p className="text-sm font-medium mb-3">Total Users</p>
                    <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">Registered</span>
                      <span className="text-lg font-semibold text-gray-900">
                        1,242
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="">
        {loading ? (
          <div className="animate-pulse h-72 w-full bg-gray-200 rounded-lg"></div>
        ) : (
          <Charts />
        )}
      </div>
    </div>
  );
}
