export default function NodePanel() {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-3">NODES</h2>

        {/* Placeholder nodes */}
        <div className="space-y-2">
          {['Input', 'Blur', 'Brightness', 'Contrast', 'Saturation', 'Output'].map((node) => (
            <div
              key={node}
              className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm">{node}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
