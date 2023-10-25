<script lang="ts">
  import { ColorPicker, Slider } from "blix_svelvet";
  import type { BlixUIInputData } from "./types";
  import { writable } from "svelte/store";
  import type { Pair, Triple } from "./types";
  export let ui: BlixUIInputData;

  export let value = writable<any>(0);
  export let Userbox : {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean};
  export let connected = false;

  const col = "#f43e5c";
  const rot : Triple = [0, 45, 0];


  $: if ($value) {
        handle();
    }

$: if(connected==false){
    if(ui.component=="colorPicker") Userbox.col = col;
    else if(ui.component=="slider") Userbox.rot = rot;
}

function handle()
{
    if(ui.component=="colorPicker"){
        if(connected) Userbox.col = $value;
        else Userbox.col = col;
    }
    else if(ui.component=="slider"){
        if(connected) Userbox.rot[1] = $value;  
        else Userbox.rot = rot; 
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