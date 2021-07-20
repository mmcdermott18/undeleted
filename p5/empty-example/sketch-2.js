// my variables
let img;
let imgNumber
let images = [];
let imgAmount = 6; // set number of images in folder
let imgHeight;
let imgIndex = 0;
let c = 0;
let fr;
let frMin = 10;
let frMax = 30;

// video variables
let cwidth = 1080;
let cheight = 1920;
let numFrames = 90;
let encoder;
let recording = true;
let recordedFrames = 0;

function preload() {
  HME.createH264MP4Encoder().then(enc => {
      encoder = enc;
      encoder.outputFilename = 'test';
      encoder.width = cwidth;
      encoder.height = cheight;
      encoder.frameRate = 30;
      encoder.initialize();
  })
  for (let i = 0; i < imgAmount; i++) {
    imgNumber = i + 1;
    append(images, loadImage('images/' + imgNumber + '.jpg'));
  }
  shuffle(images, true); // force modifications to passed array
}

function setup() {
  createCanvas(cwidth, cheight);
  fr = int(random(frMin, frMax));
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
    fr = int(random(frMin, frMax)); //regenerate
    moveFrame();
    c = 0;
  }

  if (recording) {
      encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
      recordedFrames++
  }
  // finalize encoding and export as mp4
  if (recordedFrames === numFrames) {
      recording = false
      recordedFrames = 0
      console.log('recording stopped')

      encoder.finalize()
      const uint8Array = encoder.FS.readFile(encoder.outputFilename);
      const anchor = document.createElement('a')
      anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }))
      anchor.download = encoder.outputFilename
      anchor.click()
      encoder.delete()

      preload() // reinitialize encoder
  }
}

function moveFrame() {
  imgIndex++;
  if (imgIndex > images.length - 1) {
    imgIndex = 0;
  }
}
