export type BlixUIInputComponent = "slider" | "colorPicker";
import type { NodeKey } from "blix_svelvet/dist/types/key";

export type BlixAnchorData = { id: string; displayName: string; type: string };
export type BlixUIInputData = {
  id: string;
  displayName: string;
  component: BlixUIInputComponent;
};
export type BlixNodeData = {
  id: NodeKey;
  type: NodeType;
  displayName: string;
  inputs: BlixAnchorData[];
  output?: BlixAnchorData;
  uis: BlixUIInputData[];
  connections: {
    inputs: NodeKey[];
    outputs: NodeKey[];
  };
  connected?: boolean;
  position: Translation;
};
export type Pair = [number, number];
export type Triple = [number, number, number];
export type NodeType = "translation" | "rotation" | "output" | "cube" | "color";
export type Translation = { x: number; y: number };
