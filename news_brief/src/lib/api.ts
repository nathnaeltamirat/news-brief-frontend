"use client";
// API service layer for backend integration
const API_BASE_URL = "https://news-brief-core-api.onrender.com/api/v1";

// Types matching backend interfaces
export interface News {
  id: string;
  title: string;
  description: string;
  topics: string[];
  source: string;
  posted_at: string;
  image_url:string
}
interface Topic {
  id: string;
  slug: string;
  topic_name: string;
  label: {
    en: string;
    am: string;
  };
  story_count: number;
}

interface TopicsResponse {
  topics: Topic[];
  total_topics: number;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
  subscribed: string[]; // news sources / publishers user follows
  topic_interest: string[]; // topics user is interested in
  saved_news: string[]; // IDs of saved news articles
}

export interface Category {
  id: number;
  name: string;
}
class ApiClient {
  private baseURL: string;
  private topicsCache: Topic[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  }
  // authenticated profile
  async getProfile(): Promise<User> {
    return this.request<User>("/auth/me", { method: "GET" });
  }
  async updateProfile(data: {
    full_name?: string;
    email?: string;
  }): Promise<User> {
    return this.request<User>("/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getUser(): Promise<User> {
    return {
      id: "u123",
      name: "John Doe",
      email: "john@example.com",
      role: "user", // add this
      subscribed: ["TechCrunch"],
      topic_interest: ["AI", "Tech", "Science"], // topics user cares about
      saved_news: ["1", "3"],
    };
  }

  async signUp(fullname: string, email: string, password: string) {

    const options = {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
    };
    const res = await fetch(`${this.baseURL}/auth/register`, options);
    const status_code = res.status;
    if (status_code === 409) {
      const error = new Error("User already Exists") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    const data = await res.json();
    if (status_code == 201) {
      const methods = {
        method: "POST",
        body: JSON.stringify({ email, password }),
      };
      const logged_res = await fetch(`${this.baseURL}/auth/login`, methods);

      const logged_val = await logged_res.json();
      localStorage.setItem("person", JSON.stringify(logged_val));
      console.log(logged_val);
    }
    return {
      message: data.message,
      status_code,
    };
  }

  async signIn(email: string, password: string) {
    const methods = {
      method: "POST",
      body: JSON.stringify({ email, password }),
    };
    const logged_res = await fetch(`${this.baseURL}/auth/login`, methods);
    const logged_val = await logged_res.json();
    const status_code = logged_res.status;
    if (status_code != 200) {
      const error = new Error("Invalid Credential") as Error & {
        statusCode?: number;
      };
      error.statusCode = 401;
      throw error;
    }
    this.loadTopics();

    localStorage.setItem("person", JSON.stringify(logged_val));
    // localStorage.setItem("topics", JSON.stringify(this.topicsCache))
    console.log(logged_val);
  }

  async forgotPassword(email: string) {
    return this.request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Reset Password - use token + verifier + new password
  async resetPassword(verifier: string, token: string, password: string) {
    return this.request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ verifier, token, password }),
    });
  }
  signInWithGoogle() {
    // Redirect user to backend Google login route
    window.location.href = `${this.baseURL}/auth/google/login`;
  }
