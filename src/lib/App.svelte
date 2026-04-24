<script>
    import { onMount } from "svelte";
    // may want to move this class into its own script but this will do for now.
    export class ApparelDocument {
        svg = document.createElement("svg")

        constructor(name = "Untitled Document", width = 0, height = 0) {
            this.name = $state(name)
            this.width = $state(width)
            this.height = $state(height)
            documents.push(this)
        }
    }

	/**
     * @type {ApparelDocument[]}
     */
	let documents = $state([])
    /**
     * @type {ApparelDocument?}
     */
    let activeDocument = $state(null)

    onMount(() => {
        activeDocument = new ApparelDocument()
    });
</script>