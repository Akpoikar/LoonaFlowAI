import { SubscriptionPlan } from "@/lib/api";

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  plan: string;
  createdAt: string;
  subscription: {
    plan: string;
    currentPlan: SubscriptionPlan;
  };
}

export interface Campaign {
  id: string;
  name: string;
  leadsCount: number;
  emailsSent: number;
  emailsFailed: number;
  emailsSkipped: number;
  openRate: number;
  replyRate: number;
  emailsPerDay: number;
  emailsSeen: number;
  status: 'idle' | 'scraping in progress' | 'scraping is done' | 'sending emails in progress' | 'everything is done';
  scrapedFileUrl?: string; // URL to download the scraped data file
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  rating: number;
  selected: boolean;
}
