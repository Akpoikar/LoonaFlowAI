"use client";

import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Campaign } from '../../types/dashboard';
import { apiClient, Campaign as ApiCampaign, LeadRow, EmailConfig } from '@/lib/api';
import Modal from '../Modal';
import { countryCodes, getCountryByCode, type CountryCode } from '@/lib/countryCodes';
import Flag from '../Flag';

const MAX_CSV_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const REQUIRED_LEAD_FIELDS = [
  { key: 'name', label: 'Business Name' },
  { key: 'email_1', label: 'Email' },
] as const;

interface ParsedLeadsCsv {
  fileName: string;
  fileSize: number;
  headers: string[];
  rows: Record<string, string>[];
}

interface CampaignsProps {
  campaigns?: Campaign[];
  onTabChange?: (tab: string) => void;
}

interface CampaignFormData {
  businessType: string;
  location: string;
  selectedLocations?: string[];
  maximumResults: number;
  emailsPerDay: number;
  emailTemplate: string;
  emailConfig: string;
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
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<ApiCampaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmailRecommendations, setShowEmailRecommendations] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    businessType: '',
    location: '',
    selectedLocations: [],
    maximumResults: 100,
    emailsPerDay: 50,
    emailTemplate: '',
    emailConfig: ''
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
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locationsError, setLocationsError] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  // Defaults to false (banner shown) until we confirm configs exist — safer
  // than defaulting to true, which would silently hide the "set up email"
  // banner for good if this check ever fails or the response shape changes.
  const [hasEmailConfig, setHasEmailConfig] = useState(false);
  const [isLoadingEmailConfig, setIsLoadingEmailConfig] = useState(true);

  // CSV upload (alternative lead source) state
  const [dataSource, setDataSource] = useState<'scrape' | 'upload'>('scrape');
  const [parsedCsv, setParsedCsv] = useState<ParsedLeadsCsv | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [csvError, setCsvError] = useState('');
  const [isUploadingLeads, setIsUploadingLeads] = useState(false);

  // Review Leads modal state
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [reviewingCampaignId, setReviewingCampaignId] = useState<string | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState('');
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [checkedRowIndices, setCheckedRowIndices] = useState<Set<number>>(new Set());
  const [isSavingSkippedLeads, setIsSavingSkippedLeads] = useState(false);
  const [saveLeadsSuccess, setSaveLeadsSuccess] = useState(false);

  // Helper function to check if campaign editing should be restricted
  const isCampaignEditingRestricted = (): boolean => {
    return !!(editingCampaign && editingCampaign.status !== 'idle');
  };

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
    loadEmailConfigStatus();
  }, []);

  const loadEmailConfigStatus = async () => {
    try {
      const result: any = await apiClient.getEmailConfigs();

      if (result?.error) {
        console.warn('Failed to load email config status:', result.error);
        setEmailConfigs([]);
        setHasEmailConfig(false);
        return;
      }

      // Backend response shape has varied (bare array, {data: [...]},
      // {data: {data: [...]}}) — check all of them rather than assuming one.
      const candidates = [
        result?.data?.data,
        result?.data?.configs,
        result?.data,
        result?.configs,
        result,
      ];
      const configs = candidates.find((c) => Array.isArray(c)) || [];
      setEmailConfigs(configs);
      setHasEmailConfig(configs.length > 0);
    } catch (error) {
      console.warn('Failed to load email config status:', error);
      setEmailConfigs([]);
      setHasEmailConfig(false);
    } finally {
      setIsLoadingEmailConfig(false);
    }
  };

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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'idle': return 'Campaign is ready to start';
      case 'scraping in progress': return 'Finding businesses... This may take several minutes to complete';
      case 'scraping is done': return 'Businesses found successfully';
      case 'sending emails in progress': return 'Sending emails... This may take some time depending on volume';
      case 'everything is done': return 'Campaign completed successfully';
      default: return 'Unknown status';
    }
  };

  const handleInputChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // If location (country) is being changed, reset locations data
    if (field === 'location') {
      setSelectedLocations([]);
      setLocations([]);
      setLocationsError('');
    }
  };

  const fetchLocations = async (country: string) => {
    setIsLoadingLocations(true);
    setLocationsError('');
    
    try {
      const result = await apiClient.getLocations(country);
      
      console.log('Locations API result:', result);
      
      if (result.error) {
        setLocationsError(result.error);
        setLocations([]);
      } else {
        // Handle the response structure: { country: "NL", locations: [...], total_count: 12 }
        const locationsData = (result.data as any)?.locations || result.data || [];
        console.log('Locations data:', locationsData);
        setLocations(locationsData);
      }
    } catch (error) {
      console.error('Fetch locations error:', error);
      setLocationsError('Failed to fetch locations');
      setLocations([]);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const guessColumnForField = (fieldKey: string, headers: string[]): string => {
    const normalized = headers.map(h => ({ header: h, lower: h.toLowerCase().replace(/[^a-z0-9]/g, '') }));
    if (fieldKey === 'name') {
      const match = normalized.find(h => h.lower.includes('business') || h.lower.includes('company') || h.lower === 'name');
      return match?.header || '';
    }
    if (fieldKey === 'email_1') {
      const match = normalized.find(h => h.lower.includes('email'));
      return match?.header || '';
    }
    return '';
  };

  const handleCsvFileSelect = (file: File) => {
    setCsvError('');
    setParsedCsv(null);
    setColumnMapping({});

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setCsvError('Please upload a .csv file');
      return;
    }

    if (file.size > MAX_CSV_UPLOAD_BYTES) {
      setCsvError(`File exceeds the 5 MB size limit (this file is ${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
      return;
    }

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        if (headers.length === 0 || results.data.length === 0) {
          setCsvError('Could not find any data rows in this CSV');
          return;
        }

        setParsedCsv({
          fileName: file.name,
          fileSize: file.size,
          headers,
          rows: results.data
        });

        const initialMapping: Record<string, string> = {};
        REQUIRED_LEAD_FIELDS.forEach(field => {
          initialMapping[field.key] = guessColumnForField(field.key, headers);
        });
        setColumnMapping(initialMapping);
      },
      error: (err) => {
        setCsvError(`Could not parse CSV file: ${err.message}`);
      }
    });
  };

  const buildNormalizedLeadsCsv = (): Blob | null => {
    if (!parsedCsv) return null;

    const nameColumn = columnMapping['name'];
    const emailColumn = columnMapping['email_1'];
    if (!nameColumn || !emailColumn) return null;

    const normalizedRows = parsedCsv.rows.map(row => ({
      name: row[nameColumn] ?? '',
      email_1: row[emailColumn] ?? ''
    }));

    const csvText = Papa.unparse(normalizedRows, { columns: ['name', 'email_1'] });
    return new Blob([csvText], { type: 'text/csv' });
  };

  const resetUploadState = () => {
    setDataSource('scrape');
    setParsedCsv(null);
    setColumnMapping({});
    setCsvError('');
  };

  const handleCreateCampaignViaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.emailTemplate) {
      setError('Please select an email template');
      return;
    }

    if (!formData.emailConfig) {
      setError('Please select an email configuration');
      return;
    }

    if (formData.emailsPerDay < 1 || formData.emailsPerDay > 500) {
      setError('Emails per day must be between 1 and 500');
      return;
    }

    if (!parsedCsv) {
      setCsvError('Please choose a CSV file to upload');
      return;
    }

    if (!columnMapping['name'] || !columnMapping['email_1']) {
      setCsvError('Please map both Business Name and Email to a column before continuing');
      return;
    }

    const normalizedCsv = buildNormalizedLeadsCsv();
    if (!normalizedCsv) {
      setCsvError('Could not prepare the CSV for upload');
      return;
    }

    setIsCreating(true);

    try {
      const createResult = await apiClient.createCampaign({
        maximumResults: parsedCsv.rows.length,
        emailsPerDay: formData.emailsPerDay,
        emailTemplate: formData.emailTemplate,
        emailConfig: formData.emailConfig,
        dataSource: 'upload'
      });

      if (createResult.error || !createResult.data) {
        setError(createResult.error || 'Failed to create campaign');
        return;
      }

      const campaignId = (createResult.data as any)._id || (createResult.data as any).id;

      setIsUploadingLeads(true);
      const uploadResult = await apiClient.uploadLeads(campaignId, normalizedCsv, parsedCsv.fileName);

      if (uploadResult.error) {
        setError(uploadResult.error);
        return;
      }

      await loadCampaigns();
      setShowCreateForm(false);
      resetUploadState();
      setFormData({
        businessType: '',
        location: '',
        maximumResults: 100,
        emailsPerDay: 50,
        emailTemplate: '',
        emailConfig: ''
      });
    } catch (error) {
      setError('Failed to create campaign from uploaded leads');
    } finally {
      setIsCreating(false);
      setIsUploadingLeads(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    if (dataSource === 'upload') {
      return handleCreateCampaignViaUpload(e);
    }

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

    if (!formData.emailConfig) {
      setError('Please select an email configuration');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const result = await apiClient.createCampaign({
        businessType: formData.businessType,
        location: formData.location,
        selectedLocations: formData.selectedLocations,
        maximumResults: formData.maximumResults,
        emailsPerDay: formData.emailsPerDay,
        emailTemplate: formData.emailTemplate,
        emailConfig: formData.emailConfig
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
          emailTemplate: '',
          emailConfig: ''
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

    if (!formData.emailConfig) {
      setError('Please select an email configuration');
      return;
    }

    setIsEditing(true);
    setError('');


    const updatePayload = {
      businessType: formData.businessType,
      location: formData.location,
      maximumResults: formData.maximumResults,
      emailsPerDay: formData.emailsPerDay,
      emailTemplate: formData.emailTemplate,
      emailConfig: formData.emailConfig
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
          emailTemplate: '',
          emailConfig: ''
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
    setDataSource(campaign.dataSource === 'upload' ? 'upload' : 'scrape');
    const campaignEmailConfig = campaign.emailConfig;
    const emailConfigId = typeof campaignEmailConfig === 'string'
      ? campaignEmailConfig
      : (campaignEmailConfig?._id || campaignEmailConfig?.id || '');
    setFormData({
      businessType: campaign.businessType || '',
      location: campaign.location || '',
      maximumResults: campaign.maximumResults,
      emailsPerDay: campaign.emailsPerDay,
      emailTemplate: campaign.emailTemplate._id || campaign.emailTemplate.id || '',
      emailConfig: emailConfigId
    });
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setShowCreateForm(false);
    resetUploadState();
    setFormData({
      businessType: '',
      location: '',
      maximumResults: 100,
      emailsPerDay: 50,
      emailTemplate: '',
      emailConfig: ''
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
    if (!hasEmailConfig) {
      setError('Email configuration is required before sending. Please set it up in Settings.');
      return;
    }

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

  // Dynamic columns present on a lead row, besides the always-shown name/email_1
  const getDynamicLeadColumns = (rows: LeadRow[]): string[] => {
    const columns = new Set<string>();
    rows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'row_index' && key !== 'name' && key !== 'email_1') {
          columns.add(key);
        }
      });
    });
    return Array.from(columns);
  };

  const formatColumnHeader = (key: string): string => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleOpenLeadsModal = async (campaignId: string) => {
    setReviewingCampaignId(campaignId);
    setShowLeadsModal(true);
    setIsLoadingLeads(true);
    setLeadsError('');
    setLeads([]);
    setCheckedRowIndices(new Set());
    setSaveLeadsSuccess(false);

    try {
      const result = await apiClient.getCampaignLeads(campaignId);

      if (result.error) {
        setLeadsError(result.error);
      } else if (result.data) {
        const leadsArray = result.data.leads || [];
        const skippedSet = new Set(result.data.skippedRowIndices || []);
        setLeads(leadsArray);
        // Checked by default = row_index is NOT in the initial skippedRowIndices
        setCheckedRowIndices(
          new Set(leadsArray.filter((lead) => !skippedSet.has(lead.row_index)).map((lead) => lead.row_index))
        );
      }
    } catch (error) {
      setLeadsError('Failed to load leads');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleCloseLeadsModal = () => {
    setShowLeadsModal(false);
    setReviewingCampaignId(null);
    setLeads([]);
    setCheckedRowIndices(new Set());
    setLeadsError('');
    setSaveLeadsSuccess(false);
  };

  const handleToggleLeadRow = (rowIndex: number) => {
    setCheckedRowIndices((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) {
        next.delete(rowIndex);
      } else {
        next.add(rowIndex);
      }
      return next;
    });
  };

  const handleToggleSelectAllLeads = () => {
    if (checkedRowIndices.size === leads.length) {
      setCheckedRowIndices(new Set());
    } else {
      setCheckedRowIndices(new Set(leads.map((lead) => lead.row_index)));
    }
  };

  const handleSaveSkippedLeads = async () => {
    if (!reviewingCampaignId) return;

    setIsSavingSkippedLeads(true);
    setLeadsError('');
    setSaveLeadsSuccess(false);

    try {
      const skippedRowIndices = leads
        .map((lead) => lead.row_index)
        .filter((rowIndex) => !checkedRowIndices.has(rowIndex));

      const result = await apiClient.updateSkippedLeads(reviewingCampaignId, skippedRowIndices);

      if (result.error) {
        setLeadsError(result.error);
      } else {
        setSaveLeadsSuccess(true);
        // Refresh the campaigns list so any downstream state reflects the saved selection
        await loadCampaigns();
        setTimeout(() => {
          handleCloseLeadsModal();
        }, 900);
      }
    } catch (error) {
      setLeadsError('Failed to save your selection');
    } finally {
      setIsSavingSkippedLeads(false);
    }
  };

  // Escapes a single CSV field per RFC 4180: wrap in quotes if it contains a
  // comma, quote, or newline, and double up any internal quotes.
  const escapeCsvField = (value: unknown): string => {
    const stringValue = value === null || value === undefined ? '' : String(value);
    if (/[",\n\r]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const handleDownloadLeadsCsv = () => {
    if (!reviewingCampaignId) return;

    // Export exactly the rows currently checked, matching what the user sees/selected
    const selectedLeads = leads.filter((lead) => checkedRowIndices.has(lead.row_index));
    const dynamicColumns = getDynamicLeadColumns(leads);
    const columns = ['name', 'email_1', ...dynamicColumns];

    const headerRow = ['Name', 'Email', ...dynamicColumns.map(formatColumnHeader)];
    const csvRows = [
      headerRow.map(escapeCsvField).join(','),
      ...selectedLeads.map((lead) => columns.map((col) => escapeCsvField(lead[col])).join(',')),
    ];
    const csvContent = csvRows.join('\r\n');

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `campaign-${reviewingCampaignId}-leads.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setLeadsError('Failed to download CSV');
    }
  };

  const canReviewLeads = (status: string): boolean => {
    return (
      status === 'scraping is done' ||
      status === 'sending emails in progress' ||
      status === 'everything is done'
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {!isLoadingEmailConfig && !hasEmailConfig && (
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 sm:p-5 ring-1 ring-white/30 shadow-lg shadow-purple-100/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-amber-900">
                Email configuration required
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 mt-1">
                You can create and scrape campaigns, but sending emails is locked until you configure your email inbox.
              </p>
            </div>
            <button
              onClick={() => onTabChange?.('settings')}
              className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
            >
              Go to Settings
            </button>
          </div>
        </div>
      )}
      <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 sm:p-5 ring-1 ring-white/30 shadow-lg shadow-purple-100/40">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Campaign flow</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-sm text-slate-700">
          <div className="bg-white/50 rounded-lg px-3 py-2"><span className="font-semibold">1.</span> Create campaign with country + template</div>
          <div className="bg-white/50 rounded-lg px-3 py-2"><span className="font-semibold">2.</span> Run scraping to collect leads</div>
          <div className="bg-white/50 rounded-lg px-3 py-2"><span className="font-semibold">3.</span> Send emails when scraping is done</div>
        </div>
      </div>
             {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="flex items-center gap-4">
           <button
             onClick={() => setShowEmailRecommendations(true)}
             className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 sm:px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10 flex items-center gap-2 text-sm sm:text-base"
           >
             <span className="text-base sm:text-lg">📩</span>
             <span className="hidden sm:inline">Email Recommendations</span>
             <span className="sm:hidden">Email Tips</span>
           </button>
           <button
             onClick={() => {
               window.location.reload();
             }}
             className="rounded-xl bg-slate-600 hover:bg-slate-700 px-4 sm:px-6 py-3 font-semibold text-white shadow-lg shadow-slate-600/25 hover:shadow-slate-700/40 transition-colors relative z-10 flex items-center gap-2 text-sm sm:text-base"
           >
             <span className="text-base sm:text-lg">🔄</span>
             <span className="hidden sm:inline">Refresh Data</span>
             <span className="sm:hidden">Refresh</span>
           </button>
         </div>
         <button 
           onClick={() => { resetUploadState(); setShowCreateForm(true); }}
           className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 sm:px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-colors relative z-10 text-sm sm:text-base w-full sm:w-auto"
         >
           + Create Campaign
         </button>
       </div>

                    {/* Create Campaign Modal */}
       <Modal
         isOpen={showCreateForm}
         onClose={editingCampaign ? handleCancelEdit : () => { resetUploadState(); setShowCreateForm(false); }}
         title={editingCampaign ? `Edit Campaign${editingCampaign.status !== 'idle' ? ' (Limited Editing)' : ''}` : 'Create New Campaign'}
         size="xl"
       >
         {error && (
           <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
             {error}
           </div>
         )}

         {editingCampaign && editingCampaign.status !== 'idle' && (
           <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm mb-6">
             <div className="flex items-center gap-2">
               <span className="text-amber-600">⚠️</span>
               <span>
                 <strong>Campaign is currently active.</strong> Business Type, Country, and Maximum Results cannot be edited while the campaign is running. 
                 You can still modify Emails Per Run and Email Template.
               </span>
             </div>
           </div>
         )}

         <form onSubmit={editingCampaign ? handleEditCampaign : handleCreateCampaign} className="space-y-6">
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
             {/* Form */}
            <div className="flex-1 space-y-4">
                 {/* Data Source Toggle */}
                 {!editingCampaign && (
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-2">
                       Lead Source
                     </label>
                     <div className="grid grid-cols-2 gap-3">
                       <button
                         type="button"
                         onClick={() => { setDataSource('scrape'); setCsvError(''); }}
                         className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                           dataSource === 'scrape'
                             ? 'border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-200'
                             : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                         }`}
                       >
                         🔍 Scrape automatically
                         <p className="text-xs font-normal text-slate-500 mt-1">We find businesses for you</p>
                       </button>
                       <button
                         type="button"
                         onClick={() => setDataSource('upload')}
                         className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${
                           dataSource === 'upload'
                             ? 'border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-200'
                             : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                         }`}
                       >
                         📄 Upload your own list
                         <p className="text-xs font-normal text-slate-500 mt-1">Use a CSV you already have</p>
                       </button>
                     </div>
                   </div>
                 )}

                 {dataSource === 'upload' && !editingCampaign ? (
                   <div className="space-y-4">
                     {/* File picker */}
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">
                         CSV File *
                       </label>
                       <label
                         htmlFor="leads-csv-input"
                         className="flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-xl border-2 border-dashed border-slate-300 bg-white/50 hover:border-violet-400 hover:bg-violet-50/50 cursor-pointer transition-colors text-center"
                       >
                         <span className="text-3xl">📄</span>
                         <span className="text-sm font-medium text-slate-700">
                           {parsedCsv ? parsedCsv.fileName : 'Click to choose a CSV file'}
                         </span>
                         <span className="text-xs text-slate-500">Max 5 MB &middot; must include a business name and email column</span>
                         <input
                           id="leads-csv-input"
                           type="file"
                           accept=".csv,text/csv"
                           className="hidden"
                           onChange={(e) => {
                             const file = e.target.files?.[0];
                             if (file) handleCsvFileSelect(file);
                           }}
                         />
                       </label>
                       {csvError && (
                         <p className="text-sm text-red-600 mt-2">{csvError}</p>
                       )}
                       {parsedCsv && !csvError && (
                         <p className="text-xs text-slate-500 mt-2">
                           {parsedCsv.rows.length} rows detected &middot; {(parsedCsv.fileSize / 1024).toFixed(0)} KB
                         </p>
                       )}
                     </div>

                     {/* Column mapping */}
                     {parsedCsv && (
                       <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
                         <p className="text-sm font-medium text-slate-700">Map your columns</p>
                         {REQUIRED_LEAD_FIELDS.map(field => (
                           <div key={field.key}>
                             <label className="block text-xs font-medium text-slate-600 mb-1">
                               {field.label} *
                             </label>
                             <select
                               required
                               value={columnMapping[field.key] || ''}
                               onChange={(e) => setColumnMapping(prev => ({ ...prev, [field.key]: e.target.value }))}
                               className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                             >
                               <option value="">Select a column</option>
                               {parsedCsv.headers.map(header => (
                                 <option key={header} value={header}>{header}</option>
                               ))}
                             </select>
                           </div>
                         ))}
                       </div>
                     )}

                     {/* Mapped preview */}
                     {parsedCsv && columnMapping['name'] && columnMapping['email_1'] && (
                       <div>
                         <p className="text-xs font-medium text-slate-600 mb-2">Preview (first 5 rows)</p>
                         <div className="overflow-x-auto rounded-xl border border-slate-200">
                           <table className="w-full text-sm text-left">
                             <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                               <tr>
                                 <th className="px-3 py-2 font-semibold">Business Name</th>
                                 <th className="px-3 py-2 font-semibold">Email</th>
                               </tr>
                             </thead>
                             <tbody className="bg-white">
                               {parsedCsv.rows.slice(0, 5).map((row, idx) => (
                                 <tr key={idx} className="border-b border-slate-100 last:border-0">
                                   <td className="px-3 py-2 text-slate-800">{row[columnMapping['name']] || '—'}</td>
                                   <td className="px-3 py-2 text-slate-800">{row[columnMapping['email_1']] || '—'}</td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                         </div>
                       </div>
                     )}
                   </div>
                 ) : (
                 <>
                 {/* Business Type */}
                 <div>
                   <label className={`block text-sm font-medium mb-2 ${isCampaignEditingRestricted() ? 'text-slate-400' : 'text-slate-700'}`}>
                     Business Type *
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-slate-400">(Cannot edit while campaign is active)</span>
                     )}
                   </label>
                   <input
                     type="text"
                     required
                     maxLength={100}
                     value={formData.businessType}
                     onChange={(e) => handleInputChange('businessType', e.target.value)}
                     disabled={isCampaignEditingRestricted()}
                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:border-transparent ${
                       isCampaignEditingRestricted() 
                         ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed' 
                         : 'border-slate-200 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm'
                     }`}
                     placeholder="e.g., Restaurant, Dental, Landscaping"
                   />
                   <p className="text-xs text-slate-500 mt-1">Max: 100 characters</p>
                 </div>

                 {/* Location */}
                 <div>
                   <label className={`block text-sm font-medium mb-2 ${isCampaignEditingRestricted() ? 'text-slate-400' : 'text-slate-700'}`}>
                     Country *
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-slate-400">(Cannot edit while campaign is active)</span>
                     )}
                   </label>
                   <div className="relative">
                     <select
                       required
                       value={formData.location}
                       onChange={(e) => handleInputChange('location', e.target.value)}
                       disabled={isCampaignEditingRestricted()}
                       className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:border-transparent appearance-none ${
                         isCampaignEditingRestricted() 
                           ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed' 
                           : 'border-slate-200 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm'
                       }`}
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

                   {/* Location Selection Button */}
                   {formData.location && (
                     <div className="mt-3">
                       <button
                         type="button"
                         onClick={() => {
                           setShowLocationModal(true);
                           if (locations.length === 0) {
                             fetchLocations(formData.location);
                           }
                         }}
                         disabled={isCampaignEditingRestricted()}
                         className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                           isCampaignEditingRestricted()
                             ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                             : 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-300'
                         }`}
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                         {selectedLocations.length > 0 ? `Change Locations (${selectedLocations.length})` : 'Select Specific Locations'}
                       </button>
                       
                       {/* Selected Locations Display */}
                       {selectedLocations.length > 0 && (
                         <div className="mt-2 p-3 bg-violet-100 border border-violet-200 rounded-lg">
                           <div className="text-sm font-medium text-violet-800 mb-2">
                             Selected Locations ({selectedLocations.length}):
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {selectedLocations.map((locationId, index) => {
                               const location = locations.find(loc => {
                                 if (typeof loc === 'string') {
                                   return loc === locationId;
                                 }
                                 return (loc.id || loc._id || locations.indexOf(loc).toString()) === locationId;
                               });
                               
                               const locationName = typeof location === 'string' 
                                 ? location.split('>')[1] || location
                                 : (location?.name || location?.title || 'Location');
                               
                               return (
                                 <div key={locationId} className="inline-flex items-center gap-1 px-2 py-1 bg-violet-200 text-violet-800 rounded text-xs">
                                   {locationName}
                                   <button
                                     type="button"
                                     onClick={() => {
                                       const newSelections = selectedLocations.filter(id => id !== locationId);
                                       setSelectedLocations(newSelections);
                                       setFormData(prev => ({ ...prev, selectedLocations: newSelections }));
                                     }}
                                     className="ml-1 text-violet-600 hover:text-violet-800"
                                   >
                                     ×
                                   </button>
                                 </div>
                               );
                             })}
                           </div>
                           <button
                             type="button"
                             onClick={() => {
                               setSelectedLocations([]);
                               setFormData(prev => ({ ...prev, selectedLocations: [] }));
                             }}
                             className="mt-2 text-xs text-violet-600 hover:text-violet-800 underline"
                           >
                             Clear all selections
                           </button>
                         </div>
                       )}
                     </div>
                   )}
                 </div>

                 {/* Maximum Results */}
                 <div>
                   <label className={`block text-sm font-medium mb-2 ${isCampaignEditingRestricted() ? 'text-slate-400' : 'text-slate-700'}`}>
                     Maximum Results
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-slate-400">(Cannot edit while campaign is active)</span>
                     )}
                   </label>
                   <input
                     type="number"
                     min="1"
                     max="10000"
                     value={formData.maximumResults}
                     onChange={(e) => handleInputChange('maximumResults', parseInt(e.target.value))}
                     disabled={isCampaignEditingRestricted()}
                     className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:border-transparent ${
                       isCampaignEditingRestricted() 
                         ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed' 
                         : 'border-slate-200 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm'
                     }`}
                     placeholder="e.g., 100"
                   />
                   <p className="text-xs text-slate-500 mt-1">Min: 1, Max: 10,000</p>
                 </div>
                 </>
                 )}

                 {/* Emails Per Day */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Emails Per Run
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-green-600">(Can still be edited)</span>
                     )}
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
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-green-600">(Can still be edited)</span>
                     )}
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
                  {templates.length === 0 && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                      No templates found. Create one first, then come back to launch this campaign.
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          onTabChange?.('templates');
                        }}
                        className="ml-1 underline font-semibold"
                      >
                        Go to Templates
                      </button>
                    </div>
                  )}
                 </div>

                 {/* Email Configuration */}
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     Send From (Email Configuration) *
                     {isCampaignEditingRestricted() && (
                       <span className="ml-2 text-xs text-green-600">(Can still be edited)</span>
                     )}
                   </label>
                   <select
                     required
                     value={formData.emailConfig}
                     onChange={(e) => handleInputChange('emailConfig', e.target.value)}
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                   >
                     <option value="">Select an email configuration</option>
                     {emailConfigs.map((config) => (
                       <option key={config._id || config.id} value={config._id || config.id}>
                         {config.name} ({config.emailAddress})
                       </option>
                     ))}
                   </select>
                  {emailConfigs.length === 0 && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                      No email configurations found. Set one up first, then come back to launch this campaign.
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          onTabChange?.('settings');
                        }}
                        className="ml-1 underline font-semibold"
                      >
                        Go to Settings
                      </button>
                    </div>
                  )}
                 </div>
               </div>

            {/* Preview Table */}
            {!(dataSource === 'upload' && !editingCampaign) && (
            <div className="w-full xl:w-1/2">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Preview Leads</h4>
              <p className="text-xs text-slate-500 mb-3">Sample format of the leads this campaign tries to collect.</p>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-lg">
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
            )}
           </div>
           
           {/* Action Buttons */}
           <div className="flex gap-4 pt-6 border-t border-slate-200">
             <button
               type="button"
               onClick={editingCampaign ? handleCancelEdit : () => { resetUploadState(); setShowCreateForm(false); }}
               className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={isCreating || isEditing || (dataSource === 'upload' && !editingCampaign && !parsedCsv)}
               className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
             >
               {isCreating || isEditing ? (
                 <>
                   <span className="inline-block animate-spin mr-2">⏳</span>
                   {isUploadingLeads ? 'Uploading leads...' : isCreating ? 'Creating...' : 'Saving...'}
                 </>
               ) : (
                 editingCampaign ? 'Save Changes' : '🚀 Launch Campaign'
               )}
             </button>
           </div>
         </form>
       </Modal>

      {/* Review Leads Modal */}
      <Modal
        isOpen={showLeadsModal}
        onClose={handleCloseLeadsModal}
        title="Review Leads"
        size="xl"
      >
        <div className="space-y-4">
          {isLoadingLeads ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading leads...</p>
            </div>
          ) : leadsError ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4 text-3xl">⚠️</div>
              <p className="text-red-600 mb-4">{leadsError}</p>
              <button
                onClick={() => reviewingCampaignId && handleOpenLeadsModal(reviewingCampaignId)}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300"
              >
                Retry
              </button>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No leads found</h3>
              <p className="text-slate-600">This campaign doesn't have any scraped leads to review yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-sm font-medium text-slate-700">
                  {checkedRowIndices.size} of {leads.length} leads selected
                </div>
                {saveLeadsSuccess && (
                  <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                    ✅ Saved successfully
                  </div>
                )}
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-lg max-h-[50vh] overflow-y-auto">
                <table className="w-full text-sm text-left text-slate-900">
                  <thead className="text-xs text-slate-700 uppercase bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200 sticky top-0">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold w-10">
                        <input
                          type="checkbox"
                          checked={leads.length > 0 && checkedRowIndices.size === leads.length}
                          onChange={handleToggleSelectAllLeads}
                          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                          title="Select all / Deselect all"
                        />
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                      {getDynamicLeadColumns(leads).map((col) => (
                        <th key={col} scope="col" className="px-4 py-3 font-semibold">
                          {formatColumnHeader(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {leads.map((lead, index) => (
                      <tr
                        key={lead.row_index}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checkedRowIndices.has(lead.row_index)}
                            onChange={() => handleToggleLeadRow(lead.row_index)}
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-900">{lead.name}</td>
                        <td className="px-4 py-3 text-slate-700">{lead.email_1}</td>
                        {getDynamicLeadColumns(leads).map((col) => (
                          <td key={col} className="px-4 py-3 text-slate-700">
                            {lead[col] !== undefined && lead[col] !== null ? String(lead[col]) : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCloseLeadsModal}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            {leads.length > 0 && !leadsError && (
              <button
                type="button"
                onClick={handleDownloadLeadsCsv}
                className="flex-1 px-6 py-3 border border-violet-300 text-violet-700 rounded-xl font-medium hover:bg-violet-50 transition-colors"
              >
                📥 Download CSV
              </button>
            )}
            {leads.length > 0 && !leadsError && (
              <button
                type="button"
                onClick={handleSaveSkippedLeads}
                disabled={isSavingSkippedLeads}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSavingSkippedLeads ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            )}
          </div>
        </div>
      </Modal>

      {/* Existing Campaigns */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Your Campaigns</h3>
        
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
            {/* Table Header - Hidden on mobile */}
            <div className="hidden lg:block bg-white/40 backdrop-blur-md rounded-xl p-4 border border-[rgba(100,100,111,0.2)] shadow-sm">
              <div className="grid grid-cols-10 gap-4 items-center text-sm font-semibold text-slate-700">
                <div className="col-span-3">Campaign</div>
                <div className="col-span-1 text-center">Results</div>
                <div className="col-span-1 text-center">Emails/Run</div>
                <div className="col-span-2 text-center">Sent/Failed/Skipped</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1 text-center">Action</div>
              </div>
            </div>

            {/* Campaign Rows */}
            {Array.isArray(campaigns) && campaigns.map((campaign: any) => (
              <div key={campaign._id || campaign.id} className="bg-white/30 backdrop-blur-md rounded-xl border border-[rgba(100,100,111,0.2)] shadow-sm hover:shadow-md transition-all duration-200">
                {/* Mobile Layout */}
                <div className="lg:hidden p-4 space-y-4">
                  {/* Campaign Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📧</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 text-base">
                        {campaign.dataSource === 'upload' ? (
                          <span className="text-slate-700">
                            📄 Uploaded list{campaign.uploadedFileName ? ` (${campaign.uploadedFileName})` : ''}
                          </span>
                        ) : (
                          <>
                            {campaign.businessType} in
                            <span className="inline-flex items-center gap-2 ml-2">
                              <Flag countryCode={campaign.location || ''} size="sm" />
                              <span className="text-slate-700">
                                {getCountryByCode(campaign.location)?.name || campaign.location}
                              </span>
                            </span>
                          </>
                        )}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Created {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-white/20 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Results</div>
                      <div className="font-semibold text-slate-900">
                        {campaign.status !== 'scraping in progress' && campaign.status !== 'idle'
                          ? `${campaign.maximumResults || 0} / ${campaign.maximumResults || 0}`
                          : `${campaign.currentResults || 0} / ${campaign.maximumResults || 0}`
                        }
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/20 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Emails/Run</div>
                      <div className="font-semibold text-slate-900">{campaign.emailsPerDay || 50}</div>
                    </div>
                    <div className="text-center p-3 bg-white/20 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Sent/Failed</div>
                      <div className="font-semibold text-slate-900">
                        {campaign.emailsSent || 0} / {campaign.emailsFailed || 0}
                      </div>
                    </div>
                                         <div className="text-center p-3 bg-white/20 rounded-lg">
                       <div className="text-xs text-slate-600 mb-1">Status</div>
                       <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                         {getStatusIcon(campaign.status)} {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                       </span>
                       <div className="text-xs text-slate-500 mt-1 px-2">
                         {getStatusDescription(campaign.status)}
                       </div>
                     </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-wrap gap-2">
                                         {campaign.status === 'idle' && (
                       <button 
                         className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                           scrapingCampaigns.has(campaign._id || campaign.id || '')
                             ? 'bg-blue-200 text-blue-600 cursor-not-allowed'
                             : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-sm'
                         }`}
                         onClick={() => {
                           if (confirm('Start scraping? This process may take several minutes to complete.')) {
                             handleStartScraping(campaign._id || campaign.id);
                           }
                         }}
                         disabled={scrapingCampaigns.has(campaign._id || campaign.id || '')}
                         title="Start Scraping - May take several minutes"
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
                         className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                           !hasEmailConfig
                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                             : sendingCampaigns.has(campaign._id || campaign.id || '')
                             ? 'bg-green-200 text-green-600 cursor-not-allowed'
                             : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-sm'
                         }`}
                         onClick={() => {
                           if (confirm('Start sending emails? This process may take some time depending on the volume of emails.')) {
                             handleStartSending(campaign._id || campaign.id);
                           }
                         }}
                         disabled={!hasEmailConfig || sendingCampaigns.has(campaign._id || campaign.id || '')}
                         title={hasEmailConfig ? 'Start Sending - May take some time' : 'Set up email configuration in Settings first'}
                       >
                         {sendingCampaigns.has(campaign._id || campaign.id || '') ? (
                           <span className="inline-block animate-spin mr-2">⏳</span>
                         ) : (
                           '📧 Send'
                         )}
                       </button>
                     )}

                    <button 
                      title="Edit Campaign" 
                      className="px-3 py-2 rounded-lg text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200 border border-green-200"
                      onClick={() => handleEditClick(campaign)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      title="Delete Campaign"
                      className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 border border-red-200"
                      onClick={() => handleDeleteCampaign(campaign._id || campaign.id)}
                    >
                      🗑️ Delete
                    </button>

                    {canReviewLeads(campaign.status) && (
                      <button
                        onClick={() => handleOpenLeadsModal(campaign._id || campaign.id || '')}
                        className="px-3 py-2 rounded-lg text-violet-600 hover:bg-violet-100 hover:scale-110 transition-all duration-200 border border-violet-200"
                        title="Review Leads"
                      >
                        📋 Review Leads
                      </button>
                    )}

                    {campaign.scrapedFileUrl && (
                      <button
                        onClick={() => handleDownloadFile(campaign.scrapedFileUrl)}
                        className="px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200 border border-blue-200"
                        title="Download Scraped Data File"
                      >
                        📥 Download
                      </button>
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-10 gap-4 items-center p-4">
                  {/* Campaign Column */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📧</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 text-base truncate">
                          {campaign.dataSource === 'upload' ? (
                            <span className="text-slate-700">
                              📄 Uploaded list{campaign.uploadedFileName ? ` (${campaign.uploadedFileName})` : ''}
                            </span>
                          ) : (
                            <>
                              {campaign.businessType} in
                              <span className="inline-flex items-center gap-2 ml-2">
                                <Flag countryCode={campaign.location || ''} size="sm" />
                                <span className="text-slate-700">
                                  {getCountryByCode(campaign.location)?.name || campaign.location}
                                </span>
                              </span>
                            </>
                          )}
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
                        className="ml-2 p-1.5 rounded-lg text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200"

                        onClick={() => handleDeleteCampaign(campaign._id || campaign.id)}
                      >
                        🗑️
                      </button>
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

                                     {/* Status Column */}
                   <div className="col-span-2 text-center">
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                       {getStatusIcon(campaign.status)} {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                     </span>
                     <div className="text-xs text-slate-500 mt-1 px-2">
                       {getStatusDescription(campaign.status)}
                     </div>
                   </div>

                  {/* Job Actions Column */}
                  <div className="col-span-1 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                                             {campaign.status === 'idle' && (
                         <button 
                           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                             scrapingCampaigns.has(campaign._id || campaign.id || '')
                               ? 'bg-blue-200 text-blue-600 cursor-not-allowed'
                               : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-sm'
                           }`}
                           onClick={() => {
                             if (confirm('Start scraping? This process may take several minutes to complete.')) {
                               handleStartScraping(campaign._id || campaign.id);
                             }
                           }}
                           disabled={scrapingCampaigns.has(campaign._id || campaign.id || '')}
                           title="Start Scraping - May take several minutes"
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
                             !hasEmailConfig
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                               : sendingCampaigns.has(campaign._id || campaign.id || '')
                               ? 'bg-green-200 text-green-600 cursor-not-allowed'
                               : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 shadow-sm'
                           }`}
                           onClick={() => {
                             if (confirm('Start sending emails? This process may take some time depending on the volume of emails.')) {
                               handleStartSending(campaign._id || campaign.id);
                             }
                           }}
                           disabled={!hasEmailConfig || sendingCampaigns.has(campaign._id || campaign.id || '')}
                           title={hasEmailConfig ? 'Start Sending - May take some time' : 'Set up email configuration in Settings first'}
                         >
                           {sendingCampaigns.has(campaign._id || campaign.id || '') ? (
                             <span className="inline-block animate-spin mr-2">⏳</span>
                           ) : (
                             '📧 Send'
                           )}
                         </button>
                       )}
                      {canReviewLeads(campaign.status) && (
                        <button
                          onClick={() => handleOpenLeadsModal(campaign._id || campaign.id || '')}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-all duration-200 shadow-sm"
                          title="Review Leads"
                        >
                          📋 Review Leads
                        </button>
                      )}
                      {campaign.scrapedFileUrl && (
                        <button
                          onClick={() => handleDownloadFile(campaign.scrapedFileUrl)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
                          title="Download scraped data"
                        >
                          📥 Download CSV
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
                    onClick={() => { resetUploadState(); setShowCreateForm(true); }}
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
        title="📧 LoonaFlow Email Sending Recommendations"
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
                <li>• Avoid bulk campaigns during this period</li>
                <li>• Mix in replies and forwards — ISPs like to see natural conversations</li>
                <li>• Some businesses may not have a public business email address. In those cases, LoonaFlow automatically skips those entries.</li>
                <li>• If an address is detected as a personal/free mailbox (e.g., @gmail.com, @yahoo.com, @seznam.cz), it will be filtered out and not used for outreach.</li>
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
              <p><strong>Big players</strong> (with pristine reputation, warmed IPs, DKIM/SPF/DMARC) can push <strong>5,000–10,000+</strong> per day, but only after years of consistent sending reputation</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-2">💡 Key Success Factors</h4>
            <ul className="text-slate-700 space-y-1">
              <li>• Always prioritize quality over quantity</li>
              <li>• Monitor bounce rates and spam complaints closely</li>
              <li>• Use proper authentication (SPF, DKIM, DMARC)</li>
              <li>• Maintain consistent sending patterns</li>
              <li>• Clean your email lists regularly — LoonaFlow automatically suppresses unsubscribes and skips invalid or personal email addresses</li>
              <li>• Respect data minimization principles: only contact businesses with a valid business email</li>
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

      {/* Location Selection Modal */}
      <Modal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)}
        title={`Select Locations in ${getCountryByCode(formData.location)?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          {isLoadingLocations ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
              <span className="ml-3 text-slate-600">Loading locations...</span>
            </div>
          ) : locationsError ? (
            <div className="text-center py-8">
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                {locationsError}
              </div>
            </div>
          ) : locations.length > 0 ? (
            <>
              <div className="text-sm text-slate-600">
                Choose one or more locations for your campaign (optional):
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {locations.map((location, index) => {
                  const locationId = typeof location === 'string' ? location : (location.id || location._id || index.toString());
                  const locationName = typeof location === 'string' 
                    ? location.split('>')[1] || location
                    : (location.name || location.title || `Location ${index + 1}`);
                  const isSelected = selectedLocations.includes(locationId);
                  
                  return (
                    <div 
                      key={locationId} 
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-violet-50 border-violet-200 ring-2 ring-violet-500' 
                          : 'bg-white border-slate-200 hover:border-violet-200 hover:bg-violet-50'
                      }`}
                      onClick={() => {
                        let newSelections;
                        if (isSelected) {
                          // Remove from selection
                          newSelections = selectedLocations.filter(id => id !== locationId);
                        } else {
                          // Add to selection
                          newSelections = [...selectedLocations, locationId];
                        }
                        setSelectedLocations(newSelections);
                        setFormData(prev => ({ ...prev, selectedLocations: newSelections }));
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-violet-500 bg-violet-500' 
                            : 'border-slate-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800">
                            {locationName}
                          </div>
                          {typeof location === 'object' && location.address && (
                            <div className="text-sm text-slate-500 mt-1">
                              📍 {location.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-slate-500">No locations found for this country.</div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              {selectedLocations.length > 0 ? `${selectedLocations.length} location${selectedLocations.length === 1 ? '' : 's'} selected` : 'No locations selected'}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedLocations([]);
                  setFormData(prev => ({ ...prev, selectedLocations: [] }));
                }}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowLocationModal(false)}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
