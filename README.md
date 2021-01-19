# three-dom-elements

[![Latest NPM release](https://img.shields.io/npm/v/three-dom-elements.svg)](https://www.npmjs.com/package/three-dom-elements)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/three-dom-elements)](https://bundlephobia.com/result?p=three-dom-elements)
[![License](https://img.shields.io/badge/license-MIT-007ec6.svg)](https://github.com/CodyJasonBennett/three-dom-elements/blob/master/LICENSE)

A lightweight [three.js](https://github.com/mrdoob/three.js) extension to integrate DOM elements into your scene. View the [live demo](https://three-dom-elements.codyb.co) ([source](/examples/index.html)).

## Usage

The following projects an iFrame into a threejs scene as a plane.
You can use this plane as normal with techniques like raycasting, etc.

```js
import { DOMContext, DOMElement } from 'three-dom-elements';

const context = new DOMContext(camera);
context.setSize(innerWidth, innerHeight);
document.body.appendChild(context.domElement);

const iFrame = document.createElement('iframe');
iFrame.src = 'https://threejs.org';
iFrame.style.border = 'none';

const element = new DOMElement(context, iFrame);
scene.add(element);

const handleResize = () => {
  const { innerWidth, innerHeight } = window;

  renderer.setSize(innerWidth, innerHeight);
  context.setSize(innerWidth, innerHeight);

  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', handleResize);

renderer.setAnimationLoop(() => {
  context.update();

  renderer.render(scene, camera);
});
```
