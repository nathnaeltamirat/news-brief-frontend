"use client";
import React, { useEffect, useState, useContext } from "react";
import { apiClient, Topic, TrendingNews, getAccessToken } from "@/lib/api";
import TopBar from "@/components/reusable_components/search_topbar";
import ChatBot from "@/components/reusable_components/Generalchatbot";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useParams, useRouter } from "next/navigation";
import { NewsGridNew, SectionHeader } from "@/components/news_component/NewsComponent";

export default function TopicNewsPage() {
  const params = useParams();
  const topicSlug = params.slug as string;
  const router = useRouter();
  
  const context = useContext(ThemeContext);
  if (!context) throw new Error("TopicNewsPage must be used inside ThemeProvider");
  const { theme } = context;
  const { i18n } = useTranslation();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [topicNews, setTopicNews] = useState<TrendingNews[] | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [topicLoading, setTopicLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookmarkedNews, setBookmarkedNews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTopicNews = async () => {
      try {
        setLoading(true);
        
        // Get all topics to find the one with matching slug
        const topicsData = await apiClient.getTopics();
        setTopics(topicsData);
        
        // Find the topic by slug
        const foundTopic = topicsData.find(t => t.slug === topicSlug);
        if (!foundTopic) {
          setErrorMessage("Topic not found");
          return;
        }
        
        setTopic(foundTopic);
        
        // Get news for this topic
        const newsData = await apiClient.getTopicNews(foundTopic.id, 1, 20);
        setTopicNews(newsData.news);
        
        console.log("Topic found:", foundTopic);
        console.log("Topic news:", newsData);
        
      } catch (err: unknown) {
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to fetch topic news"
        );
      } finally {
        setLoading(false);
      }
    };

    if (topicSlug) {
      fetchTopicNews();
    }

    // Initialize bookmarks
    const initializeBookmarks = async () => {
      try {
        const bookmarksData = await apiClient.getBookmarks();
        console.log("Initializing bookmarks on topic page:", bookmarksData);
        // Extract news IDs from the bookmarked news items
        const bookmarkedIds = bookmarksData.news.map(news => news.id);
        console.log("Bookmarked news IDs on topic page:", bookmarkedIds);
        setBookmarkedNews(new Set(bookmarkedIds));
      } catch (error) {
        console.error("Error initializing bookmarks:", error);
        // Set empty set on error to avoid undefined state
        setBookmarkedNews(new Set());
      }
    };
    
    initializeBookmarks();
  }, [topicSlug]);

  // Handle topic changes with skeleton loading
  useEffect(() => {
    if (topicSlug && topics.length > 0) {
      setTopicLoading(true);
      const foundTopic = topics.find(t => t.slug === topicSlug);
      if (foundTopic) {
        setTopic(foundTopic);
        // Fetch news for the new topic
        const fetchNewsForTopic = async () => {
          try {
            const newsData = await apiClient.getTopicNews(foundTopic.id, 1, 20);
            setTopicNews(newsData.news);
          } catch (error) {
            console.error("Error fetching news for topic:", error);
            setTopicNews([]);
          } finally {
            setTopicLoading(false);
          }
        };
        fetchNewsForTopic();
      } else {
        setTopicLoading(false);
      }
    }
  }, [topicSlug, topics]);

  // Bookmark handler
  const handleBookmark = async (newsId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the news click
    
    console.log("Bookmark clicked for news on topic page:", newsId);
    console.log("Current bookmarked news on topic page:", Array.from(bookmarkedNews));
    console.log("Is currently bookmarked on topic page:", bookmarkedNews.has(newsId));
    
    try {
      if (bookmarkedNews.has(newsId)) {
        // Remove bookmark
        console.log("Removing bookmark for:", newsId);
        await apiClient.removeBookmark(newsId);
        setBookmarkedNews(prev => {
          const newSet = new Set(prev);
          newSet.delete(newsId);
          console.log("Updated bookmarked news after removal on topic page:", Array.from(newSet));
          return newSet;
        });
      } else {
        // Add bookmark
        console.log("Adding bookmark for:", newsId);
        try {
          await apiClient.saveBookmark(newsId);
          setBookmarkedNews(prev => {
            const newSet = new Set(prev).add(newsId);
            console.log("Updated bookmarked news after addition on topic page:", Array.from(newSet));
            return newSet;
          });
        } catch (error: any) {
          // Handle 409 error (already bookmarked) gracefully
          if (error.message?.includes('409') || error.message?.includes('already bookmarked')) {
            // Item is already bookmarked, just update local state
            console.log("Item was already bookmarked, updating local state for:", newsId);
            setBookmarkedNews(prev => {
              const newSet = new Set(prev).add(newsId);
              console.log("Updated bookmarked news after 409 handling on topic page:", Array.from(newSet));
              return newSet;
            });
          } else {
            throw error; // Re-throw other errors
          }
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // You could add a toast notification here
    }
  };

  // Helper function to convert topic IDs to names
  const getTopicNames = (topicIds: string[]): string[] => {
    if (!topicIds || !Array.isArray(topicIds) || !topics || topics.length === 0) {
      return [];
    }
    
    const result = topicIds.map(id => {
      const topic = topics.find(t => t.id === id);
      if (topic) {
        return i18n.language === 'am' ? topic.label.am : topic.label.en;
      }
      return null;
    }).filter(name => name !== null);
    
    return [...new Set(result)];
  };

  // Helper function to get topic-based image
  const getTopicImage = (topics: string[]) => {
    // Safety check - if topics is undefined, null, or not an array, use default
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      // Use random image from other folder (1-6)
      const randomImage = Math.floor(Math.random() * 6) + 1; // 1-6
      return `/images/other/${randomImage}.jpg`;
    }
    
    // Map topic IDs to topic names and then to image folders
    const topicNames = getTopicNames(topics);
    const primaryTopic = topicNames[0]?.toLowerCase() || 'general';
    
    console.log("getTopicImage: Primary topic:", primaryTopic, "from topic names:", topicNames);
    
    // Map topic names to available image folders
    const topicImageMap: { [key: string]: string } = {
      'technology': 'technology',
      'tech': 'technology',
      'health': 'health',
      'sports': 'sports',
      'environment': 'enviroment',
      'climate': 'enviroment',
      'science': 'enviroment',
      'business': 'other',
      'politics': 'other',
      'arts': 'other',
      'entertainment': 'other',
      'education': 'other',
      'agriculture': 'other',
      'travel': 'other',
      'general': 'other',
      'news': 'other'
    };
    
    const imageFolder = topicImageMap[primaryTopic] || 'other';
    
    // Select random image based on folder
    let randomImage: number;
    if (imageFolder === 'other') {
      // For other folder, use images 1-6
      randomImage = Math.floor(Math.random() * 6) + 1; // 1-6
    } else {
      // For topic-specific folders, use images 1-6
      randomImage = Math.floor(Math.random() * 6) + 1; // 1-6
    }
    
    const imagePath = `/images/${imageFolder}/${randomImage}.jpg`;
    
    console.log("getTopicImage: Using image from", imageFolder, "folder:", imagePath);
    return imagePath;
  };

  const handleNewsClick = (newsId: string) => {
    const token = getAccessToken();
    if (!token) {
      // Show locked state for non-logged-in users
      alert(i18n.language === 'am' ? 'ዜና ለማየት ይመዝገቡ።' : 'Please sign in to view news details.');
      return;
    }
    router.push(`/news/${newsId}`);
  };

  if (loading) {
    return (
      <>
        <ChatBot />
        <div
          className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors duration-300 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <div className="flex-1 lg:ml-0 lg:mt-1 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
            <div className="flex justify-between w-full mb-4">
              <TopBar />
            </div>
            <div className="space-y-8">
              {/* Shimmer for news grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 lg:col-span-1">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <ChatBot />
        <div
          className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors duration-300 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <div className="flex-1 lg:ml-0 lg:mt-1 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
            <div className="flex justify-between w-full mb-4">
              <TopBar />
            </div>
            <div className="text-center py-10">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!topic) {
    return (
      <>
        <ChatBot />
        <div
          className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors duration-300 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <div className="flex-1 lg:ml-0 lg:mt-1 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
            <div className="flex justify-between w-full mb-4">
              <TopBar />
            </div>
            <div className="text-center py-10">
              <p className="text-gray-500">
                {i18n.language === 'am' ? 'ርዕስ አልተገኘም።' : 'Topic not found'}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ChatBot />
      <div
        className={`flex flex-col lg:flex-row gap-5 min-h-screen w-full transition-colors duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        }`}
      >
        <div className="flex-1 lg:ml-0 lg:mt-1 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="flex justify-between w-full mb-4">
            <TopBar />
          </div>

          {/* Topic News Content */}
          <div
            className={`w-full max-w-7xl mx-auto px-4 space-y-12 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Topic News Grid */}
            {topicLoading ? (
              <div className="space-y-8">
                {/* Shimmer for news grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="md:col-span-2 lg:col-span-1">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : topicNews && topicNews.length > 0 ? (
              <NewsGridNew
                title={i18n.language === 'am' ? topic.label.am : topic.label.en}
                data={topicNews}
                onClick={handleNewsClick}
                onBookmark={handleBookmark}
                bookmarkedNews={bookmarkedNews}
                theme={theme}
                getTopicNames={getTopicNames}
                getTopicImage={getTopicImage}
                currentLanguage={i18n.language}
              />
            ) : (
              <div className="text-center py-10">
                <p className={`text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {i18n.language === 'am' ? 'ለዚህ ርዕስ ዜና ማግኛ አልተገኘም።' : 'No news articles found for this topic.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
