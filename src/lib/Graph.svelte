<script lang="ts">
  import { Svelvet } from "blix_svelvet";
  import BlixNode from "./BlixNode.svelte";
  import type { BlixNodeData } from "./types";
  import type { Pair, Triple } from "./types";

  let graphData: any;
  export let box :  {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean};
  export let hidden = true;

  let nodes:{[id : number] :  BlixNodeData} = {
    1 : {
      type : "Output",
      displayName: "Output",
      inputs: [
        { id: "scene", displayName: "Scene", type: "scene" }
      ],
      uis: [],
      connections : {
        from : [],
        to : []
      },
      connected : true
    },
    2 : {
      type : "Rotate",
      displayName: "Rotate",
      inputs: [
        { id: "cube", displayName: "Cube", type: "cube" }
      ],
      output: { id: "scene", displayName: "Scene", type: "scene" },
      uis: [
        {id: "x-rotate", displayName: "X", component: "slider" },
        {id : "y-rotate",displayName : "Y", component : "slider"},
        {id : "z-rotate",displayName : "Z", component : "slider"},
      ],
      connections : {
        from : [],
        to : []
      },
    },
    3 :{
      type : "Add Cube",
      displayName: "Add Cube",
      inputs: [],
      output: { id: "cube", displayName: "Cube", type: "cube" },
      uis: [],
      connections : {
        from : [],
        to : []
      },
    },
    4 : { 
      type : "Color",
      displayName: "Color",
      inputs: [
        { id: "cubeIn", displayName: "Cube", type: "cube" }
      ],
      output: { id: "cubeOut", displayName: "Cube", type: "cube" },
      uis: [
        { id: "color", displayName: "Color", component: "colorPicker" }
      ],
      connections : {
        from : [],
        to : []
      },
    },
    5 : {
      type : "Position",
      displayName: "Position",
      inputs: [
        { id: "cubeIn", displayName: "Cube", type: "cube" }
      ],
      output: { id: "cubeOut", displayName: "Cube", type: "cube" },
      uis: [
        {id: "x-rotate", displayName: "X", component: "slider" },
        {id : "y-rotate",displayName : "Y", component : "slider"},
      ],
      connections : {
        from : [],
        to : []
      },
    }


  };

  const CUBE_INDEX = 3;


  async function edgeConnected(e: CustomEvent<any>) {
    // console.log("CONNECTION EVENT");

    let parts = e.detail.sourceNode.id.split("-");
    const sourceId = parseInt(parts[1], 10);

    parts = e.detail.targetNode.id.split("-");
    const targetId = parseInt(parts[1], 10);

    nodes[sourceId].connections.to.push(targetId);
    nodes[targetId].connections.from.push(sourceId);

    propagate(nodes[1]);
    cubeVisible();
  }

  async function edgeDisconnected(e : CustomEvent<any>){
    // console.log("DISCONNECTION EVENT");
    
    let parts = e.detail.sourceNode.id.split("-");
    const sourceId = parseInt(parts[1], 10);

    parts = e.detail.targetNode.id.split("-");
    const targetId = parseInt(parts[1], 10);

    for(let i = 2;i<Object.keys(nodes).length+1;i++){
      nodes[i].connected = false;
    }



    nodes[sourceId].connections.to = nodes[sourceId].connections.to.filter(item => item !== targetId)
    nodes[targetId].connections.from = nodes[targetId].connections.from.filter(item => item !== sourceId)
    propagate(nodes[1]);
    cubeVisible();
  }

  function cubeVisible(){
    if(nodes[CUBE_INDEX].connected) hidden = false
     else hidden = true;
  }




  function propagate(node : BlixNodeData){
    if(node.connected){
      for(let i = 0; i < node.connections.from.length; i++){
        let sourceNode = nodes[node.connections.from[i]];
        // console.log(sourceNode);
        sourceNode.connected = true;
        propagate(sourceNode);
      }
    }
  nodes = {...nodes};
  }

  

</script>
<Svelvet


    id="mainGraph"
    zoom="{0.6}"
    minimap
    theme="custom-dark"

    bind:graph="{graphData}"

    width={800}
    height={600}

    on:connection="{edgeConnected}"
    on:disconnection="{edgeDisconnected}"

>
    <!-- on:rightClick="{handleRightClick}" -->
    <!-- on:connection="{edgeConnected}" -->
    <!-- on:disconnection="{edgeDisconnected}" -->
    <!-- bind:connectAnchorIds="{connectAnchorIds}" -->
    <!-- bind:clearAllGraphEdges="{clearAllGraphEdges}" -->
    <!-- dataTypeChecker="{dataTypeChecker}" -->

    {#each Object.values(nodes) as node,i (node.displayName)}
        <BlixNode 
         parent={node.type}
         displayName={node.displayName}
         inputsData={node.inputs}
         outputData={node.output} 
         uisData={node.uis} 
         bind:box={box} 
         bind:connected={node.connected} />
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