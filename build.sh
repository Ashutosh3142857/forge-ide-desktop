#!/bin/bash
# Forge IDE — Build Script for macOS and Linux
# Requires: Node.js v18+ (https://nodejs.org)
# No code signing, no Xcode, no extra tools needed.

set -e
cd "$(dirname "$0")"

PLATFORM=${1:-auto}

if ! command -v node &> /dev/null; then
  echo "ERROR: Node.js not found. Install from https://nodejs.org"
  exit 1
fi

echo "Installing dependencies..."
npm install

echo ""
if [ "$PLATFORM" = "mac" ]; then
  echo "Building for macOS..."
  node build-script.js mac
elif [ "$PLATFORM" = "linux" ]; then
  echo "Building for Linux..."
  node build-script.js linux
elif [ "$PLATFORM" = "all" ]; then
  echo "Building for all platforms..."
  node build-script.js all
else
  echo "Building for current platform..."
  node build-script.js
fi

echo ""
echo "============================================="
echo " BUILD COMPLETE! Output is in the dist folder"
echo "============================================="
ls -lh dist/
