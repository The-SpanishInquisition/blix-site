<script lang="ts">
  import Home from "./lib/Home.svelte";

  // Skeleton theme
  // import '@skeletonlabs/skeleton/themes/theme-crimson.css';
  // Custom Skeleton theme
  import './themes/blix.postcss'

  // Skeleton required styles
  import '@skeletonlabs/skeleton/styles/skeleton.css';
  // Application's global stylesheet;
  import './app.postcss';

</script>

<main>
  <Home />
</main>

<style>
</style>
