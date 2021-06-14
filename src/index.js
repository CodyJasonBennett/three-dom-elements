import {
  PerspectiveCamera,
  Scene,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  NoBlending,
  DoubleSide,
  Vector3,
  Box3,
} from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

/**
 * Useful for projecting to scale high-resolution DOM elements
 */
export const cssFactor = 100;

export class DOMContext {
  /**
   * Whether to enable the `DOMContext` and its projection. Default is `true.`
   */
  enabled;
  /**
   * Renderer used for rendering the DOM
   */
  cssRenderer;
  /**
   * Target DOM element to render to
   */
  domElement;
  /**
   * Camera used for CSS projection
   */
  cssCamera;
  /**
   * Parent camera used to sync with WebGL
   */
  camera;
  /**
   * CSS scene used to contain CSS projections
   */
  cssScene;

  /**
   * DOM context instance
   * @param {PerspectiveCamera} camera  A perspective camera instance to draw from
   */
  constructor(camera) {
    // Set default settings
    this.enabled = true;

    // Init renderer
    this.cssRenderer = new CSS3DRenderer();
    this.domElement = this.cssRenderer.domElement;

    // Init camera
    this.cssCamera = new PerspectiveCamera(
      camera.fov,
      camera.aspect,
      camera.near * cssFactor,
      camera.far * cssFactor
    );
    this.camera = camera;

    // Init scene
    this.cssScene = new Scene();

    // Bind update
    this.update = this.update.bind(this);
  }

  /**
   * Resizes the DOM context's renderer and camera
   * @param {Number} width Target width
   * @param {Number} height Target height
   */
  setSize(width, height) {
    this.cssRenderer.setSize(width, height);
    this.cssCamera.aspect = width / height;
    this.cssCamera.updateProjectionMatrix();
  }

  /**
   * Updates the DOM context's renderer and camera states
   */
  update() {
    // Sync CSS camera with WebGL camera
    this.cssCamera.quaternion.copy(this.camera.quaternion);
    this.cssCamera.position.copy(this.camera.position).multiplyScalar(cssFactor);

    // Update descendants
    if (this.enabled) {
      this.cssScene.traverse(element => {
        if (!element.update) return;

        element.update();
      });
    }

    // Render projection
    this.cssRenderer.render(this.cssScene, this.cssCamera);
  }
}

export class DOMElement extends Mesh {
  /**
   * The active `DOMContext` to draw on
   */
  context;
  /**
   * The projected 2D DOM element
   */
  domElement;
  /**
   * DOM element aspect artio
   */
  aspectRatio;
  /**
   * DOM element width
   */
  elementWidth;
  /**
   * DOM element height
   */
  elementHeight;
  /**
   * 3D projection width
   */
  width;
  /**
   * 3D projection height
   */
  height;
  /**
   * The projecting 3D object
   */
  cssObject;
  /**
   * Internal `Vector3` for WebGL size/scale calculations
   */
  size;
  /**
   * Internal `Box` used for bounding box calculations
   */
  box;

  /**
   * DOM element that is projected into 3D space
   * @param {DOMContext} context A DOM context instance to draw on
   * @param {HTMLElement} domElement A DOM element to project
   * @param {Object} options DOM element options
   * @param {Number} options.elementWidth DOM element width
   * @param {Number} options.width 3D plane width
   * @param {Number} options.height 3D plane height
   */
  constructor(
    context,
    domElement,
    { elementWidth = 768, width = 1, height = 0.75 } = {}
  ) {
    // Create portal mesh
    const geometry = new PlaneGeometry(width, height);
    const material = new MeshBasicMaterial({
      transparent: true,
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
   * @param {HTMLElement} domElement A DOM element to project
   */
  setElement(domElement) {
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
    this.material.dispose();
  }
}
