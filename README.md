# Yarn Stasher Website

Marketing website for [Yarn Stasher](https://yarnstasher.com/) – AI-powered yarn inventory app.

## Setup (GitHub Pages)

1. **Create a new public repo** on GitHub (e.g. `yarn-stasher-website` or `yarn-stasher.github.io`).

2. **Initialize and push** from this folder:
   ```bash
   cd yarn-stasher-website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/yarn-stasher-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages** in repo Settings → Pages:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`

4. Site will be live at:
   - `yarn-stasher-website` → `https://YOUR_USERNAME.github.io/yarn-stasher-website/`
   - `yarn-stasher.github.io` → `https://yarn-stasher.github.io/` (if you use that repo name and own the org)

## Custom Domain

To use yarnstasher.com: Settings → Pages → Custom domain → add `yarnstasher.com`, then update GoDaddy DNS per [GitHub's instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
