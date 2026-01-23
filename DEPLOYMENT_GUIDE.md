# Deployment Guide

## Syncfusion License Key Setup

The Syncfusion license key is **excluded from git** to keep it private but **must be deployed** to your production site.

### Files:
- `syncfusion-license.js` - Contains your actual license key (gitignored)
- `syncfusion-license.example.js` - Template file (committed to repo)

### Local Development:
The license key is already set up in `syncfusion-license.js` on your local machine.

### Deploying to GitHub Pages/Spaces:

#### Option 1: Manual Deployment (Recommended for GitHub Pages)
1. After pushing to GitHub, manually add `syncfusion-license.js` to your deployment branch
2. Or use GitHub's web interface to create the file directly in the deployed branch

#### Option 2: GitHub Actions (Automated)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy with License

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Create license file
        run: |
          echo "if (typeof ej !== 'undefined' && ej.base) {" > syncfusion-license.js
          echo "  ej.base.registerLicense('${{ secrets.SYNCFUSION_LICENSE }}');" >> syncfusion-license.js
          echo "  console.log('✅ Syncfusion license registered');" >> syncfusion-license.js
          echo "}" >> syncfusion-license.js
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

Then add your Syncfusion license as a repository secret:
1. Go to your repo → Settings → Secrets and variables → Actions
2. Add new secret: `SYNCFUSION_LICENSE` = `Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX5cc3VQQmVcVk1xV0pWYU0=`

**Note**: This is the v24.x license key. If you upgrade to v32.x in the future, you'll need to update this secret with the v32 key.

#### Option 3: Environment Variable in Build Process
If using a build tool (Vite, Webpack, etc.), you can inject the license at build time.

### Verification:
After deployment, check the browser console. You should see:
```
✅ Syncfusion license registered
```

And the Syncfusion license banner at the top of the page should be gone.

---

## Notes:
- The license key will be visible in the browser's source code when deployed (this is normal for client-side apps)
- The key is just excluded from your git history to avoid accidental exposure
- For true security, consider server-side rendering or a backend proxy
