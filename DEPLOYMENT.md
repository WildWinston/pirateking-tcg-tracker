# Deployment Guide for GitHub Pages

## 🚀 Deploying PirateKing TCG Tracker to GitHub Pages

### Prerequisites
- A GitHub account
- Git installed on your computer

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `pirateking-tcg-tracker`)
4. Make it public or private (your choice)
5. Don't initialize with README, .gitignore, or license (we'll push our existing code)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: PirateKing TCG Tracker"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (or click "Pages" in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Deploy the Build
```bash
# Build the project
npm run build

# The dist folder now contains your production build
# You can either:

# Option A: Push the dist folder to a gh-pages branch
git checkout -b gh-pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Option B: Use GitHub Actions (recommended)
# Create .github/workflows/deploy.yml file (see below)
```

### Option B: GitHub Actions (Recommended)
Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Step 5: Access Your App
After deployment, your app will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Troubleshooting
- If the page shows a 404, make sure you've selected the correct branch and folder in GitHub Pages settings
- If assets don't load, check that the `base: './'` is set in `vite.config.ts`
- Wait a few minutes after pushing - GitHub Pages can take time to update

### Local Testing
Before deploying, you can test the production build locally:
```bash
npm run build
npm run preview
```

This will serve the built files locally so you can verify everything works correctly.

### Updating Your App
To update your deployed app:
1. Make your changes
2. Commit and push to GitHub
3. If using GitHub Actions, it will automatically rebuild and deploy
4. If using manual deployment, run `npm run build` and push the dist folder

## 🎉 Your One Piece TCG Tracker is Now Live!
Your app will be accessible to anyone with the link, perfect for sharing with your One Piece TCG community! 