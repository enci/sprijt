import { Layers, Play, Undo2, Redo2, Menu } from 'lucide-react';

interface ToolbarProps {
  onToggleNodes: () => void;
  showNodePanel: boolean;
}

export default function Toolbar({ onToggleNodes, showNodePanel }: ToolbarProps) {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg flex items-center gap-1 px-4 py-3">
        {/* Menu button */}
        <button className="p-2.5 hover:bg-accent rounded-md transition-colors" title="Menu">
          <Menu size={20} />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Toggle nodes panel */}
        <button
          className={`p-2.5 rounded-md transition-colors ${
            showNodePanel ? 'bg-accent' : 'hover:bg-accent'
          }`}
          onClick={onToggleNodes}
          title="Toggle Nodes"
        >
          <Layers size={20} />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Play button */}
        <button className="p-2.5 hover:bg-accent rounded-md text-green-500 transition-colors" title="Run">
          <Play size={20} />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Undo/Redo */}
        <button className="p-2.5 hover:bg-accent rounded-md transition-colors" title="Undo">
          <Undo2 size={20} />
        </button>
        <button className="p-2.5 hover:bg-accent rounded-md transition-colors" title="Redo">
          <Redo2 size={20} />
        </button>
      </div>
    </div>
  );
}
