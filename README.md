# three-dom-elements

[![Latest NPM release](https://img.shields.io/npm/v/three-dom-elements.svg)](https://www.npmjs.com/package/three-dom-elements)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/three-dom-elements)](https://bundlephobia.com/result?p=three-dom-elements)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/CodyJasonBennett/three-dom-elements/blob/master/LICENSE)

A lightweight [three.js](https://github.com/mrdoob/three.js) extension to integrate DOM elements into your scene. View the [live demo](https://three-dom-elements.codyb.co) ([source](/examples/index.html)).

## Usage

The following projects an iFrame into a threejs scene as a plane.
You can use this plane as normal with techniques like raycasting, etc.

View the [live demo](https://codesandbox.io/s/three-dom-elements-cg2uc).

```js
import { WebGLRenderer, PerspectiveCamera, Scene } from 'three';
import { DOMContext, DOMElement } from 'three-dom-elements';

const { innerWidth, innerHeight } = window;

// Three boilerplate
const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.01, 10);
camera.position.z = 2;

const scene = new Scene();

// Create a DOM context to draw from
const context = new DOMContext(camera);
context.setSize(innerWidth, innerHeight);
document.body.appendChild(context.domElement);

// Create a DOM element
const iFrame = document.createElement('iframe');
iFrame.src = 'https://threejs.org';
iFrame.style.border = 'none';

// Project it
const element = new DOMElement(context, iFrame);
scene.add(element);

// Render
renderer.setAnimationLoop(() => {
  context.update();

  renderer.render(scene, camera);
});
```
