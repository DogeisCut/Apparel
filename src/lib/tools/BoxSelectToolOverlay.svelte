<!-- BoxSelectToolOverlay.svelte -->
<script>
  let { tool, editorState } = $props()
</script>

{#if tool.selectionBox}
  {@const b = tool.selectionBox}
  <rect
    x={b.x} y={b.y} width={b.w} height={b.h}
    fill="rgba(76, 151, 255, 0.08)"
    stroke="var(--toolbar, #4c97ff)"
    stroke-width={1 / editorState.zoom}
    stroke-dasharray="{4 / editorState.zoom},{3 / editorState.zoom}"
    pointer-events="none"
  />
{/if}