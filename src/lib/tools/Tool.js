import { Document } from "$lib/Document.svelte"

export class Tool {
	name = 'Tool'
	/**
	 * @param {Record<string, any>} editorState
	 * @param {Document} document
	 */
	constructor(editorState, document) {
		this.editorState = editorState
		this.document = document
	}

	/**
	 * When a click is started, node will be non-null if a shape was clicked.
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode) {
		
	}

	/**
	 * When a click is ended, node will be non-null if a shape was clicked.
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 */
	onClickEnd(x, y, topLevelNode, bottomLevelNode) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	onMouseMoved(x, y) {
		
	}
}
