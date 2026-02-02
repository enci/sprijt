import { NodeProps } from '@xyflow/react';
import { Save, Check } from 'lucide-react';
import { useState } from 'react';
import BaseNode from '../BaseNode';
import { SaveImageNodeData } from '../types';
import { useFlowStore } from '@/store/flowStore';

export default function SaveImageNode({ id, data, selected }: NodeProps<SaveImageNodeData>) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get input image data from connected node
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);

  const inputEdge = edges.find((edge) => edge.target === id);
  const inputNode = inputEdge ? nodes.find((node) => node.id === inputEdge.source) : null;
  const imageData = inputNode?.data?.imageData;

  const handleSave = async () => {
    if (!imageData) {
      alert('No image to save');
      return;
    }

    const defaultName = `sprijt-output.${data.format}`;
    const savePath = await window.electronAPI.saveImageDialog(defaultName);

    if (savePath) {
      setSaving(true);
      const result = await window.electronAPI.saveImage(savePath, imageData.url);
      setSaving(false);

      if (result.success) {
        updateNodeData(id, { savePath });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert(`Failed to save: ${result.error}`);
      }
    }
  };

  return (
    <BaseNode hasInput={true} hasOutput={false} selected={selected}>
      <div className="flex items-center gap-2 mb-2">
        <Save size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Save Image</span>
      </div>

      <div className="space-y-2 mt-3">
        {/* Format selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Format:</span>
          <span className="text-xs font-mono">{data.format.toUpperCase()}</span>
        </div>

        {data.savePath ? (
          <div className="text-xs text-muted-foreground truncate" title={data.savePath}>
            {data.savePath}
          </div>
        ) : null}

        <button
          onClick={handleSave}
          disabled={!imageData || saving}
          className="w-full px-3 py-2 text-xs bg-secondary hover:bg-accent rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check size={14} />
              Saved!
            </>
          ) : saving ? (
            'Saving...'
          ) : (
            'Save Image'
          )}
        </button>
      </div>
    </BaseNode>
  );
}
