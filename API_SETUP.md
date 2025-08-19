# API Setup Guide

This guide explains how to set up and use the API endpoints in your LeadFlow AI application.

## Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Backend URL - Change this to point to your backend server
BACKEND_URL=http://localhost:3001

# Environment mode
NODE_ENV=development
```

## Backend Requirements

Your backend server should implement the following endpoints:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Campaign Endpoints
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/:id` - Get specific campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### Template Endpoints
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create template
- `GET /api/templates/:id` - Get specific template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

## Authentication Flow

1. **JWT Token Storage**: Tokens are stored in HTTP-only cookies for security
2. **Automatic Inclusion**: The frontend automatically includes the JWT token in the Authorization header
3. **Token Validation**: Your backend should validate the JWT token in the Authorization header

## Usage Examples

### Using the API Client

```typescript
import { apiClient } from '@/lib/api';

// Login
const loginResult = await apiClient.login('user@example.com', 'password');
if (loginResult.error) {
  console.error('Login failed:', loginResult.error);
} else {
}

// Create a campaign
const campaignResult = await apiClient.createCampaign({
  name: 'Summer Sale',
  description: 'Promotional campaign',
  budget: 5000,
  startDate: '2024-06-01',
  endDate: '2024-08-31'
});

// Get all templates
const templatesResult = await apiClient.getTemplates();
if (templatesResult.data) {
}
```

### Direct API Calls

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'password' })
});

// Create campaign (token automatically included)
const campaignResponse = await fetch('/api/campaigns', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Campaign',
    description: 'Campaign description'
  })
});
```

## Security Features

- **HTTP-only Cookies**: JWT tokens are stored in secure HTTP-only cookies
- **Automatic Token Management**: No need to manually handle token storage or inclusion
- **Secure Settings**: Cookies are configured with secure settings in production
- **Error Handling**: Comprehensive error handling for all endpoints

## Testing the Endpoints

You can test the endpoints using tools like Postman or curl:

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Test creating a campaign (after login)
curl -X POST http://localhost:3000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Campaign","description":"Test description"}'
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common error status codes:
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (authentication required)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   └── logout/route.ts
│   ├── campaigns/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── templates/
│       ├── route.ts
│       └── [id]/route.ts
lib/
├── auth.ts          # Server-side auth utilities
└── api.ts           # Client-side API client
API_ENDPOINTS.md     # Complete API documentation
API_SETUP.md         # This setup guide
```

## Next Steps

1. Set up your backend server with the required endpoints
2. Configure the `BACKEND_URL` environment variable
3. Test the authentication flow
4. Implement your frontend components using the API client
5. Add any additional endpoints as needed

For complete API documentation, see `API_ENDPOINTS.md`.
