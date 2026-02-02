// Preload script runs in a context that has access to both Node.js and the browser
// Use this to expose safe APIs to the renderer process

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openImageDialog: () => ipcRenderer.invoke('dialog:openImage'),
  saveImageDialog: (defaultName: string) => ipcRenderer.invoke('dialog:saveImage', defaultName),
  saveImage: (filePath: string, dataUrl: string) => ipcRenderer.invoke('fs:saveImage', filePath, dataUrl),
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
