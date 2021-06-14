/**
 * Useful for projecting to scale high-resolution DOM elements
 */
export const cssFactor: 100;
export class DOMContext {
    /**
     * DOM context instance
     * @param {PerspectiveCamera} camera  A perspective camera instance to draw from
     */
    constructor(camera: PerspectiveCamera);
    /**
     * Whether to enable the `DOMContext` and its projection. Default is `true.`
     */
    enabled: boolean;
    /**
     * Renderer used for rendering the DOM
     */
    cssRenderer: CSS3DRenderer;
    /**
     * Target DOM element to render to
     */
    domElement: HTMLElement;
    /**
     * Camera used for CSS projection
     */
    cssCamera: PerspectiveCamera;
    /**
     * Parent camera used to sync with WebGL
     */
    camera: PerspectiveCamera;
    /**
     * CSS scene used to contain CSS projections
     */
    cssScene: Scene;
    /**
     * Updates the DOM context's renderer and camera states
     */
    update(): void;
    /**
     * Resizes the DOM context's renderer and camera
     * @param {Number} width Target width
     * @param {Number} height Target height
     */
    setSize(width: number, height: number): void;
}
export class DOMElement extends Mesh<import("three").BufferGeometry, import("three").Material | import("three").Material[]> {
    /**
     * DOM element that is projected into 3D space
     * @param {DOMContext} context A DOM context instance to draw on
     * @param {HTMLElement} domElement A DOM element to project
     * @param {Object} options DOM element options
     * @param {Number} options.elementWidth DOM element width
     * @param {Number} options.width 3D plane width
     * @param {Number} options.height 3D plane height
     */
    constructor(context: DOMContext, domElement: HTMLElement, { elementWidth, width, height }?: {
        elementWidth: number;
        width: number;
        height: number;
    });
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
     * Updates the DOM element and its projection states
     */
    update(): void;
    /**
     * Adds the current cssObject to the scene
     */
    handleAdded(): void;
    /**
     * Removes the current cssObject from the scene
     */
    handleRemoved(): void;
    /**
     * Resizes DOM element to sync with projection
     */
    resizeElement(): void;
    /**
     * Updates the projected DOM element
     * @param {HTMLElement} domElement A DOM element to project
     */
    setElement(domElement: HTMLElement): void;
    /**
     * Disposes WebGL and DOM elements
     */
    dispose(): void;
}
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";
import { Mesh } from "three/src/objects/Mesh";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Vector3 } from "three/src/math/Vector3";
import { Box3 } from "three/src/math/Box3";
