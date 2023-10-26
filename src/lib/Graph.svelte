<script lang="ts">
  import { Svelvet, type AnchorKey, type NodeKey } from "blix_svelvet";
  import { onMount, tick } from "svelte";
  import BlixNode from "./BlixNode.svelte";
  import type { BlixNodeData, Pair, Triple } from "./types";

  let graphData: any;
  export let box: {
    pos: Pair;
    rot: Triple;
    dim: number;
    col: string;
    blixBox?: boolean;
  };
  export let hidden = true;

  let connectAnchorIds: (
    sourceNode: NodeKey,
    sourceAnchor: AnchorKey,
    targetNode: NodeKey,
    targetAnchor: AnchorKey
  ) => any;

  let nodes: { [id: string]: BlixNodeData } = {
    "N-Output": {
      id: `N-Output`,
      type: "output",
      displayName: "Output",
      inputs: [{ id: `Output-I`, displayName: "Scene", type: "scene" }],
      uis: [],
      connections: {
        inputs: [],
        outputs: [],
      },
      connected: true,
      position: {
        x: 800,
        y: 0,
      },
    },
    "N-Rotation": {
      id: `N-Rotation`,
      type: "rotation",
      displayName: "Rotation",
      inputs: [{ id: `Rotation-I`, displayName: "Cube", type: "cube" }],
      output: { id: `Rotation-O`, displayName: "Scene", type: "scene" },
      uis: [
        { id: "x-rotation", displayName: "X", component: "slider" },
        { id: "y-rotation", displayName: "Y", component: "slider" },
        { id: "z-rotation", displayName: "Z", component: "slider" },
      ],
      connections: {
        inputs: [],
        outputs: [],
      },
      position: {
        x: 375,
        y: 0,
      },
    },
    "N-Cube": {
      id: `N-Cube`,
      type: "cube",
      displayName: "Cube",
      inputs: [],
      output: { id: "Add-Cube-O", displayName: "Cube", type: "cube" },
      uis: [],
      connections: {
        inputs: [],
        outputs: [],
      },
      position: {
        x: -200,
        y: 200,
      },
    },
    "N-Color": {
      id: `N-Color`,
      type: "color",
      displayName: "Color",
      inputs: [{ id: `Color-I`, displayName: "Cube", type: "cube" }],
      output: { id: "Color-O", displayName: "Cube", type: "cube" },
      uis: [{ id: "color", displayName: "Color", component: "colorPicker" }],
      connections: {
        inputs: [],
        outputs: [],
      },
      position: {
        x: 0,
        y: 250,
      },
    },
    "N-Translation": {
      id: `N-Translation`,
      type: "translation",
      displayName: "Translation",
      inputs: [{ id: "Translation-I", displayName: "Cube", type: "cube" }],
      output: { id: "Translation-O", displayName: "Cube", type: "cube" },
      uis: [
        { id: "x-translation", displayName: "X", component: "slider" },
        { id: "y-translation", displayName: "Y", component: "slider" },
      ],
      connections: {
        inputs: [],
        outputs: [],
      },
      position: {
        x: 0,
        y: 0,
      },
    },
  };

  const CUBE_INDEX = "N-Cube";

  async function edgeConnected(e: CustomEvent<any>) {
    const sourceId = e.detail.sourceNode.id;
    const targetId = e.detail.targetNode.id;

    nodes[sourceId].connections.outputs.push(targetId);
    nodes[targetId].connections.inputs.push(sourceId);

    propagate(nodes["N-Output"]);
    cubeVisible();
  }

  async function edgeDisconnected(e: CustomEvent<any>) {
    // console.log("DISCONNECTION EVENT");

    const sourceId = e.detail.sourceNode.id;
    const targetId = e.detail.targetNode.id;

    for (const node of Object.values(nodes)) {
      node.connected = false;
    }

    nodes[sourceId].connections.outputs = nodes[
      sourceId
    ].connections.outputs.filter((item) => item !== targetId);
    nodes[targetId].connections.inputs = nodes[
      targetId
    ].connections.inputs.filter((item) => item !== sourceId);
    propagate(nodes["N-Output"]);
    cubeVisible();
  }

  function cubeVisible() {
    hidden = !nodes[CUBE_INDEX].connected;
  }

  function propagate(node: BlixNodeData) {
    if (node.id === "N-Output") node.connected = true;
    if (node.connected) {
      for (let i = 0; i < node.connections.inputs.length; i++) {
        const sourceNode = nodes[node.connections.inputs[i]];
        sourceNode.connected = true;
        propagate(sourceNode);
      }
    }
    nodes = { ...nodes };
  }

  onMount(async () => {
    await tick();
    ConnectEdges();
  });

  function ConnectEdges() {
    if (connectAnchorIds) {
      connectAnchorIds(
        nodes["N-Rotation"].id,
        `A-${nodes["N-Rotation"].output.id}`,
        nodes["N-Output"].id,
        `A-${nodes["N-Output"].inputs[0].id}`
      );
      nodes["N-Rotation"].connections.outputs.push("N-Output");
      nodes["N-Output"].connections.inputs.push("N-Rotation");
      connectAnchorIds(
        nodes["N-Translation"].id,
        `A-${nodes["N-Translation"].output.id}`,
        nodes["N-Rotation"].id,
        `A-${nodes["N-Rotation"].inputs[0].id}`
      );
      nodes["N-Translation"].connections.outputs.push("N-Rotation");
      nodes["N-Rotation"].connections.inputs.push("N-Translation");
      connectAnchorIds(
        nodes["N-Color"].id,
        `A-${nodes["N-Color"].output.id}`,
        nodes["N-Translation"].id,
        `A-${nodes["N-Translation"].inputs[0].id}`
      );
      nodes["N-Color"].connections.outputs.push("N-Translation");
      nodes["N-Translation"].connections.inputs.push("N-Color");
      connectAnchorIds(
        nodes["N-Cube"].id,
        `A-${nodes["N-Cube"].output.id}`,
        nodes["N-Color"].id,
        `A-${nodes["N-Color"].inputs[0].id}`
      );
      nodes["N-Cube"].connections.outputs.push("N-Color");
      nodes["N-Color"].connections.inputs.push("N-Cube");
    }
    propagate(nodes["N-Output"]);
    cubeVisible();
  }
