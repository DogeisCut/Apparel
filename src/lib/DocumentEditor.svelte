<script>
    import { Tool } from './tools/Tool'
    import { BoxSelectTool } from './tools/BoxSelectTool/BoxSelectTool'
    /**
     * @type {(Tool[] | Tool)[]}
     */
    const tools = [
        [
            new BoxSelectTool()
        ]
    ]
    /**
     * @type {Tool?}
     */
    let currentTool = $state(null)
    let style = $state({
        fill: {
            color: "#734b06ff" // placeholder default color
        },
        stroke: {
            color: "#000000ff",
            width: 4
            // TODO: dotted line stuff idk
        },
        shape: {
            opacity: 1,
            blur: 0,
            // todo: yes
        }
    }) 
    /**
     * @type {Node[]}
     */
    let selectedNodes = $state([])

    let { svg } = $props()
</script>