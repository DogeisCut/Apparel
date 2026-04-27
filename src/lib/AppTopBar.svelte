<script>
	import { onMount } from 'svelte'

	let { onNewDocument, activeDocument } = $props()
	/** @type {'file' | 'edit' | null} */
	let openMenu = $state(null)
	let menuRoot = $state()

	/**
	 * @param {'file' | 'edit'} menu
	 * @param {MouseEvent} event
	 */
	function toggleMenu(menu, event) {
		event.stopPropagation()
		openMenu = openMenu === menu ? null : menu
	}

	function closeMenu() {
		openMenu = null
	}

	onMount(() => {
		/**
		 * @param {MouseEvent} event
		 */
		function handleWindowClick(event) {
			if (!menuRoot?.contains(/** @type {Node} */ (event.target))) {
				closeMenu()
			}
		}

		/**
		 * @param {KeyboardEvent} event
		 */
		function handleKeydown(event) {
			if (event.key === 'Escape') {
				closeMenu()
			}
		}

		window.addEventListener('click', handleWindowClick)
		window.addEventListener('keydown', handleKeydown)

		return () => {
			window.removeEventListener('click', handleWindowClick)
			window.removeEventListener('keydown', handleKeydown)
		}
	})
</script>

<header class="top">
	<div class="left">
		<div class="menus" bind:this={menuRoot}>
			<div class="dd">
				<button
					class="mbtn"
					type="button"
					aria-expanded={openMenu === 'file'}
					onclick={(event) => toggleMenu('file', event)}
				>
					File <span class="arrow">&#9662;</span>
				</button>
				<div class:show={openMenu === 'file'} class="menu">
					<button type="button" onclick={() => { onNewDocument(); closeMenu() }}>New document</button>
					<button type="button" onclick={closeMenu}>Open SVG</button>
					<div class="sep"></div>
					<button type="button" onclick={closeMenu}>Export</button>
				</div>
			</div>
			<div class="dd">
				<button
					class="mbtn"
					type="button"
					aria-expanded={openMenu === 'edit'}
					onclick={(event) => toggleMenu('edit', event)}
				>
					Edit <span class="arrow">&#9662;</span>
				</button>
				<div class:show={openMenu === 'edit'} class="menu">
					<button type="button" onclick={closeMenu}>Undo</button>
					<button type="button" onclick={closeMenu}>Redo</button>
				</div>
			</div>
		</div>
	</div>
	<div class="meta">
		{#if activeDocument}
			<span>{activeDocument.width} x {activeDocument.height}</span>
		{/if}
	</div>
</header>

<style>
	.top {
		--toolbar: #4c97ff;
		--toolbar-hover: rgba(255, 255, 255, 0.2);
		--surface-white: #ffffff;
		--surface-border: #d9e3f2;
		--surface-shadow: rgba(20, 37, 63, 0.18);
		--text-strong: #24324a;

		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 12px;
		background: var(--toolbar);
		color: white;
		z-index: 10;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.menus,
	.meta {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.meta {
		font-size: 13px;
	}

	.dd {
		position: relative;
		display: inline-block;
	}

	.mbtn {
		min-height: 28px;
		padding: 0 8px;
		border: none;
		border-radius: 4px;
		background: transparent;
		color: white;
		font: inherit;
		font-size: 14px;
		cursor: pointer;
	}

	.mbtn:hover,
	.mbtn[aria-expanded="true"] {
		background: rgba(255, 255, 255, 0.16);
	}

	.arrow {
		font-size: 8px;
		opacity: 0.8;
	}

	.menu {
		position: absolute;
		top: 36px;
		left: 0;
		display: none;
		min-width: 190px;
		padding: 4px 0;
		border: 1px solid var(--surface-border);
		border-radius: 0 0 4px 4px;
		background: var(--surface-white);
		box-shadow: 0 8px 24px var(--surface-shadow);
	}

	.menu.show {
		display: block;
	}

	.menu button {
		display: block;
		width: 100%;
		padding: 9px 14px;
		border: none;
		background: transparent;
		color: var(--text-strong);
		text-align: left;
		font: inherit;
		font-size: 13px;
		cursor: pointer;
	}

	.menu button:hover {
		background: #e8f1ff;
	}

	.sep {
		height: 1px;
		margin: 4px 0;
		background: var(--surface-border);
	}

</style>
