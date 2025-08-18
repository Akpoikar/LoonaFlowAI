"use client";

export default function Analytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Performance Chart */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Email Performance</h3>
          <div className="h-64 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-slate-600">Chart placeholder</p>
              <p className="text-sm text-slate-500">Emails sent per day</p>
            </div>
          </div>
        </div>

        {/* Open Rate Trend */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Open Rate Trend</h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-slate-600">Chart placeholder</p>
              <p className="text-sm text-slate-500">Open rate over time</p>
            </div>
          </div>
        </div>

        {/* Reply Rate */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Reply Rate</h3>
          <div className="h-64 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-slate-600">Chart placeholder</p>
              <p className="text-sm text-slate-500">Replies over time</p>
            </div>
          </div>
        </div>

        {/* Top Industries */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Top Industries</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p className="text-slate-600">Chart placeholder</p>
              <p className="text-sm text-slate-500">Pie chart of industries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
