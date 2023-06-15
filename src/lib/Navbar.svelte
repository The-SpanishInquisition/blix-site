<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    const openGithub = () => {
        window.open("https://github.com/COS301-SE-2023/AI-Photo-Editor", "_blank");
    };

    const getHelp = () => {
        window.open("https://youtu.be/dQw4w9WgXcQ", "_blank")
    }

</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
        <img src="src/assets/blix.svg" alt="Blix logo" class="logo"/>
    </svelte:fragment>
    Choose wisely ->
	<svelte:fragment slot="trail">
        <button class="btn btn-primary" on:click={getHelp}>
            <img src="src/assets/github.svg" alt="Get Help" class="logo"/>
        </button>
        <button class="btn btn-primary" on:click={openGithub}>
            <img src="src/assets/github.svg" alt="Github logo" class="logo"/>
        </button>
    </svelte:fragment>
</AppBar>

<style>
    .logo {
        width: 3em;
    }
</style>