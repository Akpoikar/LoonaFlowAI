# LeadFlow AI API Endpoints Documentation

This document outlines all the API endpoints available in the LeadFlow AI frontend application. All endpoints forward requests to the backend server and handle authentication via JWT tokens stored in HTTP-only cookies.

## Base URL
- **Frontend API**: `http://localhost:3000/api`
- **Backend URL**: Configured via `BACKEND_URL` environment variable (default: `http://localhost:3001`)

## Authentication

All protected endpoints require a valid JWT token that is automatically sent via HTTP-only cookies. The token is obtained during login/registration and cleared during logout.

---

## Authentication Endpoints

### 1. User Registration
**POST** `/api/auth/register`

Creates a new user account and returns a JWT token.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "company": "Acme Corp" // optional
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp"
  }
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Missing required fields
- `409` - Email already exists
- `500` - Internal server error

---

### 2. User Login
**POST** `/api/auth/login`

Authenticates user credentials and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp"
  }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Internal server error

---

### 3. User Logout
**POST** `/api/auth/logout`

Clears the authentication token and logs out the user.

**Request Body:** None

**Response:**
```json
{
  "message": "Logout successful"
}
```

**Status Codes:**
- `200` - Logout successful
- `500` - Internal server error

---

## Campaign Management Endpoints

### 1. Get All Campaigns
**GET** `/api/campaigns`

Retrieves all campaigns for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "campaigns": [
    {
      "id": "campaign_id",
      "name": "Summer Sale Campaign",
      "description": "Promotional campaign for summer products",
      "targetAudience": "Young professionals",
      "budget": 5000,
      "startDate": "2024-06-01",
      "endDate": "2024-08-31",
      "status": "active",
      "createdAt": "2024-05-15T10:30:00Z",
      "updatedAt": "2024-05-15T10:30:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Authentication required
- `500` - Internal server error

---

### 2. Create Campaign
**POST** `/api/campaigns`

Creates a new campaign for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Summer Sale Campaign",
  "description": "Promotional campaign for summer products",
  "targetAudience": "Young professionals",
  "budget": 5000,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31"
}
```

**Response:**
```json
{
  "id": "campaign_id",
  "name": "Summer Sale Campaign",
  "description": "Promotional campaign for summer products",
  "targetAudience": "Young professionals",
  "budget": 5000,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "draft",
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T10:30:00Z"
}
```

**Status Codes:**
- `201` - Campaign created successfully
- `400` - Missing required fields
- `401` - Authentication required
- `500` - Internal server error

---

### 3. Get Campaign by ID
**GET** `/api/campaigns/{id}`

Retrieves a specific campaign by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": "campaign_id",
  "name": "Summer Sale Campaign",
  "description": "Promotional campaign for summer products",
  "targetAudience": "Young professionals",
  "budget": 5000,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "active",
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success
- `401` - Authentication required
- `404` - Campaign not found
- `500` - Internal server error

---

### 4. Update Campaign
**PUT** `/api/campaigns/{id}`

Updates an existing campaign.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Updated Summer Sale Campaign",
  "description": "Updated promotional campaign",
  "targetAudience": "All professionals",
  "budget": 7500,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "active"
}
```

**Response:**
```json
{
  "id": "campaign_id",
  "name": "Updated Summer Sale Campaign",
  "description": "Updated promotional campaign",
  "targetAudience": "All professionals",
  "budget": 7500,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "active",
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T11:45:00Z"
}
```

**Status Codes:**
- `200` - Campaign updated successfully
- `401` - Authentication required
- `404` - Campaign not found
- `500` - Internal server error

---

### 5. Delete Campaign
**DELETE** `/api/campaigns/{id}`

Deletes a campaign by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Campaign deleted successfully"
}
```

**Status Codes:**
- `200` - Campaign deleted successfully
- `401` - Authentication required
- `404` - Campaign not found
- `500` - Internal server error

---

## Email Templates Endpoints

### 1. Get All Templates
**GET** `/api/templates`

Retrieves all email templates for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "templates": [
    {
      "id": "template_id",
      "name": "Welcome Email",
      "subject": "Welcome to LeadFlow AI!",
      "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us...</p>",
      "variables": ["name", "company"],
      "category": "onboarding",
      "isActive": true,
      "createdAt": "2024-05-15T10:30:00Z",
      "updatedAt": "2024-05-15T10:30:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Authentication required
- `500` - Internal server error

---

### 2. Create Template
**POST** `/api/templates`

Creates a new email template.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Welcome Email",
  "subject": "Welcome to LeadFlow AI!",
  "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us...</p>",
  "variables": ["name", "company"],
  "category": "onboarding"
}
```

