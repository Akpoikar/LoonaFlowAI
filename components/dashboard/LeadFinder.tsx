"use client";

import { useState } from 'react';
import { Lead } from '../../types/dashboard';

interface LeadFinderProps {
  leads: Lead[];
}

export default function LeadFinder({ leads }: LeadFinderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Lead Finder</h2>
        <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105">
          Add to Campaign
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Find businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
          </div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          >
            <option value="">All Industries</option>
            <option value="healthcare">Healthcare</option>
            <option value="real-estate">Real Estate</option>
            <option value="legal">Legal</option>
            <option value="technology">Technology</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
          >
            <option value="">All Locations</option>
            <option value="prague">Prague</option>
            <option value="berlin">Berlin</option>
            <option value="vienna">Vienna</option>
            <option value="warsaw">Warsaw</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Select</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Rating</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-white/20">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={lead.selected}
                      onChange={() => {}}
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="py-3 px-4 text-slate-700">{lead.company}</td>
                  <td className="py-3 px-4 text-slate-700">{lead.industry}</td>
                  <td className="py-3 px-4 text-slate-700">{lead.location}</td>
                  <td className="py-3 px-4 text-slate-700">{lead.email}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-slate-700">{lead.rating}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
