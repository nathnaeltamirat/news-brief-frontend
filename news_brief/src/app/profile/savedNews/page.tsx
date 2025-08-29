"use client";
import { useEffect, useState, useContext } from "react";
import Sidebar from "@/components/siderbar/profile";
import Button from "@/components/reusable_components/Button";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { apiClient } from "@/lib/api";

type SavedNews = {
  id: string;
  title: string;
  description: string;
  source: string;
};

export default function SavedNewsPage() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("SavedNewsPage must be used inside ThemeProvider");
  const { theme } = context;

  const [savedNews, setSavedNews] = useState<SavedNews[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const getInformation = async () => {
      try {
        setLoading(true);
        const topicNews = await apiClient.getSavedNews();
        setSavedNews(topicNews);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    getInformation();
  }, []);

  const handleClearAll = async () => {
    try {
      setLoading(true);
      await apiClient.deleteAllSavedNews();
      setSavedNews([]);
    } catch (error) {
      console.error("Failed to clear saved news:", error);
    } finally {
      setLoading(false);
    }
  };

  const bgMain = theme === "light" ? "bg-gray-50 text-black" : "bg-gray-900 text-white";
  const cardBg = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const subCardBg = theme === "light" ? "bg-gray-100 text-black" : "bg-gray-700 text-white";
  const textGray = theme === "light" ? "text-gray-700" : "text-gray-300";
  const selectBg = theme === "light" ? "bg-white border-gray-300 text-black" : "bg-gray-700 border-gray-600 text-white";

  return (
    <div className={`flex min-h-screen transition-colors ${bgMain}`}>
      <Sidebar />

      <div className="flex-1 p-4 lg:p-12 w-full lg:ml-0 mt-20 lg:mt-0">
        <h1 className="font-bold mb-2 text-xl lg:text-2xl">Saved News</h1>
        <p className={`mb-6 text-lg lg:text-xl ${textGray}`}>Manage saved news and storage</p>

        <div className={`rounded-2xl shadow p-4 lg:p-6 w-full transition-colors ${cardBg}`}>
          <p className="font-semibold text-lg lg:text-xl mb-4">Saved News Management</p>

          <div className={`mb-3 rounded-2xl shadow p-4 w-full ${subCardBg}`}>
            {loading && <p>Loading...</p>}
            <p className="font-medium mb-2">Storage used</p>
            <p className={`text-sm ${textGray}`}><b>{savedNews.length}</b> articles saved</p>
          </div>

          <div className="mb-6">
            <label className="block text-base lg:text-lg font-medium mb-1">Auto-delete after</label>
            <select className={`w-full border rounded-md px-3 py-2 ${selectBg}`}>
              <option>Never</option>
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>

          <Button
            variant="primary"
            className="w-full rounded-full py-2 mt-2"
            onClick={() => setShowDeleteModal(true)}
          >
            Clear all saved articles
          </Button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg shadow-lg p-6 w-80 lg:w-96 mx-4 transition-colors ${cardBg}`}>
            <h2 className="text-lg font-semibold mb-4 text-red-600">Are you sure?</h2>
            <p className={`mb-6 ${textGray}`}>
              This action cannot be undone. Do you really want to delete all saved news?
            </p>
            <div className="flex justify-end gap-3 flex-wrap">
              <Button
                variant="secondary"
                className="rounded-full px-4 py-2 w-full sm:w-auto"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="rounded-full px-4 py-2 w-full sm:w-auto"
                onClick={() => {
                  setShowDeleteModal(false);
                  handleClearAll();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
