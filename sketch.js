// fix speed, framerate

p5.disableFriendlyErrors = true; 

let font;
let crop;

let shaderblurh2;
let shaderblurv2;
let shaderdisp;

function preload() {
//  img = loadImage('amarillo.jpg');
  img = loadImage('grass.jpeg');
  
  /*
  
  shaderblurh2 = loadShader('base.vert', 'blur.frag');
  shaderblurv2 = loadShader('base.vert', 'blur.frag');
  shaderdisp = loadShader('disp.vert', 'disp.frag');
  
  */
}

function setup() {

  crop = 50;
  
  canx = 600;
  cany = 600;
  planex = canx - crop * 2;
  planey = cany - crop * 2;
  
  canvas = createCanvas(canx, cany, WEBGL);
  
  rensphere = createGraphics(canx, cany, WEBGL); //
  renblurh2 = createGraphics(canx, cany, WEBGL); //
  renblurv2 = createGraphics(planex, planey, WEBGL); //
  rendisp2 = createGraphics(planex, planex, WEBGL); //

}

function draw() {
 

  noStroke();
//  stroke(255);
//  strokeWeight(.5)
  push();
  //clear();
  rotateY(frameCount * 0.0075 + 20);
  texture(img);
  sphere(650);
  pop();
  
  
  /*
  rensphere.noStroke();
  rensphere.push();
  rensphere.clear();
  rensphere.rotateY(frameCount * 0.00015);
  rensphere.texture(img);
  rensphere.sphere(650);
  rensphere.pop();
  
  //blur canvas
  renblurh2.shader(shaderblurh2);
  shaderblurh2.setUniform('tex0', canvas);
  shaderblurh2.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurh2.setUniform('direction', [1.0, 0.0]);
  renblurh2.rect(0, 0, width, height);
  renblurv2.shader(shaderblurv2);
  shaderblurv2.setUniform('tex0', renblurh2);
  shaderblurv2.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurv2.setUniform('direction', [0.0, 1.0]);
  renblurv2.rect(0, 0, width, height);
  
  //disp map blur onto rensphere
  rendisp2.shader(shaderdisp);
  shaderdisp.setUniform('tex0', renblurv2);
  shaderdisp.setUniform('tex1', rensphere);
  shaderdisp.setUniform('amt', .02);
  rendisp2.rect(0, 0, -width, -height);

//  image(rensphere2, -rensphere2.width/2, -rensphere2.height/2);
//  image(rendisp2, -rendisp2.width/2, -rendisp2.height/2, rendisp2.width, rendisp2.height);
  
  
//  image(rensphere2, 0, 0);
  image(rendisp2, -rendisp2.width/2, -rendisp2.height/2, rendisp2.width, rendisp2.height);
  
  */
 

}
