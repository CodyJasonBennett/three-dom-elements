import{Mesh as e,PlaneGeometry as t,MeshBasicMaterial as s,NoBlending as i,DoubleSide as h,Vector3 as n,Quaternion as a,PerspectiveCamera as r,Scene as c}from"three";import{CSS3DObject as m,CSS3DRenderer as o}from"three/examples/jsm/renderers/CSS3DRenderer.js";class d extends e{constructor(e,r,{elementWidth:c=768,width:o=1,height:d=.75}={}){super(new t(o,d),new s({opacity:0,color:16777215,blending:i,side:h})),this.domElement=r,this.aspectRatio=d/o,this.elementWidth=c,this.elementHeight=this.elementWidth*this.aspectRatio,this.width=o,this.height=d,this.position=new n,this.scale=new n,this.quaternion=new a,this.resizeDomElement(),this.cssObject=new m(this.domElement),this.cssObject.scale.multiplyScalar(100/(this.elementWidth/this.width)),this.addEventListener("added",()=>e.cssScene.add(this.cssObject)),this.addEventListener("removed",()=>e.cssScene.remove(this.cssObject)),this.update=this.update.bind(this)}resizeDomElement(){this.domElement.style.width=`${this.elementWidth}px`,this.domElement.style.height=`${this.elementHeight}px`}setDomElement(e){this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=e,this.cssObject.element=e,this.resizeDomElement()}update(){this.updateMatrixWorld(),this.matrixWorld.decompose(this.position,this.quaternion,this.scale),this.cssObject.quaternion.copy(this.quaternion),this.cssObject.position.copy(this.position).multiplyScalar(100),this.cssObject.scale.multiplyScalar(100/(this.elementWidth/(this.geometry.parameters.width*this.scale.x))),this.cssObject.visible=this.visible}}class l{constructor(e){this.enabled=!0,this.cssRenderer=new o,this.domElement=this.cssRenderer.domElement,this.cssCamera=new r(e.fov,e.aspect,100*e.near,100*e.far),this.camera=e,this.cssScene=new c,this.update=this.update.bind(this)}setSize(e,t){this.cssRenderer.setSize(e,t),this.cssCamera.aspect=e/t,this.cssCamera.updateProjectionMatrix()}update(){this.cssCamera.quaternion.copy(this.camera.quaternion),this.cssCamera.position.copy(this.camera.position).multiplyScalar(100),this.enabled&&this.cssScene.traverse(e=>{e.update&&e.update()}),this.cssRenderer.render(this.cssScene,this.cssCamera)}}export{l as DOMContext,d as DOMElement};
//# sourceMappingURL=index.modern.js.map
