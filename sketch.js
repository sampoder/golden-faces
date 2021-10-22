let capture;
let stage = 0;
let playing = false;
let stages = ["Top", "Bottom", "Left", "Right"]
let data = {
  Top: 0,
  Bottom: 0,
  Left: 0,
  Right: 0
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(handleMouseClicked)
  cnv.parent("canvas")
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();
}

function draw() {
  if(!playing){
    image(capture, 0, 0, windowWidth, windowHeight);
  }
}

function handleMouseClicked(){
  if(playing){
    circle(mouseX, mouseY, 20);
    value = stage > 1 ? mouseX : mouseY
    data[stages[stage]] = value
    if(stage == 3){
      alert("Your ratio is " + Math.abs((Math.round((((data.Bottom - data.Top) / (data.Right - data.Left))* 100))*0.01))+ ", that is " + (Math.round((Math.abs((1.6 - (((data.Bottom - data.Top) / (data.Right - data.Left)))))* 100))*0.01) + " off the golden ratio.")
      stage = 0
      playing = false
      document.getElementById('heading').innerText = "Find if you have the Golden Ratio"
    }
    else{
      stage += 1
      document.getElementById('heading').innerText = "Select the " + stages[stage] + " of Your Face"
    }
  }
}

function start(){
  playing = true;
  document.getElementById('heading').innerText = "Select the " + stages[stage] + " of Your Face"
}