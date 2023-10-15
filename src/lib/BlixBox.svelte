<script lang="ts">
  import { T } from '@threlte/core'
  import BlixLogo from './BlixLogo.svelte';

  export let position = [0, 0, 0];
  export let rotation = [0, 0, 0];
  export let dim = 2.5;

</script>

{#each { length: 4 } as _, i}
    {@const halfDim = dim/2 + 0.06}
    {@const pos = [ i == 1 ? halfDim : i == 3 ? -halfDim : 0, 0, i == 0 ? halfDim : i == 2 ? -halfDim : 0]}}
    {@const rot = [ 0, i * Math.PI/2, 0 ]}}
    <T.Mesh position={pos} rotation={rot} scale={0.4} >
        <BlixLogo />
    </T.Mesh>
{/each}