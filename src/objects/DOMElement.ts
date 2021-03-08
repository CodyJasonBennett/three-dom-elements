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
   * @param domElement A DOM element to project
   */
  setDomElement(domElement: HTMLElement) {
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

    const size = new Vector3();
    new Box3().setFromObject(this).getSize(size);

    const scaleFactor = this.elementWidth / (size.x * this.scale.x);

    this.cssObject.scale.multiplyScalar(cssFactor / scaleFactor);
    this.cssObject.visible = this.visible;
  }
}
