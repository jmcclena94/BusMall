'use strict';
/* jshint -W040 */
/* jshint -W097 */
/* jshint -W117 */
var totalClicks = 0;
var imageNameData = {
  imagePaths: ['bag.jpg', 'banana.jpg', 'boots.jpg', 'chair.jpg', 'cthulhu.jpg', 'dragon.jpg', 'pen.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'usb.gif', 'water_can.jpg', 'wine_glass.jpg'],
  imageNames: ['Bag', 'Banana', 'Boots', 'Chair', 'Cthulhu', 'Dragon', 'Pen', 'Scissors', 'Shark', 'Sweep', 'Unicorn', 'Usb', 'Water Can', 'Wine Glass']
};
var allImages = [];
function imageData(imageName,imagePath) {
  this.imagePath = 'img/' + imagePath;
  this.imageName = imageName;
  this.timesClicked = 0;
  this.timesAppeared = 0;
  this.percentage = 0;
  // this.percentageCalc = function percentageCalc() {
  //   this.percentage = parseFloat(((this.timesClicked/this.timesAppeared) * 100).toFixed(1));
  // };
  allImages.push(this);
}
imageData.prototype.percentageCalc = function percentageCalc() {
  this.percentage = parseFloat(((this.timesClicked/this.timesAppeared) * 100).toFixed(1));
};
for (var i = 0; i < imageNameData.imagePaths.length; i += 1) {
  new imageData(imageNameData.imageNames[i],imageNameData.imagePaths[i]);
}
var displayImage = {
  randomImageIndex: [],
  imagesToScreen: function imagesToScreen() {
    var randCounter = 0;
    while (randCounter < 3) {
      var randIndex = Math.floor(Math.random() * (imageNameData.imagePaths.length));
      var isUnique = displayImage.randomImageIndex.indexOf(randIndex);
      if (isUnique === -1) {
        displayImage.randomImageIndex.push(randIndex);
        randCounter += 1;
      }
    }
    document.getElementById('imageOne').src = allImages[displayImage.randomImageIndex[0]].imagePath;
    document.getElementById('imageTwo').src = allImages[displayImage.randomImageIndex[1]].imagePath;
    document.getElementById('imageThree').src = allImages[displayImage.randomImageIndex[2]].imagePath;
  },
  clickFunction: function clickFunction(index1,index2,index3) {
    allImages[index1].timesClicked += 1;
    allImages[index1].timesAppeared += 1;
    allImages[index2].timesAppeared += 1;
    allImages[index3].timesAppeared += 1;
    totalClicks += 1;
    displayImage.randomImageIndex = [];
    displayImage.imagesToScreen();
  },
};
displayImage.imagesToScreen();

document.getElementById('imageOne').addEventListener('click',function() {
  displayImage.clickFunction(displayImage.randomImageIndex[0],displayImage.randomImageIndex[1],displayImage.randomImageIndex[2]);
});
document.getElementById('imageTwo').addEventListener('click',function() {
  displayImage.clickFunction(displayImage.randomImageIndex[1],displayImage.randomImageIndex[0],displayImage.randomImageIndex[2]);
});
document.getElementById('imageThree').addEventListener('click',function() {
  displayImage.clickFunction(displayImage.randomImageIndex[2],displayImage.randomImageIndex[0],displayImage.randomImageIndex[1]);
});
document.getElementById('chartButton').addEventListener('click',function() {
  renderCharts(allImages);
});

function renderCharts (allImages) {
  event.preventDefault();
  if (totalClicks < 15) {
    alert('You have only made ' + totalClicks + '.  Please make at least 15 selections');
  } else {
    document.getElementById('resultsButton').value = 'Update Results';
    for (var i = 0; i < allImages.length; i += 1) {
      allImages[i].percentageCalc();
    }
    var allImagesSorted = _.sortBy(allImages,'percentage');
    var namesList = _.pluck(allImagesSorted,'imageName');
    var timesClickedList = _.pluck(allImagesSorted,'timesClicked');
    var timesAppearedList = _.pluck(allImagesSorted,'timesAppeared');
    var percentAppearedList = _.pluck(allImagesSorted,'percentage');

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
            text: 'Percent Clicked',
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
          name: 'Percent Clicked',
          type: 'spline',
          data: percentAppearedList,
          tooltip: {
            valueSuffix: ' Percent'
          }
        }]
      });
    });
  }
}
