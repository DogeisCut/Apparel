<script>
    import { Tool } from "./tools/Tool.svelte";
	import toolArrow from "$lib/assets/toolicons/toolArrow.svg";

    /**
     * @type {{tools: Tool[], selectedTool: Tool?}}
     */
    let { tools, selectedTool = $bindable() } = $props()

    /**
     * @type {Tool?}
     */
    let tool = $derived(tools[0] ?? null);

    let selected = $derived(selectedTool ? tools.includes(selectedTool) : false)
    let open = $state(false)

    /**
	 * @param {MouseEvent} event
	 */
	function handleShapeButtonClick(event) {
		// if (
		// 	event.detail >= 2 ||
		// 	/** @type {HTMLElement} */ (event.target).closest(".arrow")
		// ) {
		// 	open = !open;
		// 	return;
		// }

		// open = false;
        open = !open;
		return;
	}

    /**
     * @param {Tool} toolOption
     */
    function selectShape(toolOption) {
        tool = toolOption;
        selectedTool = toolOption;
	}
</script>

<div class="group">
    <button
        type="button"
        class:active={selected}
        aria-label={tool?.name ?? "Empty Group"}
        aria-expanded={open}
        onclick={handleShapeButtonClick}
    >
        {tool?.name ?? "Empty Group"}
        <img
            class="arrow"
            src={toolArrow}
            alt=""
            aria-hidden="true"
        />
    </button>
    {#if open}
        <div class="options" aria-label="Tool Group">
            {#each tools as toolOption}
                <button
                    type="button"
                    class="options"
                    class:active={selectedTool === toolOption}
                    aria-label={toolOption.name}
                    onclick={() => selectShape(toolOption)}
                >
                    {toolOption.name}
                </button>
            {/each}
        </div>
    {/if}
</div>

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

    .arrow {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 9px;
		height: 9px;
	}

    /* .options {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 48px;
		position: absolute;
		top: 0;
		left: calc(100% + 4px);
		z-index: 2;
		display: flex;
		gap: 4px;
	}

	button.options {
		width: 48px;
		background: #ffffff;
	}

	button.options.active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
	} */

    .group {
		position: relative;
	}
</style>