import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  NoBlending,
  DoubleSide,
  Vector3,
  Quaternion,
} from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { cssFactor } from '../constants.js';

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

    this.position = new Vector3();
    this.scale = new Vector3();
    this.quaternion = new Quaternion();

    this.resizeDomElement();

    this.cssObject = new CSS3DObject(this.domElement);
    this.cssObject.scale.multiplyScalar(cssFactor / (this.elementWidth / this.width));

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
