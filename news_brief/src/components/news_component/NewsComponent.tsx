// "use client";
// import { apiClient, News } from "@/lib/api";
// import { useContext, useEffect, useState } from "react";
// import Button from "../reusable_components/Button";
// import { Bookmark, ThumbsDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { ThemeContext } from "@/app/contexts/ThemeContext";

// export default function NewsComponent() {
//   const [topNews, setTopNews] = useState<News[] | null>(null);
//   const [news, setNews] = useState<News[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("NewsComponent must be used inside ThemeProvider");
//   const { theme } = context;

//   useEffect(() => {
//     const getInformation = async () => {
//       try {
//         setLoading(true);
//         const [newsData, topNewsData] = await Promise.all([
//           apiClient.getDummyNews(),
//           apiClient.getTopNews(),
//         ]);
//         setNews(newsData);
//         setTopNews(topNewsData);
//       } catch (err: unknown) {
//         if (err instanceof Error) setErrorMessage(err.message);
//         else setErrorMessage("Failed to fetch news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     getInformation();
//   }, []);

//   const handleNewsClick = (newsId: string) => {
//     router.push(`/news/${newsId}`);
//   };

//   if (loading) return <p>Loading news ...</p>;
//   if (errorMessage) return <p>Error: {errorMessage}</p>;

//   const cardBg = theme === "light" ? "bg-white text-black border-[#E6E6E6]" : "bg-gray-800 text-white border-gray-700";

//   return (
//     <div className="w-full space-y-6">
//       {/* Top News */}
//       <div className={`flex flex-col lg:flex-row gap-3 lg:gap-4 rounded-lg border shadow-sm cursor-pointer transition-shadow overflow-hidden ${cardBg}`}>
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
//           className="w-full lg:w-[30%] object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
//           alt="Top-News_image"
//         />
//         <div className="p-3 flex-1 min-w-0">
//           {topNews?.map((item, index) => (
//             <div key={index} className="w-full space-y-2">
//               <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
//                 <div className="flex gap-1 flex-wrap">
//                   <Button variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">Top Story</Button>
//                 </div>
//                 <p className="text-gray-400 text-xs sm:text-sm">{item.posted_at}</p>
//               </div>

//               <p
//                 className="font-bold my-2 cursor-pointer hover:text-gray-500 line-clamp-2"
//                 onClick={() => handleNewsClick(item.id)}
//               >
//                 {item.title}
//               </p>
//               <p className="text-sm font-light line-clamp-2 sm:line-clamp-none mb-2">{item.description}</p>

//               <div className="flex gap-2">
//                 <Button variant="tertiary" className="rounded-lg px-2 py-1">
//                   <Bookmark className="w-4 h-4 mr-1" />
//                 </Button>
//                 <Button variant="tertiary" className="rounded-lg px-2 py-1">
//                   <ThumbsDown className="w-4 h-4 mr-1" />
//                 </Button>
//               </div>
//               <p className="text-xs sm:text-sm text-gray-400">Source: {item.source}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Your Briefing */}
//       <h1 className="font-bold text-base sm:text-lg lg:text-xl">Your Briefing</h1>

//       <div className="space-y-4">
//         {news?.map((item, index) => (
//           <div
//             key={index}
//             className={`flex flex-col lg:flex-row gap-3 p-3 rounded-lg border shadow-sm cursor-pointer transition-shadow overflow-hidden ${cardBg}`}
//             onClick={() => handleNewsClick(item.id)}
//           >
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtH4XtF9PXCNWYUFmZ05OJe_DyG5zvY29oA&s"
//               className="w-full lg:w-[20%] object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg"
//               alt="News image"
//             />
//             <div className="flex-1 min-w-0 space-y-2">
//               <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
//                 <div className="flex flex-wrap gap-1 lg:gap-2">
//                   {item.topics.map((topic, idx) => (
//                     <Button key={idx} variant="tertiary" className="rounded-lg px-3 py-1 text-xs sm:text-sm">{topic}</Button>
//                   ))}
//                 </div>
//                 <p className="text-gray-400 text-xs sm:text-sm">{item.posted_at}</p>
//               </div>

