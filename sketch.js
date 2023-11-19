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
  
  crop = 50;
  
  canx = 500;
  cany = 800;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  canvas = createCanvas(canx, cany, P2D);
  
  rensphere = createGraphics(canx, cany, WEBGL); //
  renblurh2 = createGraphics(canx, cany, WEBGL); //
  renblurv2 = createGraphics(canx, cany, WEBGL); //
  rendisp2 = createGraphics(planex, planex, WEBGL); //
  
  setAttributes('antialias', false);
  setAttributes('alpha', false);
  setAttributes('depth', false);
  setAttributes('stencil', false);
  setAttributes('preserveDrawingBuffer', false);
  setAttributes('perPixelLighting', false);
  setAttributes('version', 1);
  
}

function draw() {
  console.log(frameRate());
  td = millis();
//  background(0);
  
  rensphere.strokeWeight(.5);
  rensphere.clear();
  rensphere.rotateY(.001);
  rensphere.texture(img);
  rensphere.sphere(650);
  image(rensphere, 0, 0, canx, cany);

  
}
