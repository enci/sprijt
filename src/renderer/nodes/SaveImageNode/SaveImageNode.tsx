import { NodeProps } from '@xyflow/react';
import { Save } from 'lucide-react';
import BaseNode from '../BaseNode';
import { SaveImageNodeData } from '../types';

export default function SaveImageNode({ data, selected }: NodeProps<SaveImageNodeData>) {
  return (
    <BaseNode hasInput={true} hasOutput={false} selected={selected}>
      <div className="flex items-center gap-2 mb-2">
        <Save size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Save Image</span>
      </div>

      <div className="space-y-2 mt-3">
        {/* Format selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Format:</span>
          <span className="text-xs font-mono">{data.format.toUpperCase()}</span>
        </div>

        {data.savePath ? (
          <div className="text-xs text-muted-foreground truncate" title={data.savePath}>
            {data.savePath}
          </div>
        ) : (
          <button className="w-full px-3 py-2 text-xs bg-secondary hover:bg-accent rounded transition-colors">
            Choose Location
          </button>
        )}
      </div>
    </BaseNode>
  );
}
