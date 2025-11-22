# 🚀 Deployment Guide

## 📋 Quick Start (5 Minutes)

### 1. Create GitHub Repository
```bash
# If you haven't already, initialize git
git init
git add .
git commit -m "Initial commit: Lua Obfuscator with advanced protection"

# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/lua-obfuscator.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Build and deployment", select **GitHub Actions**
5. GitHub Pages is now enabled!

### 3. Deploy Automatically
- Push any changes to `main` branch
- GitHub Actions will build and deploy automatically
- Your site will be live at: `https://YOUR_USERNAME.github.io/lua-obfuscator/`

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment instead of GitHub Actions:

### Option A: Direct GitHub Pages
```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

### Option B: Netlify (Drag & Drop)
1. Run `npm run build`
2. Drag the `dist` folder to [netlify.com](https://netlify.com)
3. Get instant deployment with custom URL

### Option C: Vercel
1. Push to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Automatic deployment with every push

## ⚙️ Configuration Details

### Vite Configuration
The project is pre-configured for GitHub Pages:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/lua-obfuscator/', // GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

### GitHub Actions Workflow
Automatic deployment is configured in `.github/workflows/deploy.yml`:

- Triggers on push to `main` branch
- Builds with Node.js 18
- Optimizes for production
- Deploys to GitHub Pages

## 🌐 Custom Domain Setup

### GitHub Pages Custom Domain
1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Configure DNS records:
   ```
   CNAME @ your-domain.com
   A @ 185.199.108.153
   A @ 185.199.109.153
   A @ 185.199.110.153
   A @ 185.199.111.153
   ```

### Netlify Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS as instructed by Netlify

## 📊 Performance Optimization

The build is optimized for:
- **Fast loading** - Code splitting for vendor libraries
- **Small bundle size** - ESBuild minification
- **Caching** - Proper asset hashing
- **SEO friendly** - Meta tags and structured data

## 🔍 Troubleshooting

### Common Issues

**404 Errors on GitHub Pages**
- Ensure `base` in vite.config.ts matches your repo name
- Check that GitHub Pages is enabled in settings
- Verify the deployment completed successfully

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Styles Not Loading**
- Check that assets paths are correct
- Verify the base path configuration
- Ensure CSS is properly built

**GitHub Actions Failed**
- Check the Actions tab for error details
- Ensure Node.js version is compatible
- Verify all dependencies are installed

### Debug Mode
For debugging deployment issues:

```bash
# Build with source maps
npm run build

# Preview locally
npm install -g serve
serve dist
```

## 📱 Mobile Optimization

The site is fully responsive and optimized for:
- Mobile phones (iOS/Android)
- Tablets (iPad/Android tablets)
- Desktop browsers
- Touch interactions

## 🔒 Security Considerations

- **Client-side processing** - Code never leaves user's browser
- **No server dependencies** - Works completely offline after loading
- **HTTPS enforced** - Secure connections only
- **No tracking** - Privacy-focused implementation

## 📈 Analytics (Optional)

If you want to add analytics:

```html
<!-- Add to index.html before closing </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎉 Success!

Your Lua Obfuscator is now live and available to the world! 🌍

**Your URL:** `https://YOUR_USERNAME.github.io/lua-obfuscator/`

Share it with the Lua community and help developers protect their code!
