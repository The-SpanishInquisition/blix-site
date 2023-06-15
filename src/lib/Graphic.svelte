<script lang="ts">
	import type { Mesh } from '@threlte/core';
	import * as Threlte from '@threlte/core'
	import * as Three from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import * as Utils from 'three/src/math/MathUtils'
</script>


<Threlte.Canvas>

	<Threlte.PerspectiveCamera
		position={{x: 10, y:10, z:30}}
		fov={50}
	>
	<Threlte.OrbitControls />
	</Threlte.PerspectiveCamera>

	<Threlte.AmbientLight intensity={0.2} />

	<Threlte.DirectionalLight color="white" intensity={2} position={{x:10, y:20}}/>

	<Threlte.Mesh 
	geometry={ new Three.SphereGeometry(4, 64, 64) }
	material={ new Three.MeshStandardMaterial({ color: 0xFF0000, roughness: 0.5, metalness: 0.5 })}
	position={{y:4}}
	/>


	<Threlte.Mesh 
	   geometry={ new Three.PlaneGeometry(20,20)}
	   material={new Three.MeshBasicMaterial({ color: 'white', side: Three.DoubleSide })}
	   rotation={{x: Utils.DEG2RAD * 90}}/>
</Threlte.Canvas>
