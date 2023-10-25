export type BlixUIInputComponent = "slider" | "colorPicker";

export type BlixAnchorData = { id: string, displayName: string, type: string };
export type BlixUIInputData = { id: string, displayName: string, component: BlixUIInputComponent };
export type BlixNodeData = {
  type : NodeType;
  displayName: string;
  inputs: BlixAnchorData[];
  output?: BlixAnchorData;
  uis: BlixUIInputData[];
  connections : {
    from : number[];
    to : number[];
  }
  connected? : boolean,
};
export type Pair = [number, number];
export type Triple = [number, number, number];
export type NodeType = "Position" | "Rotate" | "Output" | "Add Cube" | "Color";