import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { NodeChanges, EdgeChanges } from '@xyflow/react';
import { SprijtNode, SprijtEdge } from '@/nodes/types';

interface FlowState {
  nodes: SprijtNode[];
  edges: SprijtEdge[];
  setNodes: (nodes: SprijtNode[]) => void;
  setEdges: (edges: SprijtEdge[]) => void;
  onNodesChange: (changes: NodeChanges) => void;
  onEdgesChange: (changes: EdgeChanges) => void;
  onConnect: (connection: Connection) => void;
  updateNodeData: (nodeId: string, data: Partial<any>) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as SprijtNode[],
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as SprijtEdge[],
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges) as SprijtEdge[],
    });
  },
  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },
}));
