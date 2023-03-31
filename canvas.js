// TODO: switch to NPM package, add VexChords and VexTab
const { Renderer, Stave, StaveNote, Voice, Formatter, Tables } = Vex.Flow;
import { genBarNotes, genBarStave } from "./noteGenerator.js";

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);
// Configure the rendering context.
renderer.resize(viewportWidth * 0.98, window.innerHeight * 0.75);
const context = renderer.getContext();

const clearStaff = (staff) => {
  // staff is just the HTML element that contains staff svg
  context.rect(0, 0, viewportWidth, viewportHeight, {
    stroke: "none",
    fill: "white",
  });
};

const generateNotes = () => {
  // context.rect(x, y, width, height, { stroke: "none", fill: "white" });
  // context.rect(0, 0, 100, 100, { stroke: "none", fill: "red" });
  const bars = genBarNotes(6);
  const staves = genBarStave(context, 0, 0, 625, bars);
};

generateNotes();

const generatorButton = document.getElementById("generate-button");
generatorButton.onclick = (e) => {
  clearStaff(div);
  generateNotes();
};
