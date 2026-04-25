<script>
	import DocumentButton from "./DocumentButton.svelte";

	let { documents, activeDocument, onSelectDocument } = $props();
</script>

<aside class="docs" aria-label="Documents">
	{#each documents as document}
		<DocumentButton
			{document}
			active={document === activeDocument}
			onSelect={onSelectDocument}
		/>
	{/each}
</aside>

<style>
	.docs {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		min-width: 0;
		padding: 10px 10px;
		overflow: auto;
		border-right: 1px solid #d9e3f2;
		background: #f5f8ff;
	}
</style>
