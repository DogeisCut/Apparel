import { SelectTool } from './SelectTool.svelte'
import BoxSelectToolOverlay from './BoxSelectToolOverlay.svelte'

export class BoxSelectTool extends SelectTool {
	name = 'Box Select'
	overlay = BoxSelectToolOverlay

	/** @type {{ x: number, y: number, w: number, h: number } | null} */
	selectionBox = $state(null)

	#startX = 0
	#startY = 0

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		super.onClickStart(x, y, topLevelNode, bottomLevelNode, outline)
		this.#startX = x
		this.#startY = y
		this.selectionBox = { x, y, w: 0, h: 0 }
	}

	/**
	 * @override
	 * @param {number} x
	 * @param {number} y
	 */
	whileClickHeld(x, y) {
		const bx = Math.min(x, this.#startX)
		const by = Math.min(y, this.#startY)
		this.selectionBox = {
			x: bx,
			y: by,
			w: Math.abs(x - this.#startX),
			h: Math.abs(y - this.#startY),
		}
	}

	/**
	 * @override
	 * @param {any} x
	 * @param {any} y
	 */
	onClickEnd(x, y) {
		// yeah no i have no idea how we actually select it
		// i want to avoid using the rendered SVG on the dom for collision detection,
		// ideally you use this.document.svg instead
		this.selectionBox = null
	}
}