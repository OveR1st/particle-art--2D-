(()=>{"use strict";const t=(t,i)=>Math.random()*(i-t)+t;(new class{constructor(){this.canvas=document.getElementById("canvas"),this.dpr=window.devicePixelRatio||1,this.ctx=this.canvas.getContext("2d"),this.ctx.scale(this.dpr,this.dpr),this.art=new Image,this.art.crossOrigin="Anonymous",this.artSrc="https://s3-us-west-2.amazonaws.com/s.cdpn.io/204808/mj.png",this.particles={},this.particleIds=[],this.setCanvasSize()}setCanvasSize(){this.canvas.width=window.innerWidth*this.dpr,this.canvas.height=window.innerHeight*this.dpr,this.canvas.style.width=window.innerWidth+"px",this.canvas.style.height=window.innerHeight+"px"}createParticles(){this.ctx.drawImage(this.art,0,0);const i=this.ctx.getImageData(0,0,this.art.width,this.art.height);for(let s=0;s<i.height;s++)for(let h=0;h<i.width;h++)if(i.data[4*s*i.width+4*h+3]>128&&t(1,1e3)<50){const i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const i=16*Math.random()|0;return("x"==t?i:3&i|8).toString(16)})),a=`hsla(${t(0,360)}, ${t(0,100)}%, ${t(0,100)}%, ${t(0,.7)})`,e={[i]:{x:h,y:s,size:t(1,5),color:a}};Object.assign(this.particles,e),this.particleIds.push(i)}}drawParticles(){this.particleIds.map((t=>{const i=this.particles[t],s=window.innerWidth/2-this.art.width/2+i.x,h=window.innerHeight/2-this.art.height/2+i.y;this.ctx.beginPath(),this.ctx.arc(s*this.dpr,h*this.dpr,i.size*this.dpr,0,2*Math.PI),this.ctx.fillStyle=i.color,this.ctx.fill()}))}render(){this.art.onload=()=>{this.createParticles(),this.drawParticles()},this.art.src=this.artSrc}}).render()})();
//# sourceMappingURL=bundle.cfa1432ce889fc49fb6c.js.map