import { Menu, Play, Undo2, Redo2 } from 'lucide-react';

export default function Toolbar() {
  return (
    <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-2">
      {/* Menu button */}
      <button className="p-2 hover:bg-accent rounded">
        <Menu size={20} />
      </button>

      <div className="w-px h-6 bg-border" />

      {/* Play button */}
      <button className="p-2 hover:bg-accent rounded text-green-500">
        <Play size={20} />
      </button>

      <div className="w-px h-6 bg-border" />

      {/* Undo/Redo */}
      <button className="p-2 hover:bg-accent rounded">
        <Undo2 size={20} />
      </button>
      <button className="p-2 hover:bg-accent rounded">
        <Redo2 size={20} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* App title */}
      <span className="text-sm font-semibold text-muted-foreground">Sprijt</span>
    </div>
  );
}
