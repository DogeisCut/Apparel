<script>
    import { Tool } from "./tools/Tool";

    /**
     * @type {{tools: Tool[], selectedTool: Tool?}}
     */
    let { tools, selectedTool = $bindable() } = $props()

    /**
     * @type {Tool?}
     */
    let tool = $derived(tools[0] ?? null);

    let selected = $derived(selectedTool ? tools.includes(selectedTool) : false)
</script>

<button
    type="button"
    class:active={selected}
    aria-pressed={selected}
    onclick={() => {
    }}
>
    {tool?.name ?? "Empty Group"}
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