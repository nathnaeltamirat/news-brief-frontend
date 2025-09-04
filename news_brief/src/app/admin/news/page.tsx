"use client";

import { useState } from "react";

export default function AddNewsPage() {
  const [form, setForm] = useState({
    title: "",
    language: "",
    source: "",
    bodyAm: "",
    bodyEn: "",
    topics: [] as string[],
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openTopics, setOpenTopics] = useState(false);

  const languages = ["Amharic", "English"];
  const topicOptions = [
    "World", "National", "Politics", "Business", "Economy", "Technology", "Science",
    "Health", "Education", "Sports", "Entertainment"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleTopic = (topic: string) => {
    setForm((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

    const confirmSubmit = () => {
    console.log(form);
    setShowConfirm(false);
    setSubmitted(true);

    // ✅ Reset all fields after successful submit
    setForm({
      title: "",
    language: "",
    source: "",
    bodyAm: "",
    bodyEn: "",
    topics: [] as string[],
    });

    setTimeout(() => setSubmitted(false), 3000);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 relative">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Add New News
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="News title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
              required
            />
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:border-black focus:ring-0 transition"
              required
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Source</label>
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
              required
            >
              <option value="">Select source</option>
              <option value="bbc">BBC</option>
              <option value="cnn">CNN</option>
              <option value="local">Local Media</option>
            </select>
          </div>

          {/* Body (Amharic) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Body (Amharic)</label>
            <textarea
              name="bodyAm"
              value={form.bodyAm}
              onChange={handleChange}
              placeholder="Body content in Amharic"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Body (English) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Body (English)</label>
            <textarea
              name="bodyEn"
              value={form.bodyEn}
              onChange={handleChange}
              placeholder="Body content in English"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Topics Multi-select Dropdown */}
<div className="md:col-span-2 relative">
  <label className="block text-sm font-medium text-gray-600 mb-2">Topic(s)</label>
  <div className="relative">
    <button
      type="button"
      onClick={() => setOpenTopics(!openTopics)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-left flex justify-between items-center focus:border-black focus:ring-0 transition"
    >
      {form.topics.length ? form.topics.join(", ") : "Select topics"}
      <span>{openTopics ? "▲" : "▼"}</span>
    </button>

    {openTopics && (
      <div
        className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg 
                   max-h-56 overflow-y-auto"
        style={{ maxHeight: "220px" }} // limits dropdown height
      >
        {topicOptions.map((topic) => (
          <label
            key={topic}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={form.topics.includes(topic)}
              onChange={() => toggleTopic(topic)}
              className="h-4 w-4 text-black border-gray-300 rounded focus:ring-0"
            />
            {topic}
          </label>
        ))}
      </div>
    )}
  </div>
</div>


          {/* Submit */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
            <p className="mb-6">Are you sure you want to submit this news?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={confirmSubmit}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      
    </div>
  );
}
