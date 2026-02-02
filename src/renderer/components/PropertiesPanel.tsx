import { X } from 'lucide-react';

interface PropertiesPanelProps {
  onClose: () => void;
}

export default function PropertiesPanel({ onClose }: PropertiesPanelProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-[600px]">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold">Properties</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
        </div>
      </div>
    </div>
  );
}
