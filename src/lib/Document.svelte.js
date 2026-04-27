import { browser } from '$app/environment';
import startingSvg from '$lib/assets/starting.svg?raw'
import DOMPurify from 'dompurify'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export class Document {
	name = $state('Untitled Document');
	width = $state(600);
	height = $state(400);
	/** @type {SVGSVGElement | null} */
	svg = $state(null);

	constructor(name = 'Untiled Document', width = 600, height = 400) {
		this.name = name;
		this.width = width;
		this.height = height;
		this.svg = this.createSvgElement();
	}

	createSvgElement() {
		if (!browser) {
			return null;
		}

		const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
		svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttribute('width', String(this.width));
		svg.setAttribute('height', String(this.height));
		svg.setAttribute('role', 'img');
		svg.setAttribute('aria-label', this.name);
		
		return this.importSvg(startingSvg);
	}

	ensureSvgElement() {
		this.svg ??= this.createSvgElement();
		return this.svg;
	}

	/**
	 * @returns {SVGSVGElement}
	 * @param {string} x
	 */
	importSvg(x) {
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(DOMPurify.sanitize(this.sanitize(x), { USE_PROFILES: { svg: true, svgFilters: true } }), 'image/svg+xml');
		// @ts-ignore
		return svgDoc.documentElement;
	}

	/**
	 * @param {string} x
	 */
	sanitize(x) {
		// yeah i'll be totally honest, i AI generated this function BUT THIS FUNCTION ALONE
		// im no security expert so there was no way I would figured this all out on my own (in a reasonable amount of time), even with online research.

		// 1. Processing instructions
		// <?xml-stylesheet ... ?> can load an external stylesheet that leaks
		// document content via CSS selectors (a classic timing/exfil attack).
		x = x.replace(/<\?[\s\S]*?\?>/g, '');

		// 2. Executable elements
		// <script> is the obvious one; strip the tag *and* its contents.
		x = x.replace(/<script[\s\S]*?<\/script\s*>/gi, '');
		x = x.replace(/<script[^>]*>/gi, '');           // self-closing / unclosed

		// <foreignObject> embeds arbitrary HTML inside SVG, giving a script a
		// fresh HTML execution context that bypasses SVG sandboxing.
		x = x.replace(/<foreignObject[\s\S]*?<\/foreignObject\s*>/gi, '');
		x = x.replace(/<foreignObject[^>]*>/gi, '');

		// 3. Event-handler attributes
		// Any on* attribute (onload, onclick, onmouseover, onerror, onbegin …)
		// can run JS without a <script> tag. Match quoted, unquoted, and empty.
		x = x.replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s/>]*)/gi, '');

		// 4. Dangerous URI schemes in linking attributes
		// href / xlink:href / src / action all accept URIs.  javascript: executes
		// code on navigation; data: can carry an HTML document with scripts.
		const URI_ATTRS = /(?:href|xlink:href|src|action|formaction)\s*=\s*/gi;
		x = x.replace(
			new RegExp(
				`(${URI_ATTRS.source})["']?\\s*(?:javascript|data|vbscript)\\s*:[^"'\\s>]*["']?`,
				'gi'
			),
			'$1""'
		);

		// 5. External references in <use>
		// <use href="https://evil.example/sprite.svg#anchor"> loads a foreign
		// document; the fetched SVG can contain scripts or trigger SSRF.
		// Strip the href/xlink:href when it points outside the document (#-only
		// fragment refs are safe and preserved).
		x = x.replace(
			/(<use[^>]+(?:href|xlink:href)\s*=\s*["'])(?!#)[^"']*["']/gi,
			'$1"'
		);

		// 6. CSS data-exfiltration vectors
		// @import can fetch an external stylesheet that encodes page content in
		// selector timing (the "CSS exfil" attack).
		x = x.replace(/@import\b[^;{]*/gi, '/* @import removed */');

		// url(javascript:…) and url(data:…) inside style attributes or <style>
		// blocks can execute code (legacy browsers) or load external content.
		x = x.replace(
			/url\s*\(\s*["']?\s*(?:javascript|data|vbscript)\s*:[^)]*\)/gi,
			'url(about:blank)'
		);

		// CSS expression() is an old IE mechanism for running JS inside styles.
		// Belt-and-suspenders removal; modern engines ignore it but strip anyway.
		x = x.replace(/expression\s*\(/gi, '(');

		return x;
	}
}
