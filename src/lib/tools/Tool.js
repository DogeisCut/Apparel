import { Document } from "$lib/Document.svelte"

export class Tool {
	name = 'Tool' // idk how to make this static without breaking anything, static keyword causes scripts to complain when getting it from instances
	active = false
	/**
	 * @param {Record<string, any>} editorState
	 * @param {Document} document
	 */
	constructor(editorState, document) {
		this.editorState = editorState
		this.document = document
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickStart(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onClickEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 * @param {boolean} outline
	 */
	whileClickHeld(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeStart(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
	 * @param {boolean} outline
	 */
	onHoverNodeEnd(x, y, topLevelNode, bottomLevelNode, outline) {
		
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Node?} topLevelNode
	 * @param {Node?} bottomLevelNode
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
