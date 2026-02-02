import { NodeTypes } from '@xyflow/react';
import LoadImageNode from './LoadImageNode/LoadImageNode';
import PreviewImageNode from './PreviewImageNode/PreviewImageNode';
import ColorReplaceNode from './ColorReplaceNode/ColorReplaceNode';
import SaveImageNode from './SaveImageNode/SaveImageNode';
import { NodeType } from './types';

export const nodeTypes: NodeTypes = {
  [NodeType.LOAD_IMAGE]: LoadImageNode,
  [NodeType.PREVIEW_IMAGE]: PreviewImageNode,
  [NodeType.COLOR_REPLACE]: ColorReplaceNode,
  [NodeType.SAVE_IMAGE]: SaveImageNode,
};
