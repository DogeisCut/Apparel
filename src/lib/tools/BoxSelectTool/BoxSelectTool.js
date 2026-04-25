import { Tool } from '../Tool'

// Honestly we should make a base Select Tool class as i imagine a lot of the selection tools will share code
export class BoxSelectTool extends Tool {
	static name = 'Select'
}
