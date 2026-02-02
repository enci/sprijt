import { NodeProps } from '@xyflow/react';
import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import BaseNode from '../BaseNode';
import { ColorReplaceNodeData } from '../types';
import { useFlowStore } from '@/store/flowStore';
import { replaceColor } from '@/lib/imageProcessing';

export default function ColorReplaceNode({ id, data, selected }: NodeProps<ColorReplaceNodeData>) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const [processing, setProcessing] = useState(false);

  // Get input image data from connected node
  const inputEdge = edges.find((edge) => edge.target === id);
  const inputNode = inputEdge ? nodes.find((node) => node.id === inputEdge.source) : null;
  const inputImageData = inputNode?.data?.imageData;

  console.log('ColorReplaceNode render:', { id, inputEdge, inputNode, inputImageData, processing });

  const handleProcess = async () => {
    console.log('handleProcess called', { inputImageData });

    if (!inputImageData) {
      console.log('No input image data');
      alert('No input image connected');
      return;
    }

    console.log('Starting color replace...');
    setProcessing(true);

    try {
      const result = await replaceColor(
        inputImageData,
        data.sourceColor,
        data.targetColor,
        data.tolerance
      );
      console.log('Color replace complete', result);
      updateNodeData(id, { imageData: result });
    } catch (error) {
      console.error('Failed to process image:', error);
      alert('Failed to process image: ' + (error as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <BaseNode hasInput={true} hasOutput={true} selected={selected}>
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-muted-foreground" />
        <span className="text-sm font-semibold">Color Replace</span>
        {processing && <span className="text-xs text-muted-foreground">(processing...)</span>}
      </div>

      <div className="space-y-2">
        {/* Source color */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">From:</span>
          <input
            type="color"
            value={data.sourceColor}
            onChange={(e) => updateNodeData(id, { sourceColor: e.target.value })}
            className="w-8 h-8 rounded border border-border cursor-pointer"
          />
        </div>

        {/* Target color */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">To:</span>
          <input
            type="color"
            value={data.targetColor}
            onChange={(e) => updateNodeData(id, { targetColor: e.target.value })}
            className="w-8 h-8 rounded border border-border cursor-pointer"
          />
        </div>

        {/* Tolerance */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16">Tolerance:</span>
            <span className="text-xs">{data.tolerance}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={data.tolerance}
            onChange={(e) => updateNodeData(id, { tolerance: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Process button */}
        <button
          onClick={handleProcess}
          disabled={!inputImageData || processing}
          className="w-full mt-2 px-3 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Apply'}
        </button>
      </div>
    </BaseNode>
  );
}
