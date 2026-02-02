import { ipcMain, dialog } from 'electron';
import * as fs from 'fs/promises';
import * as path from 'path';

export function setupIpcHandlers() {
  // Open file dialog to select an image
  ipcMain.handle('dialog:openImage', async () => {
    const result = await dialog.showOpenDialog({
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
  ipcMain.handle('dialog:saveImage', async (_, defaultName: string) => {
    const result = await dialog.showSaveDialog({
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
  ipcMain.handle('fs:saveImage', async (_, filePath: string, dataUrl: string) => {
    try {
      const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      await fs.writeFile(filePath, buffer);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
}
