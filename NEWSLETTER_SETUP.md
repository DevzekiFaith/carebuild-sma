# Newsletter Subscription Setup

This document explains how to set up the authenticated email subscription functionality for CareBuild SMA.

## Features

- ✅ **Email Validation**: Client-side and server-side email format validation
- ✅ **Duplicate Prevention**: Prevents duplicate email subscriptions
- ✅ **Real-time Feedback**: Success/error messages with animations
- ✅ **Loading States**: Visual feedback during subscription process
- ✅ **Database Integration**: Stores subscriptions in Supabase
- ✅ **Security**: Row Level Security (RLS) policies
- ✅ **API Authentication**: Secure API endpoint with proper error handling

## Setup Instructions

### 1. Database Setup

Run the SQL migration to create the newsletter subscribers table:

```sql
-- Execute the contents of supabase-migrations/newsletter_subscribers.sql
-- in your Supabase SQL editor
```

### 2. Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important**: The `SUPABASE_SERVICE_ROLE_KEY` is required for the API to work. You can find this in your Supabase project settings under "API".

### 3. API Endpoint

The newsletter subscription API is located at:
- **Endpoint**: `/api/newsletter/subscribe`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response** (201):
```json
{
  "message": "Successfully subscribed to newsletter!",
  "subscriber": {
    "id": "uuid",
    "email": "user@example.com",
    "subscribed_at": "2024-01-01T00:00:00Z",
    "status": "active",
    "source": "website_footer"
  }
}
```

**Error Responses**:
- **400**: Invalid email format
- **409**: Email already subscribed
- **500**: Server error

### 4. Frontend Integration

The newsletter subscription form is integrated into the Footer component with:

- **Form Validation**: Real-time email validation
- **Loading States**: Spinner during subscription
- **Success Messages**: Green checkmark with confirmation
- **Error Messages**: Red alert with specific error details
- **Auto-reset**: Success message disappears after 5 seconds

### 5. Database Schema

The `newsletter_subscribers` table includes:

- `id`: UUID primary key
- `email`: Unique email address (lowercase)
- `subscribed_at`: Timestamp of subscription
- `status`: active/unsubscribed/bounced
- `source`: Where the subscription came from
- `confirmation_token`: For email verification (optional)
- `confirmed_at`: When email was confirmed (optional)
- `unsubscribed_at`: When user unsubscribed (optional)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

### 6. Security Features

- **Row Level Security (RLS)**: Enabled on the table
- **Service Role Access**: Only service role can manage records
- **User Access**: Users can only read their own subscription
- **Anonymous Insert**: Allows public subscription
- **Email Validation**: Both client and server-side validation

### 7. Future Enhancements

Consider adding:

- **Email Confirmation**: Send confirmation emails
- **Unsubscribe Links**: Allow users to unsubscribe
- **Email Templates**: Professional newsletter templates
- **Analytics**: Track subscription metrics
- **Segmentation**: Group subscribers by interests
- **Automation**: Automated email campaigns

### 8. Testing

Test the subscription functionality:

1. **Valid Email**: Enter a valid email address
2. **Invalid Email**: Try invalid formats (should show error)
3. **Duplicate Email**: Try subscribing the same email twice
4. **Empty Field**: Submit without email (should show error)
5. **Network Error**: Test with network disabled

### 9. Monitoring

Monitor the subscription system:

- Check Supabase logs for errors
- Monitor API response times
- Track subscription success rates
- Review error messages for improvements

## Troubleshooting

### Common Issues

1. **"Service role can manage newsletter subscribers" error**
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is set correctly
   - Check that the service role has proper permissions

2. **"Database error occurred"**
   - Verify the table exists in Supabase
   - Check RLS policies are set correctly
   - Ensure proper permissions are granted

3. **"Network error"**
   - Check API endpoint is accessible
   - Verify CORS settings
   - Test with browser developer tools

### Support

For issues or questions:
- Check Supabase documentation
- Review API logs in Supabase dashboard
- Test with Postman or similar tools
- Check browser console for client-side errors