async loadTopics() {
    try {
      const res = await fetch(`${this.baseURL}/topics`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const status_code = res.status;

      if (!res.ok) {
        throw new Error(`Failed to fetch topics, status: ${status_code}`);
      }

      const data: TopicsResponse = await res.json();

      this.topicsCache = data.topics;
    localStorage.setItem("all_topics", JSON.stringify(this.topicsCache));
      return {
        message: "Topics loaded successfully",
        status_code,
      };
    } catch (err) {
      console.error("Error loading topics:", err);
      throw err;
    }
  }

  // Get topic name by id from local cache
  getTopicNameById(id: string): string | undefined {
    const topic = this.topicsCache.find((t) => t.id === id);
    return topic ? topic.topic_name : undefined;
  }
  async getArtsNews(): Promise<News[]> {
    const news = await this.getDummyNews();

    // simulate 2s delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news.filter((n) => n.topics.includes("Arts"));
  }

  async getBusinessNews(): Promise<News[]> {
    const news = await this.getDummyNews();

    // simulate 2s delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return news.filter((n) => n.topics.includes("Business"));
  }

  async getTopNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Indonesia football crush: How the disaster unfolded",
            description:
              "Indonesia’s worst sports disaster left scores dead after chaos erupted at a football match.",
            topics: ["Arts"],
            source: "BBC",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/football/600/400",
          },
          {
            id: "2",
            title:
              "Philippines lottery: Questions raised as hundreds win jackpot",
            description:
              "A lottery in the Philippines with 433 jackpot winners has sparked widespread suspicion.",
            topics: ["Business"],
            source: "Reuters",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/lottery/600/400",
          },
          {
            id: "3",
            title:
              "Biden tells Al Sharpton he will run for president again in 2024",
            description:
              "President Biden has privately confirmed his intention to run for reelection.",
            topics: ["Arts"],
            source: "AP News",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/biden/600/400",
          },
          {
            id: "4",
            title:
              "Covid hospitalization hot spots across the U.S., in five charts",
            description:
              "Covid-19 hospitalizations are climbing again, with sharp increases in several states.",
            topics: ["HArts"],
            source: "NY Times",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/covid/600/400",
          },
        ]);
      }, 100);
    });
  }

  async getDummyNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // === Trending ===
          {
            id: "5",
            title: "Fall back into fitness with this 31-day walking plan",
            description:
              "A change of seasons is the perfect time to start fresh — a simple 30-minute daily walk can improve your health.",
            topics: ["Arts"],
            source: "Healthline",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/fitness/600/400",
          },
          {
            id: "6",
            title: "Apple will manufacture iPhone 14 in India",
            description:
              "Apple will make its iPhone 14 in India, expanding production outside China.",
            topics: ["Arts"],
            source: "TechCrunch",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/iphone/600/400",
          },
          {
            id: "7",
            title: "Virgin Atlantic adopts gender-neutral uniform policy",
            description:
              "Virgin Atlantic will allow cabin crew to choose which uniform to wear, regardless of gender.",
            topics: ["Business"],
            source: "CNN",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/virgin/600/400",
          },
          {
            id: "8",
            title: "Next year’s Met Gala theme revealed",
            description:
              "Organizers announced the 2023 Met Gala theme: celebrating the works of Karl Lagerfeld.",
            topics: ["Arts", "Business"],
            source: "Vogue",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/metgala/600/400",
          },

          // === Arts ===
          {
            id: "9",
            title:
              "Vermeer at the National Gallery in Washington, DC declared a fake",
            description:
              "Art experts discovered that a painting long attributed to Vermeer is not authentic.",
            topics: ["Arts"],
            source: "Guardian",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/vermeer/600/400",
          },
          {
            id: "10",
            title: "10 most famous paintings in the world",
            description:
              "From Mona Lisa to The Starry Night — discover the world’s most iconic masterpieces.",
            topics: ["Arts"],
            source: "History Today",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/paintings/600/400",
          },
          {
            id: "11",
            title: "Jurassic dinosaur fossil will go up for auction in Paris",
            description:
              "A rare Jurassic fossil is expected to fetch millions at an upcoming Paris auction.",
            topics: ["Science", "Arts"],
            source: "Smithsonian",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/dinosaur/600/400",
          },

          // === Business ===
          {
            id: "12",
            title: "Elon Musk: Twitter won’t ‘take yes for an answer’",
            description:
              "Elon Musk continues to clash with Twitter ahead of the acquisition deal deadline.",
            topics: ["Business", "Arts"],
            source: "WSJ",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/musk/600/400",
          },
          {
            id: "13",
            title: "Samsung warns of 32% hit to profits on chip slump",
            description:
              "Global chip demand slowdown impacts Samsung’s earnings outlook.",
            topics: ["Business", "Technology"],
            source: "Bloomberg",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/samsung/600/400",
          },
          {
            id: "14",
            title:
              "UK declines climate warnings with new oil and gas licences approval",
            description:
              "The UK government approved new oil drilling licences despite climate concerns.",
            topics: ["Business", "Politics"],
            source: "Financial Times",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/oil/600/400",
          },

          // === Redundant / Repeated to simulate feed ===
          {
            id: "15",
            title:
              "Philippines lottery: Questions raised as hundreds win jackpot",
            description:
              "A lottery in the Philippines with 433 jackpot winners has sparked widespread suspicion.",
            topics: ["Business"],
            source: "Reuters",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/lottery/600/400",
          },
          {
            id: "16",
            title:
              "Philippines lottery: Questions raised as hundreds win jackpot",
            description:
              "A lottery in the Philippines with 433 jackpot winners has sparked widespread suspicion.",
            topics: ["Business"],
            source: "Reuters",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/lottery2/600/400",
          },
          {
            id: "17",
            title:
              "Philippines lottery: Questions raised as hundreds win jackpot",
            description:
              "A lottery in the Philippines with 433 jackpot winners has sparked widespread suspicion.",
            topics: ["Business"],
            source: "Reuters",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/lottery3/600/400",
          },
        ]);
      }, 100);
    });
  }

  async getTopic(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Agriculture" },
          { id: 2, name: "Technology" },
          { id: 3, name: "Health" },
          { id: 4, name: "Education" },
          { id: 5, name: "Sports" },
          { id: 6, name: "Entertainment" },
          { id: 7, name: "Business" },
          { id: 8, name: "Politics" },
          { id: 9, name: "Science" },
          { id: 10, name: "Travel" },
        ]);
      }, 500);
    });
  }

  async getTopicFeed(): Promise<News[]> {
    const [user, news] = await Promise.all([
      this.getUser(),
      this.getDummyNews(),
    ]);
    return news.filter((n) =>
      n.topics.some((topic) => user.topic_interest.includes(topic))
    );
  }

  async getSubscribedFeed(): Promise<News[]> {
    const [user, news] = await Promise.all([
      this.getUser(),
      this.getDummyNews(),
    ]);
    return news.filter((n) => user.subscribed.includes(n.source));
  }

  async getSavedNews(): Promise<News[]> {
    const [user, news] = await Promise.all([
      this.getUser(),
      this.getDummyNews(),
    ]);
    return news.filter((n) => user.saved_news.includes(n.id));
  }

  async deleteAllSavedNews(): Promise<void> {
    const user = await this.getUser();
    user.saved_news = [];
    return;
  }

  async saveNewsItem(newsId: string): Promise<void> {
    const user = await this.getUser();
    if (!user.saved_news.includes(newsId)) {
      user.saved_news.push(newsId);
    }
  }

  async removeSavedNewsItem(newsId: string): Promise<void> {
    const user = await this.getUser();
    user.saved_news = user.saved_news.filter((id) => id !== newsId);
  }

  // Verify email with token + verifier
  async verifyEmail(verifier: string, token: string) {
    const res = await fetch(
      `${this.baseURL}/auth/verify-email?verifier=${verifier}&token=${token}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Verification failed ❌");
    }

    return await res.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("person");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed?.access_token ?? null;
      } catch {
        return null;
      }
    }
  }
  return null;
}


export function getUserRole(): "admin" | "user" | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("person");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed?.user?.role ?? null;
      } catch {
        return null;
      }
    }
  }
  return null;
}
