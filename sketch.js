function setup() {
  img = loadImage('amarillox.jpg');
  
  createCanvas(800, 800);
  rensphere = createGraphics(800, 800, WEBGL);
}

function draw() {
  
  rensphere.clear();
  rensphere.texture(img);
  rensphere.sphere(650);
  rensphere.rotateY(.001);
  image(rensphere, 0, 0, 800, 800);
}
