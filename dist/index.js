var e=require("three"),t=require("three/examples/jsm/renderers/CSS3DRenderer");function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var i=function(i){var n,r;function o(s,n,r){var o,h=void 0===r?{}:r,a=h.elementWidth,c=void 0===a?768:a,d=h.width,l=void 0===d?1:d,m=h.height,p=void 0===m?.75:m,u=new e.PlaneGeometry(l,p),v=new e.MeshBasicMaterial({opacity:0,blending:e.NoBlending,side:e.DoubleSide});return(o=i.call(this,u,v)||this).context=s,o.domElement=n,o.aspectRatio=p/l,o.elementWidth=c,o.elementHeight=o.elementWidth*o.aspectRatio,o.width=l,o.height=p,o.resizeElement(),o.cssObject=new t.CSS3DObject(o.domElement),o.cssObject.scale.multiplyScalar(100/(o.elementWidth/o.width)),o.size=new e.Vector3,o.box=new e.Box3,o.addEventListener("added",o.handleAdded),o.addEventListener("removed",o.handleRemoved),o.update=o.update.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(o)),o}r=i,(n=o).prototype=Object.create(r.prototype),n.prototype.constructor=n,s(n,r);var h=o.prototype;return h.handleAdded=function(){this.context.cssScene.add(this.cssObject)},h.handleRemoved=function(){this.context.cssScene.remove(this.cssObject)},h.resizeElement=function(){this.domElement.style.width=this.elementWidth+"px",this.domElement.style.height=this.elementHeight+"px"},h.setElement=function(e){this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=e,this.cssObject.element=e,this.resizeElement()},h.update=function(){this.updateMatrixWorld(),this.matrixWorld.decompose(this.position,this.quaternion,this.scale),this.cssObject.quaternion.copy(this.quaternion),this.cssObject.position.copy(this.position).multiplyScalar(100),this.box.setFromObject(this).getSize(this.size),this.cssObject.scale.multiplyScalar(100/(this.elementWidth/(this.size.x*this.scale.x))),this.cssObject.visible=this.visible},h.dispose=function(){this.removeEventListener("added",this.handleAdded),this.removeEventListener("removed",this.handleRemoved),this.domElement.remove(),this.geometry.dispose(),this.material.dispose()},o}(e.Mesh);exports.DOMContext=function(){function s(s){this.enabled=!0,this.cssRenderer=new t.CSS3DRenderer,this.domElement=this.cssRenderer.domElement,this.cssCamera=new e.PerspectiveCamera(s.fov,s.aspect,100*s.near,100*s.far),this.camera=s,this.cssScene=new e.Scene,this.update=this.update.bind(this)}var i=s.prototype;return i.setSize=function(e,t){this.cssRenderer.setSize(e,t),this.cssCamera.aspect=e/t,this.cssCamera.updateProjectionMatrix()},i.update=function(){this.cssCamera.quaternion.copy(this.camera.quaternion),this.cssCamera.position.copy(this.camera.position).multiplyScalar(100),this.enabled&&this.cssScene.traverse(function(e){e.update&&e.update()}),this.cssRenderer.render(this.cssScene,this.cssCamera)},s}(),exports.DOMElement=i,exports.cssFactor=100;
//# sourceMappingURL=index.js.map