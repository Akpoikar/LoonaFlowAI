export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  plan: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  leadsCount: number;
  emailsSent: number;
  openRate: number;
  replyRate: number;
  status: 'running' | 'paused' | 'completed';
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
