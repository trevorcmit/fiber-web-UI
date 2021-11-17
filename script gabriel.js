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
			y: scannedSensorData.a
        });
   chart.config.data.datasets[1].data.push({
			x: Date.now()+10,
			y: scannedSensorData.b
        });
        chart.config.data.datasets[2].data.push({
			x: Date.now()+20,
			y: scannedSensorData.c
        }); 
        chart.config.data.datasets[3].data.push({
          x: Date.now()+30,
          y: scannedSensorData.d
            }); 
        chart.config.data.datasets[4].data.push({
          x: Date.now()+40,
          y: scannedSensorData.e
            });

     chart.config.data.datasets[5].data.push({
			x: Date.now()+50,
			y: scannedSensorData.f
        });
   chart.config.data.datasets[6].data.push({
			x: Date.now()+60,
			y: scannedSensorData.g
        });
        chart.config.data.datasets[7].data.push({
			x: Date.now()+70,
			y: scannedSensorData.h
        }); 
        chart.config.data.datasets[8].data.push({
          x: Date.now()+80,
          y: scannedSensorData.i
            }); 
        chart.config.data.datasets[9].data.push({
          x: Date.now()+90,
          y: scannedSensorData.j
            });
    
                 
	chart.config.data.datasets[10].data.push({
			x: Date.now()+100,
			y: scannedSensorData.k
        });
   chart.config.data.datasets[11].data.push({
			x: Date.now()+110,
			y: scannedSensorData.l
        });
        chart.config.data.datasets[12].data.push({
			x: Date.now()+120,
			y: scannedSensorData.m
        }); 
        chart.config.data.datasets[13].data.push({
          x: Date.now()+130,
          y: scannedSensorData.n
            }); 
        chart.config.data.datasets[14].data.push({
          x: Date.now()+140,
          y: scannedSensorData.o
            });

      
 chart.config.data.datasets[15].data.push({
			x: Date.now()+150,
			y: scannedSensorData.p
        });
   chart.config.data.datasets[16].data.push({
			x: Date.now()+160,
			y: scannedSensorData.q
        });
        chart.config.data.datasets[17].data.push({
			x: Date.now()+170,
			y: scannedSensorData.r
        }); 
        chart.config.data.datasets[18].data.push({
          x: Date.now()+180,
          y: scannedSensorData.s
            }); 
        chart.config.data.datasets[19].data.push({
          x: Date.now()+190,
          y: scannedSensorData.t
            });

     
       

}


