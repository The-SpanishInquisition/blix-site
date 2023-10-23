<script lang="ts">
  import { Svelvet } from "blix_svelvet";
  import BlixNode from "./BlixNode.svelte";
  import type { BlixNodeData } from "./types";

  let graphData: any;

  const nodes: BlixNodeData[] = [
    {
      displayName: "Animate",
      inputs: [
        { id: "cube", displayName: "Cube", type: "cube" }
      ],
      output: { id: "scene", displayName: "Scene", type: "scene" },
      uis: [
        { id: "speed", displayName: "Speed", component: "slider" }
      ]
    },
    {
      displayName: "Add Cube",
      inputs: [],
      output: { id: "cube", displayName: "Cube", type: "cube" },
      uis: []
    },
    { displayName: "Set Color",
      inputs: [
        { id: "cubeIn", displayName: "Cube", type: "cube" }
      ],
      output: { id: "cubeOut", displayName: "Cube", type: "cube" },
      uis: [
        { id: "color", displayName: "Color", component: "colorPicker" }
      ]
    },
    {
      displayName: "Output",
      inputs: [
        { id: "scene", displayName: "Scene", type: "scene" }
      ],
      uis: []
    }
  ];
</script>
<Svelvet
    id="mainGraph"
    zoom="{0.6}"
    minimap
    theme="custom-dark"

    bind:graph="{graphData}"

    width={800}
    height={600}
>
    <!-- on:rightClick="{handleRightClick}" -->
    <!-- on:connection="{edgeConnected}" -->
    <!-- on:disconnection="{edgeDisconnected}" -->
    <!-- bind:connectAnchorIds="{connectAnchorIds}" -->
    <!-- bind:clearAllGraphEdges="{clearAllGraphEdges}" -->
    <!-- dataTypeChecker="{dataTypeChecker}" -->

    {#each nodes as node}
        <BlixNode displayName={node.displayName} inputsData={node.inputs} outputData={node.output} uisData={node.uis} />
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