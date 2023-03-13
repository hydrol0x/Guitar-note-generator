const { Stave, StaveNote, BarNote, Voice, Formatter } = Vex.Flow;
// list of valid notes
const notesList = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const durationList = ["w", "h", "q"];
const barDurationList = ["qqqq", "hh", "qqh", "hqq", "w"];

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function genNoteSequence(sequenceLen, max = false, duration = "") {
  // if max  E0-B5, otherwise  E0-A2
  let noteSeq = [];
  for (let i = 0; i < sequenceLen; i++) {
    let note = { name: "", pitch: "", duration: "" };
    note.name = notesList[randomInt(0, notesList.length)];
    note.pitch = randomInt(4, 6).toString();
    if (duration) {
      note.duration = duration[i]; // duration is a 4 char string that tells which duration to make current note
    } else {
      note.duration = durationList[randomInt(0, durationList.length)];
    }
    noteSeq.push(note);
  }
  return noteSeq;
}

function genBarSequence(random = true, durationType = 0) {
  let duration = "";
  if (random) {
    const rnd = randomInt(0, 4);
    duration = barDurationList[rnd];
  } else {
    dur = barDurationList[durationtype];
  }

  let bar = genNoteSequence(duration.length, false, duration);
  return bar;
}

export function genNotes(noteSeq) {
  let notes = [];
  noteSeq.forEach((note) => {
    const name = note.name;
    const pitch = note.pitch;
    const duration = note.duration;
    notes.push(
      new StaveNote({ keys: [`${name}/${pitch}`], duration: `${duration}` })
    );
  });
  return notes;
}

export function genBarNotes(num_bars = 1) {
  let notes = [];
  let bars = [];
  for (let i = 0; i < num_bars; i++) {
    bars.push(genBarSequence());
  }
  bars.forEach((bar) => {
    let currentStaveNoteBar = [];
    bar.forEach((note) => {
      const name = note.name;
      const pitch = note.pitch;
      const duration = note.duration;
      currentStaveNoteBar.push(
        new StaveNote({ keys: [`${name}/${pitch}`], duration: `${duration}` })
      );
    });
    notes.push(currentStaveNoteBar);
  });
  return notes;
}
export function genBarStave(context, x, y, width, bars) {
  console.log(bars);
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    console.log(`bar ${i + 1}`);

    if (i === 0) {
      x = 0;
      y = 0;
      console.log(`origin pos = ${x},${y}`);
    } else if ((i + 1) % 2 === 0) {
      x = width;
      console.log(`shifted right; pos = ${x},${y}`);
    } else {
      y += 150;
      x = 0;
      console.log(`shifted down; pos = ${x},${y}`);
    }
    const stave = new Stave(x, y, width);
    if (i == 0) {
      stave.addClef("treble").addTimeSignature("4/4"); // only add cleff and t. sig for first measure
    }
    stave.setContext(context).draw();
    const voice = new Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION,
    });
    // voice.setStrict(false);
    voice.addTickables(bar);
    new Formatter().joinVoices([voice]).format([voice], width);
    voice.draw(context, stave);
  }

  // Connect it to the rendering context and draw!

  // Format and justify the notes to 400 pixels.
}
