<div align="center">

<img src="assets/icon.png" width="120" height="120" alt="Forge IDE">

# Forge IDE

### A full cloud IDE built better than Replit.
**Powered by Autonomy AI** — Native desktop app for Windows, macOS & Linux.

[![Version](https://img.shields.io/badge/version-1.0.0-7c6af7?style=flat-square)](https://github.com/Ashutosh3142857/forge-ide-desktop/releases)
[![License](https://img.shields.io/badge/license-MIT-3fb950?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/requires-Node.js%20v18+-5a9cf8?style=flat-square)](https://nodejs.org)
[![Build](https://img.shields.io/badge/CI-GitHub%20Actions-d29922?style=flat-square)](https://github.com/Ashutosh3142857/forge-ide-desktop/actions)

**[📦 Installation Guide](INSTALL.md)** · **[🐛 Issues](https://github.com/Ashutosh3142857/forge-ide-desktop/issues)** · **[⭐ Star](https://github.com/Ashutosh3142857/forge-ide-desktop)**

</div>

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ashutosh3142857/forge-ide-desktop.git
cd forge-ide-desktop
npm install
node build-script.js win    # or: mac / linux
```

> Full installation instructions for all platforms → **[INSTALL.md](INSTALL.md)**

---

## ✨ Features

- **Code Editor** — syntax highlighting, minimap, tab completion, line numbers
- **File Tree** — create, rename, delete, open real files from disk  
- **Terminal** — interactive terminal with 15+ commands
- **Forge AI** — AI panel powered by Autonomy AI with code context
- **Build** — one-click package for Windows, macOS, Linux (no signing required)
- **Deploy** — 11 cloud targets: Forge Cloud, AWS, GCP, Azure, Railway, Render, Fly.io, DigitalOcean, Heroku, Vercel, Docker
- **Collaboration** — real-time multi-user editing with live cursors + invite system
- **LLM Settings** — choose from 6 AI providers: Anthropic, OpenAI, Google, Mistral, Meta/Groq, Cohere
- **Extensions** — 12 IDE extensions, install/uninstall
- **Command Palette** — 45 commands, keyboard-driven
- **Git Panel** — staging, commits, push, PR management, Issues, Actions

---

## 📦 Build

| Platform | Command | Output |
|---|---|---|
| 🪟 Windows | `node build-script.js win` | `dist/Forge IDE-win32-x64/Forge IDE.exe` |
| 🍎 macOS | `node build-script.js mac` | `dist/Forge IDE-darwin-x64/Forge IDE.app` |
| 🐧 Linux | `node build-script.js linux` | `dist/Forge IDE-linux-x64/Forge IDE` |

No code signing. No admin rights. No extra tools. **Just Node.js v18+.**

---

## 🤖 AI Providers

Configure your preferred LLM in **Settings → AI / Autonomy**:

| Provider | Models |
|---|---|
| 🟣 Anthropic | Claude Opus 4.5, Sonnet 4.5, Haiku 4.5 |
| 🟢 OpenAI | GPT-4o, o1, o3-mini |
| 🔵 Google | Gemini 2.0 Flash, 1.5 Pro |
| 🟠 Mistral | Large, Codestral, Mixtral |
| 🦙 Meta/Groq | Llama 3.3 70B, Llama 3.1 8B (free) |
| 🔴 Cohere | Command R+ |

---

## 📄 License

MIT © 2026 Forge IDE — Built with ❤️ by [Autonomy AI](https://autonomy.org.in)
