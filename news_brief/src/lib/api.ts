"use client";

const API_BASE_URL = "https://news-brief-core-api.onrender.com/api/v1";

// Types
export interface News {
  id: string;
  title: string;
  description: string;
  topics: string[];
  source: string;
  posted_at: string;
  image_url: string;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  role?: "admin" | "user";
  subscribed: string[];
  topic_interest: string[];
  saved_news: string[];
}

export interface Subscription {
  source_slug: string;
  source_name: string;
  subscribed_at: string;
  topics: string[];
}

export interface SubscriptionResponse {
  subscriptions: Subscription[];
  total_subscriptions: number;
  subscription_limit: number;
}

export interface Category {
  id: number;
  name: string;
}

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

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = getAccessToken();

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

    return response.json();
  }

  // ===== User =====
  async getProfile(): Promise<User> {
    return this.request<User>("/me", { method: "GET" });
  }

  async updateProfile(data: { fullname?: string }): Promise<User> {
    return this.request<User>("/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getUser(): Promise<User> {
    // Dummy user
    return {
      id: "u123",
      fullname: "John Doe",
      email: "john@example.com",
      role: "user",
      subscribed: ["TechCrunch"],
      topic_interest: ["AI", "Tech", "Science"],
      saved_news: ["1", "3"],
    };
  }

  // ===== Subscriptions =====
  async getSubscriptions(): Promise<SubscriptionResponse> {
    return this.request<SubscriptionResponse>("/me/subscriptions", {
      method: "GET",
    });
  }

  async unsubscribe(sourceSlug: string): Promise<void> {
    await this.request(`/me/subscriptions/${sourceSlug}`, { method: "DELETE" });
  }

  async subscribe(source_key: string): Promise<Subscription> {
    return this.request<Subscription>("/me/subscriptions", {
      method: "POST",
      body: JSON.stringify({ source_key }),
    });
  }

  // ===== Auth =====
  async signUp(fullname: string, email: string, password: string) {
    const res = await fetch(`${this.baseURL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 409) {
      const error = new Error("User already Exists") as Error & {
        statusCode?: number;
      };
      error.statusCode = 409;
      throw error;
    }

    const data = await res.json();
    if (res.status === 201) {
      await this.signIn(email, password);
    }
    return { message: data.message, status_code: res.status };
  }

  async signIn(email: string, password: string) {
    const res = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.status !== 200) {
      const error = new Error("Invalid Credential") as Error & {
        statusCode?: number;
      };
      error.statusCode = 401;
      throw error;
    }

    localStorage.setItem("person", JSON.stringify(data));
  }

  async forgotPassword(email: string) {
    return this.request<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(verifier: string, token: string, password: string) {
    return this.request<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ verifier, token, password }),
    });
  }

  signInWithGoogle() {
    window.location.href = `${this.baseURL}/auth/google/login`;
  }

  async verifyEmail(verifier: string, token: string) {
    const res = await fetch(
      `${this.baseURL}/auth/verify-email?verifier=${verifier}&token=${token}`,
      { method: "GET" }
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Verification failed ❌");
    }
    return res.json();
  }

  // ===== News =====
  async getTopNews(): Promise<News[]> {
    const news = await this.getDummyNews();
    return news.slice(0, 4);
  }

  async getArtsNews(): Promise<News[]> {
    const news = await this.getDummyNews();
    await new Promise((r) => setTimeout(r, 2000));
    return news.filter((n) => n.topics.includes("Arts"));
  }

  async getBusinessNews(): Promise<News[]> {
    const news = await this.getDummyNews();
    await new Promise((r) => setTimeout(r, 2000));
    return news.filter((n) => n.topics.includes("Business"));
  }

  async getDummyNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Sample news items
          {
            id: "1",
            title: "Indonesia football crush",
            description: "Indonesia’s worst sports disaster left scores dead.",
            topics: ["Arts"],
            source: "BBC",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/football/600/400",
          },
          {
            id: "2",
            title: "Philippines lottery jackpot",
            description: "A lottery with 433 jackpot winners caused suspicion.",
            topics: ["Business"],
            source: "Reuters",
            posted_at: "8 October 2022",
            image_url: "https://picsum.photos/seed/lottery/600/400",
          },
          // ... add more dummy news
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

  async saveNewsItem(newsId: string) {
    const user = await this.getUser();
    if (!user.saved_news.includes(newsId)) user.saved_news.push(newsId);
  }

  async removeSavedNewsItem(newsId: string) {
    const user = await this.getUser();
    user.saved_news = user.saved_news.filter((id) => id !== newsId);
  }

  async deleteAllSavedNews() {
    const user = await this.getUser();
    user.saved_news = [];
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
