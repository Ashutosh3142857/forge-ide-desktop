#!/bin/bash
# ============================================================
# Forge IDE — Build Script for All Platforms
# Run this script to build installers for Windows, macOS, Linux
# ============================================================

set -e

echo ""
echo "╔══════════════════════════════════════╗"
echo "║       Forge IDE — Build System       ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install from https://nodejs.org (v18 or later)"
  exit 1
fi

NODE_VER=$(node -v)
echo "✓ Node.js $NODE_VER"

# Check npm
if ! command -v npm &> /dev/null; then
  echo "❌ npm not found."
  exit 1
fi
echo "✓ npm $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building..."

# Parse argument
TARGET=${1:-"all"}

case $TARGET in
  win|windows)
    echo "🪟  Building Windows installer (NSIS + Portable)..."
    npm run build:win
    echo "✓ Windows build complete → dist/"
    ;;
  mac|macos)
    echo "🍎  Building macOS DMG (x64 + arm64)..."
    npm run build:mac
    echo "✓ macOS build complete → dist/"
    ;;
  linux)
    echo "🐧  Building Linux (AppImage + .deb)..."
    npm run build:linux
    echo "✓ Linux build complete → dist/"
    ;;
  all|*)
    echo "🌍  Building all platforms..."
    npm run build:all
    echo "✓ All builds complete → dist/"
    ;;
esac

echo ""
echo "📁 Output files:"
ls -lh dist/ 2>/dev/null || echo "(build outputs in ./dist/)"
echo ""
echo "🚀 Done! Distribute the files from the dist/ folder."
