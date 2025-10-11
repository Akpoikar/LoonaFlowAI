"use client";

import { useState, useEffect } from 'react';
import { apiClient, EmailTemplate as ApiEmailTemplate } from '@/lib/api';
import Modal from '../Modal';

interface EmailTemplate {
  id: string;
  subject: string;
  text: string;
  createdAt: string;
}

export default function Templates() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ApiEmailTemplate | null>(null);
  const [templates, setTemplates] = useState<ApiEmailTemplate[]>([]);
  const [formData, setFormData] = useState({
    subject: '',
    content: ''
  });
  const [showExamples, setShowExamples] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Example templates
  const exampleTemplates = [
    {
      name: "Partnership Introduction",
      subject: "Partnership Opportunity with {name}",
      content: `Hi there,

I hope this email finds you well. My name is [Your Name] from [Your Company], and I came across {name} while researching local businesses in the area.

I'm reaching out because I believe there might be a great opportunity for us to work together. We specialize in [your service/product] and have helped many businesses like yours [specific benefit or result].

Would you be interested in a brief 15-minute call to discuss how we might be able to help {name} [specific goal or improvement]?

I understand you're busy, so I'll keep this brief. If this isn't the right time, no worries at all.

Best regards,
[Your Name]
[Your Company]
[Your Contact Information]`
    },
    {
      name: "Service Offer",
      subject: "How we can help {name} grow",
      content: `Hello,

I hope you're having a great day! I'm [Your Name] from [Your Company], and I've been following {name}'s success in the community.

I wanted to reach out because we've been helping businesses like {name} [specific service or improvement] with great results. For example, we recently helped [similar business] [specific result or benefit].

I'd love to share some ideas that could help {name} [specific goal or improvement]. Would you be open to a quick 10-minute conversation this week?

If you're interested, just reply with your preferred time, or if this isn't relevant right now, no problem at all.

Thanks for your time!

Best,
[Your Name]
[Your Company]`
    },
    {
      name: "Networking Connection",
      subject: "Connecting with {name} - Local Business Network",
      content: `Hi,

I hope this message finds you well! I'm [Your Name], and I run [Your Company] here in [Location].

I came across {name} and was impressed by [specific thing you noticed about their business]. It's always great to connect with other local business owners who are doing great work in our community.

I'd love to learn more about {name} and share what we do at [Your Company]. Perhaps we could grab coffee sometime or have a quick call to exchange ideas?

I believe in supporting local businesses and building strong community connections. Would you be interested in connecting?

Looking forward to hearing from you!

Warm regards,
[Your Name]
[Your Company]
[Your Contact Information]`
    }
  ];

  // Load templates from API
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const result: any = await apiClient.getTemplates();
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        // Handle backend response format: { templates: [...] }
        const templatesArray = result.data.templates || (Array.isArray(result.data) ? result.data : []);
        setTemplates(templatesArray);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      setError('Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: 'subject' | 'content', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const useExampleTemplate = (template: typeof exampleTemplates[0]) => {
    setFormData({
      subject: template.subject,
      content: template.content
    });
    setShowExamples(false);
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');
    
    try {
      // Add disclaimer to the content
      const disclaimer = "\n\n---\n\nYou are receiving this email because your business contact information was made publicly available, and we believe our services may be of legitimate interest to you.\nIf you prefer not to receive further communications, simply reply to this email with \"Unsubscribe\" and we will remove you from our contact list.";
      const contentWithDisclaimer = formData.content + disclaimer;
      
      const result = await apiClient.createTemplate({
        subject: formData.subject,
        content: contentWithDisclaimer
      });

      if (result.error) {
        setError(result.error);
      } else {
        // Reload templates to show the new one
        await loadTemplates();
        setShowCreateForm(false);
        setFormData({
          subject: '',
          content: '',
        });
      }
    } catch (error) {
      setError('Failed to create template');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    
    setIsEditing(true);
    setError('');
    
    try {
      // Add disclaimer to the content
      const disclaimer = "\n\n---\n\nYou are receiving this email because your business contact information was made publicly available, and we believe our services may be of legitimate interest to you.\nIf you prefer not to receive further communications, simply reply to this email with \"Unsubscribe\" and we will remove you from our contact list.";
      const contentWithDisclaimer = formData.content + disclaimer;
      
      const result = await apiClient.updateTemplate(editingTemplate._id || editingTemplate.id || '', {
        subject: formData.subject,
        content: contentWithDisclaimer
      });

      if (result.error) {
        setError(result.error);
      } else {
        // Reload templates to show the updated one
        await loadTemplates();
        setIsEditing(false);
        setEditingTemplate(null);
        setShowCreateForm(false);
        setFormData({
          subject: '',
          content: '',
        });
      }
    } catch (error) {
      setError('Failed to update template');
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditClick = (template: ApiEmailTemplate) => {
    setEditingTemplate(template);
    
    // Remove disclaimer from content for editing
    const disclaimer = "\n\n---\n\nYou are receiving this email because your business contact information was made publicly available, and we believe our services may be of legitimate interest to you.\nIf you prefer not to receive further communications, simply reply to this email with \"Unsubscribe\" and we will remove you from our contact list.";
    const contentWithoutDisclaimer = template.content.replace(disclaimer, '');
    
    setFormData({ 
      subject: template.subject, 
      content: contentWithoutDisclaimer
    });
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
    setShowCreateForm(false);
    setFormData({
      subject: '',
      content: ''
    });
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }
    
    try {
      const result = await apiClient.deleteTemplate(templateId);
      if (result.error) {
        setError(result.error);
      } else {
        // Reload templates to remove the deleted one
        await loadTemplates();
      }
    } catch (error) {
      setError('Failed to delete template');
    }
  };

  const getPreviewText = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join(' ').substring(0, 100) + (lines.length > 3 || content.length > 100 ? '...' : '');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Email Templates</h2>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10"
        >
          + Create Template
        </button>
      </div>

             {/* Create Template Modal */}
       <Modal
         isOpen={showCreateForm}
         onClose={editingTemplate ? handleCancelEdit : () => setShowCreateForm(false)}
         title={editingTemplate ? 'Edit Template' : 'Create New Template'}
         size="lg"
       >
         <form onSubmit={editingTemplate ? handleEditTemplate : handleCreateTemplate} className="space-y-6">
            {/* Template Examples */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-violet-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Quick Start Templates
                </h4>
                <button
                  type="button"
                  onClick={() => setShowExamples(!showExamples)}
                  className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                >
                  {showExamples ? 'Hide Examples' : 'Show Examples'}
                </button>
              </div>
              
              {showExamples && (
                <div className="space-y-3">
                  <p className="text-sm text-violet-700 mb-3">
                    Click any template below to use it as a starting point. You can customize it afterward.
                  </p>
                  <div className="grid gap-2">
                    {exampleTemplates.map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => useExampleTemplate(template)}
                        className="text-left p-3 bg-white rounded-lg border border-violet-200 hover:border-violet-300 hover:bg-violet-50 transition-colors"
                      >
                        <div className="font-medium text-slate-800 text-sm">{template.name}</div>
                        <div className="text-xs text-slate-600 mt-1">{template.subject}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Variable Guide */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to Use Variables
              </h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p>Use <code className="bg-blue-100 px-1 rounded text-blue-800">&#123;name&#125;</code> in your subject and content - it will be replaced with the actual business name.</p>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <div className="text-xs text-blue-600 mb-1">Example:</div>
                  <div className="text-sm">
                    <div><strong>Subject:</strong> "Partnership Opportunity with &#123;name&#125;"</div>
                    <div><strong>Result:</strong> "Partnership Opportunity with <span className="bg-yellow-100 px-1 rounded">Joe's Pizza</span>"</div>
                  </div>
                </div>
              </div>
            </div>

             {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="e.g., Partnership Opportunity with {name}"
              />
            </div>

            {/* Email Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Content *
              </label>
              <textarea
                required
                rows={10}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Write your email content here. Use {name} for the business name."
              />
              
              {/* Live Preview */}
              {formData.content && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview (with sample business name)
                  </h4>
                  <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                    <div className="font-medium text-slate-800 mb-2">
                      Subject: {formData.subject.replace(/{name}/g, 'LoonaFlow')}
                    </div>
                    <div className="whitespace-pre-wrap">
                      {formData.content.replace(/{name}/g, 'LoonaFlow')}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Disclaimer Preview */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">📋 Disclaimer (Automatically Added)</h4>
                <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                  <p className="mb-2">---</p>
                  <p className="mb-2">You are receiving this email because your business contact information was made publicly available, and we believe our services may be of legitimate interest to you.</p>
                  <p>If you prefer not to receive further communications, simply reply to this email with "Unsubscribe" and we will remove you from our contact list.</p>
                </div>
                <p className="text-xs text-slate-500 mt-2">This disclaimer will be automatically appended to all emails sent using this template.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={editingTemplate ? handleCancelEdit : () => setShowCreateForm(false)}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || isEditing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : isEditing ? 'Saving...' : editingTemplate ? 'Save Changes' : 'Create Template'}
              </button>
                         </div>
           </form>
         </Modal>

      {/* Templates List */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Templates</h3>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading templates...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">⚠️</div>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadTemplates}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.isArray(templates) && templates.map((template) => (
              <div key={template._id || template.id} className="flex items-center justify-between p-6 bg-white/30 rounded-xl hover:bg-white/40 transition-colors border [rgba(100,100,111,0.2)] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
                                 <div className="flex-1">
                   <h4 className="font-semibold text-slate-900 text-lg mb-2">{template.subject}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{getPreviewText(template.content)}</p>
                                     <div className="flex gap-2 mt-2">
                     <span className="text-xs text-slate-500">Created {new Date(template.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors" title="Edit" onClick={() => handleEditClick(template)}>
                    ✏️
                  </button>
                                     <button 
                     className="p-2 text-slate-600 hover:text-slate-900 transition-colors" 
                     title="Delete" 
                     onClick={() => handleDeleteTemplate(template._id || template.id || '')}
                   >
                     🗑️
                   </button>
                </div>
              </div>
            ))}
            
            {(!Array.isArray(templates) || templates.length === 0) && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No templates yet</h3>
                <p className="text-slate-600 mb-6">Create your first email template to start your outreach campaigns.</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-colors"
                >
                  Create Your First Template
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
