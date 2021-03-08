import { PerspectiveCamera, Scene } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { cssFactor } from '../constants.js';

/**
 * A DOM context instance
 */
class DOMContext {
  /**
   * Creates a DOM context instance
   * @param {PerspectiveCamera} camera A perspective camera instance to draw from
   */
  constructor(camera) {
    this.enabled = true;

    this.cssRenderer = new CSS3DRenderer();
    this.domElement = this.cssRenderer.domElement;

    this.cssCamera = new PerspectiveCamera(
      camera.fov,
      camera.aspect,
      camera.near * cssFactor,
      camera.far * cssFactor
    );
    this.camera = camera;

    this.cssScene = new Scene();

    this.update = this.update.bind(this);
  }

  /**
   * Resizes the DOM context's renderer and camera
   * @param {number} width Target width
   * @param {number} height Target height
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
    this.cssCamera.quaternion.copy(this.camera.quaternion);
    this.cssCamera.position.copy(this.camera.position).multiplyScalar(cssFactor);

    if (this.enabled) {
      this.cssScene.traverse(child => {
        if (!child.update) return;

        child.update();
      });
    }

    this.cssRenderer.render(this.cssScene, this.cssCamera);
  }
}

export default DOMContext;
