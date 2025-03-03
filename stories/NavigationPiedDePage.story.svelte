<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import NavigationPiedDePage from '$lib/NavigationPiedDePage.svelte';

	export let Hst: Hst

	let conformiteAccessibilite = 'nonConforme';
	const source = `<NavigationPiedDePage {conformiteAccessibilite} />`;
</script>

<Hst.Story {source} title="Pied de page/Navigation" icon="material-symbols:assistant-navigation">
	<NavigationPiedDePage {conformiteAccessibilite} />

	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={conformiteAccessibilite}
			title="Conformité d'accessibilité"
			options={{conforme: 'Conforme', nonConforme: 'Non conforme'}}
		/>
	</svelte:fragment>
</Hst.Story>
