export default function NodePanel() {
  return (
    <div className="w-64 bg-card border-r border-border overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">NODES</h2>

        {/* Placeholder nodes */}
        <div className="space-y-2">
          {['Input', 'Blur', 'Brightness', 'Contrast', 'Saturation', 'Output'].map((node) => (
            <div
              key={node}
              className="p-3 bg-secondary rounded cursor-pointer hover:bg-accent transition-colors"
            >
              <span className="text-sm">{node}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
