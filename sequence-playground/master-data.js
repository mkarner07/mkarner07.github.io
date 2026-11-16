// Master data of the Sequence Playground
// Structure: see the README, section "Configure the scenario". Times in whole minutes.
// The file only sets window.MASTER_DATA; the content is written in JSON notation.
// setup[from][to]: setup time when changing between families, row "empty" = initial state.
window.MASTER_DATA = {
  "scenario": {
    "name": "Sample Sheet Metal Works",
    "description": "Laser cutting → bending → powder coating, two shifts (960 min)"
  },
  "families": [
    { "id": "A", "name": "Control cabinet door", "details": "1.5 mm · bending tool S1 · RAL 7035 light grey" },
    { "id": "B", "name": "Device housing", "details": "1.0 mm · bending tool S2 · RAL 9016 traffic white" },
    { "id": "C", "name": "Cable duct", "details": "1.25 mm · bending tool S2 · RAL 5010 gentian blue" },
    { "id": "D", "name": "Machine console", "details": "3.0 mm · bending tool S3 · RAL 7016 anthracite grey" },
    { "id": "E", "name": "Front panel", "details": "2.0 mm · bending tool S1 · RAL 9005 jet black" }
  ],
  "machines": [
    {
      "id": "laser",
      "name": "Laser cutter",
      "setup": {
        "empty": { "A": 10, "B": 10, "C": 10, "D": 15, "E": 10 },
        "A": { "A": 0, "B": 8, "C": 6, "D": 15, "E": 10 },
        "B": { "A": 8, "B": 0, "C": 5, "D": 18, "E": 12 },
        "C": { "A": 6, "B": 5, "C": 0, "D": 16, "E": 10 },
        "D": { "A": 12, "B": 15, "C": 14, "D": 0, "E": 10 },
        "E": { "A": 8, "B": 12, "C": 10, "D": 12, "E": 0 }
      }
    },
    {
      "id": "bending",
      "name": "Press brake",
      "setup": {
        "empty": { "A": 20, "B": 20, "C": 20, "D": 25, "E": 20 },
        "A": { "A": 0, "B": 25, "C": 25, "D": 35, "E": 10 },
        "B": { "A": 25, "B": 0, "C": 10, "D": 35, "E": 25 },
        "C": { "A": 25, "B": 10, "C": 0, "D": 35, "E": 25 },
        "D": { "A": 25, "B": 25, "C": 25, "D": 0, "E": 25 },
        "E": { "A": 10, "B": 25, "C": 25, "D": 35, "E": 0 }
      }
    },
    {
      "id": "coating",
      "name": "Powder coating line",
      "setup": {
        "empty": { "A": 10, "B": 10, "C": 15, "D": 15, "E": 15 },
        "A": { "A": 0, "B": 35, "C": 20, "D": 15, "E": 15 },
        "B": { "A": 15, "B": 0, "C": 20, "D": 20, "E": 20 },
        "C": { "A": 40, "B": 50, "C": 0, "D": 20, "E": 20 },
        "D": { "A": 45, "B": 55, "C": 35, "D": 0, "E": 15 },
        "E": { "A": 50, "B": 60, "C": 40, "D": 30, "E": 0 }
      }
    }
  ],
  "singleMachine": "coating",
  "jobs": [
    { "id": 1, "family": "A", "processingTimes": { "laser": 35, "bending": 50, "coating": 55 }, "dueDate": 300 },
    { "id": 2, "family": "D", "processingTimes": { "laser": 45, "bending": 70, "coating": 60 }, "dueDate": 480 },
    { "id": 3, "family": "B", "processingTimes": { "laser": 25, "bending": 40, "coating": 45 }, "dueDate": 240 },
    { "id": 4, "family": "E", "processingTimes": { "laser": 40, "bending": 55, "coating": 50 }, "dueDate": 600 },
    { "id": 5, "family": "A", "processingTimes": { "laser": 30, "bending": 45, "coating": 50 }, "dueDate": 420 },
    { "id": 6, "family": "C", "processingTimes": { "laser": 20, "bending": 35, "coating": 40 }, "dueDate": 360 },
    { "id": 7, "family": "B", "processingTimes": { "laser": 30, "bending": 50, "coating": 55 }, "dueDate": 540 },
    { "id": 8, "family": "D", "processingTimes": { "laser": 50, "bending": 80, "coating": 65 }, "dueDate": 720 },
    { "id": 9, "family": "E", "processingTimes": { "laser": 35, "bending": 50, "coating": 45 }, "dueDate": 660 },
    { "id": 10, "family": "C", "processingTimes": { "laser": 25, "bending": 40, "coating": 50 }, "dueDate": 780 },
    { "id": 11, "family": "A", "processingTimes": { "laser": 40, "bending": 60, "coating": 60 }, "dueDate": 840 },
    { "id": 12, "family": "B", "processingTimes": { "laser": 20, "bending": 35, "coating": 40 }, "dueDate": 900 }
  ],
  "generator": {
    "seed": 42,
    "jobCount": 12,
    "dueDatePressure": 0.4,
    "processingTimeRanges": {
      "laser": { "min": 20, "max": 50 },
      "bending": { "min": 35, "max": 80 },
      "coating": { "min": 40, "max": 70 }
    }
  }
};
