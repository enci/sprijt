export interface ElectronAPI {
  openImageDialog: () => Promise<{
    path: string;
    dataUrl: string;
    name: string;
  } | null>;
  saveImageDialog: (defaultName: string) => Promise<string | null>;
  saveImage: (filePath: string, dataUrl: string) => Promise<{ success: boolean; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
