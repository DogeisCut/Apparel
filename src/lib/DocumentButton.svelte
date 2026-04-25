<script>
	let { document, active = false, onSelect } = $props();
</script>

<div class:active class="doc">
	<button class="tbtn" type="button" onclick={() => onSelect(document)}>
		<div class="thumb" aria-hidden="true"></div>
	</button>
	<div class="name">
		<input aria-label="Document name" bind:value={document.name} />
		{#if active}
			<span aria-hidden="true">*</span>
		{/if}
	</div>
</div>

<style>
	.doc {
		width: 127px;
		padding: 0;
		border: 1px solid #d9e3f2;
		border-radius: 4px;
		background: #ffffff;
		color: #24324a;
		text-align: center;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(20, 37, 63, 0.08);
	}

	.doc:hover {
		border-color: #c9dafc;
		background: #f5f8ff;
	}

	.doc.active {
		border-color: #3373cc;
		box-shadow: 0 0 0 3px rgba(76, 151, 255, 0.18);
	}

	.tbtn {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	.thumb {
		height: 110px;
		border-bottom: 1px solid #d9e3f2;
		background: #ffffff;
	}

	.name {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3px;
		min-height: 42px;
		padding: 8px;
		font-size: 13px;
		font-weight: 500;
	}

	input {
		min-width: 0;
		width: 100%;
		border: 1px solid transparent;
		border-radius: 4px;
		background: transparent;
		color: inherit;
		text-align: center;
		font: inherit;
	}

	input:focus {
		outline: none;
		border-color: #4c97ff;
		background: #ffffff;
		box-shadow: 0 0 0 3px rgba(76, 151, 255, 0.18);
	}

	.name span {
		flex: 0 0 auto;
	}
</style>
