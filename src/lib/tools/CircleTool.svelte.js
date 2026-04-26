import { ShapeTool } from './ShapeTool.svelte'

export class CircleTool extends ShapeTool {
	name = 'Circle'

	// Tool Settings
	radius = $state(4)
}
