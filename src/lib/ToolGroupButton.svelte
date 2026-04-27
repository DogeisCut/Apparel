<script>
	import { tick } from "svelte";
	import { Tool } from "./tools/Tool.svelte";
	import ToolLabel from "./ToolLabel.svelte";
	import toolArrow from "$lib/assets/toolicons/dark/toolOptionArrow.svg";

	/**
	 * @type {{tools: Tool[], selectedTool: Tool?}}
	 */
	let { tools, selectedTool = $bindable() } = $props();

	/**
	 * @type {Tool?}
	 */
	let tool = $derived(tools[0] ?? null);

	let selected = $derived(
		tool === (selectedTool),
	);
	let open = $state(false);
	let visibleTools = $derived(
		tools.filter((toolOption) => toolOption !== tool),
	);
	/** @type {HTMLDivElement | null} */
	let groupElement = $state(null);
	let menuX = $state(0);
	let menuY = $state(0);

	function updateMenuPosition() {
		if (!groupElement) return;

		const rect = groupElement.getBoundingClientRect();
		menuX = rect.right + 4;
		menuY = rect.top;
	}

	$effect(() => {
		if (open) {
			tick().then(updateMenuPosition);
		}
	});

	/**
	 * @param {MouseEvent} event
	 */
	function handleToolButtonClick(event) {
		// juust in ccase V
		// if (
		// 	event.detail >= 2 ||
		// 	/** @type {HTMLElement} */ (event.target).closest(".arrow")
		// ) {
		// 	open = !open;
		// 	return;
		// }

		// open = false;
		if (open) {
			open = false;
		} else {
			if (selectedTool === tool) {
				open = true;
				updateMenuPosition();
			}
		}
		selectedTool = tool;
		return;
	}

	/**
	 * @param {Tool} toolOption
	 */
	function selectTool(toolOption) {
		tool = toolOption;
		selectedTool = toolOption;
		open = false;
	}
</script>

<div class="group" bind:this={groupElement}>
	<button
		type="button"
		class:active={selected}
		aria-label={tool?.name ?? "Empty Group"}
		aria-expanded={open}
		onclick={handleToolButtonClick}
	>
		<ToolLabel text={tool?.name ?? "Empty Group"}></ToolLabel>
		<img class="arrow" src={toolArrow} alt="" aria-hidden="true" />
	</button>
	{#if open}
		<div
			class="opts"
			style:left={`${menuX}px`}
			style:top={`${menuY}px`}
			aria-label="Tool Group"
		>
			{#each visibleTools as toolOption}
				<button
					type="button"
					class="opt"
					class:active={selectedTool === toolOption}
					aria-label={toolOption.name}
					onclick={() => selectTool(toolOption)}
				>
					<ToolLabel text={toolOption.name}></ToolLabel>
				</button>
			{/each}
		</div>
	{/if}
</div>

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

	.arrow {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 9px;
		height: 9px;
	}

	.opts {
		position: fixed;
		z-index: 2;
		display: flex;
		gap: 4px;
		padding: 0;
	}

	button.opt {
		width: 56px;
		height: 48px;
		background: var(--surface-white);
		box-shadow: 0 2px 6px rgba(20, 32, 50, 0.12);
	}

	button.opt.active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
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
		width: 56px;
	}
</style>
