<script>
	let { tool, editorState } = $props()
</script>

{#each tool.getSelectedOutlineNodes() as node}
	{#if tool.usesBoundsOutline(node)}
		{@const bounds = tool.getNodeBounds(node)}
		{#if bounds}
			<rect
				class="outline selected"
				data-tool-overlay="true"
				pointer-events="none"
				x={bounds.x}
				y={bounds.y}
				width={bounds.width}
				height={bounds.height}
			/>
		{/if}
	{:else}
		<g
			class="outline selected shape-outline"
			data-tool-overlay="true"
			pointer-events="none"
			transform={tool.getSelectionTransform(node)}
		>
			{@html node.outerHTML}
		</g>
	{/if}
{/each}

<style>
	.outline {
		fill: none !important;
		stroke: var(--toolbar, #4c97ff);
		stroke-width: 2px;
		stroke-linecap: round;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	.shape-outline :global(*) {
		fill: none !important;
		stroke: var(--toolbar, #4c97ff) !important;
		stroke-width: 2px !important;
		vector-effect: non-scaling-stroke;
	}
</style>
