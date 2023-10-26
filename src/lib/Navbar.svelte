<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";

  const openGithub = () => {
    window.open("https://github.com/COS301-SE-2023/AI-Photo-Editor", "_blank");
  };

  const openReleases = () => {
    window.open(
      "https://github.com/COS301-SE-2023/AI-Photo-Editor/releases/latest",
      "_blank"
    );
  };
</script>

<AppBar
  gridColumns="grid-cols-3"
  slotDefault="place-self-center"
  slotTrail="place-content-end"
  border="border-b-2 border-highlight"
>
  <svelte:fragment slot="lead">
    <img src="blix.svg" alt="Blix logo" class="logo" />
  </svelte:fragment>
  <!-- Page under construction. Coming soon! -->
  <svelte:fragment slot="trail">
    <button class="btn btn-primary" on:click={openReleases}>
      <img src="releases.svg" alt="" />
      Releases
      <!-- <img src="releases.svg" alt="" /> -->
    </button>
    <button class="btn btn-primary" on:click={openGithub}>
      <img src="github.svg" alt="Github" />
    </button>
  </svelte:fragment>
</AppBar>

<style>
  .logo {
    width: 3em;
  }
</style>
