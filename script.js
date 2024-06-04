"use strict";

let template = document.querySelector("template");
let colorArray = [
  "#31A7FB",
  "#0094FD",
  "#B5DBFD",
  "#8DCAFC",
  "#B5DBFD",
  "#8DCAFC",
  "#31A7FB",
  "#0094FD",
  "#8DCAFC",
  "#31A7FB",
  "#8DCAFC",
  "#31A7FB",
  "#8DCAFC",
  "#31A7FB",
  "#8DCAFC",
];

let allColors = [];
const t0 = performance.now();
for (let i = 0; i < 1000; i++) {
  let clone = template.content.cloneNode(true);
  let svgElement = clone.firstElementChild;
  let allPath = clone.firstElementChild.querySelectorAll("path");
  colorArray = [];
  const color1 = `${
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  }`;
  const color2 = `${
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  }`;

  for (const path of allPath) {
    const color = randomColorBetween(color1, color2);
    path.setAttribute("fill", color);

    colorArray.push(color);
  }
  allColors.push(colorArray.toString());
  document.body.appendChild(clone);
}
const counts = allColors.reduce(
  (acc, value) => ({
    ...acc,
    [value]: (acc[value] || 0) + 1,
  }),
  {}
);
const t1 = performance.now();
const duplicateCount = Object.values(counts).filter((val) => val > 1).length;

document.querySelector(".duplicate").textContent =
  "Duplicates/collisions in 1000 iterations: " + duplicateCount;

document.querySelector(".time").textContent = `${(t1 - t0) / 1000} seconds`;

function hexToRgb(hex) {
  // Convert hex to RGB
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  // Convert RGB to hex
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function randomColorBetween(hex1, hex2) {
  let rgb1 = hexToRgb(hex1);
  let rgb2 = hexToRgb(hex2);

  // Generate a random RGB value between the two colors
  let r = Math.floor(Math.random() * (rgb2[0] - rgb1[0] + 1)) + rgb1[0];
  let g = Math.floor(Math.random() * (rgb2[1] - rgb1[1] + 1)) + rgb1[1];
  let b = Math.floor(Math.random() * (rgb2[2] - rgb1[2] + 1)) + rgb1[2];

  return rgbToHex(r, g, b);
}
