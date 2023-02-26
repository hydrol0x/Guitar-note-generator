const { Factory, EasyScore, System } = Vex.Flow;
const vf = new Factory({
  renderer: { elementId: "output", width: 500, height: 200 },
});

const score = vf.EasyScore();
const system = vf.System();
notes = "C#5/q, B4/q, A4/q, G#4";
system
  .addStave({
    voices: [
      score.voice(score.notes(notes, { stem: "up" })),
      score.voice(score.notes("C#4/h, C#4", { stem: "down" })),
    ],
  })
  .addClef("treble")
  .addTimeSignature("4/4");
vf.draw();
