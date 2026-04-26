import { ShapeTool } from './ShapeTool.svelte'
import RectangleToolOptions from './RectangleToolOptions.svelte'

export class RectangleTool extends ShapeTool {
	name = 'Rectangle'
	options = RectangleToolOptions

	// Tool Options
	cornerRadius = $state(0)
}
