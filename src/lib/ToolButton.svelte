<script>
    
    let { 
        /**
         * @type {Tool}
         */
        tool,
        /**
         * @type {boolean}
         */
        editorState = $bindable(),
    } = $props()
    $inspect(editorState.selectedTool, tool);

    let selected = $derived(editorState.selectedTool === tool)
</script>

<button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
        editorState.selectedTool = tool;
    }}
>
    {tool.name}
</button>

<style>
    button {
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.14);
		color: white;
		font: inherit;
		font-size: 13px;
		cursor: pointer;

        min-height: 48px;
		padding: 6px;
		border-color: var(--surface-border);
		background: var(--surface-white);
		color: var(--text-strong);
		font-size: 12px;
		font-weight: 500;
	}

    .active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
	}
</style>