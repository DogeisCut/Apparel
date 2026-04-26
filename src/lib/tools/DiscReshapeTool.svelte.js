import { ReshapeTool } from './ReshapeTool.svelte'

export class DiscReshapeTool extends ReshapeTool {
	name = 'Disc Reshape'
	
	// Tool Settings
	radius = $state(4)
}
