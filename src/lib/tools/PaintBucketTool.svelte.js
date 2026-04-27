import { Tool } from './Tool.svelte'
import PaintBucketToolOptions from './PaintBucketToolOptions.svelte'

export class PaintBucketTool extends Tool {
	name = 'Paint Bucket'
	options = PaintBucketToolOptions

	
	/**
	 * @type {"all" | "fill" | "stroke" | "auto"}
	 */
	paintOnly = $state("auto")
	/**
	 * @type {"fill" | "stroke"}
	 */
	paintWith = $state("fill")
	/**
	 * @type {boolean}
	 */
	fillShapeStyle = $state(true)

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		if (bottomLevelNode) {
			bottomLevelNode.style.fill = this.editorState.style.fill.color
			this.document.markDirty() // yeah we dont get free reactivity unfortunetly
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	whileClickHeld(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeStart(x, y, topLevelNode, bottomLevelNode, outline) {
		// TODO: figure out how to make the hover show the color without actually modifying the internal svg
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	whileHoverNode(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	onMouseMoved(x, y) {
		
	}

	/**
	 * Runs right before a tool is set to active = true
	 */
	onToolActivated() {

	}

	/**
	 * Runs right before a tool is set to active = false
	 */
	onToolDeactivated() {

	}
}
