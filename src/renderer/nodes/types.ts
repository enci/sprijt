import { Node, Edge } from '@xyflow/react';

export enum NodeType {
  LOAD_IMAGE = 'loadImage',
  PREVIEW_IMAGE = 'previewImage',
  COLOR_REPLACE = 'colorReplace',
  SAVE_IMAGE = 'saveImage',
}

export interface ImageData {
  url: string;
  width: number;
  height: number;
  format?: string;
}

export interface BaseNodeData {
  label: string;
}

export interface LoadImageNodeData extends BaseNodeData {
  imagePath?: string;
  imageData?: ImageData;
}

export interface PreviewImageNodeData extends BaseNodeData {
  imageData?: ImageData;
}

export interface ColorReplaceNodeData extends BaseNodeData {
  sourceColor: string;
  targetColor: string;
  tolerance: number;
}

export interface SaveImageNodeData extends BaseNodeData {
  savePath?: string;
  format: 'png' | 'jpg' | 'webp';
}

export type SprijtNode =
  | Node<LoadImageNodeData, NodeType.LOAD_IMAGE>
  | Node<PreviewImageNodeData, NodeType.PREVIEW_IMAGE>
  | Node<ColorReplaceNodeData, NodeType.COLOR_REPLACE>
  | Node<SaveImageNodeData, NodeType.SAVE_IMAGE>;

export type SprijtEdge = Edge;
