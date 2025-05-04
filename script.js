// Import challenges
import { softwareEngineerChallenges } from './challenges/software-engineer.js';

// Global state
let editor;
let currentDifficulty = 'beginner';
let capturedLogs = [];
let score = 0;

// Master heart states
let allHearts = {
  beginner: [false, false, false],
  intermediate: [false, false, false],
  advanced: [false, false, false]
};

// Setup editor
function setupEditor() {
  editor = ace.edit("editor-se");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  renderDifficultyButtons();
}

// Render difficulty buttons dynamically
function renderDifficultyButtons() {
  const difficulties = Object.keys(softwareEngineerChallenges);

  const container = document.querySelector('.difficulty-buttons');
  container.innerHTML = '';

  difficulties.forEach((difficulty, index) => {
    const btn = document.createElement('button');
    btn.id = `btn-${difficulty}`;
    btn.className = 'difficulty';
    btn.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    btn.onclick = () => setDifficulty(difficulty);

    if (index === 0) btn.classList.add('active'); // First button active
    container.appendChild(btn);
  });

  setDifficulty('beginner');
}

// Load challenge
function loadChallenge() {
  const challenge = softwareEngineerChallenges[currentDifficulty];

  document.querySelector('.challenge-text p').innerText = challenge.description;
  editor.setValue(challenge.starterCode, -1);
}

// Set difficulty
function setDifficulty(level) {
  currentDifficulty = level;

  document.querySelectorAll('.difficulty').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${level}`).classList.add('active');

  loadChallenge();
  refreshHearts();
}

// Setup heart listeners
function setupHeartListeners() {
  for (let i = 1; i <= 3; i++) {
    const heart = document.getElementById(`heart${i}`);
    heart.addEventListener('click', () => useHint(i));
  }
  // Hint Close Button
  const closeHintButton = document.querySelector('#hintPopup button');
  closeHintButton.addEventListener('click', closeHint);
}

// Refresh hearts visually
function refreshHearts() {
  const heartsState = allHearts[currentDifficulty];

  for (let i = 0; i < 3; i++) {
    const heartImg = document.getElementById(`heart${i + 1}`);
    if (heartsState[i]) {
      heartImg.src = 'heart_dead.png';
    } else {
      heartImg.src = 'heart.png';
    }
  }
}

// Use a hint
function useHint(heartNumber) {
  const heartsState = allHearts[currentDifficulty];

  if (!heartsState[heartNumber - 1]) {
    heartsState[heartNumber - 1] = true;

    const heartImg = document.getElementById(`heart${heartNumber}`);
    heartImg.src = 'heart_dead.png';

    // Show hint popup
    const hint = softwareEngineerChallenges[currentDifficulty].hint;
    document.getElementById('hintText').innerText = hint;
    document.getElementById('hintPopup').classList.remove('hidden');
  }
}

// Close hint
function closeHint() {
  document.getElementById('hintPopup').classList.add('hidden');
}

// Safe evaluation
function safeEval(code) {
  capturedLogs = [];

  const sandbox = {
    console: {
      log: (...args) => capturedLogs.push(args.join(' '))
    }
  };

  const sandboxKeys = Object.keys(sandbox);
  const sandboxValues = Object.values(sandbox);

  const consoleBackup = console.log;

  try {
    const runner = new Function(...sandboxKeys, code);
    runner(...sandboxValues);
  } finally {
    console.log = consoleBackup;
  }
}

// Submit code
function submitCode() {
  const challenge = softwareEngineerChallenges[currentDifficulty];
  const userCode = editor.getValue();

  try {
    safeEval(userCode);

    if (capturedLogs.includes(challenge.expectedOutput)) {
      const penalty = calculateHintPenalty();
      alert(`✅ Challenge Complete! (Penalty: ${penalty})`);
      updateScore(5 + penalty);
    } else {
      alert("❌ Try Again!");
    }
  } catch (error) {
    console.error(error);
    alert("❗ Error in your code.");
  }
}

// Update score
function updateScore(points) {
  score += points;
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Calculate penalty
function calculateHintPenalty() {
  const heartsState = allHearts[currentDifficulty];
  return heartsState.filter(state => state).length * -1;
}


// Toggle Accessibility Modes
function toggleMode(mode) {
  if (mode === 'soft') {
    document.body.classList.toggle('soft-mode');
    const softButton = document.querySelector("#modeToggle button:nth-child(1)");
    softButton.classList.toggle('toggled');
  } else if (mode === 'dyslexia') {
    document.body.classList.toggle('dyslexia-mode');
    const dyslexiaButton = document.querySelector("#modeToggle button:nth-child(2)");
    dyslexiaButton.classList.toggle('toggled');
  }
}



// Initialize
window.addEventListener('DOMContentLoaded', () => {
  setupEditor();
  setupHeartListeners();
});
// Make available globally to HTML onclicks
window.toggleMode = toggleMode;


