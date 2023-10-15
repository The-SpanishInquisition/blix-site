<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { Edges, Grid, OrbitControls, RoundedBoxGeometry, SoftShadows, Text, TransformControls, interactivity } from '@threlte/extras'
  import BlixLogo from './BlixLogo.svelte';
  import { AmbientLight, MeshPhongMaterial, MeshToonMaterial } from 'three';
  import BlixBox from './BlixBox.svelte';

  type Pair = [number, number];
  type Triple = [number, number, number];

  const boxes: { pos: Pair, rot: Triple, dim: number, col: string, blixBox?: boolean }[] = [
    { pos: [-1, 1], rot: [0, 32, 0], dim: 2.5, col: "#f43e5c", blixBox: true },
    { pos: [-4, -1], rot: [0, 0, 0], dim: 2.2, col: "#89dceb" },
    { pos: [-2, -4], rot: [0, 0, 0], dim: 2, col: "#a6e3a1" },
    { pos: [3, -3], rot: [0, 0, 0], dim: 1, col: "#f9e2af"},
    { pos: [-3, 4], rot: [0, 0, 0], dim: 0.8, col: "#89dceb" },
    { pos: [3, 3], rot: [0, 0, 0], dim: 0.4, col: "#cba6f7" },
    { pos: [5, -2], rot: [0, 45, 0], dim: 1.5, col: "#a6e3a1" },
    { pos: [-1, 6], rot: [0, 15, 0], dim: 0.6, col: "#cba6f7" },
    { pos: [6, 2], rot: [0, 60, 0], dim: 1.8, col: "#f9e2af" },
    { pos: [1, -2], rot: [0, 16, 0], dim: 1, col: "#89dceb" },
    { pos: [2, -5], rot: [0, 50, 0], dim: 2.2, col: "#cba6f7" },
    { pos: [-4, 4], rot: [0, 35, 0], dim: 1.2, col: "#f9e2af" },
    { pos: [4, 3], rot: [0, 40, 0], dim: 0.8, col: "#a6e3a1" },
    { pos: [-4, 2], rot: [0, 23, 0], dim: 1.6, col: "#cba6f7" },
    { pos: [1, 4], rot: [0, 55, 0], dim: 0.9, col: "#f9e2af" }
  ];

  interactivity();

  useFrame((state, delta) => {
    // rotation += rotSpeed * delta;
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
<OrbitControls enableDamping autoRotate autoRotateSpeed={0.4} />
</T.PerspectiveCamera>

<!-- <T.PointLight position={[0, 0, 0]} castShadow args={["white", 10]} /> -->
<T.PointLight position={[0, 3, 0]} castShadow args={["white", 20, 10]} />
<T.PointLight position={[-5, 3, 5]} args={["pink", 20, 10]} />
<T.PointLight position={[5, 3, -5]} args={["cyan", 20, 10]} />
<T.DirectionalLight position={[-4, 10, -4]} direction={[0, 0, 0]} castShadow args={["white", 0.2]} />
<T.AmbientLight args={["white", 0.5]} />

<!-- Subject -->
<T.Mesh position={[0, 1, -10]} >
  <T.Mesh position={[0, 1.5, 0]}>
    <BlixLogo />
  </T.Mesh>
  <Text text="The everything editor" color="white" fontSize={0.5} anchorX="50%" anchorY="100%" />
</T.Mesh>

{#each boxes as box, i}
<T.Mesh position={[box.pos[0], 0.5*box.dim-1, box.pos[1]]} rotation={box.rot} castShadow receiveShadow>
  {#if box?.blixBox}
    <BlixBox dim={box.dim} position={box.pos} rotation={box.rot} />
  {/if}
    <RoundedBoxGeometry args={[box.dim, box.dim, box.dim]} radius={box.dim * 0.1} />
    <T.MeshStandardMaterial color={box.col} />
    <!-- <Text text="{i}" color="white" fontSize={0.5} anchorX="50%" anchorY="100%" position.y={4.5} /> -->
</T.Mesh>
{/each}

<!-- <TransformControls translationSnap={0} mode="translate" > -->
<!-- </TransformControls> -->

<Grid
  position={[0, -1, 0]}
  plane="xz"
  cellColor="#45475a"
  sectionColor="#f43e5c"
  type="polar"
  cellThickness={-2}
  sectionThickness={-1}
/>

<!-- Platter -->
<T.Mesh rotation.x={-Math.PI/2} position.y={-1.01} receiveShadow>
  <T.CircleGeometry args={[8, 40]}/>
  <T.MeshStandardMaterial color="white" />
</T.Mesh>