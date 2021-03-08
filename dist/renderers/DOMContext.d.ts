import { PerspectiveCamera, Scene } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
export declare class DOMContext {
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
    constructor(camera: PerspectiveCamera);
    /**
     * Resizes the DOM context's renderer and camera
     * @param width Target width
     * @param height Target height
     */
    setSize(width: number, height: number): void;
    /**
     * Updates the DOM context's renderer and camera states
     */
    update(): void;
}
