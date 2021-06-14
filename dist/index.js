"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("three"),t=require("three/examples/jsm/renderers/CSS3DRenderer");class s extends e.Mesh{context;domElement;aspectRatio;elementWidth;elementHeight;width;height;cssObject;size;box;constructor(s,i,{elementWidth:h=768,width:n=1,height:d=.75}={}){super(new e.PlaneGeometry(n,d),new e.MeshBasicMaterial({transparent:!0,opacity:0,blending:e.NoBlending,side:e.DoubleSide})),this.context=s,this.domElement=i,this.aspectRatio=d/n,this.elementWidth=h,this.elementHeight=this.elementWidth*this.aspectRatio,this.width=n,this.height=d,this.resizeElement(),this.cssObject=new t.CSS3DObject(this.domElement),this.cssObject.scale.multiplyScalar(100/(this.elementWidth/this.width)),this.size=new e.Vector3,this.box=new e.Box3,this.addEventListener("added",this.handleAdded),this.addEventListener("removed",this.handleRemoved),this.update=this.update.bind(this)}handleAdded(){this.context.cssScene.add(this.cssObject)}handleRemoved(){this.context.cssScene.remove(this.cssObject)}resizeElement(){this.domElement.style.width=`${this.elementWidth}px`,this.domElement.style.height=`${this.elementHeight}px`}setElement(e){this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=e,this.cssObject.element=e,this.resizeElement()}update(){this.updateMatrixWorld();this.matrixWorld.decompose(this.position,this.quaternion,this.scale),this.cssObject.quaternion.copy(this.quaternion),this.cssObject.position.copy(this.position).multiplyScalar(100),this.box.setFromObject(this).getSize(this.size);const e=this.elementWidth/(this.size.x*this.scale.x);this.cssObject.scale.multiplyScalar(100/e),this.cssObject.visible=this.visible}dispose(){this.removeEventListener("added",this.handleAdded),this.removeEventListener("removed",this.handleRemoved),this.domElement.remove(),this.geometry.dispose(),this.material.dispose()}}exports.DOMContext=class{enabled;cssRenderer;domElement;cssCamera;camera;cssScene;constructor(s){this.enabled=!0,this.cssRenderer=new t.CSS3DRenderer,this.domElement=this.cssRenderer.domElement,this.cssCamera=new e.PerspectiveCamera(s.fov,s.aspect,100*s.near,100*s.far),this.camera=s,this.cssScene=new e.Scene,this.update=this.update.bind(this)}setSize(e,t){this.cssRenderer.setSize(e,t),this.cssCamera.aspect=e/t,this.cssCamera.updateProjectionMatrix()}update(){this.cssCamera.quaternion.copy(this.camera.quaternion),this.cssCamera.position.copy(this.camera.position).multiplyScalar(100),this.enabled&&this.cssScene.traverse((e=>{e.update&&e.update()})),this.cssRenderer.render(this.cssScene,this.cssCamera)}},exports.DOMElement=s,exports.cssFactor=100;
