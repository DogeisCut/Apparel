import { Tool } from './Tool.svelte'

// TODO: selection outline for actually selecting and hovering
// TODO: dragging and single click selections

// Tool Base
export class SelectTool extends Tool {
	name = 'Select'

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {SVGElement?} topLevelNode
	 * @param {SVGElement?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		super.onClickStart(x, y, topLevelNode, bottomLevelNode, outline)
		this.editorState.selectedNodes.push(topLevelNode)
	}
}
