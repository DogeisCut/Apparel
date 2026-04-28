import { SelectTool } from './SelectTool.svelte'
import BoxSelectToolOverlay from './BoxSelectToolOverlay.svelte'

export class BoxSelectTool extends SelectTool {
	name = 'Box Select'
	overlay = BoxSelectToolOverlay

	/** @type {{ x: number, y: number, w: number, h: number } | null} */
	selectionBox = $state(null)
	isSelecting = $state(false)

	#startX = 0
	#startY = 0
	#didDrag = false

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		this.editorState.selectedNodes.length = 0
		this.#startX = x
		this.#startY = y
		this.#didDrag = false
		this.isSelecting = false
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
		this.#didDrag ||= Math.abs(x - this.#startX) > 2 || Math.abs(y - this.#startY) > 2
		this.isSelecting = this.#didDrag
		this.selectionBox = {
			x: bx,
			y: by,
			w: Math.abs(x - this.#startX),
			h: Math.abs(y - this.#startY),
		}
	}

	/**
	 * @override
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		const box = this.selectionBox
		const contentGroup = this.editorState.contentGroup
		if (!box) {
			this.selectionBox = null
			return
		}

		this.editorState.selectedNodes.length = 0

		if (this.#didDrag && contentGroup) {
			const selected = new Set()
			for (const node of contentGroup.querySelectorAll('*')) {
				if (!(node instanceof SVGGeometryElement)) continue
				if (node.closest('[data-tool-overlay="true"]')) continue
				if (this.#intersects(box, this.#getTransformedBounds(node, contentGroup))) {
					const selectedNode = this.getSelectableNode(node)
					if (selectedNode) selected.add(selectedNode)
				}
			}
			this.editorState.selectedNodes.push(...selected)
		} else {
			const selectedNode = this.getSelectableNode(bottomLevelNode ?? topLevelNode)
			if (selectedNode) this.editorState.selectedNodes.push(selectedNode)
		}

		this.selectionBox = null
		this.isSelecting = false
	}

	/**
	 * @param {{ x: number, y: number, w: number, h: number }} a
	 * @param {{ x: number, y: number, width: number, height: number }} b
	 */
	#intersects(a, b) {
		return (
			a.x <= b.x + b.width &&
			a.x + a.w >= b.x &&
			a.y <= b.y + b.height &&
			a.y + a.h >= b.y
		)
	}

	/**
	 * @param {SVGGeometryElement} node
	 * @param {SVGGElement} contentGroup
	 */
	#getTransformedBounds(node, contentGroup) {
		const box = node.getBBox()
		const nodeMatrix = node.getCTM()
		const groupMatrix = contentGroup.getCTM()
		if (!nodeMatrix || !groupMatrix) return box

		const matrix = groupMatrix.inverse().multiply(nodeMatrix)
		const points = [
			new DOMPoint(box.x, box.y),
			new DOMPoint(box.x + box.width, box.y),
			new DOMPoint(box.x + box.width, box.y + box.height),
			new DOMPoint(box.x, box.y + box.height),
		].map((point) => point.matrixTransform(matrix))

		const xs = points.map((point) => point.x)
		const ys = points.map((point) => point.y)
		const x = Math.min(...xs)
		const y = Math.min(...ys)

		return {
			x,
			y,
			width: Math.max(...xs) - x,
			height: Math.max(...ys) - y,
		}
	}

	onToolDeactivated() {
		super.onToolDeactivated()
		this.selectionBox = null
		this.isSelecting = false
	}
}
