p5.disableFriendlyErrors = true;

let crop;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;
let blurcanvas;

function preload() {
  img = loadImage('grass.jpeg');
  
  shaderblurh2 = loadShader('base.vert', 'blur.frag');
  shaderblurv2 = loadShader('base.vert', 'blur.frag');
  shaderdisp = loadShader('disp.vert', 'disp.frag');
  
}

function setup() {
  
  pixelDensity(1)
  
  crop = 50;
  
  canx = 800;
  cany = 800;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  canvas = createCanvas(canx, cany, WEBGL);
  
  rensphere = createGraphics(canx, cany, WEBGL); //
  renblurh2 = createGraphics(canx/2, cany/2, WEBGL); //
  renblurv2 = createGraphics(canx/2, cany/2, WEBGL); //
  rendisp2 = createGraphics(planex, planex, WEBGL); //
  
  setAttributes('antialias', false);
  setAttributes('alpha', false);
  setAttributes('version', 1);
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  
}

function draw() {
  console.log(frameRate());
//  background(0);

//  noStroke();
//  strokeWeight(1)
  push();
//  clear();
  rotateY(millis() * 0.000005 + 20);
  texture(img);
  
  stroke('white');
  sphere(650);
  pop();
  

 // blurcanvas.rect(0, 0, canx/2, cany/2);
  
  
  rensphere.noStroke();
  rensphere.push();
  rensphere.clear();
  rensphere.rotateY(millis() * 0.000005);
  rensphere.texture(img);
  rensphere.sphere(650);
  rensphere.pop();
  
  //blur canvas
  
  
  renblurh2.shader(shaderblurh2);
  shaderblurh2.setUniform('tex0', rensphere);
  shaderblurh2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurh2.setUniform('direction', [0.0, 1.0]);
  renblurh2.rect(0, 0, canx/2, cany/2);
  renblurv2.shader(shaderblurv2);
  shaderblurv2.setUniform('tex0', renblurh2);
  shaderblurv2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurv2.setUniform('direction', [1.0, 0.0]);
  renblurv2.rect(0, 0, canx/2, cany/2);
  
  
  //disp map blur onto rensphere
  rendisp2.shader(shaderdisp);
  shaderdisp.setUniform('tex0', renblurv2);
  shaderdisp.setUniform('tex1', rensphere);
  shaderdisp.setUniform('amt', .02);
  rendisp2.rect(0, 0, -canx, -cany);

  image(rendisp2, -planex/2, -planey/2, planex, planey);
  


}

/*
// fix speed, framerate

p5.disableFriendlyErrors = true; 

let font;
let crop;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;
let blurcanvas;

function preload() {
  img = loadImage('amarillo.jpg');
//  img = loadImage('grass.jpeg');
  
  shaderblurh2 = loadShader('base.vert', 'blur.frag');
  shaderblurv2 = loadShader('base.vert', 'blur.frag');
  shaderdisp = loadShader('disp.vert', 'disp.frag');
  
}

function setup() {

//  pixelDensity(1);
  setAttributes('antialias', false);
  setAttributes('alpha', false);
  setAttributes('depth', false);
  setAttributes('stencil', false);
  setAttributes('preserveDrawingBuffer', false);
  setAttributes('perPixelLighting', false);
  setAttributes('version', 1);
  
  crop = 50;
  
  canx = 800;
  cany = 800;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  canvas = createCanvas(canx, cany, WEBGL);
 // canvas.id("canvas");
  
  
  rensphere = createGraphics(canx, cany, WEBGL); //
//  rensphere.id("rensphereid")
  renblurh2 = createGraphics(canx/2, cany/2, WEBGL); //
//  renblurh2.id("renblurh2id")
  renblurv2 = createGraphics(canx/2, cany/2, WEBGL); //
//  renblurv2.id("renblurv2id")
  rendisp2 = createGraphics(planex, planex, WEBGL); //
//  rendisp2.id("rendisp2id")

  
  
}

function draw() {
  console.log(frameRate());
//  background(0);

//  noStroke();
//  strokeWeight(1)
  push();
//  clear();
  rotateY(millis() * 0.0005 + 20);
  texture(img);
  sphere(500);
  pop();
  

 // blurcanvas.rect(0, 0, canx/2, cany/2);
  
  
  rensphere.noStroke();
  rensphere.push();
  rensphere.clear();
  rensphere.rotateY(millis() * 0.00015);
  rensphere.texture(img);
  rensphere.sphere(500);
  rensphere.pop();
  
  //blur canvas
  
  
  renblurh2.shader(shaderblurh2);
  shaderblurh2.setUniform('tex0', rensphere);
  shaderblurh2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurh2.setUniform('direction', [0.0, 1.0]);
  renblurh2.rect(0, 0, canx/2, cany/2);
  renblurv2.shader(shaderblurv2);
  shaderblurv2.setUniform('tex0', renblurh2);
  shaderblurv2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurv2.setUniform('direction', [1.0, 0.0]);
  renblurv2.rect(0, 0, canx/2, cany/2);
  
  
  //disp map blur onto rensphere
  rendisp2.shader(shaderdisp);
  shaderdisp.setUniform('tex0', renblurv2);
  shaderdisp.setUniform('tex1', rensphere);
  shaderdisp.setUniform('amt', .02);
  rendisp2.rect(0, 0, -canx, -cany);

//  image(rensphere2, -rensphere2.width/2, -rensphere2.height/2);
//  image(rendisp2, -rendisp2.width/2, -rendisp2.height/2, rendisp2.width, rendisp2.height);

  
//  image(rensphere2, 0, 0);
  image(rendisp2, -planex/2, -planey/2, planex, planey);
  
  
 

}

*/
