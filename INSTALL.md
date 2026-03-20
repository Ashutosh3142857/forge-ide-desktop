<div align="center">

<img src="assets/icon.png" width="96" height="96" alt="Forge IDE">

# Forge IDE — Installation Guide

**A full cloud IDE built better than Replit.**  
*Powered by Autonomy AI · Desktop app for Windows, macOS & Linux*

[![Version](https://img.shields.io/badge/version-1.0.0-7c6af7?style=flat-square)](https://github.com/Ashutosh3142857/forge-ide-desktop/releases)
[![License](https://img.shields.io/badge/license-MIT-3fb950?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/node-v18+-5a9cf8?style=flat-square)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-d29922?style=flat-square)](#)

</div>

---

## ⚡ One Prerequisite

> **Node.js v18 or later** — download from [nodejs.org](https://nodejs.org)  
> Everything else is handled automatically by the build scripts.

---

## 🪟 Windows

### Option A — Double-click (easiest)

```
1.  Download or clone this repo
2.  Double-click  build-windows.bat
3.  Wait ~3 minutes while dependencies install
4.  Find your app at:  dist\Forge IDE-win32-x64\Forge IDE.exe
```

### Option B — Command line

```cmd
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop
npm install
node build-script.js win
```

### Option C — Patch existing build (fastest update)

Already have the app built? Skip rebuilding — just patch the renderer directly:

```cmd
curl -o "dist\Forge IDE-win32-x64\resources\app\renderer\index.html" ^
     https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/renderer/index.html
```

Then relaunch `Forge IDE.exe` — done in seconds.

> **✅ Output:** `dist\Forge IDE-win32-x64\Forge IDE.exe`  
> Double-click to run — no installer, no admin rights needed.

---

## 🍎 macOS

```bash
# Clone
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop

# Build
chmod +x build.sh
./build.sh mac

# Or manually
npm install && node build-script.js mac
```

> **✅ Output:** `dist/Forge IDE-darwin-x64/Forge IDE.app`  
> Drag to Applications or double-click to run.  
> *First launch: right-click → Open (Gatekeeper bypass)*

---

## 🐧 Linux

```bash
# Clone
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop

# Build
chmod +x build.sh
./build.sh linux

# Or manually
npm install && node build-script.js linux
```

> **✅ Output:** `dist/Forge IDE-linux-x64/Forge IDE`  
> Run directly — portable, no installation required.

---

## 🔄 Keeping Up To Date

```bash
# From your forge-ide-desktop folder:
git pull
node build-script.js win     # or mac / linux
```

---

## 🚀 GitHub Actions — Auto Build All Platforms

Push a version tag and GitHub's free CI automatically builds installers for all 3 platforms:

```bash
git tag v1.0.1
git push --tags
```

Check build progress at → **[Actions tab](https://github.com/Ashutosh3142857/forge-ide-desktop/actions)**

---

## 🛠 Development Mode

```bash
npm install
npm start              # Launch with DevTools
npm start -- --dev     # Launch with DevTools open
```

---

## ✨ What's Inside

| Feature | Description |
|---|---|
| 🖊 **Code Editor** | Syntax highlighting, line numbers, minimap, tab completion |
| 📁 **File Tree** | Create, rename, delete, open real files from disk |
| 💻 **Terminal** | Interactive terminal with 15+ commands |
| 🤖 **Forge AI** | AI panel powered by Autonomy AI |
| ⚙ **Build** | One-click package for Windows, macOS, Linux |
| 🚀 **Deploy** | 11 cloud targets — AWS, GCP, Azure, Railway, Render, Fly.io... |
| 👥 **Collaboration** | Real-time multi-user editing with live cursors |
| 🔌 **LLM Settings** | 6 AI providers — Anthropic, OpenAI, Google, Mistral, Meta, Cohere |
| 🎨 **Extensions** | 12 IDE extensions, install/uninstall |
| ⌨ **Command Palette** | 45 commands, fully keyboard-driven |

---

## 🔧 Troubleshooting

<details>
<summary><b>❌ "Cannot create symbolic link" (Windows)</b></summary>

This is a Windows symlink permission error from an older build system. The current version uses `@electron/packager` which does **not** require symlinks or code signing. Make sure you're on the latest version:

```cmd
git pull
npm install
node build-script.js win
```

</details>

<details>
<summary><b>❌ "Missing script: build:win"</b></summary>

You're running commands from the wrong directory. Make sure you're inside the project folder:

```cmd
cd C:\path\to\forge-ide-desktop
node build-script.js win
```

</details>

<details>
<summary><b>❌ Build fails with EBUSY / file locked</b></summary>

The old `Forge IDE.exe` is still running. Close it first, then rebuild:

```cmd
taskkill /f /im "Forge IDE.exe"
rmdir /s /q dist
node build-script.js win
```

</details>

<details>
<summary><b>❌ Buttons not working in the app</b></summary>

Your built app may be outdated. Patch it directly without rebuilding:

```cmd
curl -o "dist\Forge IDE-win32-x64\resources\app\renderer\index.html" ^
     https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/renderer/index.html
```

Restart the app.

</details>

<details>
<summary><b>❌ Node.js not found</b></summary>

Install Node.js v18+ from [nodejs.org](https://nodejs.org). After installing, close and reopen your terminal so the PATH updates.

</details>

---

## 📁 Project Structure

```
forge-ide-desktop/
├── 📄 main.js                 ← Electron main process
├── 📄 preload.js              ← Secure IPC bridge
├── 📄 build-script.js         ← Cross-platform build (Node.js)
├── 📄 build-windows.bat       ← Windows one-click build
├── 📄 build.sh                ← macOS / Linux build
├── 📄 package.json            ← Dependencies
├── 📄 electron-builder.yml    ← Build config
├── 📁 renderer/
│   └── 📄 index.html          ← The full IDE (~200KB)
├── 📁 assets/
│   ├── 🖼 icon.ico            ← Windows icon
│   ├── 🖼 icon.icns           ← macOS icon
│   └── 🖼 icon.png            ← Linux icon
└── 📁 .github/workflows/
    └── 📄 build.yml           ← GitHub Actions CI
```

---

<div align="center">

**Built with ❤️ by [Autonomy AI](https://autonomy.org.in)**

[🐛 Report a Bug](https://github.com/Ashutosh3142857/forge-ide-desktop/issues) · [💡 Request a Feature](https://github.com/Ashutosh3142857/forge-ide-desktop/issues) · [⭐ Star on GitHub](https://github.com/Ashutosh3142857/forge-ide-desktop)

*MIT License © 2026 Forge IDE*

</div>
