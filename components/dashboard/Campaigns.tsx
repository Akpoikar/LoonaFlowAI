"use client";

import { useState, useEffect } from 'react';
import { Campaign } from '../../types/dashboard';
import { apiClient, Campaign as ApiCampaign } from '@/lib/api';
import Modal from '../Modal';
import { countryCodes, getCountryByCode, type CountryCode } from '@/lib/countryCodes';
import Flag from '../Flag';

interface CampaignsProps {
  campaigns?: Campaign[];
  onTabChange?: (tab: string) => void;
}

interface CampaignFormData {
  businessType: string;
  location: string;
  maximumResults: number;
  emailsPerDay: number;
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

export default function Campaigns({ campaigns: propCampaigns, onTabChange }: CampaignsProps) {
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<ApiCampaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmailRecommendations, setShowEmailRecommendations] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    businessType: '',
    location: '',
    maximumResults: 100,
    emailsPerDay: 50,
    emailTemplate: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrapingCampaigns, setScrapingCampaigns] = useState<Set<string>>(new Set());
  const [sendingCampaigns, setSendingCampaigns] = useState<Set<string>>(new Set());
  const [showLimitExceededModal, setShowLimitExceededModal] = useState(false);
  const [limitError, setLimitError] = useState('');
  const [remainingLeads, setRemainingLeads] = useState<number | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('Free Tier');
  const [planLimit, setPlanLimit] = useState<number | null>(null);
  const [requestedLeads, setRequestedLeads] = useState<number | null>(null);
  const [alreadyScraped, setAlreadyScraped] = useState<number | null>(null);

  // Function to extract remaining leads from error message
  const extractRemainingLeads = (errorMessage: string): number | null => {
    // Handle new error format: "You have 100 leads remaining this month"
    const match = errorMessage.match(/You have (\d+) leads remaining this month/);
    if (match) return parseInt(match[1]);
    
    // Handle old format: "You have 25 leads remaining"
    const oldMatch = errorMessage.match(/You have (\d+) leads remaining/);
    return oldMatch ? parseInt(oldMatch[1]) : null;
  };

  // Function to extract plan type from error message
  const extractPlanType = (errorMessage: string): string => {
    if (errorMessage.includes('Free Tier')) return 'Free Tier';
    if (errorMessage.includes('Starter')) return 'Starter';
    if (errorMessage.includes('Growth')) return 'Growth';
    if (errorMessage.includes('Scale')) return 'Scale';
    return 'Free Tier'; // Default
  };

  // Function to extract plan limit from error message
  const extractPlanLimit = (errorMessage: string): number | null => {
    const match = errorMessage.match(/Your .* plan allows (\d+) leads per month/);
    return match ? parseInt(match[1]) : null;
  };

  // Function to extract requested leads from error message
  const extractRequestedLeads = (errorMessage: string): number | null => {
    const match = errorMessage.match(/are requesting to scrape (\d+) more leads/);
    return match ? parseInt(match[1]) : null;
  };

  // Function to extract already scraped leads from error message
  const extractAlreadyScraped = (errorMessage: string): number | null => {
    const match = errorMessage.match(/You have already scraped (\d+) leads this month/);
    return match ? parseInt(match[1]) : null;
  };

  // Load campaigns and templates from API
  useEffect(() => {
    loadCampaigns();
    loadTemplates();
  }, []);

  const loadCampaigns = async () => {
    try {
      const result: any = await apiClient.getCampaigns();
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        // Handle backend response format: { campaigns: [...] } or direct array
        const campaignsArray = result.data.campaigns || (Array.isArray(result.data) ? result.data : []);
        setCampaigns(campaignsArray);
      } else {
        setCampaigns([]);
      }
    } catch (error) {
      setError('Failed to load campaigns');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const result: any = await apiClient.getTemplates();
      if (result.error) {
        // Silently handle template loading error
      } else if (result.data) {
        const templatesArray = result.data.templates || (Array.isArray(result.data) ? result.data : []);
        setTemplates(templatesArray);
      }
    } catch (error) {
      // Silently handle template loading error
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'scraping in progress': return 'text-blue-600 bg-blue-100';
      case 'scraping is done': return 'text-green-600 bg-green-100';
      case 'sending emails in progress': return 'text-purple-600 bg-purple-100';
      case 'everything is done': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idle': return '⏸️';
      case 'scraping in progress': return '🔍';
      case 'scraping is done': return '✅';
      case 'sending emails in progress': return '📧';
      case 'everything is done': return '🎉';
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
    
    // Validate country code
    if (!formData.location || !getCountryByCode(formData.location)) {
      setError('Please select a valid country');
      return;
    }

    // Validate business type length
    if (formData.businessType.length > 100) {
      setError('Business type cannot exceed 100 characters');
      return;
    }

    // Validate maximum results
    if (formData.maximumResults < 1 || formData.maximumResults > 10000) {
      setError('Maximum results must be between 1 and 10,000');
      return;
    }

    // Validate emails per day
    if (formData.emailsPerDay < 1 || formData.emailsPerDay > 500) {
      setError('Emails per day must be between 1 and 500');
      return;
    }
    
    setIsCreating(true);
    setError('');
    
    try {
      const result = await apiClient.createCampaign({
        businessType: formData.businessType,
        location: formData.location,
        maximumResults: formData.maximumResults,
        emailsPerDay: formData.emailsPerDay,
        emailTemplate: formData.emailTemplate
      });

      if (result.error) {
        setError(result.error);
      } else {
        // Reload campaigns to show the new one
        await loadCampaigns();
        setShowCreateForm(false);
        setFormData({
          businessType: '',
          location: '',
          maximumResults: 100,
          emailsPerDay: 50,
          emailTemplate: ''
        });
      }
    } catch (error) {
      setError('Failed to create campaign');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    
    // Validate country code
    if (!formData.location || !getCountryByCode(formData.location)) {
      setError('Please select a valid country');
      return;
    }

    // Validate business type length
    if (formData.businessType.length > 100) {
      setError('Business type cannot exceed 100 characters');
      return;
    }

    // Validate maximum results
    if (formData.maximumResults < 1 || formData.maximumResults > 10000) {
      setError('Maximum results must be between 1 and 10,000');
      return;
    }

    // Validate emails per day
    if (formData.emailsPerDay < 1 || formData.emailsPerDay > 500) {
      setError('Emails per day must be between 1 and 500');
      return;
    }
    
    setIsEditing(true);
    setError('');

    
    const updatePayload = {
      businessType: formData.businessType,
      location: formData.location,
      maximumResults: formData.maximumResults,
      emailsPerDay: formData.emailsPerDay,
      emailTemplate: formData.emailTemplate
    };

    try {
      const result : any = await apiClient.updateCampaign(editingCampaign._id || editingCampaign.id || '', updatePayload);

      if (result.error) {
        setError(result.error);
      } else {
        // Reload campaigns to show the updated one
        await loadCampaigns();
        setIsEditing(false);
        setEditingCampaign(null);
        setShowCreateForm(false);
        setFormData({
          businessType: '',
          location: '',
          maximumResults: 100,
          emailsPerDay: 50,
          emailTemplate: ''
        });
      }
    } catch (error) {
      setError('Failed to update campaign');
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditClick = (campaign: ApiCampaign) => {
    setEditingCampaign(campaign);
    setFormData({
      businessType: campaign.businessType,
      location: campaign.location,
      maximumResults: campaign.maximumResults,
      emailsPerDay: campaign.emailsPerDay,
      emailTemplate: campaign.emailTemplate._id || campaign.emailTemplate.id || ''
    });
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setShowCreateForm(false);
    setFormData({
      businessType: '',
      location: '',
      maximumResults: 100,
      emailsPerDay: 50,
      emailTemplate: ''
    });
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    try {
      const result = await apiClient.deleteCampaign(campaignId);
      if (result.error) {
        setError(result.error);
      } else {
        // Reload campaigns to remove the deleted one
        await loadCampaigns();
      }
    } catch (error) {
      setError('Failed to delete campaign');
    }
  };

  const handleStartScraping = async (campaignId: string) => {
    try {
      setScrapingCampaigns(prev => new Set(prev).add(campaignId));
      const result = await apiClient.startScraping(campaignId);
      
      if (result.error) {
        
        // Check if it's a monthly limit exceeded error
        if (result.error.includes('Monthly scraping limit exceeded') || 
            result.error.includes('403') || 
            result.error.includes('monthly limit') ||
            result.error.includes('scraping limit') ||
            result.error.includes('exceed your limit')
          || result.error) {
          setLimitError(result.error);
          setRemainingLeads(extractRemainingLeads(result.error));
          setCurrentPlan(extractPlanType(result.error));
          setPlanLimit(extractPlanLimit(result.error));
          setRequestedLeads(extractRequestedLeads(result.error));
          setAlreadyScraped(extractAlreadyScraped(result.error));
          setShowLimitExceededModal(true);
        } else {
          setError(result.error);
        }
      } else {
        // Reload campaigns to show the updated status
        await loadCampaigns();
      }
    } catch (error) {
      // setError('Failed to start scraping');
    } finally {
      setScrapingCampaigns(prev => {
        const newSet = new Set(prev);
        newSet.delete(campaignId);
        return newSet;
      });
    }
  };

  const handleStartSending = async (campaignId: string) => {
    try {
      setSendingCampaigns(prev => new Set(prev).add(campaignId));
      const result = await apiClient.startSending(campaignId);
      if (result.error) {
        setError(result.error);
      } else {
        // Reload campaigns to show the updated status
        await loadCampaigns();
      }
    } catch (error) {
      setError('Failed to start sending emails');
    } finally {
      setSendingCampaigns(prev => {
        const newSet = new Set(prev);
        newSet.delete(campaignId);
        return newSet;
      });
    }
  };

  const handleDownloadFile = (fileUrl: string) => {
    try {
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `scraped_data_${new Date().toISOString().split('T')[0]}.csv`;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Failed to download file');
    }
  };



  return (
    <div className="space-y-8">
      {/* Header */}
       <div className="flex justify-between items-center">
         <div className="flex items-center gap-4">
           <button
             onClick={() => setShowEmailRecommendations(true)}
             className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10 flex items-center gap-2"
           >
             <span className="text-lg">📩</span>
             Email Recommendations
           </button>
         </div>
         <button 
           onClick={() => setShowCreateForm(true)}
           className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10"
         >
           + Create Campaign
         </button>
       </div>

                    {/* Create Campaign Modal */}
       <Modal
         isOpen={showCreateForm}
         onClose={editingCampaign ? handleCancelEdit : () => setShowCreateForm(false)}
         title={editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
         size="xl"
       >
         {error && (
           <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
             {error}
           </div>
         )}

         <form onSubmit={editingCampaign ? handleEditCampaign : handleCreateCampaign} className="space-y-6">
           <div className="flex gap-8">
             {/* Form */}
             <div className="flex-1">
                 {/* Business Type */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Business Type *
                   </label>
                   <input
                     type="text"
                     required
                     maxLength={100}
                     value={formData.businessType}
                     onChange={(e) => handleInputChange('businessType', e.target.value)}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                     placeholder="e.g., Restaurant, Dental, Landscaping"
                   />
                   <p className="text-xs text-slate-500 mt-1">Max: 100 characters</p>
                 </div>

                 {/* Location */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Country *
                   </label>
                   <div className="relative">
                     <select
                       required
                       value={formData.location}
                       onChange={(e) => handleInputChange('location', e.target.value)}
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm appearance-none"
                     >
                       <option value="">Select a country</option>
                                               {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.code} - {country.name}
                          </option>
                        ))}
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                       <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                   </div>
                   {formData.location && (
                     <div className="mt-2 text-sm text-slate-600 flex items-center gap-2">
                       <span>Selected:</span>
                       <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-800 rounded-lg">
                         <Flag countryCode={formData.location} size="sm" />
                         {getCountryByCode(formData.location)?.name}
                       </span>
                     </div>
                   )}
                 </div>

                 {/* Maximum Results */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Maximum Results
                   </label>
                   <input
                     type="number"
                     min="1"
                     max="10000"
                     value={formData.maximumResults}
                     onChange={(e) => handleInputChange('maximumResults', parseInt(e.target.value))}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                     placeholder="e.g., 100"
                   />
                   <p className="text-xs text-slate-500 mt-1">Min: 1, Max: 10,000</p>
                 </div>

                 {/* Emails Per Day */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Emails Per Run
                   </label>
                   <input
                     type="number"
                     min="1"
                     max="500"
                     value={formData.emailsPerDay}
                     onChange={(e) => handleInputChange('emailsPerDay', parseInt(e.target.value))}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                     placeholder="e.g., 50"
                   />
                   <p className="text-xs text-slate-500 mt-1">Min: 1, Max: 500</p>
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
                     <option value="">Select a template</option>
                     {templates.map((template) => (
                       <option key={template._id || template.id} value={template._id || template.id}>
                         {template.subject}
                       </option>
                     ))}
                   </select>
                 </div>
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
           
           {/* Action Buttons */}
           <div className="flex gap-4 pt-6 border-t border-slate-200">
             <button
               type="button"
               onClick={editingCampaign ? handleCancelEdit : () => setShowCreateForm(false)}
               className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={isCreating || isEditing}
               className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
             >
               {isCreating || isEditing ? (
                 <>
                   <span className="inline-block animate-spin mr-2">⏳</span>
                   {isCreating ? 'Creating...' : 'Saving...'}
                 </>
               ) : (
                 editingCampaign ? 'Save Changes' : '🚀 Launch Campaign'
               )}
             </button>
           </div>
         </form>
       </Modal>

      {/* Existing Campaigns */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Campaigns</h3>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading campaigns...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">⚠️</div>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadCampaigns}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-[rgba(100,100,111,0.2)] shadow-sm">
                              <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-slate-700">
                  <div className="col-span-3">Campaign</div>
                  <div className="col-span-1 text-center">Results Scraped</div>
                  <div className="col-span-1 text-center">Emails/Run</div>
                  <div className="col-span-2 text-center">Emails Sent/Failed/Skipped</div>
                  <div className="col-span-2 text-center">Emails Seen/Replied</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-1 text-center">Job Actions</div>
                </div>
            </div>

            {/* Campaign Rows */}
            {Array.isArray(campaigns) && campaigns.map((campaign: any) => (
              <div key={campaign._id || campaign.id} className="bg-white/30 backdrop-blur-md rounded-xl border border-[rgba(100,100,111,0.2)] shadow-sm hover:shadow-md transition-all duration-200">
                <div className="grid grid-cols-12 gap-4 items-center p-4">
                  {/* Campaign Column */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📧</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 text-base truncate">
                          {campaign.businessType} in 
                          <span className="inline-flex items-center gap-2 ml-2">
                            <Flag countryCode={campaign.location} size="sm" />
                            <span className="text-slate-700">
                              {getCountryByCode(campaign.location)?.name || campaign.location}
                            </span>
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Created {new Date(campaign.createdAt).toLocaleDateString()}
                          <button 
                        title="Edit Campaign" 
                        className="ml-2 p-1.5 rounded-lg text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200"

                        onClick={() => handleEditClick(campaign)}
                      >
                        ✏️
                      </button>

                      {/* Delete Button */}
                      <button 
                        title="Delete Campaign" 
                        className="ml-2 p-1.5 rounded-lg text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200"

                        onClick={() => handleDeleteCampaign(campaign._id || campaign.id)}
                      >
                        🗑️
                      </button>
                                             {campaign.scrapedFileUrl && (
                         <button
                           onClick={() => handleDownloadFile(campaign.scrapedFileUrl)}
                           className="ml-2 p-1.5 rounded-lg text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200"
                           title="Download Scraped Data File"
                         >
                           📥
                         </button>
                       )}
                        </p>
                     
                      </div>
                    
                    </div>
             
                  </div>

                  {/* Results Scraped Column */}
                  <div className="col-span-1 text-center">
                    <div className="text-lg font-semibold text-slate-900">
                      {campaign.status !== 'scraping in progress' && campaign.status !== 'idle'
                        ? `${campaign.maximumResults || 0} / ${campaign.maximumResults || 0}`
                        : `${campaign.currentResults || 0} / ${campaign.maximumResults || 0}`
                      }
                    </div>
                  </div>

                  {/* Emails/Day Column */}
                  <div className="col-span-1 text-center">
                    <div className="text-lg font-semibold text-slate-900">
                      {campaign.emailsPerDay || 50}
                    </div>
                  </div>

                  {/* Emails Sent/Failed/Skipped Column */}
                  <div className="col-span-2 text-center">
                    <div className="text-lg font-semibold text-slate-900">
                      {campaign.emailsSent || 0} / {campaign.emailsFailed || 0} / {campaign.emailsSkipped || 0}
                    </div>
                  </div>

                  {/* Emails Seen/Replied Column */}
                  <div className="col-span-2 text-center">
                    <div className="text-lg font-semibold text-slate-900">
                      {campaign.emailsSeen || 0}
                    </div>
                    <div className="text-xs text-orange-500 font-medium">🔜 Coming Soon</div>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-2 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)} {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>

                  {/* Job Actions Column */}
                  <div className="col-span-1 text-center">
                    <div className="flex items-center justify-center">
                      {campaign.status === 'idle' && (
                        <button 
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            scrapingCampaigns.has(campaign._id || campaign.id || '')
                              ? 'bg-blue-200 text-blue-600 cursor-not-allowed'
                              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-sm'
                          }`}
                          onClick={() => handleStartScraping(campaign._id || campaign.id)}
                          disabled={scrapingCampaigns.has(campaign._id || campaign.id || '')}
                          title="Start Scraping"
                        >
                          {scrapingCampaigns.has(campaign._id || campaign.id || '') ? (
                            <span className="inline-block animate-spin mr-2">⏳</span>
                          ) : (
                            '🔍 Scrape'
                          )}
                        </button>
                      )}
                      
                      {campaign.status === 'scraping is done' && (
                        <button 
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            sendingCampaigns.has(campaign._id || campaign.id || '')
                              ? 'bg-green-200 text-green-600 cursor-not-allowed'
                              : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-sm'
                          }`}
                          onClick={() => handleStartSending(campaign._id || campaign.id)}
                          disabled={sendingCampaigns.has(campaign._id || campaign.id || '')}
                          title="Start Sending"
                        >
                          {sendingCampaigns.has(campaign._id || campaign.id || '') ? (
                            <span className="inline-block animate-spin mr-2">⏳</span>
                          ) : (
                            '📧 Send'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
              
              {(!Array.isArray(campaigns) || campaigns.length === 0) && (
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
        )}
      </div>

      {/* Email Recommendations Modal */}
      <Modal
        isOpen={showEmailRecommendations}
        onClose={() => setShowEmailRecommendations(false)}
        title="📩 Email Sending Volume Recommendations"
        size="lg"
      >
        <div className="space-y-6 text-sm">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">1. Brand New Email / Domain (Warm-Up Phase)</h4>
            <div className="space-y-2 text-blue-800">
              <p><strong>Day 1–3:</strong> 10–20 emails/day</p>
              <p><strong>Day 4–7:</strong> 20–40 emails/day</p>
              <p><strong>Week 2:</strong> 40–80 emails/day</p>
              <p><strong>Week 3:</strong> 80–150 emails/day</p>
              <p><strong>Week 4:</strong> 150–250 emails/day</p>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Tips:</p>
              <ul className="text-yellow-700 space-y-1 text-xs">
                <li>• Focus on high-quality, personalized emails to engaged recipients</li>
                <li>• Avoid sending bulk campaigns during this period</li>
                <li>• Mix in replies and forwards — ISPs love to see natural communication</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h4 className="font-semibold text-green-900 mb-2">2. Early Stage (Established but Young Domain, 1–2 months)</h4>
            <div className="space-y-2 text-green-800">
              <p><strong>Scale to:</strong> 250–500 emails/day</p>
              <p><strong>Use:</strong> 1–2 sending accounts per domain</p>
              <p><strong>Keep open rates above 40%</strong> if possible to build trust</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <h4 className="font-semibold text-purple-900 mb-2">3. Growing Stage (3–6 months old, some reputation)</h4>
            <div className="space-y-2 text-purple-800">
              <p><strong>Scale gradually to:</strong> 500–1,000 emails/day per account</p>
              <p><strong>Use multiple domains/accounts</strong> if scaling outreach</p>
              <p><strong>Rotate IPs/domains</strong> for bigger volumes</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <h4 className="font-semibold text-indigo-900 mb-2">4. Mature & Trusted Domain (6+ months, good reputation)</h4>
            <div className="space-y-2 text-indigo-800">
              <p><strong>1,000–2,000 emails/day</strong> per account is typically safe</p>
              <p><strong>Big players</strong> (with pristine reputation, warmed IPs, DKIM/SPF/DMARC) can push <strong>5,000–10,000+</strong> per day, but only after years of solid reputation</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-2">💡 Key Success Factors</h4>
            <ul className="text-slate-700 space-y-1">
              <li>• Always prioritize email quality over quantity</li>
              <li>• Monitor bounce rates and spam complaints closely</li>
              <li>• Use proper authentication (SPF, DKIM, DMARC)</li>
              <li>• Maintain consistent sending patterns</li>
              <li>• Clean your email lists regularly</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Monthly Limit Exceeded Modal */}
      <Modal
        isOpen={showLimitExceededModal}
        onClose={() => {
          setShowLimitExceededModal(false);
          setLimitError('');
          setRemainingLeads(null);
          setCurrentPlan('Free Tier');
          setPlanLimit(null);
          setRequestedLeads(null);
          setAlreadyScraped(null);
        }}
        title="⚠️ Monthly Scraping Limit Reached"
        size="lg"
      >
        <div className="space-y-6">
          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-red-500 text-2xl">🚫</div>
              <div>
                <h4 className="font-semibold text-red-900 mb-2">Monthly Limit Exceeded</h4>
                <p className="text-red-700 text-sm mb-3">{limitError}</p>
                
                {/* Detailed Error Breakdown */}
                <div className="bg-red-100 rounded-lg p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-red-800">Plan Limit:</span>
                    <span className="font-semibold text-red-900">{planLimit || '0'} leads/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-800">Already Scraped:</span>
                    <span className="font-semibold text-red-900">{alreadyScraped || '0'} leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-800">Requested:</span>
                    <span className="font-semibold text-red-900">{requestedLeads || '0'} leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-800">Remaining:</span>
                    <span className="font-semibold text-red-900">{remainingLeads || '0'} leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Usage Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-2xl">📊</div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Your Current Usage</h4>
                <p className="text-blue-700 text-sm">
                  You're currently on the <strong>{currentPlan}</strong> plan which allows <strong>{planLimit || '0'} leads per month</strong>.
                  <br />
                  You have <strong>{remainingLeads !== null ? remainingLeads : '0'} leads remaining</strong> this month.
                  <br />
                  You requested <strong>{requestedLeads !== null ? requestedLeads : '0'} more leads</strong>.
                  <br />
                  You have already scraped <strong>{alreadyScraped !== null ? alreadyScraped : '0'} leads</strong> this month.
                </p>
              </div>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-violet-500 text-2xl">🚀</div>
              <div className="flex-1">
                <h4 className="font-semibold text-violet-900 mb-3">Upgrade Your Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-violet-200">
                    <h5 className="font-semibold text-violet-900 mb-2">Starter Plan</h5>
                    <p className="text-2xl font-bold text-violet-600 mb-1">$29</p>
                    <p className="text-xs text-violet-600 mb-2">per month</p>
                    <p className="text-sm text-violet-700">500 leads/month</p>
                                         <button 
                       onClick={() => {
                         setShowLimitExceededModal(false);
                         setLimitError('');
                         setRemainingLeads(null);
                         setCurrentPlan('Free Tier');
                         setPlanLimit(null);
                         setRequestedLeads(null);
                         setAlreadyScraped(null);
                         onTabChange?.('subscription');
                       }}
                       className="w-full mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                     >
                       Upgrade Now
                     </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-violet-200">
                    <h5 className="font-semibold text-violet-900 mb-2">Growth Plan</h5>
                    <p className="text-2xl font-bold text-violet-600 mb-1">$79</p>
                    <p className="text-xs text-violet-600 mb-2">per month</p>
                    <p className="text-sm text-violet-700">2,000 leads/month</p>
                    <button 
                      onClick={() => {
                        setShowLimitExceededModal(false);
                        setLimitError('');
                        setRemainingLeads(null);
                        setCurrentPlan('Free Tier');
                        setPlanLimit(null);
                        setRequestedLeads(null);
                        setAlreadyScraped(null);
                        onTabChange?.('subscription');
                      }}
                      className="w-full mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                    >
                      Upgrade Now
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-violet-200">
                    <h5 className="font-semibold text-violet-900 mb-2">Scale Plan</h5>
                    <p className="text-2xl font-bold text-violet-600 mb-1">$199</p>
                    <p className="text-xs text-violet-600 mb-2">per month</p>
                    <p className="text-sm text-violet-700">Unlimited leads</p>
                    <button 
                      onClick={() => {
                        setShowLimitExceededModal(false);
                        setLimitError('');
                        setRemainingLeads(null);
                        setCurrentPlan('Free Tier');
                        setPlanLimit(null);
                        setRequestedLeads(null);
                        setAlreadyScraped(null);
                        onTabChange?.('subscription');
                      }}
                      className="w-full mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => setShowLimitExceededModal(false)}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowLimitExceededModal(false);
                setLimitError('');
                setRemainingLeads(null);
                setCurrentPlan('Free Tier');
                setPlanLimit(null);
                setRequestedLeads(null);
                setAlreadyScraped(null);
                onTabChange?.('subscription');
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
            >
              View All Plans
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
