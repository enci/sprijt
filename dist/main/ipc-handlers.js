"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIpcHandlers = setupIpcHandlers;
const electron_1 = require("electron");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
function setupIpcHandlers() {
    // Open file dialog to select an image
    electron_1.ipcMain.handle('dialog:openImage', async () => {
        const result = await electron_1.dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif'] },
            ],
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        const filePath = result.filePaths[0];
        const buffer = await fs.readFile(filePath);
        const base64 = buffer.toString('base64');
        const ext = path.extname(filePath).slice(1);
        const dataUrl = `data:image/${ext};base64,${base64}`;
        return {
            path: filePath,
            dataUrl,
            name: path.basename(filePath),
        };
    });
    // Save file dialog
    electron_1.ipcMain.handle('dialog:saveImage', async (_, defaultName) => {
        const result = await electron_1.dialog.showSaveDialog({
            defaultPath: defaultName,
            filters: [
                { name: 'PNG', extensions: ['png'] },
                { name: 'JPEG', extensions: ['jpg', 'jpeg'] },
                { name: 'WebP', extensions: ['webp'] },
            ],
        });
        if (result.canceled || !result.filePath) {
            return null;
        }
        return result.filePath;
    });
    // Save image data to file
    electron_1.ipcMain.handle('fs:saveImage', async (_, filePath, dataUrl) => {
        try {
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            await fs.writeFile(filePath, buffer);
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    });
}
