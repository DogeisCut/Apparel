import { Tool } from './Tool'

// Tool Base
export class SketchTool extends Tool {
	name = 'Sketch'

	// Tool Runtime Properties
	/**
	 * @type {({x: number, y: number})[]}
	 */
	currentPoints = []
}
