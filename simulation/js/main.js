
//Your JavaScript goes in here
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
var Animation = function (canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext("2d");
  this.t = 0; //from   w w  w .ja v  a  2s.c o  m
  this.timeInterval = 0;
  this.startTime = 0;
  this.lastTime = 0;
  this.frame = 0;
  this.animating = false;

  window.requestAnimFrame = (function (callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
};

Animation.prototype.getContext = function () {
  return this.context;
};

Animation.prototype.getCanvas = function () {
  return this.canvas;
};

Animation.prototype.clear = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Animation.prototype.setDrawStage = function (func) {
  this.drawStage = func;
};

Animation.prototype.getFrame = function () {
  return this.frame;
};

Animation.prototype.start = function () {
  this.animating = true;
  var date = new Date();
  this.startTime = date.getTime();
  this.lastTime = this.startTime;

  if (this.drawStage !== undefined) {
    this.drawStage();
  }

  this.animationLoop();
};

Animation.prototype.stop = function () {
  this.animating = false;
};
Animation.prototype.getTimeInterval = function () {
  return this.timeInterval;
};

Animation.prototype.getTime = function () {
  return this.t;
};

Animation.prototype.animationLoop = function () {
  var that = this;

  this.frame++;
  var date = new Date();
  var thisTime = date.getTime();
  this.timeInterval = thisTime - this.lastTime;
  this.t += this.timeInterval;
  this.lastTime = thisTime;

  if (this.drawStage !== undefined) {
    this.drawStage();
  }

  if (this.animating) {
    requestAnimFrame(function () {
      that.animationLoop();
    });
  }
};
function startanimation() {
  var anim = new Animation("myCanvas");
  var canvas = anim.getCanvas();
  var context = anim.getContext();

  var amplitude = Math.PI / 4; // 45 degrees
  var period = 2000; // ms
  var theta = 0;
  var pendulumLength = 250;
  var pendulumWidth = 20;
  var rotationPointX = canvas.width / 2;
  var rotationPointY = 100;

  function reducePeriod() {
    if (period < 7000) period = period + 1;
  }

  function reduceAmplitude() {
    if (amplitude > 0) amplitude = amplitude - 0.0001;
  }

  anim.setDrawStage(function () {
    theta =
      amplitude * Math.sin((2 * Math.PI * this.getTime()) / period) +
      Math.PI / 2;

    const intervalID = setInterval(reduceAmplitude, 8000);
    this.clear();

    // const intervalID = setInterval(reduceAmplitude, 1000);

    context.beginPath();
    var endPointX = rotationPointX + pendulumLength * Math.cos(theta);
    var endPointY = rotationPointY + pendulumLength * Math.sin(theta);
    context.beginPath();
    context.moveTo(rotationPointX, rotationPointY);
    context.lineTo(endPointX, endPointY);
    context.lineWidth = pendulumWidth;
    context.strokeStyle = "black";
    context.stroke();

    // // Calculate the position and size of each hole.
    // const holeCount = 20;
    // const holeSpacing = pendulumLength / (holeCount + 1);
    // const holeRadius = 2;

    // // Draw the bar and the holes on the canvas using the fillRect() method.
    // ctx.fillStyle = "gray";
    // ctx.fillRect((canvasWidth - pendulumWidth) / 2, (canvasHeight - pendulumLength) / 2, pendulumWidth, pendulumLength);
    // ctx.fillStyle = "white";
    // for (let i = 1; i <= holeCount; i++) {
    //   const x = canvasWidth / 2;
    //   const y = (canvasHeight - pendulumLength) / 2 + holeSpacing * i;
    //   ctx.beginPath();
    //   ctx.arc(x, y, holeRadius, 0, 2 * Math.PI);
    //   ctx.fill();
    // }
    //   const image = new Image();
    // image.src = './images/scale1.png';

    //                     context.moveTo(rotationPointX, rotationPointY);
    //                     context.lineTo(endPointX, endPointY);

    //                     context.lineWidth = pendulumWidth;
    //                     context.strokeStyle = "black";
    //                     context.closePath();
    //   context.drawImage(image, rotationPointX, rotationPointY, endPointX - rotationPointX, endPointY - rotationPointY);

    // // draw bottom circle

    //  context.beginPath();
    // context.arc(endPointX, endPointY, 10, 0, 2 * Math.PI, false);
    // var grd = context.createLinearGradient(endPointX - 50, endPointY - 50, endPointX + 50, endPointY + 50);

    // grd.addColorStop(0, "#444");
    // grd.addColorStop(0.5, "gray");
    // grd.addColorStop(1, "#444");
    // context.fillStyle = grd;
    // context.fill();
  });

  anim.start();
}

// table
let table = document.getElementById("table");
var sn = 1;
var count = 0;
var distance=45;
var oscilltion =20;
var t1=0;
var t2=0;
var meanT=0;
var timePeriod=0;
const procedure = () => {
  sn = sn + 1;
distance= distance-5;
t1= (30+ (Math.random() * 4 + 1));
t2=t1+ Math.random();
meanT =(t1+t2)/2;
timePeriod=meanT/20;
if(count<7){
  table.innerHTML += `<tr>
  <td id='r${count}c0' ></td>
  <td id='r${count}c1' ></td>
  <td id='r${count}c2' ></td>
  <td id='r${count}c3' ></td>
  <td id='r${count}c4' ></td>
  <td id='r${count}c5' ></td>
  <td id='r${count}c6' ></td>
 
</tr>`;
}

  var data = new Array();
  data.push(sn);
  data.push(distance);
  data.push(oscilltion);
  data.push(t1.toFixed(2));
  data.push(t2.toFixed(2));
  data.push(meanT.toFixed(2));
  data.push(timePeriod.toFixed(2));

  // console.log(data[0]);
 for (i = 0; i < data.length; i++) {
    document.getElementById("r" + count + "c" + i).innerHTML = data[i];
  }
  count++;

};


//table2



var sn1=0;

var count2=0;

var inputTimePeriod = document.getElementById("inputTimePeriod");
var inputTmin = document.getElementById("inputTmin");
// var inputBD = document.getElementById("inputBD");














let table2 = document.getElementById("table2");
const procedure2 = () => {
  sn1 = sn1 + 1;
distance= distance+5;
meanT =(t1+t2)/2;
if(count2<5){
  table2.innerHTML += ` <tr>
  <td id='r${count2}c0'></td>
  <td id='r${count2}c1'><input type="number"  id="inputAC" style="width: 100px;"></td>
  <td id='r${count2}c2'><input type="number" oninput="inputResult()"  id="inputBD" style="width: 100px;"></td>
  <td id='r${count2}c3'></td>
  <td id='r${count2}c4'><input type="number" id="inputTimePeriod" style="width: 125px;"></td>
  <td id='r${count2}c5'></td>
  <td id='r${count2}c6'></td>
  <td id='r${count2}c7'><input type="number" id="inputTmin" style="width: 100px;"></td>
  <td id='r${count2}c8'></td>
  <td id='r${count2}c9'></td>
  <td id='r${count2}c10'></td>
 </tr>`;
}

  var data = new Array();
  data.push(sn1);
  data.push(4);
  data.push(oscilltion);
  data.push(t1);
  data.push(t2);
  data.push(meanT);
  data.push(timePeriod);
  var inputBD = document.getElementById("inputBD");

  console.log();
 for (i = 0; i < data.length; i++) {
    document.getElementById("r" + count2 + "c0").innerHTML = sn1;
    // document.getElementById("r" + count2 + "c3").innerText = parseFloat(inputBD.value);
  }
  count2++;

};

function inputResult(){
  document.getElementById("r" + count2 + "c3").innerHTML= parseFloat(inputBD.value);

}
