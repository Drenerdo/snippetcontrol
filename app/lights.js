var hue = require("node-hue-api");

// Here is my info for the hue
var hostname = "192.168.1.134";
    username = "newdeveloper";

// Connecting to the hue lights
var api = new hue.HueApi(hostname, username);

// Using for access control to the lights, as they do not support more than one request at a time
var locked = false;

module.exports = {
  // Only expose a function to update the lights for now
  setLightState: function(state){

    // Do not update the light if they are locked
    if(locked)return;

    locked = true;

    // Updating the lights based on the state passed in
    api.setLightState(1, state, function(){
      // Unlocking the lights after they have been set
      locked = false;
    });
    api.setLightState(2, state, function(){
      // Unlocking the lights after they have been set
      locked = false
    });

    console.log("setLightState");
  }
};
