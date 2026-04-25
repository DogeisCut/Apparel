<script>
    
    let { 
        /**
         * @type {Tool[] | Tool}
         */
        tools,
        /**
         * @type {boolean}
         */
        editorState,
    } = $props()

    let selected = $derived(
        Array.isArray(tools) ? tools.includes(editorState.selectedTool) : editorState.selectedTool === tools
    )

    // Needs to be handled as a tool group if its an array, otherwise act as a single tool button
    // May be worth seperating this into two seperate components and handling which buttons are groups on the DocumentEditor side
</script>

{#if Array.isArray(tools)}
<!--placeholder behavior-->
<button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
        //editorState.selectedTool = tools[0];
    }}
>
    <!--{tools[0].name}-->
</button>
{:else}
<button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
        editorState.selectedTool = tools;
    }}
>
    {tools.name}
</button>
{/if}

<style>
    button {
		min-height: 48px;
		padding: 6px;
		border-color: var(--surface-border);
		background: var(--surface-white);
		color: var(--text-strong);
		font-size: 12px;
		font-weight: 500;
	}

	button.active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
	}

	button:hover,

	.arrow {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 9px;
		height: 9px;
	}
</style>