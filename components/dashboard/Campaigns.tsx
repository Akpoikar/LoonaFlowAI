"use client";

import { useState, useEffect } from 'react';
import { Campaign } from '../../types/dashboard';
import { apiClient, Campaign as ApiCampaign } from '@/lib/api';
import Modal from '../Modal';

interface CampaignsProps {
  campaigns?: Campaign[];
}

interface CampaignFormData {
  businessType: string;
  location: string;
  maximumResults: number;
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

export default function Campaigns({ campaigns: propCampaigns }: CampaignsProps) {
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
    emailTemplate: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
    setError('');
    
    try {
      const result = await apiClient.createCampaign({
        businessType: formData.businessType,
        location: formData.location,
        maximumResults: formData.maximumResults,
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
    
    setIsEditing(true);
    setError('');
    
    try {
      const result : any = await apiClient.updateCampaign(editingCampaign._id || editingCampaign.id || '', {
        businessType: formData.businessType,
        location: formData.location,
        maximumResults: formData.maximumResults,
        emailTemplate: formData.emailTemplate
      });

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

  const handleToggleCampaign = async (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'running' ? 'paused' : 'running';
    
    try {
      const result : any = await apiClient.updateCampaign(campaignId, { status: newStatus });
      if (result.error) {
        setError(result.error);
      } else {
        // Reload campaigns to show the updated status
        await loadCampaigns();
      }
    } catch (error) {
      setError('Failed to update campaign status');
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
                     value={formData.businessType}
                     onChange={(e) => handleInputChange('businessType', e.target.value)}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                     placeholder="e.g., Restaurant, Dental, Landscaping"
                   />
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
                     placeholder="e.g., Los Angeles, CA"
                   />
                 </div>

                 {/* Maximum Results */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Maximum Results
                   </label>
                   <input
                     type="number"
                     min="1"
                     max="500"
                     value={formData.maximumResults}
                     onChange={(e) => handleInputChange('maximumResults', parseInt(e.target.value))}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                     placeholder="e.g., 100"
                   />
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
               className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isCreating ? 'Creating...' : isEditing ? 'Saving...' : editingCampaign ? 'Save Changes' : '🚀 Launch Campaign'}
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
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              {Array.isArray(campaigns) && campaigns.map((campaign: any) => (
                <div key={campaign._id || campaign.id} className="flex items-center justify-between p-6 bg-white/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                                         <div>
                       <h3 className="font-semibold text-slate-900 text-lg">{campaign.businessType} in {campaign.location}</h3>
                       <p className="text-sm text-slate-600">Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="text-center">
                       <p className="text-sm text-slate-600">Results</p>
                       <p className="text-lg font-semibold text-slate-900">
                         {campaign.currentResults || 0} / {campaign.maximumResults || 0}
                       </p>
                     </div>
                                         {/* <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(campaign.status)}`}>
                       {getStatusIcon(campaign.status)} {campaign.status}
                     </span> */}
                     <div className="flex gap-2">
                       <button 
                         className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                           campaign.status === 'running' 
                             ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                             : 'bg-green-100 text-green-700 hover:bg-green-200'
                         }`}
                         onClick={() => handleToggleCampaign(campaign._id || campaign.id, campaign.status || 'paused')}
                       >
                         {campaign.status === 'running' ? '⏸️ Pause' : '▶️ Launch'}
                       </button>
                       <button 
                         className="p-2 text-slate-600 hover:text-slate-900 transition-colors" 
                         title="Edit" 
                         onClick={() => handleEditClick(campaign)}
                       >
                         ✏️
                       </button>
                       <button 
                         className="p-2 text-slate-600 hover:text-slate-900 transition-colors" 
                         title="Delete" 
                         onClick={() => handleDeleteCampaign(campaign._id || campaign.id)}
                       >
                         🗑️
                       </button>
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
    </div>
  );
}
