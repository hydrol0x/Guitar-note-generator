const { StaveNote } = Vex.Flow;
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
export function genNoteSequence(sequenceLen, max = false, duration = "") {
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

export function genBar(random = true, durationType = 0) {
  let duration = "";
  if (random) {
    const rnd = randomInt(0, 4);
    duration = barDurationList[rnd];
  } else {
    dur = barDurationList[durationtype];
  }

  return genNoteSequence(duration.length, false, duration);
}

// const notes = [
//   // A quarter-note C.
//   new StaveNote({ keys: ["c/4"], duration: "q" }),

//   // A quarter-note D.
//   new StaveNote({ keys: ["d/4"], duration: "q" }),

//   // A quarter-note rest. Note that the key (b/4) specifies the vertical
//   // position of the rest.
//   new StaveNote({ keys: ["b/4"], duration: "qr" }),

//   // A C-Major chord.
//   new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
// ];

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
  let noteSeq = [];
  for (let i = 0; i < num_bars; i++) {
    noteSeq.push(...genBar());
  }
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
