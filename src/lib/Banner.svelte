<script lang="ts">
  import { Canvas, type Size } from "@threlte/core";
  import BannerScene from "./BannerScene.svelte";
  import { Background, Node, Svelvet } from "svelvet";

  const canvasSize: Size = {
    width: 800,
    height: 600,
  };
</script>

<div class="banner">
  <div class="scene">
    <Canvas size={canvasSize} >
      <BannerScene />
    </Canvas>
  </div>
  <div class="graph">
    <Svelvet
      width={800}
      height={600}
      theme="dark"
      minimap
      snapTo={10}
    >
      <Node />
      <Node />
      <Background bgColor="#11111b" />
    </Svelvet>
  </div>
</div>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
    width: 100%;
  }

  .graph {
    margin-top: 0.4em;
    border: 4px solid #1e1e2e;
    border-radius: 1em;
    overflow: hidden;
  }
</style>