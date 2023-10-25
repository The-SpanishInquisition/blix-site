<script lang="ts">
  import { ColorPicker, Slider } from "blix_svelvet";
  import type { BlixUIInputData } from "./types";
  import { writable } from "svelte/store";
  import type { Pair, Triple } from "./types";
  export let ui: BlixUIInputData;

  export let value = writable<any>(0);
  export let Userbox : {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean};
  export let connected = false;

$: $value && handle();



function handle()
{
    console.log(connected);
    if(!connected) return;

    if(ui.component=="colorPicker"){
        Userbox.col = $value;
    }
    else if(ui.component=="slider"){
        Userbox.rot[1] = $value;   
        console.log($value);
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
        <Slider parameterStore={value} />
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