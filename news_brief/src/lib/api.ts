import { resolve } from "path";

// API service layer for backend integration
const API_BASE_URL = "https://ehopn-test-project.onrender.com/api";

// Types matching backend interfaces
export interface News {
  id: string;
  title: string;
  description: string;
  topics: string[];
  posted_at: string;
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

    // Get token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Fetch dummy data

  async getTopNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Global markets rally as major central banks signal steady policy",
            description: "What’s happening here: A synchronized stance on rates boosted investor confidence, with energy and tech leading gains.",
            topics: ["Tech", "AI"],
            posted_at: "just Now",
          },
        ]);
      }, 500);
    });
  }
  async getDummyNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "AI chips set new efficiency record amid surging demand 1",
            description: "What’s happening here: Researchers hit a milestone in power-per-watt, enabling cheaper, greener inference at.",
            topics: ["Tech", "AI"],
            posted_at: "just Now",
          },
          {
            id: "2",
            title: "AI chips set new efficiency record amid surging demand 2",
            description: "What’s happening here: Researchers hit a milestone in power-per-watt, enabling cheaper, greener inference at.",
            topics: ["Science"],
            posted_at: "just Now",
          },
          {
            id: "3",
            title: "AI chips set new efficiency record amid surging demand 3",
            description: "What’s happening here: Researchers hit a milestone in power-per-watt, enabling cheaper, greener inference at.",
            topics: ["Science"],
            posted_at: "just Now",
          },
        ]);
      });
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
