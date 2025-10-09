# Deployment Guide

## GitHub Repository Setup

### Option 1: Using GitHub CLI (Recommended)
If you have GitHub CLI installed:
```bash
gh repo create script-spark --public --source=. --remote=origin --push
```

### Option 2: Manual Setup
1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `script-spark` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license
4. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/script-spark.git
git branch -M main
git push -u origin main
```

## Netlify Deployment

### Automatic Deployment from GitHub

1. **Go to Netlify Dashboard**: [https://app.netlify.com/projects/theonething](https://app.netlify.com/projects/theonething)

2. **Link GitHub Repository**:
   - Click on "Site settings" or "Set up a new site"
   - Choose "Import from Git"
   - Select "GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your repository (`script-spark`)

3. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
   
   *(These are already configured in `netlify.toml`)*

4. **Deploy**:
   - Click "Deploy site"
   - Your site will be live at: `https://theonething.netlify.app`

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build your project
npm run build

# Deploy
netlify deploy --prod --dir=dist --site=theonething
```

## Environment Variables

If you need environment variables:

1. In Netlify Dashboard → Site settings → Environment variables
2. Add your variables (e.g., `VITE_API_URL`)
3. Redeploy the site

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

## Continuous Deployment

Once linked to GitHub:
- Every push to `main` branch automatically deploys
- Pull request previews are automatically generated
- You can configure branch deploys in Netlify settings

## Build Status Badge

Add to your README.md:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/theonething/deploys)
```

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### 404 Errors on Routes
- The `netlify.toml` file includes redirects for SPA routing
- Ensure it's committed to your repository

### Slow Build Times
- Consider using Netlify cache
- Optimize dependencies
- Use build plugins for faster deployments

