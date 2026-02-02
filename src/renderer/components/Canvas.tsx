import { useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '@/nodes/registry';
import { NodeType, SprijtNode, SprijtEdge } from '@/nodes/types';
import { useFlowStore } from '@/store/flowStore';

const initialNodes: SprijtNode[] = [
  {
    id: '1',
    type: NodeType.LOAD_IMAGE,
    position: { x: 100, y: 100 },
    data: { label: 'Load Image' },
  },
  {
    id: '2',
    type: NodeType.COLOR_REPLACE,
    position: { x: 400, y: 100 },
    data: {
      label: 'Color Replace',
      sourceColor: '#ff0000',
      targetColor: '#0000ff',
      tolerance: 10,
    },
  },
  {
    id: '3',
    type: NodeType.PREVIEW_IMAGE,
    position: { x: 700, y: 50 },
    data: { label: 'Preview' },
  },
  {
    id: '4',
    type: NodeType.SAVE_IMAGE,
    position: { x: 700, y: 250 },
    data: { label: 'Save Image', format: 'png' },
  },
];

const initialEdges: SprijtEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
];

export default function Canvas() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect } = useFlowStore();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      colorMode="dark"
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
}
