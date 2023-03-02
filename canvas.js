const { Renderer, Stave, Voice, Formatter, Tables } = Vex.Flow;
import { genBarNotes } from "./noteGenerator.js";

// Create an SVG renderer and attach it to the DIV element named "boo".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(850, 808);
const context = renderer.getContext();

// Create a stave of width 400 at position 10, 40 on the canvas.
const stave = new Stave(10, 40, 800);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

// Create the notes
const notes = genBarNotes();

// Create a voice in 4/4 and add above notes
const voices = [
  new Voice({
    num_beats: 4,
    beat_value: 4,
  }).addTickables(notes),
];
// Format and justify the notes to 400 pixels.
new Formatter().joinVoices(voices).format(voices, 350);

// Render voice
voices.forEach(function (v) {
  v.draw(context, stave);
});