var config = {
  markerType: "circle",  //"circle", "square", "cross", "none"
  markerSize: 10,
	type: 'line',
	data: {
		datasets: [ {
			label: 'a',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'b',
			backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
			borderColor: chartColors.orange,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
        {
			label: 'c',
			backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
			borderColor: chartColors.yellow,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
    },
    {
			label: 'd',
			backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
    {
  			label: 'e',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},


{
			label: 'f',
			backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
			borderColor: chartColors.purple,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'g',
			backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
			borderColor: chartColors.grey,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
        {
			label: 'h',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
    },
    {
			label: 'i',
			backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
			borderColor: chartColors.orange,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
    {
  			label: 'j',
			backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
			borderColor: chartColors.yellow,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},

{
			label: 'k',
			backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'l',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
        {
			label: 'm',
			backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
			borderColor: chartColors.purple,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
    },
    {
			label: 'n',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
    {
  			label: 'o',
			backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
			borderColor: chartColors.grey,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
{
  			label: 'p',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},

{
			label: 'q',
			backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
			borderColor: chartColors.orange,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
        },
        {
			label: 'r',
			backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
			borderColor: chartColors.yellow,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		},
        {
			label: 's',
			backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
    },
    {
			label: 't',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			showLine: false,
			cubicInterpolationMode: 'monotone',
			data: []
		}






]
        
	},
	options: {

		legend: {
        		display: false
   			 },
		title: {
			display: true,
			text: 'Heart Sounds- Realtime data'
    },

		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 20,
          delay: 20,
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
      zoom: {
            // Container for zoom options
          zoom: {
              // Boolean to enable zooming
              enabled: true,

              // Zooming directions. Remove the appropriate direction to disable 
              // Eg. 'y' would only allow zooming in the y direction
              mode: 'x',
          }
      }
  },
		tooltips: {
			   callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        },
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
  // - Request a port and open a connection.
  port = await navigator.serial.requestPort();
  // - Wait for the port to open.
  await port.open({ baudRate: 115200 });

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
  writeCmd("ATDS1"); // Prevent print output
    writeCmd("ATA1");//Prevent print output

   writeCmd("AT+GAPCONNECT=[0]48:23:35:00:0B:79");  //[0]48:23:35:00:08:8E //[0]48:23:35:00:00:E5
    
  console.log('before');
  setTimeout(function() {
      console.log('after');
  }, 500);

  setInterval(() => {
    writeCmd("AT+SETNOTI=001F"); // ********This is to connect with all of the GATT characteristics
  }, 50); // **********200, Waiting half a bit to make sure each command will get through separately.
 
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
    if (value && (!isScanning && !isGettingData)) {log.textContent += value + "\n";}
    
    if (value && isScanning) {
      if(value === "SCAN COMPLETE") {
        isScanning = false;
        butScan.textContent = "Scan BLE Devices";
        log.textContent += "\n" +"Scan Done" + "\n";
        butGetData.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }
      let lineValueArray = value.split(" ");
      if (lineValueArray[6] === "(IFM-Fiber-2)") {
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
      if (value === "SCAN COMPLETE") {
        isGettingData = false;
        butGetData.textContent = "Get Data";
        log.textContent += "\n" + "Scan Done" + "\n";
        butScan.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }
     

      let lineValueArray = value.split(" ");


	 //console.log("Second line: Value is " + value);
	 //console.log("Second line: lineValueArray is " + lineValueArray);
         // console.log("Second line: lineValueArray[0] is " + lineValueArray[0]);
	  //console.log("Second line: lineValueArray[1] is " + lineValueArray[1]);
  	 // console.log("Second line: lineValueArray[2] is " + lineValueArray[2]);
	  //console.log("Second line: lineValueArray[3] is " + lineValueArray[3]);
  	  // console.log("Second line: lsineValueArray[4] is " + lineValueArray[4]);
	   // console.log("Second line: lineValueArray[5] is " + lineValueArray[5]);
  	   // console.log("Second line: lineValueArray[6] is " + lineValueArray[6]);
	 

       //console.log(" localStorage " +  localStorage.getItem("selectedDevice"));

	

       if ( lineValueArray[0] ===   "Hex:") {
         
       // console.log("Third line: lineValueArray[1] is" + lineValueArray[1]);
         //let str = '';
      	//for (var counter = 2; counter < 26; counter++) {
 	//	str += lineValueArray[counter];
   	//	str += ',';
	//	}
	// console.log("str is " + str);
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
  //const array = input.split(",");
  console.log('input is' + input);
  
  let sensorData = {
    sensorid:
      input[counter + 2] +
      input[counter + 3] ,
    a:
      parseInt(
        input[counter + 4] +
          input[counter + 5] +
          input[counter + 2] +
          input[counter + 3],
        16
      ),


      b:
       parseInt(
        input[counter + 8] +
          input[counter + 9 ] +
          input[counter + 6] +
          input[counter + 7],
        16
      ),


   c:
        parseInt(
        input[counter + 12] +
          input[counter + 13] +
          input[counter + 10] +
          input[counter + 11],
        16
      ),


  	d:
      parseInt(
        input[counter + 16] +
          input[counter + 17] +
          input[counter + 14] +
          input[counter + 15],
        16
      ),

 	e:
       parseInt(
        input[counter + 20] +
          input[counter + 21] +
          input[counter + 18] +
          input[counter + 19],
        16
      ),

 	f:
       parseInt(
        input[counter + 24] +
          input[counter + 25] +
          input[counter + 22] +
          input[counter + 23],
        16
      ),


      g:
     parseInt(
        input[counter + 28] +
          input[counter + 29] +
          input[counter + 26] +
          input[counter + 27],
        16
      ),


   h: 
	 parseInt(
        input[counter + 32] +
          input[counter + 33] +
          input[counter + 30] +
          input[counter + 31],
        16
      ),

  	i:
       parseInt(
        input[counter + 36] +
          input[counter + 37] +
          input[counter + 34] +
          input[counter + 35],
        16
      ),


 	j:
        parseInt(
        input[counter + 40] +
          input[counter + 41] +
          input[counter + 38] +
          input[counter + 39],
        16
      ),

  k:
       parseInt(
        input[counter + 44] +
          input[counter + 45] +
          input[counter + 42] +
          input[counter + 43],
        16
      ),


      l:
       parseInt(
        input[counter + 48] +
          input[counter + 49] +
          input[counter + 46] +
          input[counter + 47],
        16
      ),

   m:
        parseInt(
        input[counter + 52] +
          input[counter + 53] +
          input[counter + 50] +
          input[counter + 51],
        16
      ),

  	n:
      parseInt(
        input[counter + 56] +
          input[counter + 57] +
          input[counter + 54] +
          input[counter + 55],
        16
      ),

 	o:
       parseInt(
        input[counter + 60] +
          input[counter + 61] +
          input[counter + 58] +
          input[counter + 59],
        16
      ),

 	p:
       parseInt(
        input[counter + 64] +
          input[counter + 65] +
          input[counter + 62] +
          input[counter + 63],
        16
      ),


      q:
     parseInt(
        input[counter + 68] +
          input[counter + 69] +
          input[counter + 66] +
          input[counter + 67],
        16
      ),

   r: 
	 parseInt(
        input[counter + 72] +
          input[counter + 73] +
          input[counter + 70] +
          input[counter + 71],
        16
      ),

  	s:
       parseInt(
        input[counter + 76] +
          input[counter + 77] +
          input[counter + 74] +
          input[counter + 75],
        16
      ),

 	t:
       parseInt(
        input[counter + 80] +
          input[counter + 81] +
          input[counter + 78] +
          input[counter + 79],
        16
      ),
  }
  return sensorData
}

function reversedNum(num) {
  return (
    parseFloat(
      num
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(num)
  )                 
}

// readLoop()
//   .then((data) => { console.log(data)})
window.onload = function() {
	//var ctx = document.getElementById('myChart').getContext('2d');
	//window.myChart = new Chart(ctx, config);
};