import { Tool } from './Tool'

// Tool Base
export class SketchTool extends Tool {
	name = 'Sketch'
	/**
	 * @type {({x: number, y: number})[]}
	 */
	currentPoints = []
}
