var lights = require('./lights'),
    leap = require('leapjs');

var controller = new leap.Controller();
var initialized = false;
var lightSetInterval;
var updatingLights = false;

// This current state will change the lights based on hand position over the leapmotion device
var state = {
  "on": false,
  "bri": null,
  "hue": null,
  "sat": 255
};

// Continuous looping from the leapmotion device
controller.on("frame", function(frame){

  // If a hand is detected
  if(frame.hands[0]) {
    // Getting current hand position
    var pos = frame.hands[0].palmPosition;


    // Updating the next state based on hand position
    updateState(pos);

    // If we are not already updating the lights on an interval, set the interval
    if(!updatingLights) {
      updatingLights = true;
      lightSetInterval = setInterval(function(){
        lights.setLightState(state);
      }, 50);
    }
  } else {
    clearInterval(lightSetInterval);
    updatingLights = false;
  }
});

// Updating the light state(on/off, brightness, color) based on hand position
function updateState(pos){
  var x = pos[0];
  var y = pos[1];

  state.hue = Math.floor((13107/124)*(x) + (1900515/62));

  var brightness = Math.floor(y / 2);
  if (brightness > 255) brightness = 255;
  state.bri = brightness;

  if(brightness < 80) {
    state.on = false;
  } else {
    state.on = true
  }
}

controller.connect();
