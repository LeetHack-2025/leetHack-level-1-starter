import { softwareEngineerStarter } from "./Challenges/software-engineer.js";
import { cybersecuritySpecialistStarter } from "./Challenges/cybersecurity-specialist.js";
import { dataAnalystStarter } from "./Challenges/data-analyst.js";
import { uxDesignerStarter } from "./Challenges/ux-designer.js";

const starterMap = {
  "software-engineer": softwareEngineerStarter,
  "cybersecurity-specialist": cybersecuritySpecialistStarter,
  "data-analyst": dataAnalystStarter,
  "ux-designer": uxDesignerStarter
};

const hintMap = {
  "software-engineer": [
    "Use km * 120 to calculate CO₂ saved.",
    "Functions should start with def and take parameters.",
    "Think about simple arithmetic and returning a value."
  ],
  "cybersecurity-specialist": [
    "Use string methods to check password contents.",
    "Hashing means converting text into a fixed-length code.",
    "Use SHA-256 for secure storage."
  ],
  "data-analyst": [
    "Loop through the data and add up the numbers.",
    "Use matplotlib to plot results.",
    "Use conditional logic to group users by activity."
  ],
  "ux-designer": [
    "WCAG compliance includes good contrast and labels.",
    "Use semantic HTML like <label> and <section>.",
    "Use CSS flex or grid for responsive layouts."
  ]
};

const turnOrder = [
  "software-engineer",
  "cybersecurity-specialist",
  "data-analyst",
  "ux-designer"
];

let currentRoleIndex = parseInt(localStorage.getItem("currentRoleIndex") || "0");
let usedHints = JSON.parse(localStorage.getItem("usedHints") || "[false,false,false]");
let currentScore = parseInt(localStorage.getItem("score") || "0");
let currentDifficulty = "beginner";
let editor;

window.onload = function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");
  editor.setValue("# Click 'Begin Challenge' to start", -1);

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("hintPopup").classList.add("hidden");
  updateHearts();
};

window.startLevel = function () {
  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("challengeArea").classList.remove("hidden");
  loadCurrentRoleChallenge();
};

function loadCurrentRoleChallenge() {
  const role = turnOrder[currentRoleIndex];
  const starter = starterMap[role];
  const challenge = starter[currentDifficulty];

  document.getElementById("roleDisplay").innerText = `Current Role: ${formatRole(role)}`;
  document.getElementById("challenge-text").textContent = challenge.split("\n")[0];
  editor.setValue(challenge, -1);
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("hintPopup").classList.add("hidden");
  updateHearts();
}

window.submitCode = function () {
  const role = turnOrder[currentRoleIndex];

  let base = 0;
  if (currentDifficulty === "beginner") base = 5;
  else if (currentDifficulty === "intermediate") base = 2;
  else if (currentDifficulty === "advanced") base = 3;

  const bonus = usedHints.filter(h => !h).length;
  currentScore += base + bonus;

  currentRoleIndex++;
  localStorage.setItem("score", currentScore);
  localStorage.setItem("currentRoleIndex", currentRoleIndex);
  localStorage.setItem("usedHints", JSON.stringify(usedHints));

  document.getElementById("score").innerText = `Score: ${currentScore}`;
  document.getElementById("feedback").classList.remove("hidden");

  if (currentRoleIndex < turnOrder.length) {
    alert("✅ Task complete! Next role unlocked.");
    usedHints = [false, false, false];
    loadCurrentRoleChallenge();
  } else {
    alert("🎉 All roles complete! Level finished.");
    document.getElementById("challenge-text").textContent = "Challenge complete!";
    editor.setValue("# Well done!", -1);
  }
};

window.useHint = function (index) {
  if (usedHints[index]) return;
  usedHints[index] = true;

  document.querySelectorAll(".heart")[index].classList.add("used");

  const role = turnOrder[currentRoleIndex];
  const hint = hintMap[role]?.[index] || "No hint available.";
  document.getElementById("hintText").innerText = hint;
  document.getElementById("hintPopup").classList.remove("hidden");

  localStorage.setItem("usedHints", JSON.stringify(usedHints));
};

window.closeHint = function () {
  document.getElementById("hintPopup").classList.add("hidden");
};

function updateHearts() {
  document.querySelectorAll(".heart").forEach((img, i) => {
    img.classList.toggle("used", usedHints[i]);
  });
}

function formatRole(role) {
  return role
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

window.toggleMode = function (mode) {
  const body = document.body;
  if (mode === "soft") {
    body.classList.toggle("soft-mode");
    body.classList.remove("dyslexia-mode");
  } else if (mode === "dyslexia") {
    body.classList.toggle("dyslexia-mode");
    body.classList.remove("soft-mode");
  }
};
