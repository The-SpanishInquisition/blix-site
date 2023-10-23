export type BlixUIInputComponent = "slider" | "colorPicker";

export type BlixAnchorData = { id: string, displayName: string, type: string };
export type BlixUIInputData = { id: string, displayName: string, component: BlixUIInputComponent };
export type BlixNodeData = {
  displayName: string;
  inputs: BlixAnchorData[];
  output?: BlixAnchorData;
  uis: BlixUIInputData[];
};