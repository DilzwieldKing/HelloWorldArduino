/*
   DIGF 2004 Atelier 1
   Kate Hartman
   Experiment 3 - Study 7
   Arduino to P5.js - sending value for (3) sensors
   Based on based on the Serial Input to P5.js Lab on the ITP Physical Computing site: 
   https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
   */


  var serial; // variable to hold an instance of the serialport library
  var portName = 'COM5';  // fill in your serial
  var inData;                             // for incoming serial
  var sensor1;
  var sensor2;
  var sensor3;
  var mappedSensor1;
  var mappedSensor2;
  var mappedSensor3;

  var bubbles = [];


function setup() {
  createCanvas(800, 800);
  background('black');
  noStroke();
  //Sets predetermined amount of bubbles to appear on screen.
  for(var i = 0; i < 50; i++){
    bubbles.push(new singlebubble());
  }

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
}

function draw() {
  background(0, 0, 0);
  for(var i = 0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].display();
  }
    
    //Sensor values are modified from tests done with the serial monitor.
    //Bubbles change color when one of the sensors goes over a predetermined threshold.
    if(sensor1 > 800){
      fill(255, 0, 0); 
    }

    if(sensor2 > 300){
      fill(0, 255, 0);
    }

    if(sensor3 > 300){
      fill(0, 0, 255); 

    }
}


 
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      sensor1 = sensors[0];  
      sensor2 = sensors[1]; 
      sensor3 = sensors[2];
      mappedSensor1 = map(sensor1, 0, 1023, height, 0);
      mappedSensor2 = map(sensor2, 0, 1023, height, 0);
      mappedSensor3 = map(sensor3, 0, 1023, height, 0);   
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

//Bubble Object
function singlebubble(){
  this.xcord = random(800);
  this.ycord = random(800, 2000);
  this.width = random(10, 50);
  this.speed = -5;
  
  //Moves the bubble. The x, y, and width variables are reset when the bubble reaches the top.
  this.move = function(){
    this.ycord += this.speed;
    if(this.ycord < -100){
      this.xcord = random(800);
      this.ycord = random(800, 2000);
      this.width = random(10, 50);
    }
  }

  //Draws the bubble object.
  this.display = function(){
    ellipse(this.xcord, this.ycord, this.width);
  }
}