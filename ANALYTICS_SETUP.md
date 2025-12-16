# Google Analytics & Search Console Setup Guide

I have enabled the necessary Google Cloud APIs (`searchconsole`, `analytics`) on your project `bespokeethos-analytics-475007`. 

However, creating the actual property requires manual verification ownership which I cannot perform programmatically without an existing token.

## 1. Google Search Console (SEO)
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** > **URL Prefix**.
3. Enter `https://gaymensfieldguide.com`.
4. Choose **HTML Tag** verification.
5. Copy the code (it looks like `content="google12345..."`).
6. **Action:** Update `src/app/layout.tsx` metadata:
   ```typescript
   verification: {
     google: 'PASTE_YOUR_CODE_HERE',
   },
   ```

## 2. Google Analytics 4 (Traffic)
1. Go to [Google Analytics](https://analytics.google.com/).
2. Click **Create Property**.
3. Name it `GMFG - Web`.
4. Choose **Web** platform and enter `https://gaymensfieldguide.com`.
5. Copy the **Measurement ID** (starts with `G-`).
6. **Action:** Add this Environment Variable in Vercel:
   - Key: `NEXT_PUBLIC_GOOGLE_ANALYTICS`
   - Value: `G-XXXXXXXX`

## 3. Enable Service Account (Optional Automation)
If you want the Agent (me) to pull stats later:
1. In GA4, go to **Admin** > **Property Access Management**.
2. Add this Service Account Email:
   `[Look in your Google Cloud Console for the bedrock/antigravity service account email]`
3. Grant it **Viewer** access.
