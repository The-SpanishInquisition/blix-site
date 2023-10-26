<script lang="ts">
  import { ColorPicker, Slider } from "blix_svelvet";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { BlixUIInputData, NodeType, Pair, Triple } from "./types";
  export let ui: BlixUIInputData;

  export let value = writable<any>(0);
  export let Userbox: {
    pos: Pair;
    rot: Triple;
    dim: number;
    col: string;
    blixBox?: boolean;
  };
  export let connected = false;
  export let parent: NodeType = "translation";
  const defaultColour = "#f43e5c";
  const defaultRotation: Triple = [0, 45, 0];
  const defaultDim = 2.5;
  const startingPosition = [-1, 1]; // shhhhhhhhhhhhhhhhhhhh nothing to see here

  onMount(() => {
    // Defaults
    if (ui.component === "colorPicker") Userbox.col = defaultColour;
    else if (parent === "rotation") Userbox.rot = defaultRotation;
  });

  $: handle(), $value, connected;

  $: if (!connected) {
    if (ui.component === "colorPicker") Userbox.col = defaultColour;
    else if (ui.component === "slider") {
      Userbox.rot = defaultRotation;
      Userbox.dim = defaultDim;
    }
  }

  function handle() {
    if (ui.component === "colorPicker") {
      Userbox.col = connected && $value !== 0 ? $value : defaultColour;
    } else if (ui.component === "slider") {
      if (connected) {
        if (parent === "rotation") {
          if (ui.id === "x-rotation") Userbox.rot[0] = $value;
          else if (ui.id === "y-rotation") Userbox.rot[1] = $value;
          else Userbox.rot[2] = $value;
        } else if (parent === "translation") {
          if (ui.id === "x-translation")
            Userbox.pos[0] = startingPosition[0] + $value;
          else if (ui.id === "y-translation")
            Userbox.pos[1] = startingPosition[1] + $value;
        }
      } else Userbox.rot = defaultRotation;
    }
  }
</script>

<!-- UI Input Label -->
<div class="label">
  {ui.displayName}
</div>
<!-- UI Input Component -->
<div class="component">
  {#if ui.component === "slider"}
    <Slider
      parameterStore={value}
      min={-3}
      max={3}
      step={0.1}
      bgColor={"#1F1F28"}
      barColor={"#f43e5c"}
    />
  {:else if ui.component === "colorPicker"}
    <ColorPicker parameterStore={value} />
  {/if}
</div>

<style>
  .label {
    padding-left: 0.4em;
  }

  .component {
    padding: 0.4em;
  }
</style>
