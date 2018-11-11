/*
   DIGF 2004 Atelier 1
   Kate Hartman
   Experiment 3 - Study 3
   Arduino to P5.js - sending value for (1) switch
   Based on based on the Serial Input to P5.js Lab on the ITP Physical Computing site: 
   https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
   */

  var serial; // variable to hold an instance of the serialport library
  var portName = 'COM5';  // fill in your serial
  var inData;                             // for incoming serial
  var x = 0;
  var move = 1;

function setup() {
	createCanvas(600, 600);
  background(255);

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
  background(255);


  for(i = 0; i < 1; i++){
    if (inData == 0){
        fill('red');
        x = x + 1;
    }else{
        fill('blue');
        x = x + 0;
    }  
      
  }
  for(j = 0; j < 1; j++){

  }
    

  rect(x, 300, 20, 20)

}

 
 
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  inData = Number(inString);
  console.log(inData);
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
