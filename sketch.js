p5.disableFriendlyErrors = true;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;

function preload() {
  img = loadImage('amarillox.jpg');
  
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
  canx = 600;
  cany = 900;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  createCanvas(canx, cany, WEBGL);
  rensphere = createGraphics(canx, cany, WEBGL);
  rensphere2 = createGraphics(canx, cany, WEBGL);
  renblurh2 = createGraphics(canx, cany, WEBGL); //
  renblurv2 = createGraphics(canx, cany, WEBGL); //
  rendisp2 = createGraphics(planex, planex, WEBGL); //
}

function draw() {
//  console.log(frameRate());
  
  rensphere.clear();
  rensphere.texture(img);
  rensphere.strokeWeight(.65);
  rensphere.sphere(1000);
  rensphere.rotateY(.002);
  
  rensphere2.clear();
  rensphere2.texture(img);
  rensphere2.noStroke();
  rensphere2.sphere(1000);
  rensphere2.rotateY(-.001);
  
  renblurh2.shader(shaderblurh2);
  shaderblurh2.setUniform('tex0', rensphere);
  shaderblurh2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurh2.setUniform('direction', [0.0, 1.0]);
  renblurh2.rect(0, 0, planex, planey);
  renblurv2.shader(shaderblurv2);
  shaderblurv2.setUniform('tex0', renblurh2);
  shaderblurv2.setUniform('texelSize', [1.0/canx, 1.0/cany]);
  shaderblurv2.setUniform('direction', [1.0, 0.0]);
  renblurv2.rect(0, 0, planex, planey);
  
  rendisp2.shader(shaderdisp);
  shaderdisp.setUniform('tex0', renblurv2);
  shaderdisp.setUniform('tex1', rensphere2);
  shaderdisp.setUniform('amt', .02);
  rendisp2.rect(0, 0, -canx, -cany);

  image(rensphere, -canx/2, -cany/2, canx, cany);
  image(rendisp2, -planex/2, -planey/2, planex, planey);
}
