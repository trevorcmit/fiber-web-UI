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

document.addEventListener(
  "DOMContentLoaded", () => {
    butScan.addEventListener("click", clickScan);
    butGetData.addEventListener("click", clickGetData);
    butConnect.addEventListener("click", clickConnect);
    const notSupported = document.getElementById("notSupported");
    notSupported.classList.toggle("hidden", "serial" in navigator);
  }
);

function randomScalingFactor() {return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);}


function onRefresh(chart) {
  chart.config.data.datasets[0].data.push({x: Date.now(),    y: scannedSensorData.a0});
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
  // chart.config.data.datasets[52].data.push({x: Date.now()+520, y: scannedSensorData.a2});
  // chart.config.data.datasets[53].data.push({x: Date.now()+530, y: scannedSensorData.b2});
  // chart.config.data.datasets[54].data.push({x: Date.now()+540, y: scannedSensorData.c2}); 
  // chart.config.data.datasets[55].data.push({x: Date.now()+550, y: scannedSensorData.d2}); 
  // chart.config.data.datasets[56].data.push({x: Date.now()+560, y: scannedSensorData.e2});
  // chart.config.data.datasets[57].data.push({x: Date.now()+570, y: scannedSensorData.f2});
  // chart.config.data.datasets[58].data.push({x: Date.now()+580, y: scannedSensorData.g2});
  // chart.config.data.datasets[59].data.push({x: Date.now()+590, y: scannedSensorData.h2}); 
  // chart.config.data.datasets[60].data.push({x: Date.now()+600, y: scannedSensorData.i2}); 
  // chart.config.data.datasets[61].data.push({x: Date.now()+610, y: scannedSensorData.j2});
	// chart.config.data.datasets[62].data.push({x: Date.now()+620, y: scannedSensorData.k2});
  // chart.config.data.datasets[63].data.push({x: Date.now()+630, y: scannedSensorData.l2});
  // chart.config.data.datasets[64].data.push({x: Date.now()+640, y: scannedSensorData.m2}); 
  // chart.config.data.datasets[65].data.push({x: Date.now()+650, y: scannedSensorData.n2}); 
  // chart.config.data.datasets[66].data.push({x: Date.now()+660, y: scannedSensorData.o2});
  // chart.config.data.datasets[67].data.push({x: Date.now()+670, y: scannedSensorData.p2});
  // chart.config.data.datasets[68].data.push({x: Date.now()+680, y: scannedSensorData.q2});
  // chart.config.data.datasets[69].data.push({x: Date.now()+690, y: scannedSensorData.r2}); 
  // chart.config.data.datasets[70].data.push({x: Date.now()+700, y: scannedSensorData.s2}); 
  // chart.config.data.datasets[71].data.push({x: Date.now()+710, y: scannedSensorData.t2});
  // chart.config.data.datasets[72].data.push({x: Date.now()+720, y: scannedSensorData.u2});
  // chart.config.data.datasets[73].data.push({x: Date.now()+730, y: scannedSensorData.v2});
  // chart.config.data.datasets[74].data.push({x: Date.now()+740, y: scannedSensorData.w2}); 
  // chart.config.data.datasets[75].data.push({x: Date.now()+750, y: scannedSensorData.x2});
  // chart.config.data.datasets[76].data.push({x: Date.now()+760, y: scannedSensorData.y2});
  // chart.config.data.datasets[77].data.push({x: Date.now()+770, y: scannedSensorData.z2});
  // chart.config.data.datasets[78].data.push({x: Date.now()+780, y: scannedSensorData.a3});
  // chart.config.data.datasets[79].data.push({x: Date.now()+790, y: scannedSensorData.b3});
  // chart.config.data.datasets[80].data.push({x: Date.now()+800, y: scannedSensorData.c3}); 
  // chart.config.data.datasets[81].data.push({x: Date.now()+810, y: scannedSensorData.d3}); 
  // chart.config.data.datasets[82].data.push({x: Date.now()+820, y: scannedSensorData.e3});
  // chart.config.data.datasets[83].data.push({x: Date.now()+830, y: scannedSensorData.f3});
  // chart.config.data.datasets[84].data.push({x: Date.now()+840, y: scannedSensorData.g3});
  // chart.config.data.datasets[85].data.push({x: Date.now()+850, y: scannedSensorData.h3}); 
  // chart.config.data.datasets[86].data.push({x: Date.now()+860, y: scannedSensorData.i3}); 
  // chart.config.data.datasets[87].data.push({x: Date.now()+870, y: scannedSensorData.j3});
	// chart.config.data.datasets[88].data.push({x: Date.now()+880, y: scannedSensorData.k3});
  // chart.config.data.datasets[89].data.push({x: Date.now()+890, y: scannedSensorData.l3});
  // chart.config.data.datasets[90].data.push({x: Date.now()+900, y: scannedSensorData.m3}); 
  // chart.config.data.datasets[91].data.push({x: Date.now()+910, y: scannedSensorData.n3}); 
  // chart.config.data.datasets[92].data.push({x: Date.now()+920, y: scannedSensorData.o3});
  // chart.config.data.datasets[93].data.push({x: Date.now()+930, y: scannedSensorData.p3});
  // chart.config.data.datasets[94].data.push({x: Date.now()+940, y: scannedSensorData.q3});
  // chart.config.data.datasets[95].data.push({x: Date.now()+950, y: scannedSensorData.r3}); 
  // chart.config.data.datasets[96].data.push({x: Date.now()+960, y: scannedSensorData.s3});
  // chart.config.data.datasets[97].data.push({x: Date.now()+970, y: scannedSensorData.t3});
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
  //     {
  //       label: 'a2',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'b2',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'c2',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow, 
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'd2',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'e2',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'f2',
  //       backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
  //       borderColor: chartColors.purple,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'g2',
  //       backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
  //       borderColor: chartColors.grey,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'h2',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'i2',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'j2',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'k2',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'l2',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'm2',
  //       backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
  //       borderColor: chartColors.purple,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'n2',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'o2',
  //       backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
  //       borderColor: chartColors.grey,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'p2',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'q2',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'r2',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 's2',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 't2',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'u2',
  //       backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
  //       borderColor: chartColors.purple,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'v2',
  //       backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
  //       borderColor: chartColors.grey,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'w2',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'x2',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'y2',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'z2',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'a3',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'b3',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'c3',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow, 
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'd3',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'e3',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'f3',
  //       backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
  //       borderColor: chartColors.purple,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'g3',
  //       backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
  //       borderColor: chartColors.grey,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'h3',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'i3',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'j3',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'k3',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'l3',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'm3',
  //       backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
  //       borderColor: chartColors.purple,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'n3',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'o3',
  //       backgroundColor: color(chartColors.grey).alpha(0.5).rgbString(),
  //       borderColor: chartColors.grey,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'p3',
  //       backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
  //       borderColor: chartColors.red,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'q3',
  //       backgroundColor: color(chartColors.orange).alpha(0.5).rgbString(),
  //       borderColor: chartColors.orange,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 'r3',
  //       backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
  //       borderColor: chartColors.yellow,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 's3',
  //       backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  //       borderColor: chartColors.green,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
  //     {
  //       label: 't3',
  //       backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
  //       borderColor: chartColors.blue,
  //       fill: false, showLine: false, cubicInterpolationMode: 'monotone', data: []
  //     },
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
  port = await navigator.serial.requestPort();   // - Request a port and open a connection.
  await port.open({baudRate: 115200});           // - Wait for the port to open.
  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer()));
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
  if (reader) {                              // Close the input stream (reader).
    await reader.cancel();
    await inputDone.catch(() => {});
    reader = null;
    inputDone = null;
  }
  if (outputStream) {
    await outputStream.getWriter().close();  // Close the output stream.
    await outputDone;
    outputStream = null;
    outputDone = null;
  }
  await port.close();                        // Close the port.
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
  if (port) {                   // If disconnected while scanning the dongle will restart
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
    writeCmd("\x03");               // Ctrl+C to stop the scan
    setTimeout(
      () => {
        writeCmd("AT+PERIPHERAL");  // Set the dongle in Peripheral mode needed for advertising.
      }, 500
    );                              // Waiting half a bit to make sure each command will get through separately.
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
    setTimeout(() => {
      writeCmd("AT+PERIPHERAL");                 // Set the dongle in Peripheral mode needed for advertising.
    }, 500);                                     // Waiting half a bit to make sure each command will get through separately.
    isGettingData = false;
    if (window.myChart) {window.myChart.destroy();}
    butScan.removeAttribute("disabled");
    butGetData.textContent = "Get Data";
    return;
  }
  writeCmd("AT+CENTRAL");                          // Set the dongle in Central mode needed for scanning.
  writeCmd("ATDS1");                               // Prevent print output
  writeCmd("ATA1");                                // Prevent print output
  writeCmd("AT+GAPCONNECT=[0]48:23:35:00:0B:79");  // [0]48:23:35:00:08:8E [0]48:23:35:00:00:E5 [0]48:23:35:00:0B:79

  console.log('before');
  setTimeout(function() {console.log('after');}, 500);

  setInterval(() => {
    writeCmd("AT+SETNOTI=001F"); // ******This is to connect with all of the GATT characteristics
  }, 50);                        // ******200, Waiting half a bit to make sure each command will get through separately.
 
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
    const {value, done} = await reader.read();
    if (value && (!isScanning && !isGettingData)) {log.textContent += value + "\n";}

    if (value && isScanning) {
      if (value === "SCAN COMPLETE") { // Same as original Javascript
        isScanning = false;
        butScan.textContent = "Scan BLE Devices";
        log.textContent += "\n" + "Scan Done" + "\n";
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
        if (lineValueArray[2]) {
          hibouDevices.push("[" + lineValueArray[2].replace("[1]", "") + "]");
        }
        log.textContent = "\n" + "hibouDevices found: " + hibouDevices.length + "\n";
      }
      
      if (value === "SCAN COMPLETE") {
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
        log.textContent += "\n" + "Scan Done" + "\n";
        butScan.removeAttribute("disabled");
        log.classList.toggle("d-none", false);
      }

      let lineValueArray = value.split(" ");

      if (lineValueArray[0] === "Hex:") {
        scannedSensorData = parseSensorData(lineValueArray[1]);
        log.textContent = "\n" + "SensorData= " + JSON.stringify(scannedSensorData) + "\n";
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
  console.log('input is' + input);
  
  let sensorData = {
    sensorid: input[counter + 2] + input[counter + 3],
    a0: parseInt(
      input[counter + 4] +
      input[counter + 5] +
      input[counter + 2] +
      input[counter + 3], 16
    ),
    b0: parseInt(
      input[counter + 8] +
      input[counter + 9] +
      input[counter + 6] +
      input[counter + 7], 16
    ),
    c0: parseInt(
      input[counter + 12] +
      input[counter + 13] +
      input[counter + 10] +
      input[counter + 11], 16
    ),
  	d0: parseInt(
      input[counter + 16] +
      input[counter + 17] +
      input[counter + 14] +
      input[counter + 15], 16
    ),
 	  e0: parseInt(
      input[counter + 20] +
      input[counter + 21] +
      input[counter + 18] +
      input[counter + 19], 16
    ),
 	  f0: parseInt(
      input[counter + 24] +
      input[counter + 25] +
      input[counter + 22] +
      input[counter + 23], 16
    ),
    g0: parseInt(
      input[counter + 28] +
      input[counter + 29] +
      input[counter + 26] +
      input[counter + 27], 16
    ),
    h0: parseInt(
      input[counter + 32] +
      input[counter + 33] +
      input[counter + 30] +
      input[counter + 31], 16
    ),
  	i0: parseInt(
      input[counter + 36] +
      input[counter + 37] +
      input[counter + 34] +
      input[counter + 35], 16
    ),
 	  j0: parseInt(
      input[counter + 40] +
      input[counter + 41] +
      input[counter + 38] +
      input[counter + 39], 16
    ),
    k0: parseInt(
      input[counter + 44] +
      input[counter + 45] +
      input[counter + 42] +
      input[counter + 43], 16
    ),
    l0: parseInt(
      input[counter + 48] +
      input[counter + 49] +
      input[counter + 46] +
      input[counter + 47], 16
    ),
    m0: parseInt(
      input[counter + 52] +
      input[counter + 53] +
      input[counter + 50] +
      input[counter + 51], 16
    ),
  	n0: parseInt(
      input[counter + 56] +
      input[counter + 57] +
      input[counter + 54] +
      input[counter + 55], 16
    ),
 	  o0: parseInt(
      input[counter + 60] +
      input[counter + 61] +
      input[counter + 58] +
      input[counter + 59], 16
    ),
  	p0: parseInt(
      input[counter + 64] +
      input[counter + 65] +
      input[counter + 62] +
      input[counter + 63], 16
    ),
    q0: parseInt(
      input[counter + 68] +
      input[counter + 69] +
      input[counter + 66] +
      input[counter + 67], 16
    ),
    r0: parseInt(
      input[counter + 72] +
      input[counter + 73] +
      input[counter + 70] +
      input[counter + 71], 16
    ),
  	s0: parseInt(
      input[counter + 76] +
      input[counter + 77] +
      input[counter + 74] +
      input[counter + 75], 16
    ),
 	  t0: parseInt(
      input[counter + 80] +
      input[counter + 81] +
      input[counter + 78] +
      input[counter + 79], 16
    ),
    u0: parseInt(
      input[counter + 84] +
      input[counter + 85] +
      input[counter + 82] +
      input[counter + 83], 16
    ),
    v0: parseInt(
      input[counter + 88] +
      input[counter + 89] +
      input[counter + 86] +
      input[counter + 87], 16
    ),
    w0: parseInt(
      input[counter + 92] +
      input[counter + 93] +
      input[counter + 90] +
      input[counter + 91], 16
    ),
    x0: parseInt(
      input[counter + 96] +
      input[counter + 97] +
      input[counter + 94] +
      input[counter + 95], 16
    ),
    y0: parseInt(
      input[counter + 100] +
      input[counter + 101] +
      input[counter + 98] +
      input[counter + 99], 16
    ),
    z0: parseInt(
      input[counter + 104] +
      input[counter + 105] +
      input[counter + 102] +
      input[counter + 103], 16
    ),

    a1: parseInt(
      input[counter + 108] +
      input[counter + 109] +
      input[counter + 106] +
      input[counter + 107], 16
    ),
    b1: parseInt(
      input[counter + 112] +
      input[counter + 113] +
      input[counter + 110] +
      input[counter + 111], 16
    ),
    c1: parseInt(
      input[counter + 116] +
      input[counter + 117] +
      input[counter + 114] +
      input[counter + 115], 16
    ),
  	d1: parseInt(
      input[counter + 120] +
      input[counter + 121] +
      input[counter + 118] +
      input[counter + 119], 16
    ),
 	  e1: parseInt(
      input[counter + 124] +
      input[counter + 125] +
      input[counter + 122] +
      input[counter + 123], 16
    ),
 	  f1: parseInt(
      input[counter + 128] +
      input[counter + 129] +
      input[counter + 126] +
      input[counter + 127], 16
    ),
    g1: parseInt(
      input[counter + 132] +
      input[counter + 133] +
      input[counter + 130] +
      input[counter + 131], 16
    ),
    h1: parseInt(
      input[counter + 136] +
      input[counter + 137] +
      input[counter + 134] +
      input[counter + 135], 16
    ),
  	i1: parseInt(
      input[counter + 140] +
      input[counter + 141] +
      input[counter + 138] +
      input[counter + 139], 16
    ),
 	  j1: parseInt(
      input[counter + 144] +
      input[counter + 145] +
      input[counter + 142] +
      input[counter + 143], 16
    ),
    k1: parseInt(
      input[counter + 148] +
      input[counter + 149] +
      input[counter + 146] +
      input[counter + 147], 16
    ),
    l1: parseInt(
      input[counter + 152] +
      input[counter + 153] +
      input[counter + 150] +
      input[counter + 151], 16
    ),
    m1: parseInt(
      input[counter + 156] +
      input[counter + 157] +
      input[counter + 154] +
      input[counter + 155], 16
    ),
  	n1: parseInt(
      input[counter + 160] +
      input[counter + 161] +
      input[counter + 158] +
      input[counter + 159], 16
    ),
 	  o1: parseInt(
      input[counter + 164] +
      input[counter + 165] +
      input[counter + 162] +
      input[counter + 163], 16
    ),
  	p1: parseInt(
      input[counter + 168] +
      input[counter + 169] +
      input[counter + 166] +
      input[counter + 167], 16
    ),
    q1: parseInt(
      input[counter + 172] +
      input[counter + 173] +
      input[counter + 170] +
      input[counter + 171], 16
    ),
    r1: parseInt(
      input[counter + 176] +
      input[counter + 177] +
      input[counter + 174] +
      input[counter + 175], 16
    ),
  	s1: parseInt(
      input[counter + 180] +
      input[counter + 181] +
      input[counter + 178] +
      input[counter + 179], 16
    ),
 	  t1: parseInt(
      input[counter + 184] +
      input[counter + 185] +
      input[counter + 182] +
      input[counter + 183], 16
    ),
    u1: parseInt(
      input[counter + 188] +
      input[counter + 189] +
      input[counter + 186] +
      input[counter + 187], 16
    ),
    v1: parseInt(
      input[counter + 192] +
      input[counter + 193] +
      input[counter + 190] +
      input[counter + 191], 16
    ),
    w1: parseInt(
      input[counter + 196] +
      input[counter + 197] +
      input[counter + 194] +
      input[counter + 195], 16
    ),
    x1: parseInt(
      input[counter + 200] +
      input[counter + 201] +
      input[counter + 198] +
      input[counter + 199], 16
    ),
    y1: parseInt(
      input[counter + 204] +
      input[counter + 205] +
      input[counter + 202] +
      input[counter + 203], 16
    ),
    z1: parseInt(
      input[counter + 208] +
      input[counter + 209] +
      input[counter + 206] +
      input[counter + 207], 16
    ),

    a2: parseInt(
      input[counter + 212] +
      input[counter + 213] +
      input[counter + 210] +
      input[counter + 211], 16
    ),
    b2: parseInt(
      input[counter + 216] +
      input[counter + 217] +
      input[counter + 214] +
      input[counter + 215], 16
    ),
    c2: parseInt(
      input[counter + 116 + 104] +
      input[counter + 117 + 104] +
      input[counter + 218] +
      input[counter + 115 + 104], 16
    ),
  	d2: parseInt(
      input[counter + 16 + 104 + 104] +
      input[counter + 17 + 104 + 104] +
      input[counter + 222] +
      input[counter + 15 + 104 + 104], 16
    ),
 	  e2: parseInt(
      input[counter + 20 + 104 + 104] +
      input[counter + 21 + 104 + 104] +
      input[counter + 226] +
      input[counter + 19 + 104 + 104], 16
    ),
 	  f2: parseInt(
      input[counter + 24 + 104 + 104] +
      input[counter + 25 + 104 + 104] +
      input[counter + 22 + 104 + 104] +
      input[counter + 23 + 104 + 104], 16
    ),
    g2: parseInt(
      input[counter + 132 + 104] +
      input[counter + 133 + 104] +
      input[counter + 130 + 104] +
      input[counter + 131 + 104], 16
    ),
    h2: parseInt(
      input[counter + 136 + 104] +
      input[counter + 137 + 104] +
      input[counter + 134 + 104] +
      input[counter + 135 + 104], 16
    ),
  	i2: parseInt(
      input[counter + 140 + 104] +
      input[counter + 141 + 104] +
      input[counter + 34 + 104 + 104] +
      input[counter + 139 + 104], 16
    ),
 	  j2: parseInt(
      input[counter + 40 + 104 + 104] +
      input[counter + 41 + 104 + 104] +
      input[counter + 38 + 104 + 104] +
      input[counter + 39 + 104 + 104], 16
    ),
    k2: parseInt(
      input[counter + 44 + 104 + 104] +
      input[counter + 45 + 104 + 104] +
      input[counter + 42 + 104 + 104] +
      input[counter + 43 + 104 + 104], 16
    ),
    l2: parseInt(
      input[counter + 48 + 104 + 104] +
      input[counter + 49 + 104 + 104] +
      input[counter + 46 + 104 + 104] +
      input[counter + 47 + 104 + 104], 16
    ),
    m2: parseInt(
      input[counter + 52 + 104 + 104] +
      input[counter + 53 + 104 + 104] +
      input[counter + 258] +
      input[counter + 259], 16
    ),
  	n2: parseInt(
      input[counter + 56 + 104 + 104] +
      input[counter + 161 + 104] +
      input[counter + 262] +
      input[counter + 55 + 104 + 104], 16
    ),
 	  o2: parseInt(
      input[counter + 60 + 104 + 104] +
      input[counter + 61 + 104 + 104] +
      input[counter + 266] +
      input[counter + 163 + 104], 16
    ),
  	p2: parseInt(
      input[counter + 64 + 104 + 104] +
      input[counter + 65 + 104 + 104] +
      input[counter + 270] +
      input[counter + 271], 16
    ),
    q2: parseInt(
      input[counter + 276] +
      input[counter + 277] +
      input[counter + 274] +
      input[counter + 275], 16
    ),
    r2: parseInt(
      input[counter + 280] +
      input[counter + 281] +
      input[counter + 278] +
      input[counter + 279], 16
    ),
  	s2: parseInt(
      input[counter + 282] +
      input[counter + 283] +
      input[counter + 280] +
      input[counter + 281], 16
    ),
 	  t2: parseInt(
      input[counter + 288] +
      input[counter + 289] +
      input[counter + 286] +
      input[counter + 287], 16
    ),
    u2: parseInt(
      input[counter + 84 + 104 + 104] +
      input[counter + 85 + 104 + 104] +
      input[counter + 290] +
      input[counter + 83 + 104 + 104], 16
    ),
    v2: parseInt(
      input[counter + 192 + 104] +
      input[counter + 193 + 104] +
      input[counter + 294] +
      input[counter + 87 + 104 + 104], 16
    ),
    w2: parseInt(
      input[counter + 300] +
      input[counter + 301] +
      input[counter + 298] +
      input[counter + 299], 16
    ),
    x2: parseInt(
      input[counter + 304] +
      input[counter + 305] +
      input[counter + 302] +
      input[counter + 303], 16
    ),
    y2: parseInt(
      input[counter + 308] +
      input[counter + 309] +
      input[counter + 306] +
      input[counter + 307], 16
    ),
    z2: parseInt(
      input[counter + 312] +
      input[counter + 313] +
      input[counter + 310] +
      input[counter + 311], 16
    ),

    
    a3: parseInt(
      input[counter + 212 + 104] +
      input[counter + 213 + 104] +
      input[counter + 314] +
      input[counter + 211 + 104], 16
    ),
    b3: parseInt(
      input[counter + 112 + 104 + 104] +
      input[counter + 113 + 104 + 104] +
      input[counter + 318] +
      input[counter + 111 + 104 + 104], 16
    ),
    c3: parseInt(
      input[counter + 116 + 104 + 104] +
      input[counter + 117 + 104 + 104] +
      input[counter + 322] +
      input[counter + 115 + 104 + 104], 16
    ),
  	d3: parseInt(
      input[counter + 16 + 104 + 104 + 104] +
      input[counter + 17 + 104 + 104 + 104] +
      input[counter + 326] +
      input[counter + 15 + 104 + 104 + 104], 16
    ),
 	  e3: parseInt(
      input[counter + 20 + 104 + 104 + 104] +
      input[counter + 21 + 104 + 104 + 104] +
      input[counter + 330] +
      input[counter + 19 + 104 + 104 + 104], 16
    ),
 	  f3: parseInt(
      input[counter + 24 + 104 + 104 + 104] +
      input[counter + 25 + 104 + 104 + 104] +
      input[counter + 334] +
      input[counter + 23 + 104 + 104 + 104], 16
    ),
    g3: parseInt(
      input[counter + 132 + 104 + 104] +
      input[counter + 133 + 104 + 104] +
      input[counter + 338] +
      input[counter + 131 + 104 + 104], 16
    ),
    h3: parseInt(
      input[counter + 136 + 104 + 104] +
      input[counter + 137 + 104 + 104] +
      input[counter + 342] +
      input[counter + 135 + 104 + 104], 16
    ),
  	i3: parseInt(
      input[counter + 140 + 104 + 104] +
      input[counter + 141 + 104 + 104] +
      input[counter + 346] +
      input[counter + 139 + 104 + 104], 16
    ),
 	  j3: parseInt(
      input[counter + 40 + 104 + 104 + 104] +
      input[counter + 41 + 104 + 104 + 104] +
      input[counter + 350] +
      input[counter + 39 + 104 + 104 + 104], 16
    ),
    k3: parseInt(
      input[counter + 356] +
      input[counter + 357] +
      input[counter + 354] +
      input[counter + 355], 16
    ),
    l3: parseInt(
      input[counter + 360] +
      input[counter + 361] +
      input[counter + 358] +
      input[counter + 359], 16
    ),
    m3: parseInt(
      input[counter + 52 + 104 + 104 + 104] +
      input[counter + 53 + 104 + 104 + 104] +
      input[counter + 362] +
      input[counter + 51 + 104 + 104 + 104], 16
    ),
  	n3: parseInt(
      input[counter + 56 + 104 + 104 + 104] +
      input[counter + 161 + 104 + 104] +
      input[counter + 366] +
      input[counter + 367], 16
    ),
 	  o3: parseInt(
      input[counter + 60 + 104 + 104 + 104] +
      input[counter + 61 + 104 + 104 + 104] +
      input[counter + 370] +
      input[counter + 163 + 104 + 104], 16
    ),
  	p3: parseInt(
      input[counter + 376] +
      input[counter + 377] +
      input[counter + 374] +
      input[counter + 375], 16
    ),
    q3: parseInt(
      input[counter + 380] +
      input[counter + 381] +
      input[counter + 378] +
      input[counter + 379], 16
    ),
    r3: parseInt(
      input[counter + 280 + 104] +
      input[counter + 281 + 104] +
      input[counter + 382] +
      input[counter + 279 + 104], 16
    ),
  	s3: parseInt(
      input[counter + 76 + 104 + 104 + 104] +
      input[counter + 77 + 104 + 104 + 104] +
      input[counter + 386] +
      input[counter + 75 + 104 + 104 + 104], 16
    ),
 	  t3: parseInt(
      input[counter + 184 + 104 + 104] +
      input[counter + 185 + 104 + 104] +
      input[counter + 390] +
      input[counter + 183 + 104 + 104], 16
    ),
    u3: parseInt(
      input[counter + 396] +
      input[counter + 397] +
      input[counter + 394] +
      input[counter + 395], 16
    ),
    v3: parseInt(
      input[counter + 400] +
      input[counter + 401] +
      input[counter + 398] +
      input[counter + 399], 16
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