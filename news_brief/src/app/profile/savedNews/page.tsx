"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/siderbar/profile";
import Button from "@/components/reusable_components/Button";
import { Trash } from "lucide-react";
import { apiClient } from "@/lib/api";

import { AiOutlineBook } from 'react-icons/ai';

type SavedNews = {
  id: string;
  title: string;
  description: string;
  source: string;
};

export default function SavedNewsPage() {
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
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to fetch news");
        }
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

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
        await apiClient.removeSavedNewsItem(id);
        setSavedNews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete saved news:", error);
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="flex min-h-screen bg-[#E6E6E6]">
      
      <Sidebar />

      <div className="flex-1 p-12 w-full">
        {/* "saved news text size_ 40 " */}
        <h1 className=" font-bold mb-2 text-2xl">Saved News</h1>
        <p className="text-gray-500 mb-6 text-xl ">Manage saved news and storage</p>

        {/* Management Card */}
        <div className="bg-white rounded-2xl shadow p-6  w-full">
          <p className="font-semibold text-xl mb-4"> Saved News Management</p>
           <div className="mb-3 rounded-2xl shadow p-4  w-full bg-[#F9FAFB]">
            {loading && <p>Loading...</p>}
            <p className="font-medium text mb-2"> Storage used</p>
            <p className="text-[#6B7280] text-sm "> <b>{savedNews.length}</b> articles saved </p>
           </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-1">
              Auto-delete after
            </label>
            <select className="w-full border rounded-md px-3 p-4 py-2">
              <option>Never</option>
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </div>

          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200"
          >
            Clear all saved articles
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Do you really want to delete all saved news?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  handleClearAll();
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}
