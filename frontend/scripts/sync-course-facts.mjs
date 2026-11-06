// Copies what the published course pages say about each course (the trip builder app's catalog and course notes) into
// src/data/courseFacts.json, so the destination guides show the same green fee, access, design and note as the course
// pages (user, 2026-11-04). Run it after changing a course in the trip builder app.
import fs from "fs";

const V2 = new URL("../../../../fase2/v2/", import.meta.url);
const cat = JSON.parse(fs.readFileSync(new URL("data/fixtures/catalog.json", V2), "utf8"));
const courses = Array.isArray(cat) ? cat : cat.courses || Object.values(cat).find(Array.isArray);

// courseNotes.ts is one exported object literal written as JSON (quoted keys and strings).
const notesSrc = fs.readFileSync(new URL("lib/courseNotes.ts", V2), "utf8");
const start = notesSrc.indexOf("= {") + 2;
const end = notesSrc.lastIndexOf("};") + 1;
const NOTES = JSON.parse(notesSrc.slice(start, end));

const out = {};
for (const c of courses) {
  const n = NOTES[c.slug] || {};
  out[c.slug] = {
    name: c.name,
    design: (c.specs || "").split(",")[0].trim(),
    fee: c.greenFeeText || (c.greenFee ? `$${c.greenFee}` : ""),
    access: c.accessType || "",
    note: n.note || c.description || "",
    standout: n.standout || "",
  };
}
fs.writeFileSync(new URL("../src/data/courseFacts.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(`✓ courseFacts.json (${Object.keys(out).length} courses)`);
