"use client";

import { useState } from 'react';
import { Campaign } from '../../types/dashboard';

interface CampaignsProps {
  campaigns: Campaign[];
}

interface CampaignFormData {
  category: string;
  location: string;
  maxResults: number;
  emailTemplate: string;
}

const emailTemplates = [
  { id: 'template1', name: 'Professional Introduction', subject: 'Partnership Opportunity' },
  { id: 'template2', name: 'Service Offer', subject: 'How we can help your business' },
  { id: 'template3', name: 'Networking', subject: 'Connecting with local businesses' },
  { id: 'template4', name: 'Custom Template', subject: 'Custom subject line' }
];

// Mock preview data
const previewData = [
  {
    businessName: 'Brooklyn Pizza Co.',
    website: 'brooklynpizza.com',
    address: '123 Main St, Brooklyn, NY 11201',
    phone: '(555) 123-4567',
    email: 'info@brooklynpizza.com'
  },
  {
    businessName: 'Downtown Dental Care',
    website: 'downtowndental.com',
    address: '456 Oak Ave, Brooklyn, NY 11202',
    phone: '(555) 234-5678',
    email: 'hello@downtowndental.com'
  },
  {
    businessName: 'Green Thumb Landscaping',
    website: 'greenthumbny.com',
    address: '789 Pine St, Brooklyn, NY 11203',
    phone: '(555) 345-6789',
    email: 'contact@greenthumbny.com'
  },
  {
    businessName: 'Tech Solutions Pro',
    website: 'techsolutionspro.com',
    address: '321 Elm St, Brooklyn, NY 11204',
    phone: '(555) 456-7890',
    email: 'info@techsolutionspro.com'
  }
];

export default function Campaigns({ campaigns }: CampaignsProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    category: '',
    location: '',
    maxResults: 100,
    emailTemplate: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return '▶️';
      case 'paused': return '⏸️';
      case 'completed': return '✅';
      default: return '⏸️';
    }
  };

  const handleInputChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCreating(false);
    setShowCreateForm(false);
    setFormData({
      category: '',
      location: '',
      maxResults: 100,
      emailTemplate: ''
    });
    
    // Here you would typically add the new campaign to the list
    console.log('Creating campaign:', formData);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Campaigns</h2>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10"
        >
          + Create Campaign
        </button>
      </div>

      {/* Create Campaign Form */}
      {showCreateForm && (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Create New Campaign</h3>
            <button 
              onClick={() => setShowCreateForm(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-8">
            {/* Form */}
            <div className="flex-1">
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                {/* Category/Brands */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category/Business Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., Restaurants, Doctors, Lawyers, Real Estate Agents, Dentists, Plumbers, etc."
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the type of business you want to target
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., Brooklyn, NY, USA or 90001, Los Angeles, CA, USA"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Enter city, state, country or ZIP code, city, state, country
                  </p>
                </div>

                {/* Maximum Results */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Maximum Results *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    required
                    value={formData.maxResults}
                    onChange={(e) => handleInputChange('maxResults', parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., 100"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Choose how many leads to find (0-500)
                  </p>
                </div>

                {/* Email Template */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Template *
                  </label>
                  <select
                    required
                    value={formData.emailTemplate}
                    onChange={(e) => handleInputChange('emailTemplate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select an email template</option>
                    {emailTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} - {template.subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? 'Creating...' : '🚀 Launch Campaign'}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Table */}
            <div className="w-1/2">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Preview Leads</h4>
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
                <table className="w-full text-sm text-left text-slate-900">
                  <thead className="text-xs text-slate-700 uppercase bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Business</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Website</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Address</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Phone</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {previewData.map((lead, index) => (
                      <tr key={index} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                      }`}>
                        <td className="px-4 py-3 font-semibold text-slate-900">{lead.businessName}</td>
                        <td className="px-4 py-3 text-violet-600 hover:text-violet-800 cursor-pointer">{lead.website}</td>
                        <td className="px-4 py-3 text-slate-700">{lead.address}</td>
                        <td className="px-4 py-3 text-slate-700">{lead.phone}</td>
                        <td className="px-4 py-3 text-slate-700">{lead.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Campaigns */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Campaigns</h3>
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-6 bg-white/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{campaign.name}</h3>
                    <p className="text-sm text-slate-600">Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Leads</p>
                    <p className="text-lg font-semibold text-slate-900">{campaign.leadsCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Sent</p>
                    <p className="text-lg font-semibold text-slate-900">{campaign.emailsSent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Open Rate</p>
                    <p className="text-lg font-semibold text-slate-900">{campaign.openRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Reply Rate</p>
                    <p className="text-lg font-semibold text-slate-900">{campaign.replyRate}%</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)} {campaign.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">⚙️</button>
                    <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">📊</button>
                  </div>
                </div>
              </div>
            ))}
            
            {campaigns.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
                <p className="text-slate-600 mb-6">Create your first campaign to start finding leads and sending emails.</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
                >
                  Create Your First Campaign
                </button>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </div>
  );
}