</script>

<Svelvet
  id="mainGraph"
  zoom={0.6}
  minimap
  theme="custom-dark"
  bind:graph={graphData}
  width={800}
  height={600}
  on:connection={edgeConnected}
  on:disconnection={edgeDisconnected}
  bind:connectAnchorIds
  on:leftClick={ConnectEdges}
>
  <!-- on:rightClick="{handleRightClick}" -->
  <!-- on:connection="{edgeConnected}" -->
  <!-- on:disconnection="{edgeDisconnected}" -->
  <!-- bind:connectAnchorIds="{connectAnchorIds}" -->
  <!-- bind:clearAllGraphEdges="{clearAllGraphEdges}" -->
  <!-- dataTypeChecker="{dataTypeChecker}" -->

  {#each Object.values(nodes) as node, i (node.displayName)}
    <BlixNode
      id={node.id}
      parent={node.type}
      displayName={node.displayName}
      inputsData={node.inputs}
      outputData={node.output}
      uisData={node.uis}
      bind:box
      bind:connected={node.connected}
      position={node.position}
      connections={node.connections}
    />
  {/each}
  <!-- <Node>
        <Slider
            label="Size"
            min={10}
            max={100}
            step={1}
            bgColor="#11111b"
            barColor="#f43e5c"
            bind:parameterStore={slider}
        />
    </Node>
     -->
  <!-- <Background bgColor="#11111b" /> -->
</Svelvet>

<style lang="scss">
  :root[svelvet-theme="custom-dark"] {
    --background-color: #181825;
    --dot-color: hsl(225, 10%, 50%);

    --minimap-background-color: #52525b;

    --minimap-node-color: hsl(225, 30%, 20%);

    --controls-background-color: hsl(225, 20%, 27%);
    --controls-text-color: hsl(0, 0%, 100%);

    --theme-toggle-text-color: hsl(0, 0%, 100%);
    --theme-toggle-color: hsl(225, 20%, 27%);
  }
</style>
