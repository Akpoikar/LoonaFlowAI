# Country Codes for Campaigns

## Overview
The LoonaFlow AI system now uses standardized country codes (ISO 3166-1 alpha-2) instead of free-text location inputs for better data consistency and internationalization.

## How It Works

### For Users
- **Create Campaigns**: Select a country from the dropdown instead of typing location names
- **Edit Campaigns**: Update country selection from the same dropdown
- **View Campaigns**: See full country names with flags in the campaign list

### Country Code Format
- **US** = United States 🇺🇸
- **GB** = United Kingdom 🇬🇧
- **DE** = Germany 🇩🇪
- **FR** = France 🇫🇷
- **JP** = Japan 🇯🇵
- **RU** = Russia 🇷🇺
- And many more...

**Note**: Flags are displayed using a hybrid system:
1. **Primary**: Emoji flags (🇺🇸, 🇬🇧, 🇩🇪, etc.)
2. **Fallback**: High-quality flag images from flagcdn.com
3. **Final Fallback**: Country code display if both fail

## Benefits

1. **Data Consistency**: No more variations like "USA", "U.S.A.", "United States"
2. **International Support**: Proper handling of non-English country names
3. **Visual Appeal**: Country flags make it easier to identify locations
4. **API Compatibility**: Standardized format for backend processing
5. **Search & Filter**: Easy to filter campaigns by country

## Usage Examples

### Creating a Campaign
1. Click "Create Campaign"
2. Fill in business type (e.g., "Restaurant")
3. **Select country from dropdown** (e.g., "🇫🇷 FR - France")
4. Set other parameters
5. Submit

### What Gets Stored
- **Database**: Country code (e.g., "FR")
- **Display**: Full country name with flag (e.g., "🇫🇷 France")
- **API**: Country code for backend processing

## Technical Details

### Files Modified
- `lib/countryCodes.ts` - Country data and utilities
- `components/Flag.tsx` - Reusable flag display component
- `components/dashboard/Campaigns.tsx` - Campaign creation/editing forms
- `components/dashboard/LeadFinder.tsx` - Lead filtering by country

### Functions Available
- `getCountryByCode(code)` - Get country details by code
- `getCountryByName(name)` - Get country details by name
- `searchCountries(query)` - Search countries by name or code

### Components Available
- `<Flag countryCode="US" size="md" />` - Display country flag with fallback support
  - **size**: `"sm"` (16x16), `"md"` (24x24), `"lg"` (32x32)
  - **countryCode**: ISO 3166-1 alpha-2 country code (e.g., "US", "GB", "FR")

### Data Structure
```typescript
interface CountryCode {
  code: string;      // "FR"
  name: string;      // "France"
  flag: string;      // "🇫🇷"
}
```

## Migration Notes

- Existing campaigns with text locations will continue to work
- New campaigns require country code selection
- The system gracefully falls back to displaying the original text if no country code is found
