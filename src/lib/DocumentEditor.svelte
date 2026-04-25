<script>
	import { Tool } from "./tools/Tool";
	import { BoxSelectTool } from "./tools/BoxSelectTool/BoxSelectTool";
	import toolArrow from "$lib/assets/toolicons/toolArrow.svg";
	import toolCircle from "$lib/assets/toolicons/toolCircle.svg";
	import toolSquare from "$lib/assets/toolicons/toolSquare.svg";
	import toolTriangle from "$lib/assets/toolicons/toolTriangle.svg";

	/**
	 * @type {(Tool[] | Tool)[]}
	 */
	const tools = [[new BoxSelectTool()]];
	const flatTools = tools.flat();
	/** @type {("square" | "triangle" | "circle")[]} */
	const shapeOptions = ["square", "triangle", "circle"];
	const shapeIcons = {
		square: toolSquare,
		triangle: toolTriangle,
		circle: toolCircle,
	};
	/**
	 * @type {Tool | "shape" | "pen" | null}
	 */
	let currentTool = $state(null);
	let style = $state({
		fill: {
			color: "#734b06",
		},
		stroke: {
			color: "#000000",
			width: 4,
		},
		shape: {
			opacity: 1,
			blur: 0,
		},
	});
	/**
	 * @type {Node[]}
	 */
	let selectedNodes = $state([]);

	let { document } = $props();
	let canvasHost = $state();
	let zoom = $state(100);
	let position = $state({ x: 0, y: 0 });
	/** @type {"square" | "triangle" | "circle"} */
	let selectedShape = $state("square");
	let shapeMenuOpen = $state(false);

	/**
	 * @param {"square" | "triangle" | "circle"} shape
	 */
	function selectShape(shape) {
		selectedShape = shape;
		currentTool = "shape";
		shapeMenuOpen = false;
	}

	/**
	 * @param {MouseEvent} event
	 */
	function handleShapeButtonClick(event) {
		currentTool = "shape";

		if (
			event.detail >= 2 ||
			/** @type {HTMLElement} */ (event.target).closest(".arrow")
		) {
			shapeMenuOpen = !shapeMenuOpen;
			return;
		}

		shapeMenuOpen = false;
	}

	$effect(() => {
		const svg = document.ensureSvgElement();

		if (!canvasHost || !svg) {
			return;
		}

		svg.style.display = "block";
		svg.style.width = `${document.width}px`;
		svg.style.height = `${document.height}px`;
		svg.style.background = "rgba(255, 255, 255, 0.92)";
		canvasHost.replaceChildren(svg);
	});
</script>

