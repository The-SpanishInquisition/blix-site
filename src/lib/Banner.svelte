<script lang="ts">
  import { Canvas, type Size } from "@threlte/core";
  import BannerScene from "./BannerScene.svelte";
  import Graph from "./Graph.svelte";
  import type { Pair, Triple } from "./types";

  const canvasSize: Size = {
    width: 800,
    height: 600,
  };

  let UserBox : {pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean} = {
  pos : [3,1],
  rot : [0, 45, 0],
  dim : 1.7,
  col : "#f43e5c"
};

let hidden = true;
</script>

<div class="banner">
  <div class="tile scene">
    <Canvas size={canvasSize} >
      <BannerScene bind:UserBox={UserBox} bind:hidden={hidden}/>
    </Canvas>
  </div>
  <div class="tile graph">
    <Graph bind:box={UserBox} bind:hidden={hidden}/>
  </div>
</div>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    /* flex-direction: column; */
    width: 100%;
    padding: 2em 1em;
  }

  .tile {
    border: 4px solid #1e1e2e;
    border-radius: 1em;
    overflow: hidden;
  }

  .graph {
    margin-left: 1em;
  }
</style>