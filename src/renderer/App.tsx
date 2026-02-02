import Toolbar from '@/components/Toolbar';
import NodePanel from '@/components/NodePanel';
import Canvas from '@/components/Canvas';
import PropertiesPanel from '@/components/PropertiesPanel';

function App() {
  return (
    <div className="flex flex-col w-screen h-screen bg-background text-foreground">
      {/* Toolbar at top */}
      <Toolbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Node library */}
        <NodePanel />

        {/* Center - Canvas */}
        <div className="flex-1 relative">
          <Canvas />
        </div>
      </div>

      {/* Bottom - Properties panel */}
      <PropertiesPanel />
    </div>
  );
}

export default App;
