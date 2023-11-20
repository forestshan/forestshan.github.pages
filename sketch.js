p5.disableFriendlyErrors = true;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;

function preload() {
  img = loadImage('amarillo.jpeg');
  blurimg = loadImage('amarilloblur.jpg');

  shaderdisp = loadShader('disp.vert', 'disp.frag');
  
}

function setup() {
  pixelDensity(1);
  setAttributes('antialias', false);
  setAttributes('alpha', false);
  setAttributes('depth', false);
  setAttributes('stencil', false);
  setAttributes('preserveDrawingBuffer', false);
  setAttributes('perPixelLighting', false);
  setAttributes('version', 1);

  crop = 100;
  canx = 1200;
  cany = 1200;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  createCanvas(canx, cany, WEBGL);
  rensphere = createGraphics(canx, cany, WEBGL);
  rensphere2 = createGraphics(canx/4, cany/4, WEBGL);
  rendisp2 = createGraphics(planex, planex, WEBGL);
  

}

function draw() {
//  console.log(frameRate());
  
  rensphere.noStroke();
  rensphere.strokeWeight(.65);
  rensphere.stroke(224,255,255);
  rensphere.clear();
  rensphere.texture(img);
  rensphere.sphere(1500);
  rensphere.rotateY(-.0005);
  
  rensphere2.clear();
  rensphere2.texture(blurimg);
  rensphere2.noStroke();
//  rensphere2.strokeWeight(.65);
  rensphere2.sphere(1500);
  rensphere2.rotateY(.0001);
  
  image(rensphere, -canx/2, -cany/2, canx, cany);
  
  rendisp2.shader(shaderdisp);
  shaderdisp.setUniform('tex0', rensphere2);
  shaderdisp.setUniform('tex1', rensphere);
  shaderdisp.setUniform('amt', .02);
  rendisp2.rect(0, 0, -canx, -cany);

  image(rendisp2, -planex/2, -planey/2, planex, planey);

}
