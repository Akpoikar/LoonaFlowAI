import React from 'react';
import Flag from './Flag';
import InlineFlag from './InlineFlag';

export default function FlagTest() {
  const testCountries = ['US', 'GB', 'DE', 'FR', 'JP', 'RU', 'CA', 'AU', 'BR', 'CN'];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Flag Test Component</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-600">API-Based Flags (External Images)</h3>
        <div className="grid grid-cols-2 gap-4">
          {testCountries.map(country => (
            <div key={country} className="flex items-center gap-3 p-3 border rounded">
              <Flag countryCode={country} size="md" />
              <div>
                <div className="font-semibold">{country}</div>
                <div className="text-sm text-slate-600">
                  {country === 'US' && 'United States'}
                  {country === 'GB' && 'United Kingdom'}
                  {country === 'DE' && 'Germany'}
                  {country === 'FR' && 'France'}
                  {country === 'JP' && 'Japan'}
                  {country === 'RU' && 'Russia'}
                  {country === 'CA' && 'Canada'}
                  {country === 'AU' && 'Australia'}
                  {country === 'BR' && 'Brazil'}
                  {country === 'CN' && 'China'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-600">CSS-Based Flags (Inline)</h3>
        <div className="grid grid-cols-2 gap-4">
          {testCountries.map(country => (
            <div key={country} className="flex items-center gap-3 p-3 border rounded">
              <InlineFlag countryCode={country} size="md" />
              <div>
                <div className="font-semibold">{country}</div>
                <div className="text-sm text-slate-600">
                  {country === 'US' && 'United States'}
                  {country === 'GB' && 'United Kingdom'}
                  {country === 'DE' && 'Germany'}
                  {country === 'FR' && 'France'}
                  {country === 'JP' && 'Japan'}
                  {country === 'RU' && 'Russia'}
                  {country === 'CA' && 'Canada'}
                  {country === 'AU' && 'Australia'}
                  {country === 'BR' && 'Brazil'}
                  {country === 'CN' && 'China'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p><strong>API Flags:</strong> If you see country codes instead of flags, the external flag images failed to load.</p>
        <p><strong>CSS Flags:</strong> These should always work as they use local styling.</p>
        <p>Check the browser console for any network errors with the API flags.</p>
        <p>Flag API URLs tried:</p>
        <ul className="list-disc list-inside text-sm text-slate-600 ml-4">
          <li>https://flagcdn.com/w40/[country].png</li>
          <li>https://flagcdn.com/24x18/[country].png</li>
          <li>https://restcountries.eu/data/[country].svg</li>
        </ul>
      </div>
    </div>
  );
}
