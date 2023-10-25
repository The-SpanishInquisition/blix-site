<script lang="ts">
  import { Anchor, DefaultAnchor, Node, type CSSColorString, ColorPicker, Slider } from "blix_svelvet";
  import { createEventDispatcher } from "svelte";
  import { generateInput, generateOutput } from 'blix_svelvet';
  import type { BlixAnchorData, BlixUIInputData } from "./types";
  import UiInput from "./UIInput.svelte";
  import type { Pair, Triple } from "./types";

  const dispatch = createEventDispatcher();

  export let id = 0;
  export let displayName = "Blix Node";
  export let inputsData: BlixAnchorData[] = [];
  export let outputData: BlixAnchorData = null;
  export let uisData: BlixUIInputData[] = [];
  export let box : {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean};
  export let connected = false;

  // const nodeId = `Node${Math.floor(Math.random() * 10000)}`;

//   function checkShowTextOutline(color: string) {
//     const readable = colord(color).isReadable();
//     return readable;
//   }

  function stringToColor(str: string): CSSColorString {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });

    let colour = "#";

    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }

    return colour as CSSColorString;
  }


  // Type your input structure
  type InputStructure = {
    value1: number;
    value2: number;
    option: CSSColorString;
  };

  // Create initial values for your parameters
  const initialData = {
    value1: 10,
    value2: 20,
    option: "red"
  };

  // inputsData.forEach((inp) => {
  //   initialData[inp.id] = 0;
  // });
  // initialData[outputData.id] = 0;
  // uisData.forEach((ui) => {
  //   initialData[ui.id] = 0;
  // });

  // Generate a formatted inputs store
  const inputs = generateInput(initialData as InputStructure);

  // Specify processor function
  const processor = (inps: InputStructure) => {
    if (inps.option === 'red') {
      return inps.value1 + inps.value2;
    }
    return 100;
  };

  // Generate output store
  const output = generateOutput(inputs, processor);

</script>

<!-- <Node width={400} height={200} useDefaults>
    <div class="node">
        <div class="radio-group">
            <ColorPicker
                parameterStore={$inputs.option}
            />
        </div>
        <div class="sliders">
            <Slider parameterStore={$inputs.value1} />
            <Slider parameterStore={$inputs.value2} />
        </div>
        <div class="input-anchors">
            {#each Object.entries($inputs) as [key, value] (key)}
                <Anchor {key} inputsStore={inputs} input />
            {/each}
        </div>
        <div class="output-anchors">
            <Anchor outputStore={output} output />
        </div>
    </div>
</Node> -->


<Node
    bgColor="#262630"
    textColor="#ffffff"
    id={id}
    borderColor="transparent"
    borderWidth="1px"
    borderRadius="{10}"
    selectionColor="#f43e5c"
    on:selected="{() => console.log('selected')}"
>
<div class="node">
    <div class="header">
    <h1>{displayName}</h1>
    </div>
    <div class="node-body" style="max-width: 400px">
      {#each uisData as ui}
        <UiInput {ui} bind:value={inputs[ui.id]} bind:Userbox={box} bind:connected={connected}/>
      {/each}
    </div>

    <div class="anchors inputs">
        {#each inputsData as input}
        {@const color = stringToColor(input.type)}
        <Anchor
            input
            dataType="{input.type || ''}"
            bgColor="{color}"
            id="{input.id}"
            direction="west"
            on:connection="{() => dispatch('connection', { input })}"
            on:disconnection="{() => dispatch('disconnection', { input })}"
            let:connecting
            let:hovering
        >
            {#if hovering}
            {@const typeCol = "pink"}
            <div class="anchorTooltip">
                {#if input.displayName}
                {input.displayName}<br />
                {/if}
                &lt;<span
                style:color="{typeCol}"
                >{input.type || "any"}</span
                >&gt;
            </div>
            {/if}
            <DefaultAnchor
            input="{true}"
            output="{false}"
            connecting="{connecting}"
            hovering="{false}"
            bgColor="{color}"
            connected="{false}"
            />
        </Anchor>
        {/each}
    </div>
    <div class="anchors outputs">
        {#if outputData}
        {@const color = stringToColor(outputData.type)}
        <Anchor
            output
            dataType="{outputData.type || ''}"
            bgColor="{color}"
            id="{outputData.id}"
            direction="east"
            on:connection="{() => dispatch('connection', { outputData })}"
            on:disconnection="{() => dispatch('disconnection', { outputData })}"
            let:connecting
            let:hovering
        >
            {#if hovering}
            {@const typeCol = "lightblue"}
            <div class="anchorTooltip">
                {#if outputData.displayName}
                {outputData.displayName}<br />
                {/if}
                &lt;<span
                style:color="{typeCol}"
                >{outputData.type || "any"}</span
                >&gt;
            </div>
            {/if}
            <DefaultAnchor
            input="{true}"
            output="{false}"
            connecting="{connecting}"
            hovering="{false}"
            bgColor="{color}"
            connected="{false}"
            />
        </Anchor>
        {/if}
    </div>
</div></Node>

<style>
  .node-body {
    border: 1px solid grey;
    padding: 1em;
  }

  .node {
    box-sizing: border-box;
    min-width: max-content;
    border-radius: 8px;
    height: fit-content;
    position: relative;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
  }

  .descriptionTooltip {
    display: block;
    position: absolute;
    background: #444444;
    color: white;
    border-radius: 2px;
    padding: 0.6em;
    bottom: 100%;
  }

  h1 {
    font-size: 0.9rem;
    font-weight: 200;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-color: inherit;
  }

  .anchors {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    z-index: 10;
  }
  .inputs {
    left: -24px;
    top: 40px;
  }
  .outputs {
    right: -24px;
    top: 40px;
  }

  .anchorTooltip {
    position: absolute;
    background: #444444;
    color: white;
    border-radius: 2px;
    padding: 0.2em;
    left: 110%;
    top: -3.5em;
  }
  .outlineText {
    background-color: lightgrey;
    border-radius: 0.25em;
    padding: 0.1em;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    border-bottom: solid 1px;
    border-color: lightgray;
    font-family: "Courier New", Courier, monospace;
  }
</style>