<section class="ed" aria-label="Document editor">
	<div class="settings">
		<label>
			Fill
			<input type="color" bind:value={style.fill.color} />
		</label>
		<label>
			Outline
			<input type="color" bind:value={style.stroke.color} />
		</label>
		<label>
			Width
			<input
				class="num"
				type="number"
				min="0"
				bind:value={style.stroke.width}
			/>
		</label>
		<label>
			Opacity
			<input
				class="range"
				type="range"
				min="0"
				max="1"
				step="0.05"
				bind:value={style.shape.opacity}
			/>
		</label>
		<span class="sep"></span>
		<div class="acts">
			<button type="button">Group</button>
			<button type="button">Ungroup</button>
		</div>
	</div>

	<div class="ws">
		<aside class="tools" aria-label="Tools">
			{#each flatTools as tool}
				<button
					type="button"
					class:active={currentTool === tool}
					aria-pressed={currentTool === tool}
					onclick={() => {
						currentTool = tool;
						shapeMenuOpen = false;
					}}
				>
					{tool.name}
				</button>
			{/each}
			<div class="shapes">
				<button
					type="button"
					class="sbutton"
					class:active={currentTool === "shape"}
					aria-label={`Shape tool: ${selectedShape}`}
					aria-expanded={shapeMenuOpen}
					onclick={handleShapeButtonClick}
				>
					<img
						class="sicon"
						src={shapeIcons[selectedShape]}
						alt=""
						aria-hidden="true"
					/>
					<img
						class="arrow"
						src={toolArrow}
						alt=""
						aria-hidden="true"
					/>
				</button>
				{#if shapeMenuOpen}
					<div class="soptions" aria-label="Shape options">
						{#each shapeOptions as shape}
							<button
								type="button"
								class="soptions"
								class:active={selectedShape === shape}
								aria-label={`Use ${shape}`}
								onclick={() => selectShape(shape)}
							>
								<img
									class="sicon"
									src={shapeIcons[shape]}
									alt=""
									aria-hidden="true"
								/>
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<button
				type="button"
				class:active={currentTool === "pen"}
				aria-pressed={currentTool === "pen"}
				onclick={() => {
					currentTool = "pen";
					shapeMenuOpen = false;
				}}
			>
				Pen
			</button>
		</aside>

		<div class="cwrap">
			<div class="can" bind:this={canvasHost}></div>
		</div>
	</div>

	<footer class="status">
		<div class="sl">
			<label><input type="checkbox" /> Snapping</label>
			<label><input type="checkbox" /> Grid</label>
			<label><input type="checkbox" /> Onion skin</label>
		</div>
		<div class="sr">
			<label>
				Zoom
				<input
					class="zoom"
					type="number"
					min="10"
					max="800"
					bind:value={zoom}
				/>
				<span>%</span>
			</label>
			<span>X {position.x}</span>
			<span>Y {position.y}</span>
		</div>
	</footer>
</section>

<style>
	.ed {
		--toolbar: #4c97ff;
		--toolbar-dark: #006eff;
		--toolbar-soft: #e8f1ff;
		--toolbar-border: #c9dafc;
		--surface-white: #ffffff;
		--surface-soft: #f5f8ff;
		--surface-border: #d9e3f2;
		--text-strong: #24324a;
		--text-muted: #60708b;

		display: grid;
		grid-template-rows: 44px minmax(0, 1fr) 52px;
		min-height: 0;
		background: var(--surface-white);
	}

	.settings,
	.status {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 0 12px;
		border-bottom: 1px solid var(--surface-border);
		background: var(--toolbar);
		color: white;
	}

	.settings {
		justify-content: flex-start;
		background: var(--surface-white);
		color: var(--text-strong);
	}

	.sl,
	.sr {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.tools button {
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.14);
		color: white;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}

	.status {
		font-size: 13px;
	}

	.settings label,
	.status label {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 13px;
		font-weight: 500;
	}

	.acts {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.acts button {
		min-height: 28px;
		padding: 0 10px;
		border: 1px solid var(--surface-border);
		border-radius: 4px;
		background: var(--surface-white);
		color: var(--text-strong);
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}

	.acts button:hover {
		background: var(--toolbar-soft);
		border-color: var(--toolbar-border);
	}

	.sep {
		width: 1px;
		height: 24px;
		background: var(--surface-border);
	}

	.settings input {
		accent-color: var(--toolbar);
	}

	input[type="color"] {
		width: 30px;
		height: 26px;
		padding: 0;
		border: 1px solid var(--surface-border);
		border-radius: 4px;
		background: var(--surface-white);
		overflow: hidden;
		cursor: pointer;
	}

	input[type="color"]::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	input[type="color"]::-webkit-color-swatch {
		border: none;
	}

	input[type="color"]::-moz-color-swatch {
		border: none;
	}

	.num,
	.zoom {
		width: 64px;
		height: 28px;
		padding: 0 8px;
		border: 1px solid var(--surface-border);
		border-radius: 4px;
		color: var(--text-strong);
		font: inherit;
		font-size: 13px;
	}

	.range {
		width: 120px;
	}

	.ws {
		display: grid;
		grid-template-columns: 64px minmax(0, 1fr);
		min-height: 0;
	}

	.tools {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px;
		border-right: 1px solid var(--surface-border);
		background: var(--surface-soft);
	}

	.tools button {
		min-height: 48px;
		padding: 6px;
		border-color: var(--surface-border);
		background: var(--surface-white);
		color: var(--text-strong);
		font-size: 12px;
		font-weight: 500;
	}

	.tools button.active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
	}

	.tools button:hover,
	.tools .sbutton[aria-expanded="true"] {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
		color: white;
	}

	.shapes {
		position: relative;
	}

	.tools .sbutton,
	.tools .soptions {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 48px;
	}

	.tools .sbutton {
		position: relative;
	}

	.shapes > .soptions {
		position: absolute;
		top: 0;
		left: calc(100% + 4px);
		z-index: 2;
		display: flex;
		gap: 4px;
	}

	.tools button.soptions {
		width: 48px;
		background: #ffffff;
	}

	.tools button.soptions.active {
		border-color: var(--toolbar-dark);
		background: var(--toolbar);
	}

	.sicon {
		display: block;
		width: 20px;
		height: 20px;
		object-fit: contain;
		pointer-events: none;
	}

	.arrow {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 9px;
		height: 9px;
	}

	.cwrap {
		display: grid;
		place-items: center;
		min-width: 0;
		min-height: 0;
		padding: 32px;
		overflow: auto;
		background-color: #171a20;
		background-image: linear-gradient(45deg, #101318 25%, transparent 25%),
			linear-gradient(-45deg, #101318 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #101318 75%),
			linear-gradient(-45deg, transparent 75%, #101318 75%);
		background-position:
			0 0,
			0 10px,
			10px -10px,
			-10px 0;
		background-size: 20px 20px;
	}

	.can {
		border: 1px solid rgba(255, 255, 255, 0.36);
		box-shadow: 0 18px 42px rgba(0, 0, 0, 0.32);
	}

	.status {
		border-top: 1px solid var(--surface-border);
		border-bottom: none;
		background: var(--surface-white);
		color: var(--text-strong);
	}

	.sl input {
		accent-color: var(--toolbar);
	}

	.sr {
		color: var(--text-muted);
	}
</style>
