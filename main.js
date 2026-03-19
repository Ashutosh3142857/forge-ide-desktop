const { app, BrowserWindow, Menu, shell, dialog, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Forge IDE',
    backgroundColor: '#0d0e11',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    frame: process.platform !== 'darwin',
    icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : process.platform === 'darwin' ? 'icon.icns' : 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false, // allow local file loading
    },
    show: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open DevTools in dev mode
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => { mainWindow = null; });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  buildMenu();
}

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{ label: app.name, submenu: [
      { role: 'about' }, { type: 'separator' },
      { role: 'services' }, { type: 'separator' },
      { role: 'hide' }, { role: 'hideOthers' }, { role: 'unhide' },
      { type: 'separator' }, { role: 'quit' }
    ]}] : []),
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'CmdOrCtrl+N', click: () => mainWindow.webContents.send('menu', 'newFile') },
        { label: 'Open File…', accelerator: 'CmdOrCtrl+O', click: () => openFileDialog() },
        { label: 'Open Folder…', accelerator: 'CmdOrCtrl+Shift+O', click: () => openFolderDialog() },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => mainWindow.webContents.send('menu', 'save') },
        { label: 'Save All', accelerator: 'CmdOrCtrl+Shift+S', click: () => mainWindow.webContents.send('menu', 'saveAll') },
        { type: 'separator' },
        { label: 'Close Tab', accelerator: 'CmdOrCtrl+W', click: () => mainWindow.webContents.send('menu', 'closeTab') },
        isMac ? { role: 'close' } : { role: 'quit', label: 'Exit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
        { type: 'separator' },
        { label: 'Find', accelerator: 'CmdOrCtrl+F', click: () => mainWindow.webContents.send('menu', 'find') },
        { label: 'Replace', accelerator: 'CmdOrCtrl+H', click: () => mainWindow.webContents.send('menu', 'replace') },
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Explorer', accelerator: 'CmdOrCtrl+Shift+E', click: () => mainWindow.webContents.send('menu', 'explorer') },
        { label: 'Search', accelerator: 'CmdOrCtrl+Shift+F', click: () => mainWindow.webContents.send('menu', 'search') },
        { label: 'Source Control', accelerator: 'CmdOrCtrl+Shift+G', click: () => mainWindow.webContents.send('menu', 'git') },
        { label: 'Extensions', click: () => mainWindow.webContents.send('menu', 'ext') },
        { type: 'separator' },
        { label: 'Toggle Terminal', accelerator: 'CmdOrCtrl+J', click: () => mainWindow.webContents.send('menu', 'togglePanel') },
        { label: 'Toggle AI Panel', click: () => mainWindow.webContents.send('menu', 'toggleAI') },
        { type: 'separator' },
        { label: 'Command Palette', accelerator: 'CmdOrCtrl+Shift+P', click: () => mainWindow.webContents.send('menu', 'cmdPalette') },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Developer Tools' },
      ]
    },
    {
      label: 'Run',
      submenu: [
        { label: 'Run File', accelerator: 'F5', click: () => mainWindow.webContents.send('menu', 'runFile') },
        { label: 'Run Tests', accelerator: 'CmdOrCtrl+Shift+T', click: () => mainWindow.webContents.send('menu', 'runTests') },
        { label: 'Run Linter', click: () => mainWindow.webContents.send('menu', 'runLint') },
        { type: 'separator' },
        { label: 'Stop Process', accelerator: 'CmdOrCtrl+.', click: () => mainWindow.webContents.send('menu', 'stopRun') },
      ]
    },
    {
      label: 'Terminal',
      submenu: [
        { label: 'New Terminal', accelerator: 'CmdOrCtrl+`', click: () => mainWindow.webContents.send('menu', 'newTerm') },
        { label: 'Clear Terminal', click: () => mainWindow.webContents.send('menu', 'clearTerm') },
        { type: 'separator' },
        { label: 'Kill Terminal', click: () => mainWindow.webContents.send('menu', 'killTerm') },
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Command Palette', click: () => mainWindow.webContents.send('menu', 'cmdPalette') },
        { label: 'Keyboard Shortcuts', click: () => mainWindow.webContents.send('menu', 'shortcuts') },
        { type: 'separator' },
        { label: 'Forge IDE on GitHub', click: () => shell.openExternal('https://github.com/forge-ide') },
        { label: 'Documentation', click: () => shell.openExternal('https://docs.forge.run') },
        { type: 'separator' },
        { label: 'About Forge IDE', click: () => showAbout() },
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// IPC handlers for native file system
ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Code Files', extensions: ['py','js','ts','json','md','env','txt','html','css','toml','yaml','yml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  if (result.canceled || !result.filePaths.length) return null;
  const fp = result.filePaths[0];
  const content = fs.readFileSync(fp, 'utf8');
  return { path: fp, name: path.basename(fp), content };
});

ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  if (result.canceled || !result.filePaths.length) return null;
  const folderPath = result.filePaths[0];
  const files = readDirRecursive(folderPath, 2);
  return { path: folderPath, name: path.basename(folderPath), files };
});

ipcMain.handle('save-file', async (event, { filePath, content }) => {
  if (!filePath) {
    const result = await dialog.showSaveDialog(mainWindow, {
      filters: [{ name: 'All Files', extensions: ['*'] }]
    });
    if (result.canceled) return null;
    filePath = result.filePath;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
});

ipcMain.handle('read-file', async (event, filePath) => {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return null; }
});

ipcMain.handle('get-system-info', () => ({
  platform: process.platform,
  arch: process.arch,
  version: app.getVersion(),
  electronVersion: process.versions.electron,
  nodeVersion: process.versions.node,
  homeDir: os.homedir(),
  tmpDir: os.tmpdir(),
  cpus: os.cpus().length,
  memory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
}));

function readDirRecursive(dirPath, depth) {
  if (depth === 0) return [];
  try {
    return fs.readdirSync(dirPath).map(name => {
      const full = path.join(dirPath, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        return { type: 'folder', name, path: full, children: readDirRecursive(full, depth - 1) };
      }
      return { type: 'file', name, path: full };
    }).filter(f => !f.name.startsWith('.') || f.name === '.env');
  } catch { return []; }
}

async function openFileDialog() {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Code Files', extensions: ['py','js','ts','json','md','env','txt','html','css'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  if (!result.canceled && result.filePaths.length) {
    const fp = result.filePaths[0];
    const content = fs.readFileSync(fp, 'utf8');
    mainWindow.webContents.send('open-file-result', { path: fp, name: path.basename(fp), content });
  }
}

async function openFolderDialog() {
  const result = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
  if (!result.canceled && result.filePaths.length) {
    const folderPath = result.filePaths[0];
    const files = readDirRecursive(folderPath, 3);
    mainWindow.webContents.send('open-folder-result', { path: folderPath, name: path.basename(folderPath), files });
  }
}

function showAbout() {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'About Forge IDE',
    message: 'Forge IDE',
    detail: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nNode: ${process.versions.node}\nPlatform: ${process.platform} ${process.arch}\n\nA cloud development environment built better than Replit.\nPowered by Autonomy AI.\n\n© 2026 Forge IDE`,
    buttons: ['OK'],
    icon: path.join(__dirname, 'assets', 'icon.png'),
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
