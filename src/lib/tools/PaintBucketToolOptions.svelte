<script>
    let { tool } = $props() 
</script>

<fieldset>
    <legend>Paint only:</legend>
    <input type="radio" name="action" id="all" value="all" bind:group={tool.paintOnly} /><label for="all">All</label>
    <input type="radio" name="action" id="fill" value="fill" bind:group={tool.paintOnly} /><label for="fill">Fill</label>
    <input type="radio" name="action" id="stroke" value="stroke" bind:group={tool.paintOnly} /><label for="stroke">Stroke</label>
    <input type="radio" name="action" id="auto" value="auto" bind:group={tool.paintOnly} /><label for="auto">Auto</label>
</fieldset>

<fieldset>
    <legend>Paint with:</legend>
    <input type="radio" name="action" id="fill" value="fill" bind:group={tool.paintWith} /><label for="fill">Fill</label>
    <input type="radio" name="action" id="stroke" value="stroke" bind:group={tool.paintWith} /><label for="stroke">Stroke</label>
</fieldset>

<input type="checkbox" id="shape" value="shape" bind:checked={tool.fillShapeStyle} /><label for="shape">Apply Shape Styles</label>