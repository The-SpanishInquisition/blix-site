<script lang="ts">
  import { Anchor, DefaultAnchor, Node, type CSSColorString } from "blix_svelvet";
  import { createEventDispatcher } from "svelte";
  import type { BlixAnchorData } from "./types";

  const dispatch = createEventDispatcher();

  export let displayName = "Blix Node";
  export let inputs: BlixAnchorData[];
  export let outputs: BlixAnchorData[];

  const nodeId = `Node${Math.floor(Math.random() * 10000)}`;

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

</script>

<Node
    bgColor="#262630"
    textColor="#ffffff"
    id={nodeId}
    borderColor="transparent"
    borderWidth="1px"
    borderRadius="{10}"
    selectionColor="#f43e5c"
    on:selected="{() => console.log('selected')}"
>
    <!-- on:nodeClickReleased="{nodeClicked}" -->
    <!-- on:nodeDragReleased="{nodeDragReleased}" -->
<div class="node">
    <div class="header">
    <h1>{displayName}</h1>
    </div>
    <div class="node-body" style="max-width: 400px">
    <!-- <NodeUiFragment
        inputStore="{node.inputUIValues}"
        ui="{$toolboxNode?.ui}"
        uiConfigs="{$toolboxNode?.uiConfigs}"
        on:inputInteraction="{handleInputInteraction}"
    /> -->
    </div>

    <div class="anchors inputs">
        {#each inputs as input}
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
                class="{'outlineText'}"
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
        {#each outputs as output}
        {@const color = stringToColor(output.type)}
        <Anchor
            output
            dataType="{output.type || ''}"
            bgColor="{color}"
            id="{output.id}"
            direction="east"
            on:connection="{() => dispatch('connection', { output })}"
            on:disconnection="{() => dispatch('disconnection', { output })}"
            let:connecting
            let:hovering
        >
            {#if hovering}
            {@const typeCol = "lightblue"}
            <div class="anchorTooltip">
                {#if output.displayName}
                {output.displayName}<br />
                {/if}
                <!-- &lt;{output.type || "any"}&gt; -->
                &lt;<span
                style:color="{typeCol}"
                >{output.type || "any"}</span
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
