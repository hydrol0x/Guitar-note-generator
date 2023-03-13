const { Renderer, Stave, StaveNote, Voice, Formatter, Tables } = Vex.Flow;
import { genBarNotes, genBarStave } from "./noteGenerator.js";

// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(2000, 1000);
const context = renderer.getContext();

// Create a stave of width 400 at position 10, 40 on the canvas.
// const stave = new Stave(10, 40, 500);

// Add a clef and time signature.
// stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
// stave.setContext(context).draw();

// Create the notes
const bars = genBarNotes(6);
const staves = genBarStave(context, 0, 0, 600, bars);
// const notes = [
//   // A quarter-note C.
//   new StaveNote({ keys: ["c/4"], duration: "q" }),

//   new StaveNote({ keys: ["d/4"], duration: "q" }),
//   new StaveNote({ keys: ["d/4"], duration: "q" }),
//   new StaveNote({ keys: ["b/4"], duration: "qr" }),

//   // new measure
//   new Vex.Flow.BarNote(),

//   new StaveNote({ keys: ["c/4"], duration: "q" }),
//   new StaveNote({ keys: ["d/4"], duration: "q" }),
//   new StaveNote({ keys: ["b/4"], duration: "qr" }),
//   new StaveNote({ keys: ["d/4"], duration: "q" }),
// ];

// Create a voice in 4/4 and add above notes

// Render voice
// voice.forEach(function (v) {
//   v.draw(context, stave);
// });
