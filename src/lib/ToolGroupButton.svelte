<script>
    
    let { 
        /**
         * @type {Tool[]}
         */
        tools,
        /**
         * @type {boolean}
         */
        editorState = $bindable(),
    } = $props()

    let selected = $derived(tools.includes(editorState.selectedTool))
</script>

<!-- <button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
        editorState.selectedTool = tool;
    }}
>
    {tool.name}
</button> -->

<style>
    button {
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.14);
		color: white;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}
</style>