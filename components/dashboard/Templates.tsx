"use client";

import { useState } from 'react';

interface EmailTemplate {
  id: string;
  subject: string;
  text: string;
  createdAt: string;
}

export default function Templates() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      subject: 'Partnership Opportunity',
      text: 'Hi [Business Name],\n\nI hope this email finds you well. I came across your business and was impressed by your work in [industry]. I believe there could be a great opportunity for us to collaborate.\n\nWould you be interested in discussing potential partnership opportunities?\n\nBest regards,\n[Your Name]',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      subject: 'How we can help your business',
      text: 'Dear [Business Name],\n\nI wanted to reach out because I believe our services could significantly benefit your business. We specialize in helping companies like yours increase their efficiency and growth.\n\nWould you be available for a brief call to discuss how we might help?\n\nThank you,\n[Your Name]',
      createdAt: '2024-01-08'
    }
  ]);
  const [formData, setFormData] = useState({
    subject: '',
    text: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: 'subject' | 'text', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      subject: formData.subject,
      text: formData.text,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => [newTemplate, ...prev]);
    setIsCreating(false);
    setShowCreateForm(false);
    setFormData({ subject: '', text: '' });
  };

  const handleEditTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    
    setIsEditing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTemplates(prev => prev.map(template => 
      template.id === editingTemplate.id 
        ? { ...template, subject: formData.subject, text: formData.text }
        : template
    ));
    
    setIsEditing(false);
    setEditingTemplate(null);
    setShowCreateForm(false);
    setFormData({ subject: '', text: '' });
  };

  const handleEditClick = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({ subject: template.subject, text: template.text });
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
    setShowCreateForm(false);
    setFormData({ subject: '', text: '' });
  };

  const getPreviewText = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join(' ').substring(0, 100) + (lines.length > 3 || text.length > 100 ? '...' : '');
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

      {/* Create Template Form */}
      {showCreateForm && (
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </h3>
            <button 
              onClick={editingTemplate ? handleCancelEdit : () => setShowCreateForm(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              ✕
            </button>
          </div>

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

            {/* Email Text */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Text *
              </label>
              <textarea
                required
                rows={8}
                value={formData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Write your email content here."
              />
              <p className="text-xs text-slate-500 mt-1">
                Use placeholder like [Business Name] for personalization
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
        </div>
      )}

      {/* Templates List */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Your Templates</h3>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center justify-between p-6 bg-white/30 rounded-xl hover:bg-white/40 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-lg mb-2">{template.subject}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{getPreviewText(template.text)}</p>
                <p className="text-xs text-slate-500 mt-2">Created {new Date(template.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors" title="Edit" onClick={() => handleEditClick(template)}>
                  ✏️
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors" title="Copy">
                  📋
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors" title="Delete">
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          {templates.length === 0 && (
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
      </div>
    </div>
  );
}
