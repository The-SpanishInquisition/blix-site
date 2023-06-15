<script>
    import { Node, Svelvet, Minimap, Controls } from 'svelvet';
</script>


<Svelvet id="my-canvas" width={500} height={500} zoom="{0.7}" minimap theme="custom-dark">
	
</Svelvet>

<style>
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