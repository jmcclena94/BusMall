'use strict';
/* jshint -W040 */
/* jshint -W097 */
/* jshint -W117 */

var totalClicks = 0;
var imagePaths = ['bag.jpg', 'banana.jpg', 'boots.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'usb.gif', 'water_can.jpg', 'wine_glass.jpg'];

function imageData(imageName,imagePath) {
  this.imagePath = 'img/' + imagePath;
  this.imageName = imageName;
  this.timesClicked = 0;
  this.timesAppeared = 0;
  allImages.push(this);
}

var allImages = [];

for (var i = 0;i < imagePaths.length; i += 1) {
  imageToken = imagePaths[i].substr(0,imagePaths[i].length - 4);
  var imageToken = new imageData(imageToken,imagePaths[i]);
}

var randomImageIndex = [];
var randCounter = 0;
while (randCounter < 3) {
  var randIndex = Math.floor(Math.random() * (imagePaths.length));
  var isUnique = randomImageIndex.indexOf(randIndex);
  if (isUnique === -1) {
    randomImageIndex.push(randIndex);
    randCounter += 1;
  }
}

document.getElementById('imageOne').src = allImages[randomImageIndex[0]].imagePath;
document.getElementById('imageTwo').src = allImages[randomImageIndex[1]].imagePath;
document.getElementById('imageThree').src = allImages[randomImageIndex[2]].imagePath;

// var imageOneId = document.getElementById('imageOne');
// var imageTwoId = document.getElementById('imageTwo');
// var imageThreeId = document.getElementById('imageThree');

// imageOneId.src = allImages[randomImageIndex[1]].imagePath;
