import { Mesh } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { DOMContext } from '../renderers/DOMContext';
export declare class DOMElement extends Mesh {
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
    constructor(context: DOMContext, domElement: HTMLElement, { elementWidth, width, height }?: {
        elementWidth?: number;
        width?: number;
        height?: number;
    });
    /**
     * Resizes DOM element to sync with projection
     */
    resizeDomElement(): void;
    /**
     * Updates the projected DOM element
     * @param domElement A DOM element to project
     */
    setDomElement(domElement: HTMLElement): void;
    /**
     * Updates the DOM element and its projection states
     */
    update(): void;
}
