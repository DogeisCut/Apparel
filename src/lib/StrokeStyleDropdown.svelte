<script>
    let { color = $bindable(), width = $bindable(), dashArray = $bindable(), dashOffset = $bindable(), lineCap = $bindable(), lineJoin = $bindable(), miterLimit = $bindable(), opacity = $bindable()} = $props()
</script>

<!-- probably should make a base dropdown component for all of these use, but this will do for now -->

<label>
    Stroke
    <button>v</button>
</label>