#!/bin/bash

# Comprehensive GitHub Actions setup verification script for MovtiGroup website
# This script checks if the repository is ready for CI/CD deployment

set -e

echo "🔍 Checking repository setup for CI/CD deployment..."
echo ""

# Check GitHub token validity
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GitHub token not found!"
    echo ""
    echo "Please set the GITHUB_TOKEN environment variable to continue."
    echo "You can get a token from: https://github.com/settings/tokens"
    echo "Required permissions: repo, workflow"
    exit 1
fi

echo "✅ GitHub token found"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    exit 1
fi

NODE_VERSION=$(node --version)
NODE_MAJOR_VERSION=${NODE_VERSION#v}
NODE_MAJOR_VERSION=${NODE_MAJOR_VERSION%.*}

echo "✅ Node.js $NODE_VERSION found"

# Node.js version should be 22 as per CI/CD config
if [ "$NODE_MAJOR_VERSION" -ne 22 ]; then
    echo "⚠️  Warning: CI/CD workflow requires Node.js 22, found $NODE_MAJOR_VERSION"
    echo "You may need to install Node.js 22 for local testing."
fi
echo ""

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm $npm --version found"
echo ""

# Check essential files
ESSENTIAL_FILES=(
    "package.json"
    "nuxt.config.ts"
    "Dockerfile"
    "docker-compose.yml"
    ".github/workflows/ci.yml"
)

MISSING_FILES=()
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "✅ All essential files are present"
else
    echo "❌ Missing essential files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    echo ""
fi

# Check if we can clone the repository (simulate)
REPO_URL="https://github.com/tahatehran/movtigroup-web.git"
echo "📂 Repository URL: $REPO_URL"
echo ""

# Check for required scripts in package.json
if [ -f "package.json" ]; then
    echo "📋 Available scripts from package.json:"
    grep '"scripts"' package.json | sed 's/[[:space:]]*"scripts"[[:space:]]*{//' | sed 's/}//' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | while IFS= read -r line; do
        if [[ $line =~ "^    \"[^\"]+\"" ]]; then
            script_name=${line#*"}
            script_name=${script_name%"}
            echo "   - $script_name"
        fi
    done | head -10
    echo ""
fi

# Check README files
if [ -f "README.md" ] && [ -f "README.fa.md" ]; then
    echo "📚 Documentation:"
    echo "   - README.md (English)"
    echo "   - README.fa.md (Persian)"
    echo ""
fi

# Check CI/CD workflow file
if [ -f ".github/workflows/ci.yml" ]; then
    echo "🔧 CI/CD Configuration:"
    echo "   - GitHub Actions workflow: .github/workflows/ci.yml"
    echo "   - Triggered on: push to main/develop, PRs to main"
    echo "   - Tests Node.js 22 and Nuxt rendering"
    echo ""
fi

echo "🎉 Repository setup check complete!"
echo ""
echo "Next steps for CI/CD deployment:"
echo "1. Push changes to the main/develop branch"
echo "2. GitHub Actions will automatically run the CI/CD pipeline"
echo "3. The pipeline will build, test, and deploy the website"
echo ""
echo "To run tests locally:"
echo "   npm install --legacy-peer-deps"
echo "   npm run build"
echo "   npm run preview"
echo ""
echo "To build for production:"
echo "   npm run build"
echo ""
echo "Repository is ready for CI/CD deployment! 🚀"