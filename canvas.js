// TODO: switch to NPM package, add VexChords and VexTab
const { Renderer, Stave, StaveNote, Voice, Formatter, Tables } = Vex.Flow;
import { genBarNotes, genBarStave } from "./noteGenerator.js";

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;
const RENDERER_WIDTH = viewportWidth * 0.85; // otherwise gets slightly cut off

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);
// Configure the rendering context.
renderer.resize(RENDERER_WIDTH, window.innerHeight * 0.75);
const context = renderer.getContext();

const clearStaff = (staff) => {
  // staff is just the HTML element that contains staff svg
  context.rect(0, 0, viewportWidth, viewportHeight, {
    stroke: "none",
    fill: "white",
  });
};

const parentWidth = (elem) => {
  return elem.parentElem.clientWidth;
};

const X_POS = 0;
const Y_POS = 0;
const BAR_WIDTH = RENDERER_WIDTH / 2.01; // in order to not overflow page
const generateNotes = () => {
  // context.rect(x, y, width, height, { stroke: "none", fill: "white" });
  // context.rect(0, 0, 100, 100, { stroke: "none", fill: "red" });
  const bars = genBarNotes(6);
  const staves = genBarStave(context, X_POS, Y_POS, BAR_WIDTH, bars);
};

generateNotes();

const generatorButton = document.getElementById("generate-button");
generatorButton.onclick = (e) => {
  clearStaff(div);
  generateNotes();
};
