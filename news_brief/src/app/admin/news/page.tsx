"use client";

import { useState, useEffect } from "react";
import { apiClient, Source } from "@/lib/api";

export default function AddNewsPage() {
  const [form, setForm] = useState({
    title: "",
    language: "",
    source_id: "", // ⚠️ renamed to match backend
    body: "",
    topics: [] as string[], // should be UUIDs
  });

  const [sources, setSources] = useState<{ id: string; name: string }[]>([]);
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openTopics, setOpenTopics] = useState(false);
  const [loading, setLoading] = useState(true);

  const languages = [
    { id: "en", name: "English" },
    { id: "am", name: "Amharic" },
  ];

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const data: Source[] = await apiClient.getSources();
        setSources(data.map(src => ({ id: src.slug, name: src.name })));
      } catch (err) {
        console.error("Error fetching sources:", err);
      } finally {
        setLoading(false);
      }
    };

    // Example static topics – replace with API if needed
    const fetchTopics = () => {
      setTopics([
        { id: "3924a80e-81de-43ee-8145-17e4334e004d", name: "World" },
        { id: "b8a9b38d-60e3-48ba-ae4f-e2feee3441f2", name: "Business" },
        { id: "17e4334e004d-1234", name: "Politics" },
      ]);
    };

    fetchSources();
    fetchTopics();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleTopic = (topicId: string) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics.includes(topicId)
        ? prev.topics.filter(t => t !== topicId)
        : [...prev.topics, topicId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    try {
      setShowConfirm(false);
      setSubmitted(false);

      await apiClient.createNews({
        title: form.title,
        language: form.language,
        source_id: form.source_id,
        body: form.body,
        topics: form.topics,
         
      });

      setSubmitted(true);
      setForm({ title: "", language: "", source_id: "", body: "", topics: [] });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) alert("Failed to create news: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 relative">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Add New News
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:ring-0"
                required
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select language</option>
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Source</label>
              <select
                name="source_id"
                value={form.source_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">Select source</option>
                {sources.map(src => (
                  <option key={src.id} value={src.id}>{src.name}</option>
                ))}
              </select>
            </div>

            {/* Body */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Body</label>
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Write the content here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none"
                required
              />
            </div>

            {/* Topics */}
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">Topic(s)</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenTopics(!openTopics)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-left flex justify-between items-center"
                >
                  {form.topics.length ? form.topics.map(id => topics.find(t => t.id === id)?.name).join(", ") : "Select topics"}
                  <span>{openTopics ? "▲" : "▼"}</span>
                </button>

                {openTopics && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-56 overflow-y-auto">
                    {topics.map(topic => (
                      <label key={topic.id} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={form.topics.includes(topic.id)}
                          onChange={() => toggleTopic(topic.id)}
                          className="h-4 w-4 text-black border-gray-300 rounded"
                        />
                        {topic.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
            <p className="mb-6">Do you want to submit this news?</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800" onClick={confirmSubmit}>Submit</button>
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
