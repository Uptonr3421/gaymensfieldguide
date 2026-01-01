# Deployment Guide

## Prerequisites

- Node.js 20.x or higher
- npm or pnpm package manager

## Environment Variables

The following environment variables are required for full functionality:

### Required (for AI features)
- `GOOGLE_GEMINI_API` - Google Gemini API key for AI content generation
- `GOOGLE_CLOUD_PROJECT` - Google Cloud project ID

### Optional (backup rate limit handling)
- `GOOGLE_GEMINI_API_BACKUP_1` - Backup API key for rate limit fallback
- `GOOGLE_GEMINI_API_BACKUP_2` - Secondary backup API key
- `GOOGLE_CLOUD_PROJECT_BACKUP` - Backup project ID

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

## Deployment on Vercel

This project is optimized for deployment on Vercel:

1. Import your repository to Vercel
2. Configure environment variables in Vercel dashboard (Settings → Environment Variables)
3. Deploy

The `vercel.json` configuration file is already set up with the correct build settings.

### Vercel Configuration

- **Framework**: Next.js
- **Build Command**: `next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (automatic)

## Performance Optimizations

The following optimizations are already configured:

- **Image Optimization**: AVIF and WebP formats with responsive sizing
- **CSS Optimization**: Enabled via experimental flag
- **Package Imports**: Optimized for lucide-react, framer-motion, and other large dependencies
- **Code Splitting**: CSS and JavaScript chunks are automatically split
- **Caching Headers**: Static assets cached for 1 year
- **Compression**: Enabled via Next.js config

## Security Headers

The following security headers are configured:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Monitoring

- Analytics are provided via Vercel Analytics
- Google Analytics is configured with ID: `G-QMLM24T4QK`

## Troubleshooting

### Build Failures

If the build fails:

1. Check that all environment variables are set correctly
2. Ensure Node.js version is 20.x or higher
3. Clear the build cache and try again: `rm -rf .next && npm run build`

### TypeScript Errors

Note: TypeScript build errors are currently ignored (`ignoreBuildErrors: true` in next.config.mjs). This is temporary for development but should be addressed before production deployment.

## Support

For issues or questions, refer to the project repository or contact the development team.
