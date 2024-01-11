import "./style.scss";
import gsap from "gsap";

window.addEventListener("load", () => init());
window.addEventListener("resize", () => resize());
window.addEventListener("click", (e) => click(e));
let tl = gsap.timeline();

let grid = null;
let row = 0;
let colum = 0;
let active = true

function init() {
  grid = document.getElementById("grid");
  setupGrid();
}

function resize() {
  setupGrid();
}

function click(e) {
  const index = Math.floor(e.y / 50) * colum + Math.floor(e.x / 50);

  if(active) {
    active = false

    gsap.to(".dot", {
      duration: 0.25,
      opacity: 1,
      y: 25,
      ease: "power1.inOut",
      stagger: {
        amount: 1.5,
        grid: [row, colum],
        axis: null,
        from: index,
      },
    });
  
    gsap.to(".dot", {
      delay: 0.25,
      duration: 0.5,
      opacity: 0.2,
      y: 0,
      ease: "power1.outIn",
      stagger: {
        amount: 1.5,
        grid: [row, colum],
        axis: null,
        from: index,
      }
    });

    setTimeout(() => {
        active = true
      }, 250);
  }
}

function setupGrid() {
  grid.innerHTML = "";

  row = Math.floor(window.innerHeight / 50);
  colum = Math.floor(window.innerWidth / 50);

  for (let i = 0; i < row * colum; i++) {
    var dot = document.createElement("p");
    dot.className = "dot";
    dot.innerHTML = i;
    grid.appendChild(dot);
  }

  const tl = gsap.timeline()

  tl.set(".dot", {y: 50, opacity: 0})
  .to(".dot", {
    delay: .5,
    duration: 0.5,
    opacity: 0.2,
    y: 0,
    ease: "power1.outIn",
    stagger: {
      amount: .5,
      grid: [row, colum],
      axis: 'y',
      from: '0',
    }
  });
}
