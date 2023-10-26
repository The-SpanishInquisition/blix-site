<script>
  import { Group } from 'three'
  import { T, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  export const ref = new Group()

  const gltf = useGltf('blix.gltf')

  const component = forwardEventHandlers()
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh geometry={gltf.nodes.Plane.geometry}>
      <T.MeshStandardMaterial color="white" />
    </T.Mesh>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
