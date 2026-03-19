const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('forgeAPI', {
  // File system
  openFile: () => ipcRenderer.invoke('open-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  saveFile: (filePath, content) => ipcRenderer.invoke('save-file', { filePath, content }),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),

  // System info
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  // Menu events from main process -> renderer
  onMenu: (cb) => ipcRenderer.on('menu', (_, action) => cb(action)),
  onOpenFile: (cb) => ipcRenderer.on('open-file-result', (_, data) => cb(data)),
  onOpenFolder: (cb) => ipcRenderer.on('open-folder-result', (_, data) => cb(data)),

  // Platform info
  platform: process.platform,
});
