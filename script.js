let editor;

const challenges = {
  beginner: {
    prompt: "Challenge Beginner: Write a function `unlockTemple()` that logs 'Access granted!'.",
    code: "function unlockTemple() {\n  // your code here\n}"
  },
  intermediate: {
    prompt: "Challenge Intermediate: Write a function `doubleNumber(n)` that returns n*2.",
    code: "function doubleNumber(n) {\n  // your code here\n}"
  },
  advanced: {
    prompt: "Challenge Advanced: Write a function `isPrime(n)` that checks if n is prime.",
    code: "function isPrime(n) {\n  // your code here\n}"
  }
};

window.onload = function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
};

function loadChallenge(level) {
  document.getElementById("challenge-text").textContent = challenges[level].prompt;
  editor.setValue(challenges[level].code, -1);
  document.getElementById("feedback").classList.add("hidden");
}

function submitCode() {
  document.getElementById("feedback").classList.remove("hidden");
}

window.toggleMode = function (mode) {
  const body = document.body;
  if (mode === 'soft') {
    body.classList.toggle('soft-mode');
    body.classList.remove('dyslexia-mode');
  } else if (mode === 'dyslexia') {
    body.classList.toggle('dyslexia-mode');
    body.classList.remove('soft-mode');
  }
};
const allHints = {
  beginner: [
    "Use console.log(\"Access granted!\");",
    "Make sure your function is called unlockTemple",
    "Function syntax: function name() { }"
  ],
  intermediate: [
    "Try using a loop or if-statement.",
    "Watch for off-by-one errors.",
    "Check your return type matches expectations."
  ],
  advanced: [
    "Prime numbers are divisible only by 1 and themselves.",
    "Use a loop from 2 to Math.sqrt(n).",
    "Use return true/false based on condition."
  ]
};

let usedHints = [false, false, false];
let currentScore = 0;

function useHint(index) {
  if (usedHints[index]) return;
  usedHints[index] = true;

  const hearts = document.querySelectorAll('.heart');
  hearts[index].classList.add('used');

  const hint = allHints[currentDifficulty]?.[index] || "No hint available.";
  document.getElementById('hintText').innerText = hint;
  document.getElementById('hintPopup').classList.remove('hidden');
}


function closeHint() {
  document.getElementById('hintPopup').classList.add('hidden');
}

function submitCode() {
  const userCode = editor.getValue().trim();
  const correct = userCode.includes("function unlockTemple()") && userCode.includes("console.log(\"Access granted!\")");

  let base = 0;
  if (currentDifficulty === "beginner") base = 5;
  else if (currentDifficulty === "intermediate") base = 2;
  else if (currentDifficulty === "advanced") base = 3;

  const bonus = usedHints.filter(h => !h).length;
  currentScore += base + bonus;

  document.getElementById('score').innerText = `Score: ${currentScore}`;
  alert(correct ? "✅ Correct!" : "❌ Try Again!");
}
