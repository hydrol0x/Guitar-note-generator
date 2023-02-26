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

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function genNoteSequence(sequenceLen, max = false) {
  // if max  E0-B5, otherwise  E0-A2
  noteSeq = [];
  for (i = 0; i < sequenceLen; i++) {
    let note = { name: "", pitch: "", duration: "" };
    note.name = notesList[randomInt(0, notesList.length)];
    if (note.name === "A") {
      note.pitch = randomInt(0, 3).toString(); // 0-2 pitch
    } else {
      note.pitch = randomInt(0, 2).toString(); // 0-1 pitch
    }
    note.duration = durationList[randomInt(0, durationList.length)];
    noteSeq.push(note);
  }
  return noteSeq;
}

let seq = genNoteSequence(1000);
console.log(seq);
function genNotes(noteSeq) {}
