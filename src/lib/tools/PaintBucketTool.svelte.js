import { Tool } from './Tool.svelte'
import PaintBucketToolOptions from './PaintBucketToolOptions.svelte'

export class PaintBucketTool extends Tool {
	name = 'Paint Bucket'
	options = PaintBucketToolOptions

	
	/**
	 * @type {"all" | "fill" | "stroke" | "auto"}
	 */
	paintOnly = $state("auto")
	/**
	 * @type {"fill" | "stroke"}
	 */
	paintWith = $state("fill")
	/**
	 * @type {boolean}
	 */
	fillShapeStyle = $state(true)
}
