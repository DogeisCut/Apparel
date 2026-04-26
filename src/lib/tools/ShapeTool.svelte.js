import { Tool } from './Tool.svelte'

// Tool Base
export class ShapeTool extends Tool {
	name = 'Shape'

	// Tool Runtime Properties
	/**
	 * @type {{x: number, y: number}?}
	 */
	startPoint = null
	/**
	 * @type {{x: number, y: number}?}
	 */
	endPoint = null
}
