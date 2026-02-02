import { NodeProps } from '@xyflow/react';
import { ImageIcon } from 'lucide-react';
import BaseNode from '../BaseNode';
import { LoadImageNodeData } from '../types';

export default function LoadImageNode({ data, selected }: NodeProps<LoadImageNodeData>) {
  return (
    <BaseNode hasInput={false} hasOutput={true} selected={selected}>
      <div className="flex items-center gap-2 mb-2">
        <ImageIcon size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Load Image</span>
      </div>

      {data.imageData ? (
        <div className="mt-2">
          <img
            src={data.imageData.url}
            alt="Loaded"
            className="w-full h-20 object-cover rounded border border-border"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {data.imageData.width} × {data.imageData.height}
          </div>
        </div>
      ) : (
        <button className="w-full mt-2 px-3 py-2 text-xs bg-secondary hover:bg-accent rounded transition-colors">
          Select Image
        </button>
      )}
    </BaseNode>
  );
}
