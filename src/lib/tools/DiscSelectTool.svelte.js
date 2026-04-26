import { SelectTool } from './SelectTool.svelte'

export class DiscSelectTool extends SelectTool {
	name = 'Disc Select'
	
	// Tool Settings
	radius = $state(4)
}
