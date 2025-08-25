export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

// Function to get flag emoji from country code
const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const countryCodes: CountryCode[] = [
  { code: 'US', name: 'United States', flag: getFlagEmoji('US') },
  { code: 'GB', name: 'United Kingdom', flag: getFlagEmoji('GB') },
  { code: 'DE', name: 'Germany', flag: getFlagEmoji('DE') },
  { code: 'FR', name: 'France', flag: getFlagEmoji('FR') },
  { code: 'IT', name: 'Italy', flag: getFlagEmoji('IT') },
  { code: 'ES', name: 'Spain', flag: getFlagEmoji('ES') },
  { code: 'NL', name: 'Netherlands', flag: getFlagEmoji('NL') },
  { code: 'BE', name: 'Belgium', flag: getFlagEmoji('BE') },
  { code: 'AT', name: 'Austria', flag: getFlagEmoji('AT') },
  { code: 'CH', name: 'Switzerland', flag: getFlagEmoji('CH') },
  { code: 'SE', name: 'Sweden', flag: getFlagEmoji('SE') },
  { code: 'NO', name: 'Norway', flag: getFlagEmoji('NO') },
  { code: 'DK', name: 'Denmark', flag: getFlagEmoji('DK') },
  { code: 'FI', name: 'Finland', flag: getFlagEmoji('FI') },
  { code: 'PL', name: 'Poland', flag: getFlagEmoji('PL') },
  { code: 'CZ', name: 'Czech Republic', flag: getFlagEmoji('CZ') },
  { code: 'HU', name: 'Hungary', flag: getFlagEmoji('HU') },
  { code: 'RO', name: 'Romania', flag: getFlagEmoji('RO') },
  { code: 'BG', name: 'Bulgaria', flag: getFlagEmoji('BG') },
  { code: 'HR', name: 'Croatia', flag: getFlagEmoji('HR') },
  { code: 'SI', name: 'Slovenia', flag: getFlagEmoji('SI') },
  { code: 'SK', name: 'Slovakia', flag: getFlagEmoji('SK') },
  { code: 'LT', name: 'Lithuania', flag: getFlagEmoji('LT') },
  { code: 'LV', name: 'Latvia', flag: getFlagEmoji('LV') },
  { code: 'EE', name: 'Estonia', flag: getFlagEmoji('EE') },
  { code: 'IE', name: 'Ireland', flag: getFlagEmoji('IE') },
  { code: 'PT', name: 'Portugal', flag: getFlagEmoji('PT') },
  { code: 'GR', name: 'Greece', flag: getFlagEmoji('GR') },
  { code: 'CA', name: 'Canada', flag: getFlagEmoji('CA') },
  { code: 'AU', name: 'Australia', flag: getFlagEmoji('AU') },
  { code: 'NZ', name: 'New Zealand', flag: getFlagEmoji('NZ') },
  { code: 'JP', name: 'Japan', flag: getFlagEmoji('JP') },
  { code: 'KR', name: 'South Korea', flag: getFlagEmoji('KR') },
  { code: 'CN', name: 'China', flag: getFlagEmoji('CN') },
  { code: 'IN', name: 'India', flag: getFlagEmoji('IN') },
  { code: 'BR', name: 'Brazil', flag: getFlagEmoji('BR') },
  { code: 'MX', name: 'Mexico', flag: getFlagEmoji('MX') },
  { code: 'AR', name: 'Argentina', flag: getFlagEmoji('AR') },
  { code: 'CL', name: 'Chile', flag: getFlagEmoji('CL') },
  { code: 'CO', name: 'Colombia', flag: getFlagEmoji('CO') },
  { code: 'PE', name: 'Peru', flag: getFlagEmoji('PE') },
  { code: 'VE', name: 'Venezuela', flag: getFlagEmoji('VE') },
  { code: 'RU', name: 'Russia', flag: getFlagEmoji('RU') },
  { code: 'UA', name: 'Ukraine', flag: getFlagEmoji('UA') },
  { code: 'BY', name: 'Belarus', flag: getFlagEmoji('BY') },
  { code: 'MD', name: 'Moldova', flag: getFlagEmoji('MD') },
  { code: 'GE', name: 'Georgia', flag: getFlagEmoji('GE') },
  { code: 'AM', name: 'Armenia', flag: getFlagEmoji('AM') },
  { code: 'AZ', name: 'Azerbaijan', flag: getFlagEmoji('AZ') },
  { code: 'TR', name: 'Turkey', flag: getFlagEmoji('TR') },
  { code: 'IL', name: 'Israel', flag: getFlagEmoji('IL') },
  { code: 'SA', name: 'Saudi Arabia', flag: getFlagEmoji('SA') },
  { code: 'AE', name: 'United Arab Emirates', flag: getFlagEmoji('AE') },
  { code: 'EG', name: 'Egypt', flag: getFlagEmoji('EG') },
  { code: 'ZA', name: 'South Africa', flag: getFlagEmoji('ZA') },
  { code: 'NG', name: 'Nigeria', flag: getFlagEmoji('NG') },
  { code: 'KE', name: 'Kenya', flag: getFlagEmoji('KE') },
  { code: 'GH', name: 'Ghana', flag: getFlagEmoji('GH') },
  { code: 'UG', name: 'Uganda', flag: getFlagEmoji('UG') },
  { code: 'TZ', name: 'Tanzania', flag: getFlagEmoji('TZ') },
  { code: 'ET', name: 'Ethiopia', flag: getFlagEmoji('ET') },
  { code: 'MG', name: 'Madagascar', flag: getFlagEmoji('MG') },
  { code: 'TH', name: 'Thailand', flag: getFlagEmoji('TH') },
  { code: 'VN', name: 'Vietnam', flag: getFlagEmoji('VN') },
  { code: 'MY', name: 'Malaysia', flag: getFlagEmoji('MY') },
  { code: 'SG', name: 'Singapore', flag: getFlagEmoji('SG') },
  { code: 'ID', name: 'Indonesia', flag: getFlagEmoji('ID') },
  { code: 'PH', name: 'Philippines', flag: getFlagEmoji('PH') },
  { code: 'PK', name: 'Pakistan', flag: getFlagEmoji('PK') },
  { code: 'BD', name: 'Bangladesh', flag: getFlagEmoji('BD') },
  { code: 'LK', name: 'Sri Lanka', flag: getFlagEmoji('LK') },
  { code: 'NP', name: 'Nepal', flag: getFlagEmoji('NP') },
  { code: 'MM', name: 'Myanmar', flag: getFlagEmoji('MM') },
  { code: 'KH', name: 'Cambodia', flag: getFlagEmoji('KH') },
  { code: 'LA', name: 'Laos', flag: getFlagEmoji('LA') },
  { code: 'MN', name: 'Mongolia', flag: getFlagEmoji('MN') },
  { code: 'KZ', name: 'Kazakhstan', flag: getFlagEmoji('KZ') },
  { code: 'UZ', name: 'Uzbekistan', flag: getFlagEmoji('UZ') },
  { code: 'KG', name: 'Kyrgyzstan', flag: getFlagEmoji('KG') },
  { code: 'TJ', name: 'Tajikistan', flag: getFlagEmoji('TJ') },
  { code: 'TM', name: 'Turkmenistan', flag: getFlagEmoji('TM') },
  { code: 'AF', name: 'Afghanistan', flag: getFlagEmoji('AF') },
  { code: 'IR', name: 'Iran', flag: getFlagEmoji('IR') },
  { code: 'IQ', name: 'Iraq', flag: getFlagEmoji('IQ') },
  { code: 'SY', name: 'Syria', flag: getFlagEmoji('SY') },
  { code: 'LB', name: 'Lebanon', flag: getFlagEmoji('LB') },
  { code: 'JO', name: 'Jordan', flag: getFlagEmoji('JO') },
  { code: 'KW', name: 'Kuwait', flag: getFlagEmoji('KW') },
  { code: 'QA', name: 'Qatar', flag: getFlagEmoji('QA') },
  { code: 'BH', name: 'Bahrain', flag: getFlagEmoji('BH') },
  { code: 'OM', name: 'Oman', flag: getFlagEmoji('OM') },
  { code: 'YE', name: 'Yemen', flag: getFlagEmoji('YE') },
  { code: 'MA', name: 'Morocco', flag: getFlagEmoji('MA') },
  { code: 'TN', name: 'Tunisia', flag: getFlagEmoji('TN') },
  { code: 'DZ', name: 'Algeria', flag: getFlagEmoji('DZ') },
  { code: 'LY', name: 'Libya', flag: getFlagEmoji('LY') },
  { code: 'SD', name: 'Sudan', flag: getFlagEmoji('SD') },
  { code: 'TD', name: 'Chad', flag: getFlagEmoji('TD') },
  { code: 'NE', name: 'Niger', flag: getFlagEmoji('NE') },
  { code: 'ML', name: 'Mali', flag: getFlagEmoji('ML') },
  { code: 'BF', name: 'Burkina Faso', flag: getFlagEmoji('BF') },
  { code: 'CI', name: 'Ivory Coast', flag: getFlagEmoji('CI') },
  { code: 'SN', name: 'Senegal', flag: getFlagEmoji('SN') },
  { code: 'GN', name: 'Guinea', flag: getFlagEmoji('GN') },
  { code: 'SL', name: 'Sierra Leone', flag: getFlagEmoji('SL') },
  { code: 'LR', name: 'Liberia', flag: getFlagEmoji('LR') },
  { code: 'TG', name: 'Togo', flag: getFlagEmoji('TG') },
  { code: 'BJ', name: 'Benin', flag: getFlagEmoji('BJ') },
  { code: 'CM', name: 'Cameroon', flag: getFlagEmoji('CM') },
  { code: 'CF', name: 'Central African Republic', flag: getFlagEmoji('CF') },
  { code: 'CG', name: 'Republic of the Congo', flag: getFlagEmoji('CG') },
  { code: 'CD', name: 'Democratic Republic of the Congo', flag: getFlagEmoji('CD') },
  { code: 'GA', name: 'Gabon', flag: getFlagEmoji('GA') },
  { code: 'GQ', name: 'Equatorial Guinea', flag: getFlagEmoji('GQ') },
  { code: 'ST', name: 'Sao Tome and Principe', flag: getFlagEmoji('ST') },
  { code: 'AO', name: 'Angola', flag: getFlagEmoji('AO') },
  { code: 'NA', name: 'Namibia', flag: getFlagEmoji('NA') },
  { code: 'BW', name: 'Botswana', flag: getFlagEmoji('BW') },
  { code: 'ZW', name: 'Zimbabwe', flag: getFlagEmoji('ZW') },
  { code: 'ZM', name: 'Zambia', flag: getFlagEmoji('ZM') },
  { code: 'MW', name: 'Malawi', flag: getFlagEmoji('MW') },
  { code: 'MZ', name: 'Mozambique', flag: getFlagEmoji('MZ') },
  { code: 'SZ', name: 'Eswatini', flag: getFlagEmoji('SZ') },
  { code: 'LS', name: 'Lesotho', flag: getFlagEmoji('LS') },
  { code: 'MU', name: 'Mauritius', flag: getFlagEmoji('MU') },
  { code: 'SC', name: 'Seychelles', flag: getFlagEmoji('SC') },
  { code: 'KM', name: 'Comoros', flag: getFlagEmoji('KM') },
  { code: 'DJ', name: 'Djibouti', flag: getFlagEmoji('DJ') },
  { code: 'SO', name: 'Somalia', flag: getFlagEmoji('SO') },
  { code: 'ER', name: 'Eritrea', flag: getFlagEmoji('ER') },
  { code: 'SS', name: 'South Sudan', flag: getFlagEmoji('SS') },
  { code: 'RW', name: 'Rwanda', flag: getFlagEmoji('RW') },
  { code: 'BI', name: 'Burundi', flag: getFlagEmoji('BI') }
];

export const getCountryByCode = (code: string): CountryCode | undefined => {
  return countryCodes.find(country => country.code === code.toUpperCase());
};

export const getCountryByName = (name: string): CountryCode | undefined => {
  return countryCodes.find(country => 
    country.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const searchCountries = (query: string): CountryCode[] => {
  if (!query) return countryCodes;
  
  const lowerQuery = query.toLowerCase();
  return countryCodes.filter(country => 
    country.name.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery)
  );
};
