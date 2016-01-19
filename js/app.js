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
  var allImagesSorted = _.sortBy(allImages,'timesClicked');
  namesList = _.pluck(allImagesSorted,'imageName');
  timesClickedList = _.pluck(allImagesSorted,'timesClicked');
  timesAppearedList = _.pluck(allImagesSorted,'timesAppeared');

  for (var i = 0; i < allImages.length; i += 1) {
    percentAppearedList[i] = ((timesClickedList[i]/timesAppearedList[i]) * 100).toFixed(1);
  }

  var ctx = document.getElementById('dataChart').getContext('2d');
  Chart.defaults.global = {
    animation: true,
    animationSteps: 60,
    animationEasing: "easeOutQuart",
    showScale: true,
    scaleOverride: false,
    scaleSteps: null,
    scaleStepWidth: null,
    scaleStartValue: null,
    scaleLineColor: "rgba(0,0,0,.1)",
    scaleLineWidth: 1,
    scaleShowLabels: true,
    scaleLabel: "<%=value%>",
    scaleIntegersOnly: true,
    scaleBeginAtZero: false,
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    scaleFontSize: 12,
    scaleFontStyle: "normal",
    scaleFontColor: "#666",
    responsive: false,
    maintainAspectRatio: true,
    showTooltips: true,
    customTooltips: false,
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
    tooltipFillColor: "rgba(0,0,0,0.8)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    multiTooltipTemplate: "<%= value %>",
    onAnimationProgress: function(){},
    onAnimationComplete: function(){}
};
  var data = {
      labels: namesList,
      datasets: [
        {
          label: "First Dataset",
          fillColor: "rgba(0, 74, 243,0.5)",
          strokeColor: "rgba(0, 74, 243,0.8)",
          highlightFill: "rgba(0, 74, 243,0.75)",
          highlightStroke: "rgba(0, 74, 243,1)",
          data: timesClickedList
        },
        {
          label: "Second Dataset",
          fillColor: "rgba(0, 248, 0,0.5)",
          strokeColor: "rgba(0, 248, 0,0.8)",
          highlightFill: "rgba(0, 248, 0,0.75)",
          highlightStroke: "rgba(0, 248, 0,1)",
          data: timesAppearedList
        },
        {
          label: "Third Dataset",
          fillColor: "rgba(249,0,0,0.5)",
          strokeColor: "rgba(249,0,0,0.8)",
          highlightFill: "rgba(249,0,0,0.75)",
          highlightStroke: "rgba(249,0,0,1)",
          data: percentAppearedList
        }
      ]
  };
  var newChart = new Chart(ctx).Bar(data);
}
