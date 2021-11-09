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
  chart.config.data.datasets[0].data.push({x: Date.now(), y: scannedSensorData[0]});
  chart.config.data.datasets[1].data.push({x: Date.now()+10, y: scannedSensorData.b0});
  chart.config.data.datasets[2].data.push({x: Date.now()+20, y: scannedSensorData.c0}); 
  chart.config.data.datasets[3].data.push({x: Date.now()+30, y: scannedSensorData.d0}); 
  chart.config.data.datasets[4].data.push({x: Date.now()+40, y: scannedSensorData.e0});
  chart.config.data.datasets[5].data.push({x: Date.now()+50, y: scannedSensorData.f0});
  chart.config.data.datasets[6].data.push({x: Date.now()+60, y: scannedSensorData.g0});
  chart.config.data.datasets[7].data.push({x: Date.now()+70, y: scannedSensorData.h0}); 
  chart.config.data.datasets[8].data.push({x: Date.now()+80, y: scannedSensorData.i0}); 
  chart.config.data.datasets[9].data.push({x: Date.now()+90, y: scannedSensorData.j0});    
	chart.config.data.datasets[10].data.push({x: Date.now()+100, y: scannedSensorData.k0});
  chart.config.data.datasets[11].data.push({x: Date.now()+110, y: scannedSensorData.l0});
  chart.config.data.datasets[12].data.push({x: Date.now()+120, y: scannedSensorData.m0}); 
  chart.config.data.datasets[13].data.push({x: Date.now()+130, y: scannedSensorData.n0}); 
  chart.config.data.datasets[14].data.push({x: Date.now()+140, y: scannedSensorData.o0});
  chart.config.data.datasets[15].data.push({x: Date.now()+150, y: scannedSensorData.p0});
  chart.config.data.datasets[16].data.push({x: Date.now()+160, y: scannedSensorData.q0});
  chart.config.data.datasets[17].data.push({x: Date.now()+170, y: scannedSensorData.r0}); 
  chart.config.data.datasets[18].data.push({x: Date.now()+180, y: scannedSensorData.s0}); 
  chart.config.data.datasets[19].data.push({x: Date.now()+190, y: scannedSensorData.t0});
  chart.config.data.datasets[20].data.push({x: Date.now()+200, y: scannedSensorData.u0});
  chart.config.data.datasets[21].data.push({x: Date.now()+210, y: scannedSensorData.v0});
  chart.config.data.datasets[22].data.push({x: Date.now()+220, y: scannedSensorData.w0}); 
  chart.config.data.datasets[23].data.push({x: Date.now()+230, y: scannedSensorData.x0});
  chart.config.data.datasets[24].data.push({x: Date.now()+240, y: scannedSensorData.y0});
  chart.config.data.datasets[25].data.push({x: Date.now()+250, y: scannedSensorData.z0});

  chart.config.data.datasets[26].data.push({x: Date.now()+260, y: scannedSensorData.a1});
  chart.config.data.datasets[27].data.push({x: Date.now()+270, y: scannedSensorData.b1});
  chart.config.data.datasets[28].data.push({x: Date.now()+280, y: scannedSensorData.c1}); 
  chart.config.data.datasets[29].data.push({x: Date.now()+290, y: scannedSensorData.d1}); 
  chart.config.data.datasets[30].data.push({x: Date.now()+300, y: scannedSensorData.e1});
  chart.config.data.datasets[31].data.push({x: Date.now()+310, y: scannedSensorData.f1});
  chart.config.data.datasets[32].data.push({x: Date.now()+320, y: scannedSensorData.g1});
  chart.config.data.datasets[33].data.push({x: Date.now()+330, y: scannedSensorData.h1}); 
  chart.config.data.datasets[34].data.push({x: Date.now()+340, y: scannedSensorData.i1}); 
  chart.config.data.datasets[35].data.push({x: Date.now()+350, y: scannedSensorData.j1});    
	chart.config.data.datasets[36].data.push({x: Date.now()+360, y: scannedSensorData.k1});
  chart.config.data.datasets[37].data.push({x: Date.now()+370, y: scannedSensorData.l1});
  chart.config.data.datasets[38].data.push({x: Date.now()+380, y: scannedSensorData.m1}); 
  chart.config.data.datasets[39].data.push({x: Date.now()+390, y: scannedSensorData.n1}); 
  chart.config.data.datasets[40].data.push({x: Date.now()+400, y: scannedSensorData.o1});
  chart.config.data.datasets[41].data.push({x: Date.now()+410, y: scannedSensorData.p1});
  chart.config.data.datasets[42].data.push({x: Date.now()+420, y: scannedSensorData.q1});
  chart.config.data.datasets[43].data.push({x: Date.now()+430, y: scannedSensorData.r1}); 
  chart.config.data.datasets[44].data.push({x: Date.now()+440, y: scannedSensorData.s1}); 
  chart.config.data.datasets[45].data.push({x: Date.now()+450, y: scannedSensorData.t1});
  chart.config.data.datasets[46].data.push({x: Date.now()+460, y: scannedSensorData.u1});
  chart.config.data.datasets[47].data.push({x: Date.now()+470, y: scannedSensorData.v1});
  chart.config.data.datasets[48].data.push({x: Date.now()+480, y: scannedSensorData.w1}); 
  chart.config.data.datasets[49].data.push({x: Date.now()+490, y: scannedSensorData.x1});
  chart.config.data.datasets[50].data.push({x: Date.now()+500, y: scannedSensorData.y1});
  chart.config.data.datasets[51].data.push({x: Date.now()+510, y: scannedSensorData.z1});
}


