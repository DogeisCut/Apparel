<script>
	let { tool } = $props();
</script>

<fieldset>
	<legend>Paint only:</legend>
	<input
		type="radio"
		name="paint-only"
		id="paint-only-all"
		value="all"
		bind:group={tool.paintOnly}
	/><label for="paint-only-all">All</label>
	<input
		type="radio"
		name="paint-only"
		id="paint-only-fill"
		value="fill"
		bind:group={tool.paintOnly}
	/><label for="paint-only-fill">Fill</label>
	<input
		type="radio"
		name="paint-only"
		id="paint-only-stroke"
		value="stroke"
		bind:group={tool.paintOnly}
	/><label for="paint-only-stroke">Stroke</label>
	<input
		type="radio"
		name="paint-only"
		id="paint-only-auto"
		value="auto"
		bind:group={tool.paintOnly}
	/><label for="paint-only-auto">Auto</label>
</fieldset>
<span class="sep"></span>
<fieldset>
	<legend>Paint with:</legend>
	<input
		type="radio"
		name="paint-with"
		id="paint-with-fill"
		value="fill"
		bind:group={tool.paintWith}
	/><label for="paint-with-fill">Fill</label>
	<input
		type="radio"
		name="paint-with"
		id="paint-with-stroke"
		value="stroke"
		bind:group={tool.paintWith}
	/><label for="paint-with-stroke">Stroke</label>
</fieldset>
<span class="sep"></span>
<input
	type="checkbox"
	id="paint-shape-style"
	value="shape"
	bind:checked={tool.fillShapeStyle}
/><label for="paint-shape-style">Apply Shape Styles</label>

<style>
	fieldset {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		padding: 0;
		font-size: 12px;
		font-weight: 500;
		color: var(--text-muted);
	}

	input {
		margin: 0;
		accent-color: var(--toolbar);
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		font-weight: 500;
		color: var(--text-strong);
		white-space: nowrap;
	}

	.sep {
		width: 1px;
		height: 24px;
		background: var(--surface-border);
	}
</style>
