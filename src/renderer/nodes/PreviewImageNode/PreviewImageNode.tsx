import { NodeProps } from '@xyflow/react';
import { Eye } from 'lucide-react';
import BaseNode from '../BaseNode';
import { PreviewImageNodeData } from '../types';

export default function PreviewImageNode({ data, selected }: NodeProps<PreviewImageNodeData>) {
  return (
    <BaseNode hasInput={true} hasOutput={false} selected={selected}>
      <div className="flex items-center gap-2 mb-2">
        <Eye size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Preview</span>
      </div>

      {data.imageData ? (
        <div className="mt-2">
          <img
            src={data.imageData.url}
            alt="Preview"
            className="w-full h-32 object-contain rounded border border-border bg-muted"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {data.imageData.width} × {data.imageData.height}
          </div>
        </div>
      ) : (
        <div className="w-full h-32 flex items-center justify-center bg-muted rounded border border-border mt-2">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      )}
    </BaseNode>
  );
}
