import { NodeProps } from '@xyflow/react';
import { Palette } from 'lucide-react';
import BaseNode from '../BaseNode';
import { ColorReplaceNodeData } from '../types';

export default function ColorReplaceNode({ data, selected }: NodeProps<ColorReplaceNodeData>) {
  return (
    <BaseNode hasInput={true} hasOutput={true} selected={selected}>
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Color Replace</span>
      </div>

      <div className="space-y-2">
        {/* Source color */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">From:</span>
          <div
            className="w-8 h-8 rounded border border-border cursor-pointer"
            style={{ backgroundColor: data.sourceColor }}
          />
        </div>

        {/* Target color */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">To:</span>
          <div
            className="w-8 h-8 rounded border border-border cursor-pointer"
            style={{ backgroundColor: data.targetColor }}
          />
        </div>

        {/* Tolerance */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">Tolerance:</span>
          <span className="text-xs">{data.tolerance}%</span>
        </div>
      </div>
    </BaseNode>
  );
}
