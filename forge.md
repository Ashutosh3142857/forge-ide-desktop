# Forge IDE — Desktop Application

**A full cloud IDE built better than Replit. Powered by Autonomy AI.**

---

## 🚀 Quick Start (Build Your Own Installer)

### Requirements
- **Node.js v18 or later** — https://nodejs.org
- **npm** (comes with Node.js)
- ~2 GB disk space for build tools

---

## 🪟 Windows

### Option A — Run the batch file (easiest)
```
Double-click: build-windows.bat
```
This installs dependencies and builds `dist/Forge IDE Setup 1.0.0.exe` (installer) and `dist/Forge IDE 1.0.0.exe` (portable).

### Option B — Manual
```cmd
npm install
npm run build:win
```

**Output:** `dist/Forge IDE Setup 1.0.0.exe` — standard NSIS installer with Start Menu + Desktop shortcut

---

## 🍎 macOS

```bash
chmod +x build.sh
./build.sh mac
```
Or manually:
```bash
npm install
npm run build:mac
```

**Output:** `dist/Forge IDE-1.0.0.dmg` — drag-to-Applications DMG for Intel + Apple Silicon (universal)

> **Note:** On macOS you may need to right-click → Open the first time (Gatekeeper). To sign properly, set up an Apple Developer certificate and add `CSC_LINK` / `CSC_KEY_PASSWORD` env vars.

---

## 🐧 Linux

```bash
chmod +x build.sh
./build.sh linux
```
Or manually:
```bash
npm install
npm run build:linux
```

**Output:**
- `dist/Forge IDE-1.0.0.AppImage` — portable, runs on any x64 Linux (Ubuntu 18+, Fedora, Arch, etc.)
- `dist/forge-ide_1.0.0_amd64.deb` — Debian/Ubuntu package

```bash
# Run AppImage
chmod +x "Forge IDE-1.0.0.AppImage"
./"Forge IDE-1.0.0.AppImage"

# Install .deb
sudo dpkg -i forge-ide_1.0.0_amd64.deb
```

---

## 🌍 Build All Platforms at Once

```bash
npm install
npm run build:all
```

> Cross-platform building works best on macOS (can build all three). Windows can build Win only. Linux can build Linux only. Use GitHub Actions for automated multi-platform builds (see CI section below).

---

## 📁 Project Structure

```
forge-ide-desktop/
├── main.js              ← Electron main process (window, menus, native dialogs)
├── preload.js           ← Secure IPC bridge (renderer ↔ Node.js)
├── package.json         ← Build config + electron-builder settings
├── build.sh             ← Unix build script
├── build-windows.bat    ← Windows build script
├── renderer/
│   └── index.html       ← The entire IDE (HTML/CSS/JS, ~185KB)
└── assets/
    ├── icon.png          ← Linux icon (256×256)
    ├── icon.ico          ← Windows icon (multi-size ICO)
    ├── icon.icns         ← macOS icon
    └── icon.svg          ← Source vector icon
```

---

## ⚙️ What's Included

### IDE Features
- **Code Editor** — syntax highlighting, line numbers, minimap, tab completion
- **File Tree** — create, rename, delete, open real files from disk
- **Tabs** — multi-file editing
- **Terminal** — interactive terminal with 15+ commands
- **Search** — search across all files with replace-all
- **Git / GitHub** — staging, commits, push, PR management, Issues, Actions
- **AI Panel** — Forge AI (Autonomy AI) with code context
- **11 Cloud Deploy Targets** — Forge Cloud, AWS, GCP, Azure, Railway, Render, Fly.io, DigitalOcean, Heroku, Vercel, Docker
- **PyPI Package Registry** — 80+ packages, search + install
- **IDE Extensions** — 12 extensions, install/uninstall
- **Settings Panel** — font size, theme, keybindings, AI model, terminal config
- **Command Palette** — 45 commands, keyboard shortcut driven

### Native Desktop Extras (beyond the browser version)
- **Native file open/save dialogs** — real OS file picker
- **Open any folder** from disk into the IDE
- **Auto-save to disk** — saves modified files to their real path every 30s
- **Native menus** — full app menu with keyboard shortcuts on all platforms
- **macOS traffic lights** — proper titlebar integration
- **Windows taskbar** — proper app icon + jumplist
- **System info** — shows platform, RAM, CPU in status bar
- **About dialog** — native OS about box

---

## 🔧 GitHub Actions CI (Automated Multi-Platform Builds)

Create `.github/workflows/build.yml`:

```yaml
name: Build Forge IDE

on:
  push:
    tags: ['v*']

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build:all
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/upload-artifact@v4
        with:
          name: dist-${{ matrix.os }}
          path: dist/
```

This automatically builds installers for all 3 platforms on every tagged release and uploads them to GitHub Releases.

---

## 🛠 Development Mode

```bash
npm install
npm start              # Launch in development mode
npm start -- --dev     # Launch with DevTools open
```

---

## 📦 Customization

### Change the app name/branding
Edit `package.json`:
```json
{
  "productName": "Your IDE Name",
  "build": {
    "appId": "com.yourcompany.youride"
  }
}
```

### Change AI backend
In `renderer/index.html`, find `ST.aiModel` and update the API endpoint / model string.

### Add auto-update
Install `electron-updater` and add update checking in `main.js`. Pair with GitHub Releases for automatic update distribution.

---

## 📄 License

MIT © 2026 Forge IDE
