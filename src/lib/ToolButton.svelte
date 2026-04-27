<script>
    import { Tool } from "./tools/Tool.svelte";
	import ToolLabel from "./ToolLabel.svelte";
    
    /**
     * @type {{tool: Tool, selectedTool: Tool?}}
     */
    let { tool, selectedTool = $bindable() } = $props()

    let selected = $derived(selectedTool === tool)
</script>

<button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
        selectedTool = tool;
    }}
>
	<ToolLabel text={tool.name}></ToolLabel>
</button>

<style>
    button {
		display: grid;
		place-items: center;
		box-sizing: border-box;
		flex: 0 0 auto;
		width: 56px;
		height: 48px;
		min-height: 48px;
		padding: 6px;
		border: 1px solid var(--surface-border);
		border-radius: 4px;
		background: var(--surface-white);
		color: var(--text-strong);
		font: inherit;
		font-size: 12px;
		font-weight: 500;
		line-height: 1.15;
		text-align: center;
		cursor: pointer;
	}

    .active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
	}
</style>
