# Stripe Integration for LeadFlow AI

This document outlines the Stripe integration implementation for subscription management.

## Overview

The Stripe integration allows users to:
- Subscribe to paid plans through Stripe Checkout
- Manage their subscriptions through Stripe Customer Portal
- Handle webhook events for subscription updates

## API Endpoints

### 1. Create Checkout Session
- **Endpoint**: `POST /api/subscription/create-checkout-session`
- **Purpose**: Creates a Stripe checkout session for plan upgrades
- **Body**: `{ plan: string, successUrl: string, cancelUrl: string }`
- **Response**: `{ success: boolean, data: { sessionId: string, url: string } }` - Redirect URL to Stripe Checkout

### 2. Customer Portal
- **Endpoint**: `POST /api/subscription/portal`
- **Purpose**: Creates a Stripe customer portal session for subscription management
- **Response**: `{ url: string }` - Redirect URL to Stripe Customer Portal

### 3. Sync Subscription Status
- **Endpoint**: `POST /api/subscription/sync`
- **Purpose**: Syncs subscription status with Stripe backend
- **Response**: Updated subscription data

### 4. Webhook Handler
- **Endpoint**: `POST /api/subscription/webhook`
- **Purpose**: Handles Stripe webhook events (forwarded to backend)
- **Headers**: Requires `stripe-signature` header for verification

## Frontend Implementation

### Subscription Component Updates
- Added Stripe checkout integration for paid plan upgrades
- Added customer portal access for existing subscribers
- Added "Check Subscription Status" button for syncing with backend
- Maintained existing functionality for free plan downgrades
- Enhanced error handling and user feedback

### Success/Cancel Handling
- **Success**: Redirects to `/dashboard` (main dashboard page)
- **Cancel**: Redirects back to `/dashboard/subscription` without additional parameters

## Flow Diagram

```
User clicks "Upgrade" → Check if plan is free or paid
                                ↓
                         Free Plan
                                ↓
                     Use existing updateSubscription API
                                ↓
                     Paid Plan (STARTER, GROWTH, SCALE)
                                ↓
                     Create Stripe checkout session with plan name
                                ↓
                     Backend creates Stripe session with success/cancel URLs
                                ↓
                     Redirect to Stripe Checkout
                                ↓
                     User completes payment
                                ↓
                     Redirect to main dashboard
                                ↓
                     Webhook updates subscription status
```

## Backend Requirements

The backend should implement:

1. **Create Checkout Session** (`/api/subscription/create-checkout-session`)
   - Accept: `{ plan, successUrl, cancelUrl }`
   - Create Stripe checkout session
   - Return: `{ success: true, data: { sessionId, url } }`

2. **Customer Portal** (`/api/subscription/portal`)
   - Create Stripe customer portal session
   - Return portal URL

3. **Webhook Handler** (`/api/subscription/webhook`)
   - Verify Stripe signature
   - Handle subscription events (created, updated, cancelled, etc.)
   - Update user subscription status

## Environment Variables

Ensure these are set in your backend:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_IDS` (mapping of plan keys to Stripe price IDs)

## Testing

1. **Test Checkout Flow**:
   - Click upgrade on a paid plan
   - Verify redirect to Stripe Checkout
   - Complete test payment
   - Verify redirect to main dashboard

2. **Test Customer Portal**:
   - Click "Manage Billing" for existing subscribers
   - Verify redirect to Stripe Customer Portal

3. **Test Subscription Sync**:
   - Click "Check Subscription Status" button
   - Verify subscription data is refreshed from backend

4. **Test Webhooks**:
   - Use Stripe CLI to test webhook events
   - Verify subscription status updates

## Security Considerations

- All Stripe API calls go through the backend
- Webhook signatures are verified
- No sensitive Stripe keys are exposed to the frontend
- User authentication is required for all subscription operations

## Error Handling

- Network errors during checkout creation
- Missing or invalid stripePriceId
- Failed webhook processing
- User cancellation of checkout

## Future Enhancements

- Add subscription status indicators
- Implement usage-based billing
- Add invoice history
- Support for multiple payment methods
- A/B testing for pricing pages
