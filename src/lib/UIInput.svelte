<script lang="ts">
  import { ColorPicker, Slider } from "blix_svelvet";
  import type { BlixUIInputData } from "./types";
  import { writable } from "svelte/store";

  export let ui: BlixUIInputData;

  export let value = writable<any>(0);

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