var config = {
  markerType: "circle",  //"circle", "square", "cross", "none"
  markerSize: 10,
	type: 'line',
	data: {
		datasets: [ 
      {
        label: 'a0',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'b0',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'c0',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow, 
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'd0',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'e0',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'f0',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'g0',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'h0',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'i0',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'j0',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'k0',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'l0',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'm0',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'n0',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'o0',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'p0',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'q0',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'r0',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 's0',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 't0',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'u0',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'v0',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'w0',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'x0',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'y0',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'z0',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'a1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'b1',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'c1',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow, 
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'd1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'e1',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'f1',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'g1',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'h1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'i1',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'j1',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'k1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'l1',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'm1',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'n1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'o1',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'p1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'q1',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'r1',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 's1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 't1',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'u1',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'v1',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'w1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'x1',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'y1',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'z1',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'a2',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'b2',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'c2',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow, 
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'd2',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'e2',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'f2',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'g2',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'h2',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'i2',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'j2',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'k2',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'l2',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'm2',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'n2',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'o2',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'p2',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'q2',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'r2',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 's2',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 't2',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'u2',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'v2',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'w2',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'x2',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'y2',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'z2',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'a3',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'b3',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'c3',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow, 
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'd3',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'e3',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'f3',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'g3',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'h3',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'i3',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'j3',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'k3',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'l3',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'm3',
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'n3',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'o3',
        backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
        borderColor: chartColors.grey,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'p3',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'q3',
        backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
        borderColor: chartColors.orange,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 'r3',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 's3',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
      {
        label: 't3',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
      },
  ``]   
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
			xAxes: [
        {
          type: 'realtime',
          realtime: {
            duration: 20000,
            refresh: 20,
            delay: 20,
            ttl:1000000,
            onRefresh: onRefresh
          },
          gridLines: {display:false}
			  }
      ],
			yAxes: [{scaleLabel: {display: true, labelString: 'value'}}]
    },

    plugins: {
      zoom: {
        zoom: {enabled: true, mode: 'x'} // Eg. 'y' would only allow zooming in the y direction
      }
    },

		tooltips: {
			callbacks: {label: function(tooltipItem) {return tooltipItem.yLabel;}},
			mode: 'nearest',
			intersect: false
		},

		hover: {mode: 'nearest', intersect: false}
	}
};

var colorNames = Object.keys(chartColors);

