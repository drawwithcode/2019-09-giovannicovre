var maracasSound;
var maracasImg;

var posX = 0;
var posY = 0;

var counter = 0;
var box, button;

var boxW, boxH;
var boxMargin = 25;

var shakeColor = "white";

var boxColor = "rgb(50, 180, 180)";
var txtColor = "white";

function preload() {
  maracasSound = loadSound("assets/maracas.wav");
  cornerImg = loadImage("assets/corner.png");
  lucha = loadImage("assets/luchador.png");
  maracasImg = loadImage("assets/maracas.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(20);
  angleMode(DEGREES);
}

function draw() {
  boxW = windowWidth - 2 * boxMargin;
  boxH = windowHeight - 2 * boxMargin;
  var boxRadius = 18;

  var infoSite = "Connect using mobile.";
  var infoSound = "Turn up the volume.";

  background(35, 50, 60);

  posX = random(-3, 3);
  posY = random(-3, 3);

  maracasImg.resize(0, windowHeight - 100);
  image(maracasImg, (windowWidth - maracasImg.width) / 2, (windowHeight - maracasImg.height) / 2);

  noStroke();
  fill(shakeColor);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(72);
  text("SHAKE", windowWidth / 2 + posX, windowHeight / 2 + posY);

  // ----- BOX -----
  fill(boxColor);
  rect(boxMargin, boxMargin, boxW, boxH, boxRadius);

  // ----- BOX SHADOW -----
  if (counter < 1) {
    box = createDiv();
    box.class("shadow");
    box.position(boxMargin, boxMargin);
    box.size(boxW, boxH);
    box.style("border-radius", boxRadius + "px");
    box.style("box-shadow", "4px 4px 6px 0px rgba(30,30,30,1)");
    counter++;
  }

  // ----- BOX IMG -----
  if (boxColor == "rgb(50, 180, 180)") {
    push();
    translate(90, 40);
    rotate(90);
    scale(0.5);
    image(cornerImg, 0, 0);
    pop();

    push();
    translate(windowWidth - 40, 90);
    rotate(180);
    scale(0.5);
    image(cornerImg, 0, 0);
    pop();

    push();
    translate(windowWidth - 90, windowHeight - 40);
    rotate(270);
    scale(0.5);
    image(cornerImg, 0, 0);
    pop();

    push();
    translate(40, windowHeight - 90);
    rotate(360);
    scale(0.5);
    image(cornerImg, 0, 0);
    pop();

    push();
    image(lucha, (windowWidth - lucha.width) / 2, (windowHeight - lucha.height) / 3);
    pop();
  }

  // ----- TEXT -----
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(16);
  fill(txtColor);
  text(infoSite, windowWidth / 2, (2 * windowHeight / 3) + 6);
  text(infoSound, windowWidth / 2, (2 * windowHeight / 3) + 28);

  // ----- BUTTON -----
  if (counter <= 1) {
    button = createButton("OK");
    button.class("button");
    button.position((windowWidth / 2) - 60, (2 * windowHeight / 3) + 48);
    button.size(120);
    button.style("background-color", "rgb(250,80,90)");
    button.style("border", "none");
    button.style("font-size", "12px");
    button.style("font-weight", "bold");
    button.style("letter-spacing", "1px");
    button.style("color", "white");
    button.style("padding", "5px");
    button.style("border-radius", boxRadius + "px");
    counter++;
  }
  button.mousePressed(enterSite);
}

function enterSite() {
  select(".shadow").style("display", "none");
  select(".button").style("display", "none");
  boxColor = "rgba(0,0,0,0)";
  txtColor = "rgba(0,0,0,0)";
}

function deviceShaken() {
  shakeColor = "rgba(0,0,0,0);"
  maracasSound.play();
}

function touchMoved() {
  return false;
}

function touchEnded() {
  DeviceOrientationEvent.requestPermission();
}

function windowResized() {
  boxW = windowWidth - 2 * boxMargin;
  boxH = windowHeight - 2 * boxMargin;
  select(".shadow").size(boxW, boxH);
  select(".button").position((windowWidth / 2) - 60, (2 * windowHeight / 3) + 48);
  clear();
  setup();
  draw();
}
