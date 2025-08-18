"use client";

import { User, Campaign } from '../../types/dashboard';

interface OverviewProps {
  user: User;
  campaigns: Campaign[];
  onTabChange: (tab: string) => void;
}

export default function Overview({ user, campaigns, onTabChange }: OverviewProps) {
  const runningCampaigns = campaigns.filter(c => c.status === 'running');
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsCount, 0);
  const totalEmailsSent = campaigns.reduce((sum, c) => sum + c.emailsSent, 0);
  const avgOpenRate = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length 
    : 0;
  const avgReplyRate = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length 
    : 0;

  return (
    <div className="space-y-8">
      {/* Workflow Progress */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Your Workflow</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-slate-700">Create Template</span>
            </div>
            <div className="w-8 h-1 bg-violet-200 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-slate-700">Launch Campaign</span>
            </div>
            <div className="w-8 h-1 bg-violet-200 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-slate-700">Track Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-slate-900">{campaigns.length}</p>
            </div>
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-slate-900">
                {campaigns.filter(c => c.status === 'running').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">▶️</span>
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Open Rate</p>
              <p className="text-2xl font-bold text-slate-900">
                {campaigns.length > 0 
                  ? Math.round(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length)
                  : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Reply Rate</p>
              <p className="text-2xl font-bold text-slate-900">
                {campaigns.length > 0 
                  ? Math.round(campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length)
                  : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Get Started</h3>
          <p className="text-slate-600 mb-6">
            Ready to launch your first campaign? Create a new campaign to find leads and start your outreach.
          </p>
          <button
            onClick={() => onTabChange('campaigns')}
            className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
          >
            Create Your First Campaign →
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{campaign.name}</p>
                  <p className="text-sm text-slate-600">{campaign.leadsCount} leads</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'running' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {campaign.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tutorial CTA */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 ring-1 ring-violet-200 shadow-lg shadow-violet-100/50">
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Need help getting started?</h3>
          <p className="text-slate-600 mb-4">
            Take our quick tutorial to learn how to create templates and launch your first campaign.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300">
            Start Tutorial →
          </button>
        </div>
      </div>
    </div>
  );
}
