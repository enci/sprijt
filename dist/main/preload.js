"use strict";
// Preload script runs in a context that has access to both Node.js and the browser
// Use this to expose safe APIs to the renderer process
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    openImageDialog: () => electron_1.ipcRenderer.invoke('dialog:openImage'),
    saveImageDialog: (defaultName) => electron_1.ipcRenderer.invoke('dialog:saveImage', defaultName),
    saveImage: (filePath, dataUrl) => electron_1.ipcRenderer.invoke('fs:saveImage', filePath, dataUrl),
});
window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script loaded');
});
