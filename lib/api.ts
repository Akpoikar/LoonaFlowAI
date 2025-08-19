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
        return { error: data.error || 'Request failed' };
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

  async getCampaign(id: string) {
    return this.request(`/campaigns/${id}`);
  }

  async createCampaign(campaign: {
    businessType: string;
    location: string;
    maximumResults: number;
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
  emailTemplate: {
    _id: string;
    subject: string;
    content: string;
    id?:string;
  };
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
