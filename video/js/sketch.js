let fName = 'UD1' //phone identifier name for video export
let img;
let imgNumber
let images = [];
let imgAmount = 6; // set number of images in folder
let imgIndex = 0;
let c = 0;
let fr;
let frMin = 5;
let frMax = 30;

let counter = 0;
let length = 10; // in seconds
let end = 30 * length; // in frames

var capturer = new CCapture({ format: 'webm' , framerate: 30 , name: length + 'sec-' + fName });

function preload() {
  for (let i = 0; i < imgAmount; i++) {
    imgNumber = i + 1;
    append(images, loadImage('../images/' + imgNumber + '.jpg'));
  }
  shuffle(images, true);
}

function setup() {
  frameRate(30);
  createCanvas(windowHeight / 1.7777777, windowHeight);
  fr = int(random(frMin, frMax));
  background(0);
  capturer.start();
}

function draw() {
  console.log("counter");
  if (counter == end) {
    counter = 0;
    save_record();
    setTimeout(function(){startover()},100);
  } else {
    counter++;
  }
  clear();
  img = images[imgIndex];
  if (c < fr) {
    imageMode(CORNER);
    image(img, 0, (height - img.height*width/img.width) / 2, width, img.height*width/img.width); // to fit width
    c++;
  } else {
    fr = int(random(frMin, frMax)); //regenerate
    moveFrame();
    c = 0;
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
}

function moveFrame() {
  imgIndex++;
  if (imgIndex > images.length - 1) {
    imgIndex = 0;
  }
}

function save_record() {
  capturer.save();
}
function startover() {
  window.location.reload();
}
