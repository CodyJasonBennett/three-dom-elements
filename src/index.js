import {
  PerspectiveCamera,
  Scene,
  MeshBasicMaterial,
  NoBlending,
  DoubleSide,
  PlaneGeometry,
  Mesh,
  Vector3,
  Quaternion,
} from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const cssFactor = 100;

class DOMContext {
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

  setSize(width, height) {
    this.cssRenderer.setSize(width, height);
    this.cssCamera.aspect = width / height;
    this.cssCamera.updateProjectionMatrix();
  }

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

class DOMElement extends Mesh {
  constructor(
    context,
    domElement,
    { elementWidth = 768, width = 1, height = 0.75 } = {}
  ) {
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
    this.cssObject.scale
      .multiplyScalar(cssFactor / (this.elementWidth / this.width));

    this.addEventListener('added', () => context.cssScene.add(this.cssObject));
    this.addEventListener('removed', () => context.cssScene.remove(this.cssObject));

    this.update = this.update.bind(this);
  }

  resizeDomElement() {
    this.domElement.style.width = `${this.elementWidth}px`;
    this.domElement.style.height = `${this.elementHeight}px`;
  }

  setDomElement(domElement) {
    if (this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
    }

    this.domElement = domElement;
    this.cssObject.element = domElement;

    this.resizeDomElement();
  }

  update() {
    this.updateMatrixWorld();
    const worldMatrix = this.matrixWorld;

    const position = new Vector3();
    const scale = new Vector3();
    const quaternion = new Quaternion();
    worldMatrix.decompose(position, quaternion, scale);

    this.cssObject.quaternion.copy(quaternion);
    this.cssObject.position.copy(position).multiplyScalar(cssFactor);

    const scaleFactor =
      this.elementWidth / (this.geometry.parameters.width * scale.x);

    this.cssObject.scale.multiplyScalar(cssFactor / scaleFactor);
  }
}

export { DOMContext, DOMElement };
