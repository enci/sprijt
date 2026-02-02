import { useState } from 'react';
import Toolbar from '@/components/Toolbar';
import NodePanel from '@/components/NodePanel';
import Canvas from '@/components/Canvas';
import PropertiesPanel from '@/components/PropertiesPanel';

function App() {
  const [showNodePanel, setShowNodePanel] = useState(true);
  const [showProperties, setShowProperties] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-background text-foreground">
      {/* Full-screen canvas */}
      <Canvas />

      {/* Floating toolbar at top */}
      <Toolbar
        onToggleNodes={() => setShowNodePanel(!showNodePanel)}
        showNodePanel={showNodePanel}
      />

      {/* Floating node panel on left */}
      {showNodePanel && <NodePanel onClose={() => setShowNodePanel(false)} />}

      {/* Floating properties panel at bottom */}
      {showProperties && <PropertiesPanel onClose={() => setShowProperties(false)} />}
    </div>
  );
}

export default App;
