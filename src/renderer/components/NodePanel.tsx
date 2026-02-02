import { X, ImageIcon, Eye, Palette, Save } from 'lucide-react';

interface NodePanelProps {
  onClose: () => void;
}

const nodeTypes = [
  { id: 'loadImage', label: 'Load Image', icon: ImageIcon },
  { id: 'colorReplace', label: 'Color Replace', icon: Palette },
  { id: 'previewImage', label: 'Preview', icon: Eye },
  { id: 'saveImage', label: 'Save Image', icon: Save },
];

export default function NodePanel({ onClose }: NodePanelProps) {
  return (
    <div className="absolute left-4 top-20 z-40 w-72">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold">Nodes</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Node list */}
        <div className="p-3 max-h-[600px] overflow-y-auto">
          <div className="space-y-2">
            {nodeTypes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className="p-3 bg-secondary/50 rounded-md cursor-pointer hover:bg-accent transition-colors flex items-center gap-2"
                  draggable
                >
                  <Icon size={16} className="text-muted-foreground" />
                  <span className="text-sm">{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
