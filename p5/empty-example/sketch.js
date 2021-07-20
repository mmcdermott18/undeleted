let img;
let imgNumber
let images = [];
let imgAmount = 6; // set number of images in folder
let imgHeight;
let imgIndex = 0;
let c = 0;
let fr;

var capturer = new CCapture({ format: 'webm' , framerate: 30} );
var btn;
var counter = 0;
var end = 30 * 10;

function preload() {
  for (let i = 0; i < imgAmount; i++) {
    imgNumber = i + 1;
    append(images, loadImage('images/' + imgNumber + '.jpg'));
  }
  shuffle(images, true); // force modifications to passed array
}

function setup() {
  createCanvas(windowHeight / 1.7777777, windowHeight);
  fr = int(random(15,151));
  capturer.start();
}
function draw() {
  clear();
  img = images[imgIndex];
  console.log(fr);
  if (c < fr) {
    imageMode(CORNER);
    image(img, 0, (height - img.height*width/img.width) / 2, width, img.height*width/img.width); // to fit width
    c++;
  } else {
    fr = int(random(15,151)); //regenerate
    moveFrame();
    c = 0;
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
  if (counter = end) {
    save_record;
  } else {
    counter++;
  }
}

function save_record() {
  capturer.save();
}

function moveFrame() {
  imgIndex++;
  if (imgIndex > images.length - 1) {
    imgIndex = 0;
  }
}
