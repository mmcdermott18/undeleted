// variables to change
let fName = 'comp1-' // phone identifier name for video export
let folderAmount = 5; // amount of folders
let length = 5; // video duration in minutes
let images0 = []; // array of images, one for each folder + one at the end with 10 images
let images1 = [];
let images2 = [];
let images3 = [];
let images4 = [];
let folderValues = [xx, xx, xx, xx, xx]; // amout of files in each folder with the final fake 10 image folder
let currentArray = [images0, images1, images2, images3, images4]; // array of image arrays
let currentFolder = ["images-0", "images-1", "images-2", "images-3", "images-4"]; // array of folder names

let rMax = 6; // high value for shuffler - numbers below this number will take low value image frame rate and only the high value will get the high value image frame rate
let frLMin = 25; // low value image frame rate minumum
let frLMax = 35; // low value image frame rate minumum
let frHMin = 35; // high value image frame rate minumum
let frHMax = 90; // high value image frame rate maximum

let img; // used to load image onto canvas
let imgNumber // used while building webimages array
let imgAmount; // set number of images in folder
let imgIndex = 0;
let c = 0; //initial counter value for individual image
let fr; //amount of frames image stays on screen
let r; //current shuffler value to set image frame rate
let counter = 0; // initial counter value for video
let end = 30 * (length * 60); // adjusts length to be in frames
let j;
let x = 0; // intial value for folder
let source; // allows images to be loaded from different arrays

var capturer = new CCapture({ format: 'webm' , framerate: 30 , name: length + 'min-' + fName + x}); // name based on length variable and fName variable
var started = true; // true starts automatically and lets video export continue to happen on page reload, false means start button must be pressed and only one video will be generated per press

function preload() {
  for (let j = 0; j < folderAmount; j++) {
    imgAmount = folderValues[j];
    for (let i = 0; i < imgAmount; i++) {
      imgNumber = i + 1;
      append(currentArray[j], loadImage(currentFolder[j] + '/' + imgNumber + '.jpg'));
    }
    shuffle(currentArray[j], true);
    console.log("array " + j +  " loaded");
  }
  console.log("all arrays loaded");
}

function setup() {
  frameRate(30);
  // createCanvas(windowHeight / 1.7777777, windowHeight);
  createCanvas(608, 1080);
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
  source = currentArray[x];
  click();
  if (started) {
    // console.log("counter");
    if (counter == end) {
      counter = 0;
      console.log('counter is now 0');
      save_record();
    } else {
      counter++;
      if (counter == 1000) {
        console.log('1000 frames drawn');
      } else if (counter == 2000) {
        console.log('2000 frames drawn');
      } else if (counter == 3000) {
        console.log('3000 frames drawn');
      } else if (counter == 4000) {
        console.log('4000 frames drawn');
      } else if (counter == 5000) {
        console.log('5000 frames drawn');
      } else if (counter == 6000) {
        console.log('6000 frames drawn');
      } else if (counter == 7000) {
        console.log('7000 frames drawn');
      } else if (counter == 8000) {
        console.log('8000 frames drawn');
      } else if (counter == 9000) {
        console.log('video done');
      }
    }
    clear();
    img = source[imgIndex];
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
  if (imgIndex > source.length - 1) {
    imgIndex = 0;
  }
}

function save_record() {
  capturer.stop();
  capturer.save();
  x++;
  capturer = new CCapture({ format: 'webm' , framerate: 30 , name: length + 'min-' + fName + x});
  console.log('capture saved and x is now ' + x);
  if (x == folderAmount - 1 ) {
    console.log('last real folder');
  }
  if (x == folderAmount) {
    console.log('no more folders');
    started = false;
  }
  capturer.start();
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
