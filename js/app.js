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

function displayImage() {
  var randCounter = 0;
  while (randCounter < 3) {
    var randIndex = Math.floor(Math.random() * (imagePaths.length));
    var isUnique = randomImageIndex.indexOf(randIndex);
    if (isUnique === -1) {
      randomImageIndex.push(randIndex);
      randCounter += 1;
    }
  }

  imageOneId.src = allImages[randomImageIndex[0]].imagePath;
  imageTwoId.src = allImages[randomImageIndex[1]].imagePath;
  imageThreeId.src = allImages[randomImageIndex[2]].imagePath;

}

var imageOneId = document.getElementById('imageOne');
var imageTwoId = document.getElementById('imageTwo');
var imageThreeId = document.getElementById('imageThree');

imageOneId.addEventListener('click',function() {
  clickFunction(randomImageIndex[0],randomImageIndex[1],randomImageIndex[2]);
});
imageTwoId.addEventListener('click',function() {
  clickFunction(randomImageIndex[1],randomImageIndex[0],randomImageIndex[2]);
});
imageThreeId.addEventListener('click',function() {
  clickFunction(randomImageIndex[2],randomImageIndex[0],randomImageIndex[1]);
});

function clickFunction(index1,index2,index3) {
  if (totalClicks < 15) {
    allImages[index1].timesClicked += 1;
    allImages[index1].timesAppeared += 1;
    allImages[index2].timesAppeared += 1;
    allImages[index3].timesAppeared += 1;

    totalClicks += 1;

    console.log('total clicks = ' + totalClicks);

    randomImageIndex = [];

    displayImage();
  }
}

if (totalClicks === 0) {
  displayImage();
}

// var dataDisplayId = document.getElementById('dataContainer');
//
// if (totalClicks === 15) {
//   dataDisplayId.textContent =
// }
