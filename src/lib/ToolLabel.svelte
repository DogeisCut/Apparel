<script>
	import { tick } from "svelte";

	/** @type {{ text: string }} */
	let { text } = $props();

	/** @type {HTMLSpanElement | null} */
	let labelElement = $state(null);
	let scrollLabel = $state(false);

	function updateLabelScroll() {
		if (!labelElement) return;

		const lineHeight = Number.parseFloat(
			getComputedStyle(labelElement).lineHeight,
		);
		const hasLongWord = text.split(/\s+/).some((word) => word.length > 6);
		const isMultiline = labelElement.scrollHeight > lineHeight * 1.5;
		// see my Super Nice and Awesome readable code
		scrollLabel =
			hasLongWord &&
			(isMultiline ||
				labelElement.scrollWidth > labelElement.clientWidth);
	}

	$effect(() => {
		text;
		tick().then(updateLabelScroll);
	});
</script>

<span class="label" class:scroll={scrollLabel} bind:this={labelElement}>
	<span>{text}</span>
</span>

<style>
	.label {
		display: block;
		max-width: 100%;
		overflow: hidden;
		white-space: normal;
	}

	.label > span {
		display: inline-block;
	}

	.label.scroll {
		white-space: nowrap;
	}

	.label.scroll > span {
		animation: label-scroll 3.5s linear infinite;
		padding-right: 14px;
	}

	@keyframes label-scroll {
		0%,
		18% {
			transform: translateX(0);
		}

		82%,
		100% {
			transform: translateX(calc(-100% + 42px));
		}
		/*this is the Last time i ever animate in css.... /j */
	}
</style>
