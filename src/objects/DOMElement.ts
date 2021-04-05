import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  NoBlending,
  DoubleSide,
  Vector3,
  Box3,
} from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { DOMContext } from '../renderers/DOMContext';
import { cssFactor } from '../constants';

export class DOMElement extends Mesh {
  /**
   * The active `DOMContext` to draw on
   */
  context: DOMContext;
  /**
   * The projected 2D DOM element
   */
  domElement: HTMLElement;
  /**
   * DOM element aspect artio
   */
  aspectRatio: number;
  /**
   * DOM element width
   */
  elementWidth: number;
  /**
   * DOM element height
   */
  elementHeight: number;
  /**
   * 3D projection width
   */
  width: number;
  /**
   * 3D projection height
   */
  height: number;
  /**
   * The projecting 3D object
   */
  cssObject: CSS3DObject;
  /**
   * Internal `Vector3` for WebGL size/scale calculations
   */
  size: Vector3;
  /**
   * Internal `Box` used for bounding box calculations
   */
  box: Box3;

  /**
   * DOM element that is projected into 3D space
   * @param context A DOM context instance to draw on
   * @param domElement A DOM element to project
   * @param options DOM element options
   * @param options.elementWidth DOM element width
   * @param options.width 3D plane width
   * @param options.height 3D plane height
   */
  constructor(
    context: DOMContext,
    domElement: HTMLElement,
    { elementWidth = 768, width = 1, height = 0.75 } = {}
  ) {
    // Create portal mesh
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({
      opacity: 0,
      blending: NoBlending,
      side: DoubleSide,
    });
    super(geometry, material);

    // Expose params
    this.context = context;
    this.domElement = domElement;
    this.aspectRatio = height / width;
    this.elementWidth = elementWidth;
    this.elementHeight = this.elementWidth * this.aspectRatio;
    this.width = width;
    this.height = height;

    // Set initial size
    this.resizeElement();

    // Init 3D DOM
    this.cssObject = new CSS3DObject(this.domElement);
    this.cssObject.scale.multiplyScalar(cssFactor / (this.elementWidth / this.width));

    // Init helpers
    this.size = new Vector3();
    this.box = new Box3();

    // Init events
    this.addEventListener('added', this.handleAdded);
    this.addEventListener('removed', this.handleRemoved);

    // Bind update
    this.update = this.update.bind(this);
  }

  /**
   * Adds the current cssObject to the scene
   */
  handleAdded() {
    this.context.cssScene.add(this.cssObject);
  }

  /**
   * Removes the current cssObject from the scene
   */
  handleRemoved() {
    this.context.cssScene.remove(this.cssObject);
  }

  /**
   * Resizes DOM element to sync with projection
   */
  resizeElement() {
    this.domElement.style.width = `${this.elementWidth}px`;
    this.domElement.style.height = `${this.elementHeight}px`;
  }

  /**
   * Updates the projected DOM element
   * @param domElement A DOM element to project
   */
  setElement(domElement: HTMLElement) {
    // Cleanup previous element
    if (this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
    }

    // Set new element
    this.domElement = domElement;
    this.cssObject.element = domElement;

    // Reset element size
    this.resizeElement();
  }

  /**
   * Updates the DOM element and its projection states
   */
  update() {
    // Get global transform
    this.updateMatrixWorld();
    const worldMatrix = this.matrixWorld;
    worldMatrix.decompose(this.position, this.quaternion, this.scale);

    // Sync CSS properties with WebGL mesh
    this.cssObject.quaternion.copy(this.quaternion);
    this.cssObject.position.copy(this.position).multiplyScalar(cssFactor);

    // Calculate CSS scale factor
    this.box.setFromObject(this).getSize(this.size);
    const scaleFactor = this.elementWidth / (this.size.x * this.scale.x);

    // Sync CSS scale with WebGL projection
    this.cssObject.scale.multiplyScalar(cssFactor / scaleFactor);
    this.cssObject.visible = this.visible;
  }

  /**
   * Disposes WebGL and DOM elements
   */
  dispose() {
    // Cleanup events
    this.removeEventListener('added', this.handleAdded);
    this.removeEventListener('removed', this.handleRemoved);

    // Cleanup DOM
    this.domElement.remove();

    // Cleanup WebGL
    this.geometry.dispose();
    (this.material as MeshBasicMaterial).dispose();
  }
}
