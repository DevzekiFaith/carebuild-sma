# Import Checker System

This system helps prevent runtime errors caused by missing Lucide React icon imports.

## Problem

When using Lucide React icons in components, forgetting to import them results in runtime errors like:
```
ReferenceError: AlertCircle is not defined
```

## Solution

### 1. Automated Import Checking

Run the import checker to find missing imports:
```bash
npm run check-imports
```

### 2. Pre-commit Hook

A pre-commit hook automatically checks for missing imports before each commit.

### 3. Manual Prevention

Always ensure you import icons before using them:

```typescript
// ✅ Correct
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

// ❌ Incorrect - will cause runtime error
// Missing import for AlertCircle
<AlertCircle className="w-6 h-6" />
```

## Common Icons Used in This Project

- `Building2` - Construction/building related
- `AlertCircle` - Warnings and alerts
- `CheckCircle` - Success states
- `ArrowRight` - Navigation and CTAs
- `X` - Close buttons
- `Menu` - Mobile menu toggle
- `User` - User-related features
- `Mail` - Email functionality
- `Phone` - Phone/contact features
- `MapPin` - Location features
- `Calendar` - Date/time features
- `CreditCard` - Payment features
- `Clock` - Time-related features
- `Shield` - Security features
- `Star` - Ratings/favorites
- `Award` - Achievements/certifications
- `Globe` - International/global features
- `Heart` - Favorites/likes
- `Target` - Goals/objectives
- `BarChart3` - Analytics/charts
- `Camera` - Photo features
- `Video` - Video features
- `FileText` - Document features
- `Sparkles` - Premium/special features
- `Zap` - Quick actions
- `Play` - Media playback
- `Plus` - Add/create actions
- `Edit` - Edit actions
- `Trash2` - Delete actions
- `Filter` - Filtering
- `Search` - Search functionality
- `Navigation` - GPS/location
- `Timer` - Time tracking
- `Activity` - Activity feeds
- `Eye` - View/visibility
- `EyeOff` - Hide/visibility off
- `RefreshCw` - Refresh/reload
- `Download` - Download actions
- `Upload` - Upload actions
- `Lock` - Security/locked
- `Unlock` - Security/unlocked
- `Bell` - Notifications
- `Settings` - Configuration
- `Info` - Information
- `Loader2` - Loading states

## How to Fix Missing Imports

1. **Identify the missing icon** from the error message
2. **Add it to the import statement**:
   ```typescript
   import { 
     // existing imports...
     AlertCircle  // ← Add the missing icon here
   } from 'lucide-react';
   ```
3. **Run the checker again** to verify:
   ```bash
   npm run check-imports
   ```

## Files That Need Regular Checking

- `app/supervisors/register/page.tsx` - Supervisor registration
- `app/pricing/[plan]/page.tsx` - Pricing plans
- `components/Footer.tsx` - Footer component
- `components/dashboard/pages/SchedulePage.tsx` - Schedule page
- All dashboard pages in `components/dashboard/pages/`
- All payment pages in `app/payments/`

## Best Practices

1. **Import all icons at the top** of the file
2. **Use the checker regularly** during development
3. **Fix imports immediately** when errors occur
4. **Test the component** after adding imports
5. **Keep the icon list updated** in this documentation

## Troubleshooting

### Error: "IconName is not defined"
- Check if the icon is imported from 'lucide-react'
- Verify the icon name is spelled correctly
- Restart the development server if needed

### False Positives in Checker
- The checker might detect icons in comments or strings
- Verify actual usage in JSX/TSX code
- Update the checker script if needed

### Import Statement Too Long
- Consider splitting imports across multiple lines
- Group related icons together
- Use consistent formatting

## Future Improvements

- [ ] Add TypeScript support to the checker
- [ ] Create VS Code extension for auto-imports
- [ ] Add icon usage analytics
- [ ] Create icon usage guidelines
- [ ] Add automated import fixing


