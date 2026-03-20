<div align="center">
  <img src="assets/icon.png" width="80" alt="Forge IDE logo">
  <h1>Forge IDE</h1>
  <p><strong>A full cloud IDE built better than Replit.</strong><br>Powered by Autonomy AI — Desktop app for Windows, macOS &amp; Linux.</p>

  ![Build](https://img.shields.io/badge/build-passing-3fb950?style=flat-square&logo=github)
  ![Version](https://img.shields.io/badge/version-1.0.0-7c6af7?style=flat-square)
  ![License](https://img.shields.io/badge/license-MIT-5a9cf8?style=flat-square)
  ![Node](https://img.shields.io/badge/node-v18+-d29922?style=flat-square&logo=node.js)
  ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-555?style=flat-square)
</div>

---

Forge IDE is a native desktop development environment that gives you a real cloud IDE experience — without the browser tab, without the latency, and without the subscription wall. It ships with a code editor, file tree, terminal, Git panel, AI assistant, one-click cloud deploy, and real-time collaboration — all in a single 168 MB binary.

## Screenshot

![Forge IDE Screenshot](https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/assets/icon-512.png)

> *Full dark IDE with file explorer, code editor, terminal, AI panel, and deploy targets*

## Features

Forge IDE keeps track of everything in your project. Its goals are to:

- **Run real code** — execute files in an interactive terminal with full Python/Node.js support
  *E.g.: press Run on `arbitrage.py` and see live stdout in the terminal panel*

- **Deploy instantly** — one-click deploy to 11 cloud platforms from inside the IDE
  *E.g.: select Railway, click Deploy — your app goes live in under 60 seconds*

- **Collaborate in real time** — invite teammates, see live cursors, edit together
  *E.g.: share a session link, your teammate joins and you both see each other's cursors*

- **Choose your AI** — plug in any LLM provider via Settings
  *E.g.: switch from Claude to Gemini 2.0 Flash without leaving the IDE*

---

## Installation

### Requirements

- **Node.js v18 or later** — [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- ~2 GB disk space for build tools

---

### 🪟 Windows

**Option A — Run the batch file (easiest)**

```
Double-click: build-windows.bat
```

This installs dependencies and builds the app automatically.

**Option B — Command line**

```cmd
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop
npm install
node build-script.js win
```

**Output:** `dist\Forge IDE-win32-x64\Forge IDE.exe` — double-click to run, no installer needed.

**Option C — Patch an existing build (instant update, no rebuild)**

```cmd
curl -o "dist\Forge IDE-win32-x64\resources\app\renderer\index.html" ^
     https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/renderer/index.html
```

Restart `Forge IDE.exe` — updated in seconds.

---

### 🍎 macOS

```bash
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop
chmod +x build.sh && ./build.sh mac
```

Or manually:

```bash
npm install
node build-script.js mac
```

**Output:** `dist/Forge IDE-darwin-x64/Forge IDE.app`

> **Note:** On first launch, right-click → Open to bypass Gatekeeper.

---

### 🐧 Linux

```bash
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop
chmod +x build.sh && ./build.sh linux
```

Or manually:

```bash
npm install
node build-script.js linux
```

**Output:** `dist/Forge IDE-linux-x64/Forge IDE` — portable, runs on any x64 Linux.

---

### 🔄 Updating

```bash
git pull
node build-script.js win    # or mac / linux
```

---

## 🤖 GitHub Actions CI — Automated Builds

Push a tag and GitHub's free CI automatically builds all 3 platforms:

```bash
git tag v1.0.1
git push --tags
```

Check progress → [Actions tab](https://github.com/Ashutosh3142857/forge-ide-desktop/actions)

The workflow (`.github/workflows/build.yml`) runs on ubuntu, windows, and macos runners in parallel and attaches the output binaries to the release.

---

## 🛠 Development Mode

```bash
npm install
npm start              # Launch app
npm start -- --dev     # Launch with DevTools open
```

---

## 📁 Project Structure

```
forge-ide-desktop/
├── main.js                  ← Electron main process (window, menus, native dialogs)
├── preload.js               ← Secure IPC bridge (renderer ↔ Node.js)
├── build-script.js          ← Cross-platform build using @electron/packager
├── build-windows.bat        ← Windows one-click build
├── build.sh                 ← macOS / Linux build script
├── package.json             ← Dependencies and scripts
├── electron-builder.yml     ← Build configuration
├── renderer/
│   └── index.html           ← The full IDE (~200 KB, all-in-one)
├── assets/
│   ├── icon.ico             ← Windows icon (multi-size)
│   ├── icon.icns            ← macOS icon
│   └── icon.png             ← Linux icon (256×256)
└── .github/workflows/
    └── build.yml            ← GitHub Actions CI
```

---

## ⚙️ IDE Features

| Feature | Description |
|---|---|
| Code Editor | Syntax highlighting, line numbers, minimap, tab completion |
| File Tree | Create, rename, delete, open real files from disk |
| Multi-tab | Edit multiple files simultaneously |
| Terminal | Interactive terminal with 15+ commands |
| Git Panel | Stage, commit, push, PR management, Issues, Actions |
| AI Panel | Forge AI powered by Autonomy AI with full code context |
| Deploy | 11 targets — Forge Cloud, AWS, GCP, Azure, Railway, Render, Fly.io, DigitalOcean, Heroku, Vercel, Docker |
| Collaboration | Real-time multi-user editing, live cursors, invite by email or GitHub |
| LLM Settings | 6 AI providers — Anthropic, OpenAI, Google, Mistral, Meta/Groq, Cohere |
| Extensions | 12 IDE extensions, install/uninstall |
| PyPI Registry | 80+ packages, search + install |
| Command Palette | 45 commands, fully keyboard-driven |
| Settings | Font, theme, keybindings, AI model, terminal config |

---

## 🔧 Troubleshooting

<details>
<summary><b>Cannot create symbolic link (Windows)</b></summary>

This was an issue with the old `electron-builder` toolchain. The current version uses `@electron/packager` which requires no symlinks or code signing. Pull the latest and rebuild:

```cmd
git pull
npm install
node build-script.js win
```

</details>

<details>
<summary><b>Missing script: "build:win"</b></summary>

You're running from the wrong directory. Navigate into the project folder first:

```cmd
cd C:\path\to\forge-ide-desktop
node build-script.js win
```

</details>

<details>
<summary><b>Build fails with EBUSY / file locked</b></summary>

Forge IDE is still running. Close it, delete the old dist, and rebuild:

```cmd
taskkill /f /im "Forge IDE.exe"
rmdir /s /q dist
node build-script.js win
```

</details>

<details>
<summary><b>Buttons not responding in the app</b></summary>

Patch the renderer directly without rebuilding:

```cmd
curl -o "dist\Forge IDE-win32-x64\resources\app\renderer\index.html" ^
     https://raw.githubusercontent.com/Ashutosh3142857/forge-ide-desktop/main/renderer/index.html
```

Restart the app.

</details>

<details>
<summary><b>Node.js not found</b></summary>

Install from [nodejs.org](https://nodejs.org) (v18 or later). After installing, close and reopen your terminal so PATH updates.

</details>

---

## 📄 License

MIT © 2026 Forge IDE — Built with ❤️ by [Autonomy AI](https://autonomy.org.in)
