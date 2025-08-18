"use client";

export default function Integrations() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">Integrations</h2>

      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Email Provider Setup</h3>
        
        <div className="space-y-6">
          <div className="p-6 bg-white/30 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Custom SMTP</h4>
                  <p className="text-sm text-slate-600">Connect your own email provider</p>
                </div>
              </div>
              <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105">
                Configure
              </button>
            </div>
          </div>

          <div className="p-6 bg-white/30 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Gmail Integration</h4>
                  <p className="text-sm text-slate-600">Connected • john@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                  Settings
                </button>
                <button className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/30 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Google Analytics</h4>
                  <p className="text-sm text-slate-600">Track email performance</p>
                </div>
              </div>
              <button className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 shadow-lg hover:bg-slate-200 transition-all duration-300">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
