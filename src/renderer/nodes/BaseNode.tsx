import { Handle, Position } from '@xyflow/react';
import { ReactNode } from 'react';

interface BaseNodeProps {
  children: ReactNode;
  hasInput?: boolean;
  hasOutput?: boolean;
  selected?: boolean;
}

export default function BaseNode({ children, hasInput = true, hasOutput = true, selected }: BaseNodeProps) {
  return (
    <div
      className={`bg-card border-2 rounded-lg shadow-lg min-w-[200px] transition-all ${
        selected ? 'border-primary' : 'border-border'
      }`}
    >
      {/* Input handle on left */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-primary border-2 !border-background"
        />
      )}

      {/* Node content */}
      <div className="p-3">{children}</div>

      {/* Output handle on right */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-primary border-2 !border-background"
        />
      )}
    </div>
  );
}
