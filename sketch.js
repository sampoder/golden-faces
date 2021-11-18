let capture;
let stage = 0;
let cnv;
let playing = false;
let stages = ["Top", "Bottom", "Left", "Right"];
let stageLabels = [
  "Tap on the middle of your hairline.",
  "Tap the bottom of your chin.",
  "Tap on your left ear.",
  "Tap on your right ear.",
];
let data = {
  "The Top of Your Head": [0, 0],
  "Your Hairline": [0, 0],
  "Your Chin": [0, 0],
  "Your Left Pupil": [0, 0],
  "The Tip of Your Nose": [0, 0],
  "The Middle of Your Lips": [0, 0],
  "Your Left Nostril": [0, 0],
  "Your Right Nostril": [0, 0],
  "The Outer Edge of Your Left Eye": [0, 0],
  "The Outer Edge of Your Right Eye": [0, 0],
  "Your Left Ear": [0, 0],
  "Your Right Ear": [0, 0],
  "The Left Edge of Your Lip": [0, 0],
  "The Right Edge of Your Lip": [0, 0],
};

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(handleMouseClicked);
  cnv.parent("canvas");
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  if (!playing) {
    image(
      capture,
      (windowWidth - windowHeight * (capture.width / capture.height)) / 2,
      0,
      windowHeight * (capture.width / capture.height),
      windowHeight
    );
  }
}

function handleMouseClicked() {
  if (playing) {
    circle(mouseX, mouseY, 20);
    data[Object.keys(data)[stage]] = [mouseX, mouseY];
    stage += 1;
    if (stage == Object.keys(data).length) {
      var name = prompt("What is your name?");
      var grade = prompt("What is your grade?");
      let ratio = 0;
      ratio +=
        Math.abs(data["The Top of Your Head"][1] - data["Your Chin"][1]) /
        Math.abs(data["Your Right Ear"][0] - data["Your Left Ear"][0]);
      ratio +=
        Math.abs(data["The Top of Your Head"][1] - data["Your Left Pupil"][1]) /
        Math.abs(
          data["Your Left Pupil"][1] - data["The Middle of Your Lips"][1]
        );
      ratio +=
        Math.abs(data["The Tip of Your Nose"][1] - data["Your Chin"][1]) /
        Math.abs(data["The Middle of Your Lips"][1] - data["Your Chin"][1]);
      ratio +=
        Math.abs(data["The Tip of Your Nose"][1] - data["Your Chin"][1]) /
        Math.abs(data["Your Left Pupil"][1] - data["The Tip of Your Nose"][1]);
      ratio +=
        Math.abs(data["Your Right Nostril"][0] - data["Your Left Nostril"][0]) /
        Math.abs(
          data["The Tip of Your Nose"][1] - data["The Middle of Your Lips"][1]
        );
      ratio +=
        Math.abs(
          data["The Outer Edge of Your Right Eye"][0] -
            data["The Outer Edge of Your Left Eye"][0]
        ) / Math.abs(data["Your Hairline"][1] - data["Your Left Pupil"][1]);
      ratio +=
        Math.abs(
          data["The Right Edge of Your Lip"][0] -
            data["The Left Edge of Your Lip"][0]
        ) /
        Math.abs(data["Your Right Nostril"][0] - data["Your Left Nostril"][0]);
      ratio = Math.abs(ratio / 7)
      submitImage(ratio, name, grade);
      alert("Your ratio is " + (Math.round(Math.abs(1.61803398875 - ratio)* 100) / 100) + " off the golden ratio.");
      stage = 0;
      playing = false;
      document.getElementById("heading").innerText =
        "Tap here to find out how Golden you are.";
    } else {
      document.getElementById("heading").innerText = Object.keys(data)[stage];
    }
  }
}

function start() {
  playing = true;
  document.getElementById("heading").innerText = Object.keys(data)[stage];
}

const submitImage = async (ratio, name, grade) => {
  let submission = await fetch("/api/share", {
    method: "POST",
    body: JSON.stringify({ Name: name, Ratio: ratio, Grade: grade }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (submission.ok) {
    submission = await submission.json();
  } else {
    submission = await submission.json();
    alert("Error submitting! Please try again.");
  }
};