**Response:**
```json
{
  "id": "template_id",
  "name": "Welcome Email",
  "subject": "Welcome to LeadFlow AI!",
  "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us...</p>",
  "variables": ["name", "company"],
  "category": "onboarding",
  "isActive": true,
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T10:30:00Z"
}
```

**Status Codes:**
- `201` - Template created successfully
- `400` - Missing required fields
- `401` - Authentication required
- `500` - Internal server error

---

### 3. Get Template by ID
**GET** `/api/templates/{id}`

Retrieves a specific email template by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": "template_id",
  "name": "Welcome Email",
  "subject": "Welcome to LeadFlow AI!",
  "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us...</p>",
  "variables": ["name", "company"],
  "category": "onboarding",
  "isActive": true,
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T10:30:00Z"
}
```

**Status Codes:**
- `200` - Success
- `401` - Authentication required
- `404` - Template not found
- `500` - Internal server error

---

### 4. Update Template
**PUT** `/api/templates/{id}`

Updates an existing email template.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Updated Welcome Email",
  "subject": "Welcome to LeadFlow AI - Get Started!",
  "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us. Here's how to get started...</p>",
  "variables": ["name", "company", "startDate"],
  "category": "onboarding",
  "isActive": true
}
```

**Response:**
```json
{
  "id": "template_id",
  "name": "Updated Welcome Email",
  "subject": "Welcome to LeadFlow AI - Get Started!",
  "content": "<h1>Welcome {{name}}!</h1><p>Thank you for joining us. Here's how to get started...</p>",
  "variables": ["name", "company", "startDate"],
  "category": "onboarding",
  "isActive": true,
  "createdAt": "2024-05-15T10:30:00Z",
  "updatedAt": "2024-05-15T11:45:00Z"
}
```

**Status Codes:**
- `200` - Template updated successfully
- `401` - Authentication required
- `404` - Template not found
- `500` - Internal server error

---

### 5. Delete Template
**DELETE** `/api/templates/{id}`

Deletes an email template by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Template deleted successfully"
}
```

**Status Codes:**
- `200` - Template deleted successfully
- `401` - Authentication required
- `404` - Template not found
- `500` - Internal server error

---

## Email Configuration Endpoints

### 1. Get All Email Configurations
**GET** `/api/email-config`

Retrieves all email configurations for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64e8a2b3c821f3e1234570",
      "name": "Zoho Business",
      "smtpServer": "smtp.zoho.eu",
      "smtpPort": 587,
      "emailAddress": "info@escapespark.com",
      "isDefault": true,
      "user": "64e8a2b3c821f3e1234569",
      "createdAt": "2025-08-19T12:00:00.000Z",
      "updatedAt": "2025-08-19T12:00:00.000Z"
    },
    {
      "_id": "64e8a2b3c821f3e1234571",
      "name": "Gmail Marketing",
      "smtpServer": "smtp.gmail.com",
      "smtpPort": 587,
      "emailAddress": "marketing@escapespark.com",
      "isDefault": false,
      "user": "64e8a2b3c821f3e1234569",
      "createdAt": "2025-08-19T12:30:00.000Z",
      "updatedAt": "2025-08-19T12:30:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Email configurations retrieved successfully
- `401` - Authentication required
- `500` - Internal server error

---

### 2. Get Single Email Configuration
**GET** `/api/email-config/{configId}`

Retrieves a specific email configuration by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64e8a2b3c821f3e1234570",
    "name": "Zoho Business",
    "smtpServer": "smtp.zoho.eu",
    "smtpPort": 587,
    "emailAddress": "info@escapespark.com",
    "isDefault": true,
    "user": "64e8a2b3c821f3e1234569",
    "createdAt": "2025-08-19T12:00:00.000Z",
    "updatedAt": "2025-08-19T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Email configuration retrieved successfully
- `401` - Authentication required
- `404` - Email configuration not found
- `500` - Internal server error

---

### 3. Create Email Configuration
**POST** `/api/email-config`

Creates a new email configuration.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Zoho Business",
  "smtpServer": "smtp.zoho.eu",
  "smtpPort": 587,
  "emailAddress": "some@some.com",
  "emailPassword": "some",
  "isDefault": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64e8a2b3c821f3e1234570",
    "name": "Zoho Business",
    "smtpServer": "smtp.zoho.eu",
    "smtpPort": 587,
    "emailAddress": "info@escapespark.com",
    "isDefault": true,
    "user": "64e8a2b3c821f3e1234569",
    "createdAt": "2025-08-19T12:00:00.000Z",
    "updatedAt": "2025-08-19T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Email configuration created successfully
- `400` - Missing required fields
- `401` - Authentication required
- `500` - Internal server error

---

### 4. Update Email Configuration
**PUT** `/api/email-config/{configId}`

Updates an existing email configuration.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Zoho Sales",
  "smtpPort": 465,
  "isDefault": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64e8a2b3c821f3e1234570",
    "name": "Zoho Sales",
    "smtpServer": "smtp.zoho.eu",
    "smtpPort": 465,
    "emailAddress": "info@escapespark.com",
    "isDefault": true,
    "user": "64e8a2b3c821f3e1234569",
    "createdAt": "2025-08-19T12:00:00.000Z",
    "updatedAt": "2025-08-19T12:30:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Email configuration updated successfully
- `401` - Authentication required
- `404` - Email configuration not found
- `500` - Internal server error

---

### 5. Delete Email Configuration
**DELETE** `/api/email-config/{configId}`

Deletes an email configuration by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Email configuration deleted successfully"
}
```

