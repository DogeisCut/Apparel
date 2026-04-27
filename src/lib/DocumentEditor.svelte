<script>
	import { Tool } from "./tools/Tool.svelte";
	import { BoxSelectTool } from "./tools/BoxSelectTool.svelte";
	import { LassoSelectTool } from "./tools/LassoSelectTool.svelte";
	import { DiscSelectTool } from "./tools/DiscSelectTool.svelte";
	import { BoxReshapeTool } from "./tools/BoxReshapeTool.svelte";
	import { LassoReshapeTool } from "./tools/LassoReshapeTool.svelte";
	import { DiscReshapeTool } from "./tools/DiscReshapeTool.svelte";
	import { BrushTool } from "./tools/BrushTool.svelte";
	import { PenTool } from "./tools/PenTool.svelte";
	import { EraserTool } from "./tools/EraserTool.svelte";
	import { PaintBucketTool } from "./tools/PaintBucketTool.svelte";
	import { TextTool } from "./tools/TextTool.svelte";
	import { LineTool } from "./tools/LineTool.svelte";
	import { PolygonTool } from "./tools/PolygonTool.svelte";
	import { RectangleTool } from "./tools/RectangleTool.svelte";
	import { CircleTool } from "./tools/CircleTool.svelte";
	import { TemplateTool } from "./tools/TemplateTool.svelte";
	import { ArrowTool } from "./tools/ArrowTool.svelte";
	import { BuilderTool } from "./tools/BuilderTool.svelte";
	import { HideTool } from "./tools/HideTool.svelte";
	import { LockTool } from "./tools/LockTool.svelte";
	
	import ToolButton from "./ToolButton.svelte";
	import ToolGroupButton from "./ToolGroupButton.svelte";
	import ToolOptions from "./tools/ToolOptions.svelte";

	import FillStyleDropdown from "./FillStyleDropdown.svelte"
	import StrokeStyleDropdown from "./StrokeStyleDropdown.svelte"
	import ShapeStyleDropdown from "./ShapeStyleDropdown.svelte"

	//this is for later
	/**
	 * @param {PointerEvent} e
	 */
	function getCanvasCoordinates(e) {
		// @ts-ignore
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		return {
			x: (x - editorState.position.x) / editorState.zoom,
			y: (y - editorState.position.y) / editorState.zoom
		};
	}

	//TODO: make this a class so i can use jsdoc with it
	let editorState = $state({
		/**
		 * @type {HTMLDivElement?}
		*/
		canvas: null,
		/**
		 * @type {Tool | null}
		 */
		selectedTool: null,
		/**
		 * @type {SVGElement[]}
		 */
		selectedNodes: [],
		position: {
			x:0,
			y:0
		},
		zoom: 1,
		pan: {
			isPanning: false,
			panStart: {x:0,y:0}
		},
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

	let { document = $bindable() } = $props();

	/**
	 * @type {(Tool[] | Tool)[]}
	 */
	const tools = $derived([
		[
			new BoxSelectTool(editorState, document),
			new LassoSelectTool(editorState, document),
			new DiscSelectTool(editorState, document),
		],
		[
			new BoxReshapeTool(editorState, document),
			new LassoReshapeTool(editorState, document),
			new DiscReshapeTool(editorState, document),
		],
		[
			new BrushTool(editorState, document),
			new PenTool(editorState, document),
			new EraserTool(editorState, document),
		],
		new PaintBucketTool(editorState, document),
		new TextTool(editorState, document),
		[
			new LineTool(editorState, document),
			new PolygonTool(editorState, document),
			new RectangleTool(editorState, document),
			new CircleTool(editorState, document),
			new TemplateTool(editorState, document),
			new ArrowTool(editorState, document),
		],
		new BuilderTool(editorState, document),
		[
			new HideTool(editorState, document),
			new LockTool(editorState, document),
		],
	]);

	const selectedToolWithOptions = $derived(
		editorState.selectedTool && editorState.selectedTool.options !== ToolOptions
			? editorState.selectedTool
			: null
	);

	$effect(() => {
		let previousTool = editorState.selectedTool;
		
		return () => {
			if (previousTool) {
				previousTool.onToolDeactivated();
			}
		};
	});

	$effect(() => {
		if (editorState.selectedTool) {
			editorState.selectedTool.onToolActivated();
		}
	});

	$effect(() => {
		if (editorState.canvas && document) {
			const containerRect = editorState.canvas.getBoundingClientRect();
			
			// Calculate center: (Container width/2) - (Document width/2)
			editorState.position.x = (containerRect.width / 2) - (document.width / 2);
			editorState.position.y = (containerRect.height / 2) - (document.height / 2);
		}
	});
</script>

<section class="ed" aria-label="Document editor">
	<div class="settings">
		<FillStyleDropdown 
			bind:color={editorState.style.fill.color}
			bind:fillRule={editorState.style.fill.fillRule}
			bind:opacity={editorState.style.fill.opacity}
		></FillStyleDropdown>
		<StrokeStyleDropdown 
			bind:color={editorState.style.stroke.color}
			bind:width={editorState.style.stroke.width}
			bind:dashArray={editorState.style.stroke.dashArray}
			bind:dashOffset={editorState.style.stroke.dashOffset}
			bind:lineCap={editorState.style.stroke.lineCap}
			bind:lineJoin={editorState.style.stroke.lineJoin}
			bind:miterLimit={editorState.style.stroke.miterLimit}
			bind:opacity={editorState.style.stroke.opacity}
		></StrokeStyleDropdown>
		<ShapeStyleDropdown
			bind:opacity={editorState.style.shape.opacity}
			bind:blur={editorState.style.shape.blur}
			bind:blendMode={editorState.style.shape.blendMode}
		>
		</ShapeStyleDropdown>
		{#if selectedToolWithOptions}
			{@const selectedTool = selectedToolWithOptions}
			<span class="sep"></span>
			<div class="tool-options">
				<selectedTool.options tool={selectedTool}></selectedTool.options>
			</div>
		{/if}
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
					<ToolGroupButton tools={tool} bind:selectedTool={editorState.selectedTool}></ToolGroupButton>
				{:else}
					<ToolButton {tool} bind:selectedTool={editorState.selectedTool}></ToolButton>
				{/if}
			{/each}
		</aside>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="canvas"
			bind:this={editorState.canvas}
			onwheel={(e) => {
				if (!e.ctrlKey) return 
				e.preventDefault(); 
				
				const zoomFactor = 1.1;
				const direction = e.deltaY > 0 ? -1 : 1;
				const newZoom = direction > 0 ? editorState.zoom * zoomFactor : editorState.zoom / zoomFactor;
				
				const clampedZoom = Math.min(Math.max(newZoom, 1/256), 256);

				const rect = e.currentTarget.getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;

				editorState.position.x = mouseX - (mouseX - editorState.position.x) * (clampedZoom / editorState.zoom);
				editorState.position.y = mouseY - (mouseY - editorState.position.y) * (clampedZoom / editorState.zoom);
				editorState.zoom = clampedZoom;
			}}
			onpointerdown={(e) => {
				if (e.button === 1) {
					editorState.pan.isPanning = true;
					editorState.pan.panStart = {
						x: e.clientX - editorState.position.x,
						y: e.clientY - editorState.position.y
					};
				}
			}}
			onpointermove={(e) => {
				if (editorState.pan.isPanning) {
					editorState.position.x = e.clientX - editorState.pan.panStart.x;
					editorState.position.y = e.clientY - editorState.pan.panStart.y;
				}
			}}
			onpointerup={() => {
				editorState.pan.isPanning = false;
			}}
			onpointerleave={() => {
				editorState.pan.isPanning = false;
			}}
		>
			<svg class="canvasContents">
				<defs>
					<pattern 
						id="dark-checkerboard" 
						width="8" 
						height="8" 
						patternUnits="userSpaceOnUse"
						patternTransform="translate({editorState.position.x + document.width/2 * editorState.zoom}, {editorState.position.y + document.height/2 * editorState.zoom}) scale({editorState.zoom})"
					>
						<rect width="8" height="8" fill="#2a2b2e" />
						<rect x="4" width="4" height="4" fill="#1e1e20" />
						<rect y="4" width="4" height="4" fill="#1e1e20" />
					</pattern>
					<mask id="out-of-bounds-mask">
						<rect width="100%" height="100%" fill="white" />
						
						<rect x={editorState.position.x} y={editorState.position.y} width={document.width*editorState.zoom} height={document.height*editorState.zoom} fill="black" />
					</mask>
				</defs>
				<rect width="100%" height="100%" fill="url(#dark-checkerboard)" />
				<g fill="none" stroke-linecap="round" opacity="0.5" transform="translate({document.width/2*editorState.zoom},{document.height/2*editorState.zoom}) translate({editorState.position.x},{editorState.position.y})">
					<g stroke="#ffffff" stroke-width="4">
						<line x1="0" y1="-8" x2="0" y2="8" />
						<line x1="-8" y1="0" x2="8" y2="0" />
						<circle r="6" cx="0" cy="0" />
					</g>
					<g stroke="#000000" stroke-width="2">
						<line x1="0" y1="-8" x2="0" y2="8" />
						<line x1="-8" y1="0" x2="8" y2="0" />
						<circle r="6" cx="0" cy="0" />
					</g>
				</g>
				<rect 
					width="100%" 
					height="100%" 
					fill="#ffffff" 
					opacity="0.1" 
					mask="url(#out-of-bounds-mask)" 
					pointer-events="none" 
				/>
				<g transform="translate({editorState.position.x},{editorState.position.y}) scale({editorState.zoom})">
					{@html document.svg.innerHTML} 
					{#each editorState.selectedNodes as selectedNode}
						<g stroke="var(--toolbar)" stroke-width={4/editorState.zoom}>
							<!-- not the proper way to render the selection outline since we cant really remove the fill or other styles...-->
							{@html selectedNode.outerHTML}
						</g>
					{/each}
				</g>
				<g fill="none" stroke-linecap="round" opacity="0.5">
					<g stroke="#ffffff" stroke-width="4">
						<rect width={document.width*editorState.zoom} height={document.height*editorState.zoom} x={editorState.position.x} y={editorState.position.y} rx="0" ry="0" />
					</g>
					<g stroke="#000000" stroke-width="2">
						<rect width={document.width*editorState.zoom} height={document.height*editorState.zoom} x={editorState.position.x} y={editorState.position.y} rx="0" ry="0" />
					</g>
				</g>
			</svg>
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
					min="0.1"
					max="8"
					defaultvalue="1"
					bind:value={editorState.zoom}
				/>
				<span>%</span>
			</label>
			<span>X {editorState.position.x}</span>
			<span>Y {editorState.position.y}</span>
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

	.tool-options {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
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

	.canvas {
		position: relative;
		overflow: hidden;
		min-width: 0;
		min-height: 0;
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

	svg {
		width: 100%;
		height: 100%;
	}
</style>
