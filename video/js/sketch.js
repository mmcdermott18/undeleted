// variables to change
let fName = 'UD33a' //phone identifier name for video export
let imgAmount = 830; // set number of images in folder
let rMax = 6; // high value for shuffler - numbers below this number will take low value image frame rate and only the high value will get the high value image frame rate
let frLMin = 5; // low value image frame rate minumum
let frLMax = 20; // low value image frame rate minumum
let frHMin = 30; // high value image frame rate minumum
let frHMax = 90; // high value image frame rate maximum
let length = 5; // video duration in minutes

let img; // used to load image onto canvas
let imgNumber // used while building images array
let images = []; // array of images
let imgIndex = 0;
let c = 0; //initial counter value for individual image
let fr; //amount of frames image stays on screen
let r; //current shuffler value to set image frame rate
let counter = 0; // initial counter value for video
let end = 30 * (length * 60); // adjusts length to be in frames

var capturer = new CCapture({ format: 'webm' , framerate: 30 , name: length + 'sec-' + fName }); // name based on length variable and fName variable
var started = true; // true starts automatically and lets video export continue to happen on page reload, false means start button must be pressed and only one video will be generated per press

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
      setTimeout(function(){startover()},1000);
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
