import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  NoBlending,
  DoubleSide,
} from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import DOMContext from '../renderers/DOMContext.js';
import { cssFactor } from '../constants.js';

/**
 * DOM element that is projected into 3D space
 */
class DOMElement extends Mesh {
  /**
   * Creates a DOM element that is projected into 3D space
   * @param {DOMContext} context A DOM context instance to draw on
   * @param {HTMLElement} domElement A DOM element to project
   * @param {Object} [options] DOM element options
   * @param {number} [options.elementWidth=768] DOM element width
   * @param {number} [options.width=1] 3D plane width
   * @param {number} [options.height=0.75] 3D plane height
   */
  constructor(
    context,
    domElement,
    options
  ) {
    const { elementWidth = 768, width = 1, height = 0.75 } = options || {};

    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({
      opacity: 0,
      color: 0xffffff,
      blending: NoBlending,
      side: DoubleSide,
    });

    super(geometry, material);

    this.domElement = domElement;
    this.aspectRatio = height / width;
    this.elementWidth = elementWidth;
    this.elementHeight = this.elementWidth * this.aspectRatio;
    this.width = width;
    this.height = height;

    this.resizeDomElement();

    this.cssObject = new CSS3DObject(this.domElement);
    this.cssObject.scale.multiplyScalar(cssFactor / (this.elementWidth / this.width));

    this.addEventListener('added', () => context.cssScene.add(this.cssObject));
    this.addEventListener('removed', () => context.cssScene.remove(this.cssObject));

    this.update = this.update.bind(this);
  }

  /**
   * Resizes DOM element to sync with projection
   */
  resizeDomElement() {
    this.domElement.style.width = `${this.elementWidth}px`;
    this.domElement.style.height = `${this.elementHeight}px`;
  }

  /**
   * Updates the projected DOM element
   * @param {HTMLElement} domElement A DOM element to project
   */
  setDomElement(domElement) {
    if (this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
    }

    this.domElement = domElement;
    this.cssObject.element = domElement;

    this.resizeDomElement();
  }

  /**
   * Updates the DOM element and its projection states
   */
  update() {
    this.updateMatrixWorld();
    const worldMatrix = this.matrixWorld;

    worldMatrix.decompose(this.position, this.quaternion, this.scale);

    this.cssObject.quaternion.copy(this.quaternion);
    this.cssObject.position.copy(this.position).multiplyScalar(cssFactor);

    const scaleFactor =
      this.elementWidth / (this.geometry.parameters.width * this.scale.x);

    this.cssObject.scale.multiplyScalar(cssFactor / scaleFactor);
    this.cssObject.visible = this.visible;
  }
}

export default DOMElement;
