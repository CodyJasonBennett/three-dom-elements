import{Vector3 as e,Quaternion as t,PerspectiveCamera as s,Scene as i,PlaneGeometry as n,MeshBasicMaterial as r,NoBlending as o,DoubleSide as a,Mesh as c}from"three";import{CSS3DRenderer as d,CSS3DObject as h}from"three/examples/jsm/renderers/CSS3DRenderer.js";var m=function(){function e(e){this.enabled=!0,this.cssRenderer=new d,this.domElement=this.cssRenderer.domElement,this.cssCamera=new s(e.fov,e.aspect,100*e.near,100*e.far),this.camera=e,this.cssScene=new i,this.update=this.update.bind(this)}var t=e.prototype;return t.setSize=function(e,t){this.cssRenderer.setSize(e,t),this.cssCamera.aspect=e/t,this.cssCamera.updateProjectionMatrix()},t.update=function(){this.cssCamera.quaternion.copy(this.camera.quaternion),this.cssCamera.position.copy(this.camera.position).multiplyScalar(100),this.enabled&&this.cssScene.traverse(function(e){e.update&&e.update()}),this.cssRenderer.render(this.cssScene,this.cssCamera)},e}(),l=function(s){var i,c;function d(e,t,i){var c,d=void 0===i?{}:i,m=d.elementWidth,l=void 0===m?768:m,p=d.width,u=void 0===p?1:p,f=d.height,v=void 0===f?.75:f,y=new n(u,v),E=new r({opacity:0,color:16777215,blending:o,side:a});return(c=s.call(this,y,E)||this).domElement=t,c.aspectRatio=v/u,c.elementWidth=l,c.elementHeight=c.elementWidth*c.aspectRatio,c.width=u,c.height=v,c.resizeDomElement(),c.cssObject=new h(c.domElement),c.cssObject.scale.multiplyScalar(100/(c.elementWidth/c.width)),c.addEventListener("added",function(){return e.cssScene.add(c.cssObject)}),c.addEventListener("removed",function(){return e.cssScene.remove(c.cssObject)}),c.update=c.update.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(c)),c}c=s,(i=d).prototype=Object.create(c.prototype),i.prototype.constructor=i,i.__proto__=c;var m=d.prototype;return m.resizeDomElement=function(){this.domElement.style.width=this.elementWidth+"px",this.domElement.style.height=this.elementHeight+"px"},m.setDomElement=function(e){this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=e,this.cssObject.element=e,this.resizeDomElement()},m.update=function(){this.updateMatrixWorld();var s=this.matrixWorld,i=new e,n=new e,r=new t;s.decompose(i,r,n),this.cssObject.quaternion.copy(r),this.cssObject.position.copy(i).multiplyScalar(100),this.cssObject.scale.multiplyScalar(100/(this.elementWidth/(this.geometry.parameters.width*n.x)))},d}(c);export{m as DOMContext,l as DOMElement};
//# sourceMappingURL=index.module.js.map
