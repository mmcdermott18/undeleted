let fName = 'UD1' //phone identifier name for video export
let img;
let imgNumber
let images = [];
let imgAmount = 6; // set number of images in folder
let imgIndex = 0;
let c = 0;
let fr; //amount of frames image stays on screen
let r; //current shuffler value
let rMax = 4; //high value for shuffler
let frLMin = 1; //frame rate minumum
let frLMax = 5; //frame rate minumum
let frHMin = 30; //high value frame rate minumum
let frHMax = 90; //high value frame rate maximum

let counter = 0;
let length = 10; // in seconds
let end = 30 * length; // in frames

var capturer = new CCapture({ format: 'webm' , framerate: 30 , name: length + 'sec-' + fName });
var started = true;

function preload() {
  for (let i = 0; i < imgAmount; i++) {
    imgNumber = i + 1;
    append(images, loadImage('images/' + imgNumber + '.jpg'));
  }
  shuffle(images, true);
}

function setup() {
  frameRate(30);
  createCanvas(windowHeight / 1.7777777, windowHeight);
  r = int(random(0, rMax + 1));
  if (r == rMax) {
    fr = int(random(frHMin, frHMax));
  } else {
    fr = int(random(frLMin, frLMax));
  };
  background(255);
  capturer.start();
}

function draw() {
  click();
  if (started) {
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
      // regenerate r and fr
      r = int(random(0, rMax + 1));
      if (r == rMax) {
        fr = int(random(frHMin, frHMax));
      } else {
        fr = int(random(frLMin, frLMax));
      };
      imageMode(CORNER);
      image(img, 0, (height - img.height*width/img.width) / 2, width, img.height*width/img.width); // to fit width
      moveFrame();
      c = 0;
    }
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
  document.querySelector('#stop').addEventListener("click", function () {
    started = false;
    draw();
  });
  document.querySelector('#reload').addEventListener("click", function () {
    startover();
  });
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

function click() {
  document.querySelector('#start').addEventListener("click", function () {
    started = true;
    draw();
  });
}
