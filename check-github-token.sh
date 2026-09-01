#!/bin/bash

# Script to check for GitHub token existence
# Exits with status code 1 and prints error message if token is not found

# Check for GITHUB_TOKEN environment variable
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GitHub token not found!"
    echo ""
    echo "The GITHUB_TOKEN environment variable is required for GitHub operations."
    echo ""
    echo "Please set the GITHUB_TOKEN environment variable. You can do this by:"
    echo "1. Exporting it: export GITHUB_TOKEN='your_token_here'"
    echo "2. Setting it in your shell profile: echo 'export GITHUB_TOKEN=\"your_token_here\"' >> ~/.bashrc"
    echo ""
    echo "You can obtain a GitHub token from: https://github.com/settings/tokens"
    echo "Required permissions: repo, workflow"
    exit 1
fi

# Check if the token looks valid (basic validation)
if [[ ${#GITHUB_TOKEN} -lt 40 ]]; then
    echo "⚠️  Warning: GitHub token appears to be invalid or too short!"
    echo "Token length: ${#GITHUB_TOKEN}"
    echo "Expected at least 40 characters for a GitHub Personal Access Token."
    echo ""
    echo "Please ensure you have a valid GitHub Personal Access Token."
    exit 1
fi

echo "✅ GitHub token found and appears valid!"
echo ""
echo "Token will be used for GitHub API operations."
echo ""
exit 0