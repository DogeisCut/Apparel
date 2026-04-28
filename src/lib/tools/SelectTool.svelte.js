import { Tool } from './Tool.svelte'
import SelectToolOverlay from './SelectToolOverlay.svelte'

// Tool Base
export class SelectTool extends Tool {
	name = 'Select'
	overlay = SelectToolOverlay
	/** @type {SVGElement | null} */
	hoveredNode = $state(null)

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		super.onClickStart(x, y, topLevelNode, bottomLevelNode, outline)
		this.editorState.selectedNodes.length = 0
		const selectedNode = this.getSelectableNode(bottomLevelNode ?? topLevelNode)
		if (selectedNode) {
			this.editorState.selectedNodes.push(selectedNode)
		}
	}

	/**
	 * @param {SVGElement | null | undefined} node
	 */
	getSelectableNode(node) {
		const contentGroup = this.editorState.contentGroup
		if (!node || !(contentGroup instanceof SVGGElement)) return node ?? null

		let selectedGroup = null
		let current = node.parentNode
		while (current && current !== contentGroup) {
			if (current instanceof SVGGElement && !this.#isDocumentWrapper(current, contentGroup)) {
				selectedGroup = current
				break
			}
			current = current.parentNode
		}

		return selectedGroup ?? node
	}

	/**
	 * @param {SVGElement} node
	 */
	getSelectionTransform(node) {
		const contentGroup = this.editorState.contentGroup
		if (!(contentGroup instanceof SVGGElement) || !(node instanceof SVGGraphicsElement)) return ''

		const nodeMatrix = node.getCTM()
		const groupMatrix = contentGroup.getCTM()
		if (!nodeMatrix || !groupMatrix) return ''

		const nodeTransform = node.transform.baseVal.consolidate()?.matrix
		const matrix = groupMatrix.inverse().multiply(nodeMatrix)
		const parentMatrix = nodeTransform ? matrix.multiply(nodeTransform.inverse()) : matrix
		return `matrix(${parentMatrix.a},${parentMatrix.b},${parentMatrix.c},${parentMatrix.d},${parentMatrix.e},${parentMatrix.f})`
	}

	getSelectedOutlineNodes() {
		return this.editorState.selectedNodes
	}

	/**
	 * @param {SVGElement} node
	 */
	usesBoundsOutline(node) {
		return node instanceof SVGGElement
	}

	/**
	 * @returns {Array<{ x: number, y: number, width: number, height: number }>}
	 */
	getSelectedBounds() {
		/** @type {Array<{ x: number, y: number, width: number, height: number }>} */
		const boundsList = []
		for (const node of this.editorState.selectedNodes) {
			const bounds = this.getNodeBounds(node)
			if (bounds) boundsList.push(bounds)
		}
		return boundsList
	}

	/**
	 * @param {SVGElement} node
	 * @returns {{ x: number, y: number, width: number, height: number } | null}
	 */
	getNodeBounds(node) {
		const contentGroup = this.editorState.contentGroup
		if (!(contentGroup instanceof SVGGElement) || !(node instanceof SVGGraphicsElement)) return null

		const box = node.getBBox()
		const nodeMatrix = node.getCTM()
		const groupMatrix = contentGroup.getCTM()
		if (!nodeMatrix || !groupMatrix) return null

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

	/**
	 * @param {SVGGElement} group
	 * @param {SVGGElement} contentGroup
	 */
	#isDocumentWrapper(group, contentGroup) {
		if (group.parentNode === contentGroup) return true
		if (group.parentNode instanceof SVGElement) {
			return this.#getGeometryCount(group) >= this.#getGeometryCount(group.parentNode)
		}
		return true
	}

	/**
	 * @param {SVGElement} root
	 */
	#getGeometryCount(root) {
		return Array.from(root.querySelectorAll('*')).filter((node) => {
			return node instanceof SVGGeometryElement && !node.closest('[data-tool-overlay="true"]')
		}).length
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeStart(x, y, topLevelNode, bottomLevelNode, outline) {
		super.onHoverNodeStart(x, y, topLevelNode, bottomLevelNode, outline)
		this.hoveredNode = topLevelNode
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		super.onHoverNodeEnd(x, y, topLevelNode, bottomLevelNode, outline)
		if (this.hoveredNode === topLevelNode) {
			this.hoveredNode = null
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	whileHoverNode(x, y, topLevelNode, bottomLevelNode, outline) {
		super.whileHoverNode(x, y, topLevelNode, bottomLevelNode, outline)
		this.hoveredNode = topLevelNode
	}

	onToolDeactivated() {
		super.onToolDeactivated()
		this.hoveredNode = null
	}
}
