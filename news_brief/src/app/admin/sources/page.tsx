"use client";

import { useState } from "react";

export default function AddSourcePage() {
  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    url: "",
    logoUrl: "",
    language: "En",
    reliability: 5.7,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
      slug: "",
      name: "",
      description: "",
      url: "",
      logoUrl: "",
      language: "En",
      reliability: 5.7,
    });

    setTimeout(() => setSubmitted(false), 3000);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 relative">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Add New Source
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Enter slug"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter source name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Url */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">URL</label>
            <input
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Logo Url */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Logo URL</label>
            <input
              type="url"
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              placeholder="https://logo.png"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0 transition"
            >
              <option value="">Select Language</option>
              <option value="En">English</option>
              <option value="Am">Amharic</option>
            </select>
          </div>

          {/* Reliability Score */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Reliability Score</label>
            <input
              type="number"
              step="0.1"
              name="reliability"
              value={form.reliability}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-28 focus:border-black focus:ring-0 transition"
            />
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
            <p className="mb-6">Are you sure you want to submit this source?</p>
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
      {submitted && (
        <div className="absolute top-8 right-8 bg-black text-white px-5 py-3 rounded-lg shadow-lg">
          Submitted Successfully!
        </div>
      )}
    </div>
  );
}
