import { PerspectiveCamera, Scene } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { DOMElement } from '../objects/DOMElement';
import { cssFactor } from '../constants';

export class DOMContext {
  enabled: boolean;
  cssRenderer: CSS3DRenderer;
  domElement: HTMLElement;
  cssCamera: PerspectiveCamera;
  camera: PerspectiveCamera;
  cssScene: Scene;

  /**
   * DOM context instance
   * @param camera  A perspective camera instance to draw from
   */
  constructor(camera: PerspectiveCamera) {
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
   * @param width Target width
   * @param height Target height
   */
  setSize(width: number, height: number) {
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
        const element = child as DOMElement;

        if (!element.update) return;

        element.update();
      });
    }

    this.cssRenderer.render(this.cssScene, this.cssCamera);
  }
}
