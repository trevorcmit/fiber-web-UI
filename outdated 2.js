"use strict";

let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;
let isScanning = false;
let isGettingData = false;
let hibouDevices = [];
let rightDevice = false;
let scannedSensorData = []
var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(96, 125, 139)'
};
var color = Chart.helpers.color;
const log = document.getElementById("log");
const butConnect = document.getElementById("butConnect");
const butScan = document.getElementById("butScan");
const butGetData = document.getElementById("butGetData");

document.addEventListener("DOMContentLoaded", () => {
  butScan.addEventListener("click", clickScan);
  butGetData.addEventListener("click", clickGetData);
  butConnect.addEventListener("click", clickConnect);
  const notSupported = document.getElementById("notSupported");
  notSupported.classList.toggle("hidden", "serial" in navigator);
});




function randomScalingFactor() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
function onRefresh(chart) {
    chart.config.data.datasets[0].data.push({
			x: Date.now(),
			y: scannedSensorData.p
        });        
}


var config = {
	type: 'line',
	data: {
		datasets: [ {
			label: 'Heart Sound',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
        }
        ]
	},
	options: {
		title: {
			display: true,
			text: 'Heart Sounds- Realtime data'
    },

		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 200,
          delay: 200,
          ttl:1000000,
					onRefresh: onRefresh
        },
        gridLines: {
          display:false
      }
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'value'
        }
			}]
    },
    plugins: {
      zoom: { // Container for zoom options
          zoom: {
              enabled: true, // Boolean to enable zooming
              mode: 'x',
          }
      }
  },
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		}
	}
};
var colorNames = Object.keys(chartColors);

/**
 * @name connect
 * Opens a Web Serial connection to a serial device such as a Smart USB Dongle 2.0 and sets up the input and
 * output stream.
 */
async function connect() {
  port = await navigator.serial.requestPort();  // - Request a port and open a connection.
  await port.open({ baudRate: 115200 });        // - Wait for the port to open.

  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;

  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable.pipeThrough(
    new TransformStream(new LineBreakTransformer())
  );

  reader = inputStream.getReader();
  readLoop().catch((error) => {
    toggleUIConnected(false);
    port = null;
    log.textContent = "Dongle Disconnected!";
  });
}

/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {
  // Close the input stream (reader).
  if (reader) {
    await reader.cancel();
    await inputDone.catch(() => {});
    reader = null;
    inputDone = null;
  }
  // Close the output stream.
  if (outputStream) {
    await outputStream.getWriter().close();
    await outputDone;
    outputStream = null;
    outputDone = null;
  }
  // Close the port.
  await port.close();
  port = null;
  log.textContent = "Dongle Disconnected!";
}

/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 * Checks if port != null
 * If true: Checks if any beacons is advertising or scans are running and stops the advertsing or scan if so. Then runs disconnect() and set toggleUIConnected to false.
 * if false: Runs connect() then set toggleUIConnected to true.
 */
async function clickConnect() {
  log.textContent = "";
  if (port) {

    // If disconnected while scanning the dongle will restart
    if (isScanning) {
      writeCmd("\x03");
      butScan.textContent = "Scan BLE Devices";
      isScanning = false;
    }
    await disconnect();
    toggleUIConnected(false);
    return;
  }
  await connect();
  toggleUIConnected(true);
}

function getSelectedDevice(selectObject) {
  var selectedDevice = selectObject.value;  
  localStorage.setItem("selectedDevice", selectedDevice);
}

/**
 * @name clickScan
 * Click handler for the Scan button.
 * Checks if a scan is already running by checking the boolean isScanning.
 * If isScanning = true: Stops scanning and goes back to peripheral mode, changes the button text and shows the beacon buttons. Finally sets isScanning = false.
 * If isScanning = false: Goes into Central mode and starts scanning for ble devices. Also changes button text and hides the beacon buttons. Finally sets isScanning = true.
 */
