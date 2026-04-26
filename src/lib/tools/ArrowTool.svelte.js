import { DraggedTool } from './DraggedTool.svelte'

export class ArrowTool extends DraggedTool {
	name = 'Arrow'
	
	// Tool Settings
	thickness = $state(1)
	headThickness = $state(2)
	headLength = $state(2)
}
