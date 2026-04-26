import { Tool } from './Tool'

// Tool Base
export class ReshapeTool extends Tool {
	name = 'Select'
	/**
	 * @type {("smooth" | "sphere" | "root" | "inverseSquare" | "sharp" | "linear" | "constant" | "random")?}
	 */
	proportionalEditingFalloff = null
	proportionalSize = 5

	/**
	 * @type {any[]}
	 */
	selectedPoints = [] // honestly i dont know what type this should even be because svg paths are strings AND multiple shapes could be selected.

	sharpPoints() {

	}

	smoothPoints() {

	}

	symmetricSmoothPoints() {

	}

	autoSmoothPoints() {

	}

	smoothShape() {

	}

	joinPoints() {

	}

	breakApartPoints() {
		
	}
}
