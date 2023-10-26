export type BlixUIInputComponent = "slider" | "colorPicker";
import type { NodeKey,AnchorKey } from "blix_svelvet/dist/types/key";

export type BlixAnchorData = { id: AnchorKey, displayName: string, type: string };
export type BlixUIInputData = { id: string, displayName: string, component: BlixUIInputComponent };
export type BlixNodeData = {
  id : NodeKey;
  type : NodeType;
  displayName: string;
  inputs: BlixAnchorData[];
  output?: BlixAnchorData;
  uis: BlixUIInputData[];
  connections : {
    from : NodeKey[];
    to : NodeKey[];
  }
  connected? : boolean,
  position : Position
};
export type Pair = [number, number];
export type Triple = [number, number, number];
export type NodeType = "position" | "rotate" | "output" | "add cube" | "color";
export type Position = { x : number, y : number}