**Status Codes:**
- `200` - Email configuration deleted successfully
- `401` - Authentication required
- `404` - Email configuration not found
- `500` - Internal server error

---

## Subscription Endpoints

### 1. Get Available Plans
**GET** `/api/subscription/plans`

Retrieves all available subscription plans.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "FREE": {
      "name": "Free",
      "features": {
        "emailTemplatesLimit": 1,
        "campaignsLimit": 1,
        "emailAccountsLimit": 1,
        "maxResultsPerCampaign": 100
      },
      "price": 0
    },
    "BASIC": {
      "name": "Basic",
      "features": {
        "emailTemplatesLimit": 5,
        "campaignsLimit": 5,
        "emailAccountsLimit": 3,
        "maxResultsPerCampaign": 250
      },
      "price": 29
    },
    "PRO": {
      "name": "Pro",
      "features": {
        "emailTemplatesLimit": -1,
        "campaignsLimit": -1,
        "emailAccountsLimit": -1,
        "maxResultsPerCampaign": 500
      },
      "price": 99
    }
  }
}
```

**Status Codes:**
- `200` - Plans retrieved successfully
- `401` - Authentication required
- `500` - Internal server error

---

### 2. Get Current Subscription
**GET** `/api/subscription`

Retrieves the current user's subscription information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "plan": "BASIC",
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "features": {
      "emailTemplatesLimit": 5,
      "campaignsLimit": 5,
      "emailAccountsLimit": 3,
      "maxResultsPerCampaign": 250
    }
  }
}
```

**Status Codes:**
- `200` - Subscription retrieved successfully
- `401` - Authentication required
- `404` - No subscription found
- `500` - Internal server error

---

### 3. Update Subscription
**PUT** `/api/subscription`

Updates the user's subscription plan.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "plan": "BASIC"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription updated successfully",
  "data": {
    "plan": "BASIC",
    "status": "active",
    "currentPeriodStart": "2024-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2024-02-01T00:00:00.000Z",
    "features": {
      "emailTemplatesLimit": 5,
      "campaignsLimit": 5,
      "emailAccountsLimit": 3,
      "maxResultsPerCampaign": 250
    }
  }
}
```

**Status Codes:**
- `200` - Subscription updated successfully
- `400` - Missing required fields
- `401` - Authentication required
- `404` - No subscription found
- `500` - Internal server error

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

## Authentication Flow

1. **Registration/Login**: User provides credentials, receives JWT token in HTTP-only cookie
2. **Protected Requests**: Frontend automatically includes JWT token from cookie in Authorization header
3. **Logout**: JWT token is cleared from cookie

## Environment Variables

- `BACKEND_URL`: URL of the backend server (default: `http://localhost:3001`)
- `NODE_ENV`: Environment mode (`development` or `production`)

## Security Features

- JWT tokens stored in HTTP-only cookies (not accessible via JavaScript)
- Secure cookie settings in production
- Automatic token inclusion in protected requests
- Proper error handling and validation