//               <p className="font-bold text-sm sm:text-base lg:text-lg my-1 hover:text-gray-500 line-clamp-2">{item.title}</p>
//               <p className="text-sm font-light line-clamp-2 sm:line-clamp-none mb-2">{item.description}</p>

//               <div className="flex gap-2">
//                 <Button variant="tertiary" className="rounded-lg px-2 py-1">
//                   <Bookmark className="w-4 h-4 mr-1" />
//                 </Button>
//                 <Button variant="tertiary" className="rounded-lg px-2 py-1">
//                   <ThumbsDown className="w-4 h-4 mr-1" />
//                 </Button>
//               </div>
//               <p className="text-xs sm:text-sm text-gray-400">Source: {item.source}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { Bookmark, X } from "lucide-react";
import { apiClient, News } from "@/lib/api";

export default function NewsFeed() {
  const [topNews, setTopNews] = useState<News | null>(null);
  const [dummyNews, setDummyNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const [top, dummy] = await Promise.all([
        apiClient.getTopNews(),
        apiClient.getDummyNews(),
      ]);
      setTopNews(top[0] || null);
      setDummyNews(dummy);
      setLoading(false);
    }

    fetchNews();
  }, []);

  const handleSave = (newsId: string) => {
    if (savedItems.includes(newsId)) {
      setSavedItems(savedItems.filter((id) => id !== newsId));
    } else {
      setSavedItems([...savedItems, newsId]);
    }
  };

  if (loading) return <p>Loading news...</p>;

  // ---------------- Top News Card (Card 1 UI) ----------------
  const renderTopNewsCard = (news: News) => (
    <div
      key={news.id}
      className="relative sm:col-span-2 shadow-lg rounded-xl overflow-hidden bg-white"
    >
      {/* Image full size */}
      <img
        src="/image.png"
        alt={news.title}
        className="w-full h-[400px] object-cover" // ✅ custom height
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
        <p className="inline-block text-sm font-medium text-white bg-black/50 px-3 py-1 rounded-2xl w-fit">
          {news.topics[0] || "Science"}
        </p>

        <h2 className="text-lg font-semibold mb-2 text-white">{news.title}</h2>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-200">
            {news.posted_at || "2h ago"} &nbsp; {news.source || "BBC by Jane"}
          </p>

          <button
            onClick={() => handleSave(news.id)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md font-medium transition-colors ${
              savedItems.includes(news.id)
                ? "bg-gray-400 text-white"
                : " text-white "
            }`}
          >
            <Bookmark size={16} />{" "}
            {savedItems.includes(news.id) ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Close button */}
      <button className="absolute top-3 right-3 text-white hover:text-gray-200 transition shadow-sm bg-black/40 rounded">
        <X size={20} />
      </button>
    </div>
  );

  // ---------------- Dummy News Card (Card 2 UI) ----------------
  const renderDummyNewsCard = (news: News) => (
    <div
      key={news.id}
      className="shadow-lg rounded-xl overflow-hidden bg-white"
    >
      {/* Image */}
      <img
        src="/img2.png"
        alt={news.title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="inline-block text-sm font-medium shadow-sm text-gray-900 bg-gray-100 px-3 py-2 rounded-2xl">
          {news.topics[0] || "Business"}
        </p>

        <h2 className="text-sm font-semibold mb-2">{news.title}</h2>

        <p className="text-sm text-gray-400">
          {news.posted_at || "2h ago"} &nbsp; {news.source || "BBC by Jane"}
        </p>

        <button
          onClick={() => handleSave(news.id)}
          className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium transition-colors ${
            savedItems.includes(news.id)
              ? "bg-gray-400 text-white"
              : "bg-[#1E5A47] text-white hover:bg-[#154536]"
          }`}
        >
          <Bookmark size={16} />{" "}
          {savedItems.includes(news.id) ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {topNews && renderTopNewsCard(topNews)}
      {dummyNews.map((news) => renderDummyNewsCard(news))}
    </div>
  );
}
