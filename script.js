'use strict';

let template = document.querySelector("template");
let colorArray =
    ["#31A7FB",
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
        "#8DCAFC"];

let allColors = []
const t0 = performance.now();
for (let i = 0; i < 10000; i++) {
    let clone = template.content.cloneNode(true);
    let svgElement = clone.firstElementChild;
    let allPath = clone.firstElementChild.querySelectorAll("path");
    colorArray = []
    for (const path of allPath) {
        const color = `${'#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
        path.setAttribute("fill", color)

        colorArray.push(color)
    }
    allColors.push(colorArray.toString())
    document.body.appendChild(clone);
}
const counts = allColors.reduce((acc, value) => ({
    ...acc,
    [value]: (acc[value] || 0) + 1
}), {});
const t1 = performance.now();
const duplicateCount = (Object.values(counts).filter(val => val > 1)).length;

document.querySelector(".duplicate").textContent = "Duplicates/collisions in 10000 iterations: " + duplicateCount;

document.querySelector(".time").textContent = `${(t1 - t0)/1000} seconds`;
