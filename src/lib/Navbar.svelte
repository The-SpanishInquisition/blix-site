<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    const openGithub = () => {
        window.open("https://github.com/COS301-SE-2023/AI-Photo-Editor", "_blank");
    };

</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
        <img src="src/assets/blix.svg" alt="Blix logo" class="logo"/>
    </svelte:fragment>
    Page under construction. Coming soon!
	<svelte:fragment slot="trail">
        <button class="btn btn-primary" on:click={openGithub}>GitHub</button>
    </svelte:fragment>
</AppBar>

<style>
    .logo {
        width: 3em;
    }
</style>