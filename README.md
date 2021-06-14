# three-dom-elements [![npm](https://img.shields.io/npm/v/three-dom-elements.svg)](https://www.npmjs.com/package/three-dom-elements) [![Minzipped](https://badgen.net/bundlephobia/minzip/three-dom-elements)](https://www.npmjs.com/package/three-dom-elements) [![npm](https://img.shields.io/npm/dt/three-dom-elements.svg)](https://www.npmjs.com/package/three-dom-elements) [![License](https://badgen.net/npm/license/three-dom-elements)](https://www.npmjs.com/package/three-dom-elements)

A lightweight [three.js](https://github.com/mrdoob/three.js) extension to integrate DOM elements into your scene.

## Usage

The following projects an iFrame into a threejs scene as a plane. You can use this plane as normal with techniques like raycasting, etc.

View the [live demo](https://codesandbox.io/s/three-dom-elements-cg2uc).

```js
import { DOMContext, DOMElement } from 'three-dom-elements';

// Create a DOM context to draw with
const context = new DOMContext(camera);
context.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(context.domElement);

// Create an element to project
const element = document.createElement('iframe');
element.src = 'https://threejs.org';
element.style.border = 'none';

// Project it
const element = new DOMElement(context, element);
scene.add(element);
```

[![Demo preview](https://codesandbox.io/api/v1/sandboxes/three-dom-elements-cg2uc/screenshot.png)](https://codesandbox.io/s/three-dom-elements-cg2uc)
