#!/bin/bash

echo "🚀 GitHub Repository Setup Script"
echo "=================================="
echo ""

# Check if GitHub username is provided
if [ -z "$1" ]; then
    echo "❌ Error: GitHub username is required"
    echo ""
    echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME [REPO_NAME]"
    echo "Example: ./push-to-github.sh dvera script-spark"
    echo ""
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=${2:-"script-spark"}

echo "📝 Configuration:"
echo "   GitHub Username: $GITHUB_USERNAME"
echo "   Repository Name: $REPO_NAME"
echo ""

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo "⚠️  Remote 'origin' already exists. Removing..."
    git remote remove origin
fi

# Add remote
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "🔗 Adding remote: $REPO_URL"
git remote add origin "$REPO_URL"

# Rename branch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "📌 Renaming branch to 'main'..."
    git branch -M main
fi

echo ""
echo "✅ Repository configured!"
echo ""
echo "⚠️  IMPORTANT: Before running the next command, please:"
echo "   1. Go to: https://github.com/new"
echo "   2. Create a repository named: $REPO_NAME"
echo "   3. Choose 'Public' visibility"
echo "   4. DO NOT initialize with README, .gitignore, or license"
echo "   5. Click 'Create repository'"
echo ""
echo "Once created, press Enter to push your code..."
read -r

echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Your code is now on GitHub!"
    echo "📦 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Go to: https://app.netlify.com/projects/theonething"
    echo "   2. Click 'Set up a new site' or 'Import from Git'"
    echo "   3. Select GitHub and authorize Netlify"
    echo "   4. Choose your repository: $REPO_NAME"
    echo "   5. Build settings are already configured in netlify.toml"
    echo "   6. Click 'Deploy site'"
    echo ""
    echo "📖 For detailed instructions, see: DEPLOYMENT.md"
else
    echo ""
    echo "❌ Push failed. Possible reasons:"
    echo "   - Repository doesn't exist on GitHub"
    echo "   - You don't have push access"
    echo "   - Authentication failed"
    echo ""
    echo "💡 Try creating the repository manually and run:"
    echo "   git push -u origin main"
fi

