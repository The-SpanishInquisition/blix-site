<script lang="ts">
  import { Canvas, type Size } from "@threlte/core";
  import BannerScene from "./BannerScene.svelte";
  import Graph from "./Graph.svelte";

  const canvasSize: Size = {
    width: 800,
    height: 600,
  };
</script>

<div class="banner">
  <div class="tile scene">
    <Canvas size={canvasSize} >
      <BannerScene />
    </Canvas>
  </div>
  <div class="tile graph">
    <Graph />
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