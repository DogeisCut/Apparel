<script>
	import toolArrowDown from "$lib/assets/toolicons/dark/toolArrowDown.svg";
	import toolArrowUp from "$lib/assets/toolicons/dark/toolArrowUp.svg";

	let { tool } = $props();

	/**
	 * @param {number} amount
	 */
	function stepCornerRadius(amount) {
		const nextValue = Number(tool.cornerRadius || 0) + amount;
		tool.cornerRadius = Math.max(0, nextValue);
	}
</script>

<label>
	Corner
	<span class="stepper">
		<input type="number" min="0" bind:value={tool.cornerRadius} />
		<span class="arrows">
			<button type="button" aria-label="Increase corner radius" onclick={() => stepCornerRadius(1)}>
				<img src={toolArrowUp} alt="" aria-hidden="true" />
			</button>
			<button type="button" aria-label="Decrease corner radius" onclick={() => stepCornerRadius(-1)}>
				<img src={toolArrowDown} alt="" aria-hidden="true" />
			</button>
		</span>
	</span>
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 500;
		color: var(--text-strong);
		white-space: nowrap;
	}

	input {
		box-sizing: border-box;
		width: 64px;
		height: 28px;
		padding: 0 20px 0 6px;
		border: 1px solid var(--surface-border);
		border-radius: 4px;
		background: var(--surface-white);
		color: var(--text-strong);
		font: inherit;
		font-size: 12px;
		line-height: normal;
		cursor: default;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		margin: 0;
		appearance: none;
	}

	input[type="number"] {
		appearance: textfield;
	}

	input:hover {
		border-color: var(--toolbar-border);
		background: var(--toolbar-soft);
	}

	input:focus {
		outline: 2px solid var(--toolbar-border);
		outline-offset: 1px;
	}

	.stepper {
		position: relative;
		display: inline-flex;
	}

	.arrows {
		position: absolute;
		top: 4px;
		right: 4px;
		display: grid;
		width: 12px;
		height: 20px;
		pointer-events: none;
	}

	button {
		display: grid;
		place-items: center;
		width: 12px;
		height: 10px;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		pointer-events: auto;
	}

	img {
		width: 8px;
		height: 8px;
		display: block;
	}
</style>
