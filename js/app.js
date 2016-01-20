'use strict';
/* jshint -W040 */
/* jshint -W097 */
/* jshint -W117 */

var totalClicks = 0;
var imagePaths = ['bag.jpg', 'banana.jpg', 'boots.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'usb.gif', 'water_can.jpg', 'wine_glass.jpg'];
var imageNamesArray = ['Bag', 'Banana', 'Boots', 'Chair', 'Cthulhu', 'Dragon', 'Pen', 'Scissors', 'Shark', 'Sweep', 'Unicorn', 'Usb', 'Water Can', 'Wine Glass'];

function imageData(imageName,imagePath) {
  this.imagePath = 'img/' + imagePath;
  this.imageName = imageName;
  this.timesClicked = 0;
  this.timesAppeared = 0;
  this.percentage = 0;
  allImages.push(this);
}

var allImages = [];
for (var i = 0;i < imagePaths.length; i += 1) {
  var imageToken = new imageData(imageNamesArray[i],imagePaths[i]);
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
var buttonId = document.getElementById('chartButton');
imageOneId.addEventListener('click',function() {
  clickFunction(randomImageIndex[0],randomImageIndex[1],randomImageIndex[2]);
});
imageTwoId.addEventListener('click',function() {
  clickFunction(randomImageIndex[1],randomImageIndex[0],randomImageIndex[2]);
});
imageThreeId.addEventListener('click',function() {
  clickFunction(randomImageIndex[2],randomImageIndex[0],randomImageIndex[1]);
});
buttonId.addEventListener('click',function() {
  renderCharts(allImages);
});
displayImage();

var namesList = [];
var timesClickedList = [];
var timesAppearedList = [];
var percentAppearedList = [];
function clickFunction(index1,index2,index3) {
  if (totalClicks < 15) {
    allImages[index1].timesClicked += 1;
    allImages[index1].timesAppeared += 1;
    allImages[index2].timesAppeared += 1;
    allImages[index3].timesAppeared += 1;
    totalClicks += 1;
    randomImageIndex = [];
    displayImage();
  } else if ((totalClicks > 14) && (totalClicks < 16)) {
    totalClicks += 1;
    var inputEl = document.createElement('input');
    buttonId.appendChild(inputEl);
    inputEl.type = 'submit';
    inputEl.value = 'Get Results';
  }
}

function renderCharts (allImages) {
  event.preventDefault();
  for (var i = 0; i < allImages.length; i += 1) {
    allImages[i].percentage = parseFloat(((allImages[i].timesClicked/allImages[i].timesAppeared) * 100).toFixed(1));
  }
  var allImagesSorted = _.sortBy(allImages,'percentage');
  namesList = _.pluck(allImagesSorted,'imageName');
  timesClickedList = _.pluck(allImagesSorted,'timesClicked');
  timesAppearedList = _.pluck(allImagesSorted,'timesAppeared');
  percentAppearedList = _.pluck(allImagesSorted,'percentage');

  $(function () {
    $('#dataContainer').highcharts({
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Click Data for Each Image'
      },
      subtitle: {
        text: 'Sorted by Percentage Clicked'
      },
      xAxis: [{
        categories: namesList,
        crosshair: true
      }],
      yAxis: [{
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: 'Percent',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        opposite: true
      }, {
        gridLineWidth: 0,
        title: {
          text: 'Clicks/Appearances',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} Times',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }, {
        gridLineWidth: 0,
        title: {
          text: ' ',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value} Times',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        name:'Times Clicked',
        type: 'column',
        yAxis: 1,
        data: timesClickedList,
        tooltip: {
          valueSuffix: ' Clicks'
        }
      }, {
        name: 'Times Appeared',
        type: 'spline',
        yAxis: 1,
        data: timesAppearedList,
        marker: {
          enabled: false
        },
        dashStyle: 'shortdot',
        tooltip: {
          valueSuffix: ' Appearances'
        }
      }, {
        name: 'Perentage',
        type: 'spline',
        data: percentAppearedList,
        tooltip: {
          valueSuffix: ' Percent'
        }
      }]
    });
  });
}
