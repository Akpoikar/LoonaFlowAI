// Client-side API utility for making requests to our endpoints

const API_BASE = '/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies in requests
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different error response formats
        let errorMessage = 'Request failed';
        
        if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === 'string') {
          errorMessage = data;
        } else if (data && typeof data === 'object') {
          // Try to extract error message from various possible formats
          errorMessage = data.error || data.message || data.detail || JSON.stringify(data);
        }
        
        return { error: errorMessage };
      }

      return { data, message: data.message };
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  // Authentication methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string, company?: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, company }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Campaign methods
  async getCampaigns() {
    return this.request('/campaigns');
  }

  async getDashboardStats() {
    return this.request('/campaigns/dashboard/stats');
  }

  async getCampaign(id: string) {
    return this.request(`/campaigns/${id}`);
  }

  async createCampaign(campaign: {
    businessType: string;
    location: string;
    selectedLocations?: string[];
    maximumResults: number;
    emailsPerDay: number;
    emailTemplate: string;
  }) {
    return this.request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    });
  }

  async updateCampaign(
    id: string,
    campaign: {
      businessType?: string;
      location?: string;
      maximumResults?: number;
      emailsPerDay?: number;
      emailTemplate?: string;
      status?: string;
    }
  ) {
    return this.request(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaign),
    });
  }

  async deleteCampaign(id: string) {
    return this.request(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  async startScraping(campaignId: string) {
    return this.request(`/campaigns/${campaignId}/start-scraping`, {
      method: 'POST',
    });
  }

  async startSending(campaignId: string) {
    return this.request(`/campaigns/${campaignId}/start-sending`, {
      method: 'POST',
    });
  }

  // Template methods
  async getTemplates() {
    return this.request('/templates');
  }

  async getTemplate(id: string) {
    return this.request(`/templates/${id}`);
  }

  async createTemplate(template: {
    subject: string;
    content: string;
  }) {
    return this.request('/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async updateTemplate(
    id: string,
    template: {
      subject?: string;
      content?: string;
    }
  ) {
    return this.request(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(template),
    });
  }

  async deleteTemplate(id: string) {
    return this.request(`/templates/${id}`, {
      method: 'DELETE',
    });
  }

  // Email Configuration methods
  async getEmailConfigs() {
    return this.request('/email-config');
  }

  async getEmailConfig(id: string) {
    return this.request(`/email-config/${id}`);
  }

  async createEmailConfig(config: {
    name: string;
    smtpServer: string;
    smtpPort: number;
    emailAddress: string;
    emailPassword: string;
    isDefault?: boolean;
  }) {
    return this.request('/email-config', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async updateEmailConfig(
    id: string,
    config: {
      name?: string;
      smtpServer?: string;
      smtpPort?: number;
      emailAddress?: string;
      emailPassword?: string;
      isDefault?: boolean;
    }
  ) {
    return this.request(`/email-config/${id}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }

  async deleteEmailConfig(id: string) {
    return this.request(`/email-config/${id}`, {
      method: 'DELETE',
    });
  }

  // Subscription methods
  async getSubscriptionPlans() {
    return this.request('/subscription/plans');
  }

  async getCurrentSubscription() {
    return this.request('/subscription');
  }

  async updateSubscription(plan: string) {
    return this.request('/subscription', {
      method: 'PUT',
      body: JSON.stringify({ plan }),
    });
  }

  async cancelSubscription() {
    return this.request('/subscription', {
      method: 'DELETE',
    });
  }

  // Stripe subscription methods
  async createCheckoutSession(plan: string) {
    return this.request('/subscription/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  }

  async createCustomerPortalSession() {
    return this.request('/subscription/portal', {
      method: 'POST',
    });
  }

  async syncSubscription() {
    return this.request('/subscription/sync', {
      method: 'POST',
    });
  }

  // Location methods
  async getLocations(country: string) {
    return this.request(`/locations?country=${country}`);
  }
}

export const apiClient = new ApiClient();

// Type definitions for better TypeScript support
export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export interface Campaign {
  _id: string; // Backend uses _id
  id?: string; // Frontend might use id
  businessType: string;
  location: string;
  maximumResults: number;
  currentResults: number;
  emailsPerDay: number;
  emailsSeen: number;
  emailsSent: number;
  emailsFailed: number;
  emailsSkipped: number;
  status: 'idle' | 'scraping in progress' | 'scraping is done' | 'sending emails in progress' | 'everything is done';
  emailTemplate: {
    _id: string;
    subject: string;
    content: string;
    id?:string;
  };
  scrapedFileUrl?: string; // URL to download the scraped data file
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  _id: string; // Backend uses _id
  id?: string; // Frontend might use id
  name?: string; // Optional, backend might not have this
  subject: string;
  content: string;
  variables?: string[];
  category?: string;
  isActive?: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailConfig {
  _id: string; // Backend uses _id
  id?: string; // Frontend might use id
  name: string;
  smtpServer: string;
  smtpPort: number;
  emailAddress: string;
  isDefault: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionFeatures {
  leadsPerMonth: number;
  emailAccountsLimit: number;
  emailsPerDayPerInbox: number;
  campaignsLimit: number;
  templatesLimit: number;
  analytics: string;
  aiEmailGeneration: boolean | string;
  emailWarmup: boolean;
  teamAccounts: number;
  prioritySupport?: boolean;
  agencyDashboard?: boolean;
}

export interface SubscriptionPlan {
  name: string;
  tagline: string;
  description: string;
  features: SubscriptionFeatures;
  price: number;
  plan: string;
}

export interface SubscriptionPlans {
  FREE: SubscriptionPlan;
  STARTER: SubscriptionPlan;
  GROWTH: SubscriptionPlan;
  SCALE: SubscriptionPlan;
}

export interface UserSubscription {
  plan: string;
  status: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  features: SubscriptionFeatures;
  currentPlan: SubscriptionPlan;
}

export interface DashboardStats {
  campaigns: {
    total: number;
    completed: number;
    completionRate: string;
  };
  emails: {
    sent: number;
    seen: number;
    openRate: string;
  };
  campaignEmails: {
    sent: number;
    seen: number;
  };
  scrapedPlaces: {
    total: number;
  };
}