function clickScan() {
  console.log("SCAN BUTTON PRESSED");
  if (isScanning) {
    writeCmd("\x03"); // Ctrl+C to stop the scan
    setTimeout(() => {
      writeCmd("AT+PERIPHERAL"); // Set the dongle in Peripheral mode needed for advertising.
    }, 500); // Waiting half a bit to make sure each command will get through separately.
    isScanning = false;
    butGetData.removeAttribute("disabled");
    butScan.textContent = "Scan BLE Devices";
    
    return;
  }
  hibouDevices = [];
  writeCmd("AT+CENTRAL"); // Set the dongle in Central mode needed for scanning.
  
setTimeout(() => {
    writeCmd("AT+GAPSCAN=3");
  }, 500); // Waiting half a bit to make sure each command will get through separately.

 
  butScan.textContent = "Stop Scanning...";
  butGetData.setAttribute("disabled", "true");
  log.classList.toggle("d-none", false);

  isScanning = true;
}




/**
 * @name clickGetData
 * Click handler for the 'Get Data' button.
 * Checks if a getData scan is already running by checking the boolean isGettingData.
 * If isGettingData = true: Stops scanning and goes back to peripheral mode, changes the button text and shows the scan button. Finally sets isGettingData = false.
 * If isGettingData = false: Goes into Central mode and starts scanning for ble devices data. Also changes button text and hides the scan button. Finally sets isGettingData = true.
 */
function clickGetData() {
  console.log("GET DATA BUTTON PRESSED");
  if (isGettingData) {
    //writeCmd("string"); // Ctrl+C to stop the scan//previos \x01
    setTimeout(() => {
      writeCmd("AT+PERIPHERAL"); // Set the dongle in Peripheral mode needed for advertising.
    }, 500); // Waiting half a bit to make sure each command will get through separately.
    isGettingData = false;
    if(window.myChart){
      window.myChart.destroy();
    }
    butScan.removeAttribute("disabled");
    butGetData.textContent = "Get Data";
    return;
  }
  writeCmd("AT+CENTRAL"); // Set the dongle in Central mode needed for scanning.
  writeCmd("ATDS0"); // Prevent print output
    writeCmd("ATA0");//Prevent print output

   writeCmd("AT+GAPCONNECT=[0]48:23:35:00:00:E5");  

 setTimeout(() => {
   writeCmd("AT+SETNOTI=001F"); // ********This is to connect with all of the GATT characteristics
  }, 1000); // **********Waiting half a bit to make sure each command will get through separately.
 
  //setTimeout(() => {
 //  writeCmd("AT+FINDSCANDATA=0"); // Will just scan for adv data that contains 'FF5B07' which is the tag for Manufaturing Specific Data (FF) and our Company ID (5B07).
 // }, 500); // Waiting half a bit to make sure each command will get through separately.

  butGetData.textContent = "Stop Getting Data...";
  butScan.setAttribute("disabled", "true");
  log.classList.toggle("d-none", false);

  isGettingData = true;
    var ctx = document.getElementById('myChart').getContext('2d');
  window.myChart = new Chart(ctx, config);
  
}

/**
 * @name readLoop
 * Reads data from the input stream and displays it on screen.
 */
