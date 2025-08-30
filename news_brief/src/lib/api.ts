
// API service layer for backend integration
const API_BASE_URL = "https://news-brief-core-api-excr.onrender.com/api/v1";

// Types matching backend interfaces
export interface News {
  id: string;
  title: string;
  description: string;
  topics: string[];
  source: string;  
  posted_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscribed: string[];      // news sources / publishers user follows
  topic_interest: string[];  // topics user is interested in
  saved_news: string[]; // IDs of saved news articles
}

export interface Category {
  id: number;
  name: string;
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


  //  get user
  async getUser(): Promise<User> {
  return {
    id: "u123",
    name: "John Doe",
    email: "john@example.com",
    subscribed: ["TechCrunch"],
    topic_interest: ["AI", "Tech", "Science"],  // topics user cares about
    saved_news: ["1", "3"],
  };
}

async signUp(full_name: string, email: string, password: string) {
    return this.request<{ message: string; user?: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ full_name, email, password }),
    });
  }
  // Fetch dummy data
async signIn(email: string, password: string) {
    return this.request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Forgot Password - request reset link
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

  async getTopNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Global markets rally as major central banks signal steady policy",
            description: "What’s happening here: A synchronized stance on rates boosted investor confidence, with energy and tech leading gains.",
            topics: ["Tech", "AI"],
            source: "Reuters",
            posted_at: "just Now",
          },
        ]);
      }, 500);
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


  async getDummyNews(): Promise<News[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
            {
      id: "1",
      title: "AI chips set new efficiency record amid surging demand",
      description: "Researchers hit a milestone in power-per-watt, enabling cheaper, greener inference.",
      topics: ["Tech", "AI"],
      source: "TechCrunch",
      posted_at: "just Now",
    },
    {
      id: "2",
      title: "Breakthrough in quantum computing",
      description: "Quantum processors achieve error correction at scale.",
      topics: ["Science"],
      source: "ScienceDaily",
      posted_at: "2h ago",
    },
    {
      id: "3",
      title: "Global warming hits record highs",
      description: "Climate scientists issue new warnings as temperatures soar.",
      topics: ["Environment"],
      source: "BBC Earth",
      posted_at: "1d ago",
    },
        ]);
      });
    });
  }

  async getTopicFeed(): Promise<News[]> {
    const [user, news] = await Promise.all([this.getUser(), this.getDummyNews()]);
    return news.filter((n) =>
      n.topics.some((topic) => user.topic_interest.includes(topic))
    );
  }

  
async getSubscribedFeed(): Promise<News[]> {
  const [user, news] = await Promise.all([this.getUser(), this.getDummyNews()]);
  return news.filter((n) => user.subscribed.includes(n.source));
}

async getSavedNews(): Promise<News[]> {
  const [user, news] = await Promise.all([this.getUser(), this.getDummyNews()]);
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
}


// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
