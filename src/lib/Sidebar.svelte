<script>
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

	$: scrollPoint = window.location.href;
</script>

<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">Docs</AppRailAnchor>
	</svelte:fragment>

	<AppRailAnchor name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 1</span>
	</AppRailAnchor>

	<AppRailAnchor name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 2</span>
	</AppRailAnchor>

	<AppRailAnchor name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 3</span>
	</AppRailAnchor>
</AppRail>