async function readLoop() {
  while (true) {
    const { value, done } = await reader.read();
    if (value && (!isScanning && !isGettingData)) {
      log.textContent += value + "\n";
    }
    if (value && isScanning) {
      if(value === "SCAN COMPLETE") {
        isScanning = false;
        butScan.textContent = "Scan BLE Devices";
        log.textContent += "\n" +"Scan Done" + "\n";
        butGetData.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }

      let lineValueArray = value.split(" ");
      if (lineValueArray[6] === "(IFM-Fiber)") {
        console.log("lineValueArray[1] is " + lineValueArray[1]);
          console.log("lineValueArray[2] is " + lineValueArray[2]);
        console.log("lineValueArray[3] is " + lineValueArray[3]);
          console.log("lineValueArray[4] is " + lineValueArray[4]);
        console.log("lineValueArray[5] is " + lineValueArray[5]);
          console.log("lineValueArray[6] is " + lineValueArray[6]);

        if(lineValueArray[2]) {
          hibouDevices.push("["+lineValueArray[2].replace("[1]", "") +"]");
        }
        log.textContent = "\n" + "hibouDevices found: " + hibouDevices.length + "\n";
      }

      if(value === "SCAN COMPLETE") {
        var select = document.getElementById("devices");
        hibouDevices.map(function(item){
          var option = document.createElement("option");
          option.value = item;
          option.text  = item;
          select.appendChild(option)
        });
      }
    }

    if (value && isGettingData) {
      if(value === "SCAN COMPLETE") {
        isGettingData = false;
        butGetData.textContent = "Get Data";
        log.textContent += "\n" +"Scan Done" + "\n";
        butScan.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }
     

      let lineValueArray = value.split(" ");
            
   // setTimeout(() => {
   //writeCmd("AT+GETCONN"); //  Scanning to make sure the GATT profile is connected
  //}, 1000); // Waiting half a bit to make sure each command will get through separately.

 // writeCmd("AT+SETNOTI=001F"); 

   //setTimeout(() => {
  // writeCmd("AT+SETNOTI=001F"); // *************Get notified of the adc values
 // }, 5000); // ***********
	 //console.log("Second line: lineValueArray is " + lineValueArray);
          //  console.log("Second line: lineValueArray[0] is " + lineValueArray[0]);
	  //  console.log("Second line: lineValueArray[1] is " + lineValueArray[1]);
  	  //  console.log("Second line: lineValueArray[2] is " + lineValueArray[2]);
	  //  console.log("Second line: lineValueArray[3] is " + lineValueArray[3]);
  	   // console.log("Second line: lsineValueArray[4] is " + lineValueArray[4]);
	   // console.log("Second line: lineValueArray[5] is " + lineValueArray[5]);
  	   // console.log("Second line: lineValueArray[6] is " + lineValueArray[6]);
	 
       //console.log(" localStorage " +  localStorage.getItem("selectedDevice"));

       if ( lineValueArray[0] ===   "Hex:") {
       // console.log("Third line: lineValueArray[1] is" + lineValueArray[1]);
        scannedSensorData = parseSensorData(lineValueArray[1]);
        log.textContent = "\n" + "SensorData= " + JSON.stringify(scannedSensorData) + "\n";
        //console.log("CONSOLE.LOG= "+value);
      }
    }

    if (done) {
      console.log("[readLoop] DONE", done);
      reader.releaseLock();
      break;
    }
  }
}

/**
 * @name writeCmd
 * Gets a writer from the output stream and send the command to the Smart USB Dongle 2.0.
 * @param  {string} cmd command to send to the Smart USB Dongle 2.0
 */
function writeCmd(cmd) {
  // Write to output stream
  const writer = outputStream.getWriter();
  console.log("[SEND]", cmd);

  writer.write(cmd);
  // Ignores sending carriage return if sending Ctrl+C
  if (cmd !== "\x03") {
    writer.write("\r"); // Important to send a carriage return after a command
  }
  writer.releaseLock();
}

/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.container = "";
  }

  transform(chunk, controller) {
    // Handle incoming chunk
    this.container += chunk;
    const lines = this.container.split("\r\n");
    this.container = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // Flush the stream.
    controller.enqueue(this.container);
  }
}

/**
 * @name toggleUIConnected
 * Changes the text on butConnect depending on the action it actually will preform in the current state.
 * @param  {boolean} connected true if connected, false if disconnected.
 */
function toggleUIConnected(connected) {
  let lbl = "Connect";
  if (connected) {
    lbl = "Disconnect";
    butGetData.removeAttribute("disabled");
    butScan.removeAttribute("disabled");
  }
  butScan.classList.toggle("disabled", !connected);
  butGetData.classList.toggle("disabled", !connected);
  butConnect.textContent = lbl;
}

/**
 * @name parseSensorData
 * Parse the data from advertising data string.
 * @param  {string} input advertising data string.
 * @returns {object ={sensorid:{string}, p:{int}, t:{int}, h:{int}, als:{int}, pm1:{int}, pm25:{int}, pm10:{int}}} 
 */
function parseSensorData(input) {
  let counter = 0;
  
  let sensorData = {
    sensorid:
      input[counter + 2] +
      input[counter + 3] ,
    p:
      (input[counter + 2] +
      input[counter + 3] + 
      input[counter + 4]/10 ),
  }
  return sensorData
}


// readLoop()
//   .then((data) => { console.log(data)})
window.onload = function() {
	//var ctx = document.getElementById('myChart').getContext('2d');
	//window.myChart = new Chart(ctx, config);
};