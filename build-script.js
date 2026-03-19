#!/usr/bin/env node
/**
 * Forge IDE — Cross-platform build script
 * Uses @electron/packager — no code signing, no native toolchains required.
 * Works on Windows, macOS, Linux out of the box with Node.js 18+ only.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const platform = process.argv[2] || 'current';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const platformMap = {
  win:   { platform: 'win32',  arch: 'x64', ext: '.exe' },
  mac:   { platform: 'darwin', arch: 'x64', ext: '.app' },
  linux: { platform: 'linux',  arch: 'x64', ext: ''      },
  all:   null
};

function build(p) {
  const cfg = platformMap[p];
  if (!cfg) return;
  console.log('\n▶ Building for', p, '...');
  const cmd = [
    'npx @electron/packager .',
    '"Forge IDE"',
    '--platform=' + cfg.platform,
    '--arch=' + cfg.arch,
    '--out=dist',
    '--overwrite',
    '--icon=assets/icon' + (p === 'win' ? '.ico' : p === 'mac' ? '.icns' : '.png'),
    '--app-version=' + pkg.version,
    '--electron-version=29.1.0',
    '--ignore="\\.git|\\.github|dist|node_modules/\\.cache"',
    '--no-prune'
  ].join(' ');
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('✅ Done! Output in dist/');
  } catch (e) {
    console.error('❌ Build failed:', e.message);
    process.exit(1);
  }
}

if (platform === 'all') {
  ['win', 'mac', 'linux'].forEach(build);
} else if (platformMap[platform]) {
  build(platform);
} else {
  // auto-detect current platform
  const cur = process.platform === 'win32' ? 'win' : process.platform === 'darwin' ? 'mac' : 'linux';
  build(cur);
}
