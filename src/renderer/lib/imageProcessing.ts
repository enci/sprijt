export interface ImageData {
  dataUrl: string;
  width: number;
  height: number;
}

// Load image and get dimensions
export async function loadImage(dataUrl: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        dataUrl,
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// Color replace implementation
export async function replaceColor(
  imageData: ImageData,
  sourceColor: string,
  targetColor: string,
  tolerance: number
): Promise<ImageData> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;

      // Parse colors
      const source = hexToRgb(sourceColor);
      const target = hexToRgb(targetColor);

      // Replace colors
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Check if color matches within tolerance
        const distance = Math.sqrt(
          Math.pow(r - source.r, 2) +
          Math.pow(g - source.g, 2) +
          Math.pow(b - source.b, 2)
        );

        const maxDistance = (tolerance / 100) * 441.67; // Max distance in RGB space

        if (distance <= maxDistance) {
          pixels[i] = target.r;
          pixels[i + 1] = target.g;
          pixels[i + 2] = target.b;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      resolve({
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.src = imageData.dataUrl;
  });
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}
