<script>
	import { Tool } from "./tools/Tool";
	import { BoxSelectTool } from "./tools/BoxSelectTool";
	import { LassoSelectTool } from "./tools/LassoSelectTool";
	import { DiscSelectTool } from "./tools/DiscSelectTool";
	import { BoxReshapeTool } from "./tools/BoxReshapeTool";
	import { LassoReshapeTool } from "./tools/LassoReshapeTool";
	import { DiscReshapeTool } from "./tools/DiscReshapeTool";
	import { BrushTool } from "./tools/BrushTool";
	import { PenTool } from "./tools/PenTool";
	import { EraserTool } from "./tools/EraserTool";
	import { PaintBucketTool } from "./tools/PaintBucketTool";
	import { TextTool } from "./tools/TextTool";
	import { LineTool } from "./tools/LineTool";
	import { PolygonTool } from "./tools/PolygonTool";
	import { RectangleTool } from "./tools/RectangleTool";
	import { CircleTool } from "./tools/CircleTool";
	import { TemplateTool } from "./tools/TemplateTool";
	import { ArrowTool } from "./tools/ArrowTool";
	import { BuilderTool } from "./tools/BuilderTool";
	import { HideTool } from "./tools/HideTool";
	import { LockTool } from "./tools/LockTool";
	
	import ToolButton from "./ToolButton.svelte";
	import ToolGroupButton from "./ToolGroupButton.svelte";

	/**
	 * @type {(Tool[] | Tool)[]}
	 */
	const tools = [
		[
			new BoxSelectTool(),
			new LassoSelectTool(),
			new DiscSelectTool(),
		],
		[
			new BoxReshapeTool(),
			new LassoReshapeTool(),
			new DiscReshapeTool(),
		],
		[
			new BrushTool(),
			new PenTool(),
			new EraserTool(),
		],
		new PaintBucketTool(),
		new TextTool(),
		[
			new LineTool(),
			new PolygonTool(),
			new RectangleTool(),
			new CircleTool(),
			new TemplateTool(),
			new ArrowTool(),
		],
		new BuilderTool(),
		[
			new HideTool(),
			new LockTool(),
		],
	];
	let editorState = $state({
		/**
		 * @type {Tool | null}
		 */
		selectedTool: null,
		style: {
			fill: {
				color: "#734b06ff",
				/**
				 * @type {"nonzero" | "evenodd"}
				*/
				fillRule: "evenodd",
				opacity: 1, // seperate from color opacity
			},
			stroke: {
				color: "#000000ff",
				width: 4,
				/**
				 * @type {number[]}
				*/
				dashArray: [],
				dashOffset: 0,
				/**
				 * @type {"butt" | "round" | "square"}
				*/
				lineCap: "round",
				/**
				 * @type {"arcs" | "bevel" | "miter" | "miter-clip" | "round"}
				*/
				lineJoin: "miter",
				miterLimit: 4,
				opacity: 1, // seperate from color opacity
			},
			shape: {
				opacity: 1,
				blur: 0,
				/**
				 * @type {"normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity" }
				*/
				blendMode: "normal",
			},
		}
	})
	/**
	 * @type {Node[]}
	 */
	let selectedNodes = $state([]);

	let { document } = $props();
	let canvasHost = $state();
	let zoom = $state(100);
	let position = $state({ x: 0, y: 0 });

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
			<input type="color" bind:value={editorState.style.fill.color} />
		</label>
		<label>
			Outline
			<input type="color" bind:value={editorState.style.stroke.color} />
		</label>
		<label>
			Width
			<input
				class="num"
				type="number"
				min="0"
				bind:value={editorState.style.stroke.width}
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
				bind:value={editorState.style.shape.opacity}
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
			{#each tools as tool}
				{#if Array.isArray(tool)}
					<ToolGroupButton tools={tool} bind:editorState></ToolGroupButton>
				{:else}
					<ToolButton {tool} bind:editorState></ToolButton>
				{/if}
			{/each}
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
