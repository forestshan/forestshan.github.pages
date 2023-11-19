p5.disableFriendlyErrors = true;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;

function setup() {
//  pixelDensity(1);
  setAttributes('antialias', false);
  setAttributes('alpha', false);
  setAttributes('depth', false);
  setAttributes('stencil', false);
  setAttributes('preserveDrawingBuffer', false);
  setAttributes('perPixelLighting', false);
  setAttributes('version', 1);
  
  img = loadImage('amarillox.jpg');
  
  shaderblurh2 = loadShader('base.vert', 'blur.frag');
  shaderblurv2 = loadShader('base.vert', 'blur.frag');
  shaderdisp = loadShader('disp.vert', 'disp.frag');
  
  crop = 50;
  canx = 800;
  cany = 1200;
  
  createCanvas(canx, cany);
  rensphere = createGraphics(canx, cany, WEBGL);
}

function draw() {
//  console.log(frameRate());
  
  rensphere.clear();
  rensphere.texture(img);
  rensphere.sphere(1000);
  rensphere.rotateY(.001);
  image(rensphere, 0, 0, canx, cany);
}
