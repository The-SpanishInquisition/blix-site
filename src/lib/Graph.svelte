<script lang="ts">
  import BlixNode from "./BlixNode.svelte";
  import type { BlixNodeData } from "./types";
  import type { Pair, Triple } from "./types";
  import { Svelvet, type NodeKey, type AnchorKey } from "blix_svelvet";
  import {onMount} from 'svelte';

  let graphData: any;
  export let box :  {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean};
  export let hidden = true;


  let connectAnchorIds: (
    sourceNode: NodeKey,
    sourceAnchor: AnchorKey,
    targetNode: NodeKey,
    targetAnchor: AnchorKey
  ) => any;

  let nodes:{[id : string] :  BlixNodeData} = {
    "N-Output" : {
      id : `N-Output`,
      type : "output",
      displayName: "Output",
      inputs: [
        { id: `A-Output-I`, displayName: "Scene", type: "scene" }
      ],
      uis: [],
      connections : {
        from : [],
        to : []
      },
      connected : true,
      posistion : {
        x : 800,
        y : 0
      }
    },
    "N-Rotate" : {
      id : `N-Rotate`,
      type : "rotate",
      displayName: "Rotate",
      inputs: [
        { id: `A-Rotate-I`, displayName: "Cube", type: "cube" }
      ],
      output: { id: `A-Rotate-O`, displayName: "Scene", type: "scene" },
      uis: [
        {id: "x-rotate", displayName: "X", component: "slider" },
        {id : "y-rotate",displayName : "Y", component : "slider"},
        {id : "z-rotate",displayName : "Z", component : "slider"},
      ],
      connections : {
        from : [],
        to : []
      },
      posistion : {
        x : 375,
        y : 0
      },
    },
    "N-Cube" :{
      id : `N-Cube`,
      type : "add cube",
      displayName: "Add Cube",
      inputs: [],
      output: { id: "A-Add-Cube-O", displayName: "Cube", type: "cube" },
      uis: [],
      connections : {
        from : [],
        to : []
      },
      posistion : {
        x : -200,
        y : 200
      }
    },
    "N-Color" : { 
      id : `N-Color`,
      type : "color",
      displayName: "Color",
      inputs: [
        { id: `A-Color-I`, displayName: "Cube", type: "cube" }
      ],
      output: { id: "A-Color-O", displayName: "Cube", type: "cube" },
      uis: [
        { id: "color", displayName: "Color", component: "colorPicker" }
      ],
      connections : {
        from : [],
        to : []
      },
      posistion : {
        x : 0,
        y : 250
      }
    },
    "N-Position" : {
      id : `N-Position`,
      type : "position",
      displayName: "Position",
      inputs: [
        { id: "A-Position-I", displayName: "Cube", type: "cube" }
      ],
      output: { id: "A-Position-O", displayName: "Cube", type: "cube" },
      uis: [
        {id: "x-rotate", displayName: "X", component: "slider" },
        {id : "y-rotate",displayName : "Y", component : "slider"},
      ],
      connections : {
        from : [],
        to : []
      },
      posistion : {
        x : 0,
        y : 0
      }
    }
  };

  const CUBE_INDEX = "N-Cube";


  async function edgeConnected(e: CustomEvent<any>) {
    // console.log("CONNECTION EVENT");
    const sourceId = e.detail.sourceNode.id;
    const targetId = e.detail.targetNode.id;

    nodes[sourceId].connections.to.push(targetId);
    nodes[targetId].connections.from.push(sourceId);

    propagate(nodes["N-Output"]);
    cubeVisible();
    console.log(nodes);

  }

  async function edgeDisconnected(e : CustomEvent<any>){
    // console.log("DISCONNECTION EVENT");
    
    const sourceId = e.detail.sourceNode.id;
    const targetId = e.detail.targetNode.id;


    for(const node of Object.values(nodes)){
      node.connected = false;
    }

    nodes[sourceId].connections.to = nodes[sourceId].connections.to.filter(item => item !== targetId)
    nodes[targetId].connections.from = nodes[targetId].connections.from.filter(item => item !== sourceId)
    propagate(nodes["N-Output"]);
    cubeVisible();
    console.log(nodes);
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



  onMount(() => {

    if(connectAnchorIds){
      // console.log(nodes["N-Rotate"].id)
      // console.log(nodes["N-Rotate"].output.id)
      // console.log(nodes["N-Output"].id)
      // console.log(nodes["N-Output"].inputs[0].id)
     console.log(connectAnchorIds(nodes["N-Rotate"].id,nodes["N-Rotate"].output.id,nodes["N-Output"].id,nodes["N-Output"].inputs[0].id));
      // connectAnchorIds(nodes["pos"].id,nodes["pos"].output.id,nodes["rot"].id,nodes["rot"].inputs[0].id);
      // connectAnchorIds(nodes["col"].id,nodes["col"].output.id,nodes["pos"].id,nodes["pos"].inputs[0].id);
      // connectAnchorIds(nodes["cub"].id,nodes["cub"].output.id,nodes["col"].id,nodes["col"].inputs[0].id);
    }
    else
    console.log("AMOGUS")

  }); 


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
    bind:connectAnchorIds="{connectAnchorIds}"

>
    <!-- on:rightClick="{handleRightClick}" -->
    <!-- on:connection="{edgeConnected}" -->
    <!-- on:disconnection="{edgeDisconnected}" -->
    <!-- bind:connectAnchorIds="{connectAnchorIds}" -->
    <!-- bind:clearAllGraphEdges="{clearAllGraphEdges}" -->
    <!-- dataTypeChecker="{dataTypeChecker}" -->

    {#each Object.values(nodes) as node,i (node.displayName)}
        <BlixNode 
         id={node.id}
         parent={node.type}
         displayName={node.displayName}
         inputsData={node.inputs}
         outputData={node.output} 
         uisData={node.uis} 
         bind:box={box} 
         bind:connected={node.connected}
         posistion={node.posistion}
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