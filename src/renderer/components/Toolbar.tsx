import { Menu, Play, Undo2, Redo2 } from 'lucide-react';

export default function Toolbar() {
  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
      {/* Menu button */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <Menu size={20} />
      </button>

      <div className="w-px h-6 bg-gray-700" />

      {/* Play button */}
      <button className="p-2 hover:bg-gray-700 rounded text-green-500">
        <Play size={20} />
      </button>

      <div className="w-px h-6 bg-gray-700" />

      {/* Undo/Redo */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <Undo2 size={20} />
      </button>
      <button className="p-2 hover:bg-gray-700 rounded">
        <Redo2 size={20} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* App title */}
      <span className="text-sm font-semibold text-gray-400">Sprijt</span>
    </div>
  );
}
