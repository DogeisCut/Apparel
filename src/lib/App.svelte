<script>
	import { onMount } from "svelte";
	import { Document } from "./Document.svelte.js";
	import AppTopBar from "./AppTopBar.svelte";
	import DocumentList from "./DocumentList.svelte";
	import DocumentEditor from "./DocumentEditor.svelte";

	/**
	 * @type {Document[]}
	 */
	let documents = $state([]);
	/**
	 * @type {Document | null}
	 */
	let activeDocument = $state(null);

	function createDocument(
		name = `Untitled Document${documents.length ? documents.length + 1 : ""}`,
	) {
		const doc = new Document(name);
		documents.push(doc);
		activeDocument = doc;
	}

	/**
	 * @param {Document} document
	 */
	function selectDocument(document) {
		activeDocument = document;
	}

	onMount(() => {
		createDocument();
	});
</script>

<!-- see, sveltekit isnt That bad! -->
<main class="app">
	<AppTopBar onNewDocument={() => createDocument()} {activeDocument} />
	<div class="shell">
		<DocumentList
			{documents}
			{activeDocument}
			onSelectDocument={selectDocument}
		/>
		{#if activeDocument}
			<DocumentEditor document={activeDocument} />
		{:else}
			<p class="load">Opening document...</p>
		{/if}
	</div>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html),
	:global(body) {
		width: 100%;
		height: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		font-family: Ubuntu, "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-weight: 400;
		background: #0f1720;
		color: #24324a;
	}

	.app {
		display: grid;
		grid-template-rows: 44px 1fr;
		min-height: 100vh;
		height: 100vh;
		width: 100vw;
	}

	.shell {
		display: grid;
		grid-template-columns: 150px minmax(0, 1fr);
		min-height: 0;
	}

	.load {
		margin: 0;
		padding: 24px;
		background: #f5f8ff;
	}
</style>
