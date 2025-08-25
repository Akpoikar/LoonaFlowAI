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
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');
    
    try {
      const result = await apiClient.createTemplate({
        subject: formData.subject,
        content: formData.content
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
      const result = await apiClient.updateTemplate(editingTemplate._id || editingTemplate.id || '', {
        subject: formData.subject,
        content: formData.content
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
    setFormData({ 
      subject: template.subject, 
      content: template.content
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
                placeholder="e.g., Partnership Opportunity"
              />
            </div>

                         {/* Email Content */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Content *
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Write your email content here."
              />
                             <p className="text-xs text-slate-500 mt-1">
                 Use placeholder like &#123;name&#125; for personalization (name = business name)
               </p>
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