/**
 * @name connect
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
  if (reader) {                 // Close the input stream (reader).
    await reader.cancel();
    await inputDone.catch(() => {});
    reader = null;
    inputDone = null;
  }

  if (outputStream) {
    await outputStream.getWriter().close(); // Close the output stream.
    await outputDone;
    outputStream = null;
    outputDone = null;
  }

  await port.close(); // Close the port.
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
    setTimeout(
      () => {
        writeCmd("AT+PERIPHERAL"); // Set the dongle in Peripheral mode needed for advertising.
      }, 500
    ); // Waiting half a bit to make sure each command will get through separately.

    isScanning = false;
    butGetData.removeAttribute("disabled");
    butScan.textContent = "Scan BLE Devices";
    return;
  }
  hibouDevices = [];
  writeCmd("AT+CENTRAL");                             // Set the dongle in Central mode needed for scanning.
  setTimeout(() => {writeCmd("AT+GAPSCAN=3");}, 500); // Waiting half a bit to make sure each command gets through separately.
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
    //writeCmd("string");        // Ctrl+C to stop the scan//previos \x01
    setTimeout(() => {
      writeCmd("AT+PERIPHERAL"); // Set the dongle in Peripheral mode needed for advertising.
    }, 500);                     // Waiting half a bit to make sure each command will get through separately.
    isGettingData = false;
    if(window.myChart) {window.myChart.destroy();}
    butScan.removeAttribute("disabled");
    butGetData.textContent = "Get Data";
    return;
  }
  writeCmd("AT+CENTRAL");                          // Set the dongle in Central mode needed for scanning.
  writeCmd("ATDS0");                               // Prevent print output
  writeCmd("ATA1");                                //Prevent print output
  writeCmd("AT+GAPCONNECT=[0]48:23:35:00:08:8E");  //[0]48:23:35:00:08:8E //[0]48:23:35:00:00:E5
  // [0]48:23:35:00:0B:79

  console.log('before');
  setTimeout(function() {console.log('after');}, 500);

 setInterval(() => {
    writeCmd("AT+SETNOTI=001F"); // ********This is to connect with all of the GATT characteristics
  }, 5);         // **********200, Waiting half a bit to make sure each command will get through separately.
 
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
      if (lineValueArray[6] === "(IFM-Fiber-6)") {
        console.log("lineValueArray[1] is " + lineValueArray[1]);
        console.log("lineValueArray[2] is " + lineValueArray[2]);
        console.log("lineValueArray[3] is " + lineValueArray[3]);
        console.log("lineValueArray[4] is " + lineValueArray[4]);
        console.log("lineValueArray[5] is " + lineValueArray[5]);
        console.log("lineValueArray[6] is " + lineValueArray[6]);
        if (lineValueArray[2]) {
          hibouDevices.push("["+lineValueArray[2].replace("[1]", "") +"]");
        }
        log.textContent = "\n" + "hibouDevices found: " + hibouDevices.length + "\n";
      }
      if(value === "SCAN COMPLETE") {
        var select = document.getElementById("devices");
        hibouDevices.map(function(item) {
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
        log.textContent += "\n" +"Scan Done" + "\n";
        butScan.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }

      let lineValueArray = value.split(" ");
	    console.log("Second line: lineValueArray is " + lineValueArray);

      if (lineValueArray[1] === "received:") {
      // console.log("Third line: lineValueArray[1] is" + lineValueArray[1]);
        let str = '';
      	for (var counter = 2; counter < 93; counter++) {
 		      str += lineValueArray[counter];
   		    str += ',';
		    }
	      console.log("str is " + str);
	      scannedSensorData = parseSensorData(str);
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
  const writer = outputStream.getWriter();  // Write to output stream
  console.log("[SEND]", cmd);
  writer.write(cmd);                        // Ignores sending carriage return if sending Ctrl+C
  if (cmd !== "\x03") {writer.write("\r");} // Important to send a carriage return after a command
  writer.releaseLock();
}


/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
  constructor() {this.container = "";} // A container for holding stream data until a new line.

  transform(chunk, controller) {       // Handle incoming chunk
    this.container += chunk;
    const lines = this.container.split("\r\n");
    this.container = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }
  flush(controller) {controller.enqueue(this.container);} // Flush the stream.
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
  const array = input.split(",");
  console.log('array is' + array);
  
  let sensorData = {
    sensorid: input[counter + 2] + input[counter + 3] ,
    a0: array[0],
    b0: array[1],
    c0: array[2],
    d0: array[3], 
    e0: array[4],
    f0: array[5],
    g0: array[6],
    h0: array[7],
    i0: array[8],
    j0: array[9],
    k0: array[10],
    l0: array[11],
    m0: array[12],
  	n0: array[13],
 	  o0: array[14],
  	p0: array[15],
    q0: array[16],
    r0: array[17],
  	s0: array[18],
    t0: array[19],
    u0: array[20],
 	  v0: array[21],
    w0: array[22],
    x0: array[23],
    y0: array[24],
    z0: array[25],

    a1: array[26],
    b1: array[27],
    c1: array[28],
    d1: array[29], 
    e1: array[30],
    f1: array[31],
    g1: array[32],
    h1: array[33],
    i1: array[34],
    j1: array[35],
    k1: array[36],
    l1: array[37],
    m1: array[38],
  	n1: array[39],
 	  o1: array[40],
  	p1: array[41],
    q1: array[42],
    r1: array[43],
  	s1: array[44],
    t1: array[45],
    u1: array[46],
 	  v1: array[47],
    w1: array[48],
    x1: array[49],
    y1: array[50],
    z1: array[51],

    a2: array[52],
    b2: array[53],
    c2: array[54],
    d2: array[55], 
    e2: array[56],
    f2: array[57],
    g2: array[58],
    h2: array[59],
    i2: array[60],
    j2: array[61],
    k2: array[62],
    l2: array[63],
    m2: array[64],
  	n2: array[65],
 	  o2: array[66],
  	p2: array[67],
    q2: array[68],
    r2: array[69],
  	s2: array[70],
    t2: array[71],
    u2: array[72],
 	  v2: array[73],
    w2: array[74],
    x2: array[75],
    y2: array[76],
    z2: array[77],

    a3: array[78],
    b3: array[79],
    c3: array[80],
    d3: array[81], 
    e3: array[82],
    f3: array[83],
    g3: array[84],
    h3: array[85],
    i3: array[86],
    j3: array[87],
    k3: array[88],
    l3: array[89],
    m3: array[90],
  	n3: array[91],
 	  o3: array[92],
  	p3: array[93],
    q3: array[94],
    r3: array[95],
  	s3: array[96],
    t3: array[97],
  }

  return sensorData // Return string with the 98 data readings
}


// function parseSensorData(input) {
//   let counter = 13;
//   if (input.includes("5B070503")) {
//     counter = 17;
//   }
//   let sensorData = {
//     sensorid:
//       input[counter + 1] +
//       input[counter + 2] +
//       input[counter + 3] +
//       input[counter + 4] +
//       input[counter + 5] +
//       input[counter + 6],
//     p:
//       parseInt(
//         input[counter + 13] +
//           input[counter + 14] +
//           input[counter + 11] +
//           input[counter + 12],
//         16
//       ) / 10,
//     t:
//       parseInt(
//         input[counter + 17] +
//           input[counter + 18] +
//           input[counter + 15] +
//           input[counter + 16],
//         16
//       ) / 10,
//     h:
//       parseInt(
//         input[counter + 21] +
//           input[counter + 22] +
//           input[counter + 19] +
//           input[counter + 20],
//         16
//       ) / 10,
//       voc:
//       parseInt(
//         input[counter + 25] +
//           input[counter + 26] +
//           input[counter + 23] +
//           input[counter + 24],
//         16
//       ) / 10,
//     als: parseInt(
//       input[counter + 9] +
//         input[counter + 10] +
//         input[counter + 7] +
//         input[counter + 8],
//       16
//     ),
//     pm1:
//       parseInt(
//         input[counter + 29] +
//           input[counter + 30] +
//           input[counter + 27] +
//           input[counter + 28],
//         16
//       ) / 10,
//     pm25:
//       parseInt(
//         input[counter + 33] +
//           input[counter + 34] +
//           input[counter + 31] +
//           input[counter + 32],
//         16
//       ) / 10,
//     pm10:
//       parseInt(
//         input[counter + 37] +
//           input[counter + 38] +
//           input[counter + 35] +
//           input[counter + 36],
//         16
//       ) / 10}
//   return sensorData
// }



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