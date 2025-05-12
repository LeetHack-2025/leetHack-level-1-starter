let editor;
let currentDifficulty = null;
let score = 0;
const hintsUsed = [false, false, false];
const challengeHints = {
  beginner: [
    "Use `console.log('Access granted!')` inside your function.",
    "The function should be named `unlockTemple` and take no parameters.",
    "Double check your curly brackets."
  ],
  intermediate: [
    "Check if the input is even or divisible by 2.",
    "Loop through possible divisors.",
    "Return false if you find any divisors, true otherwise."
  ],
  advanced: [
    "Use a loop to check divisibility from 2 to sqrt(n).",
    "Use `n % i === 0` to check if divisible.",
    "Don’t forget to return true at the end if no divisors are found."
  ]
};

const challenges = {
  beginner: {
    text: "Challenge Beginner: Write a function `unlockTemple()` that logs 'Access granted!'.",
    code: "function unlockTemple() {\n  // your code here\n}"
  },
  intermediate: {
    text: "Challenge Intermediate: Write a function `isEven(n)` that returns true if n is even.",
    code: "function isEven(n) {\n  // your code here\n}"
  },
  advanced: {
    text: "Challenge Advanced: Write a function `isPrime(n)` that checks if n is prime.",
    code: "function isPrime(n) {\n  // your code here\n}"
  }
};

function loadChallenge(level) {
  currentDifficulty = level;
  document.getElementById("challenge-text").innerText = challenges[level].text;
  editor.setValue(challenges[level].code, -1);
}

function showHint(index) {
  if (!currentDifficulty) return;

  const heart = document.getElementsByClassName("heart")[index];
  const hintText = challengeHints[currentDifficulty][index];

  document.getElementById("hintText").innerText = hintText;
  document.getElementById("hintPopup").classList.remove("hidden");

  if (!hintsUsed[index]) {
    heart.classList.add("used");
    hintsUsed[index] = true;
  }
}

function closeHint() {
  document.getElementById("hintPopup").classList.add("hidden");
}

function toggleMode(mode) {
  const body = document.body;
  if (mode === 'soft') {
    body.classList.toggle("soft-mode");
  } else if (mode === 'dyslexia') {
    body.classList.toggle("dyslexia-mode");
  }
}

function submitCode() {
  const userCode = editor.getValue();
  console.log("Submitting:\n", userCode);

  // Placeholder: In future scoring will be updated based on correctness
  alert("Code submitted. Future versions will score and validate!");
}

function runCode() {
  const userCode = editor.getValue();
  const output = document.createElement("div");
  output.innerHTML = "<strong>Output:</strong><br><pre>" + escapeHTML(runSandboxed(userCode)) + "</pre>";
  document.body.appendChild(output);
}

function runSandboxed(code) {
  try {
    const oldLog = console.log;
    let output = "";
    console.log = (...args) => { output += args.join(" ") + "\n"; };
    new Function(code)();
    console.log = oldLog;
    return output || "(No output)";
  } catch (err) {
    return "Error: " + err.message;
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => {
    return {
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#039;'
    }[match];
  });
}

window.onload = function () {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.setFontSize(14);
  editor.setShowPrintMargin(false);
};
