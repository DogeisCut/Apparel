import { browser } from '$app/environment';

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
		return svg;
	}

	ensureSvgElement() {
		this.svg ??= this.createSvgElement();
		return this.svg;
	}
}
