export const uxDesignerStarter = {
  beginner: `<!-- Beginner Task -->\n<!-- Create a wireframe-style layout for the app home screen -->\n<!-- Include: App title, CO₂ savings display, 'Start Journey' button -->\n<!-- Use only HTML -->\n\n<!DOCTYPE html>\n<html>\n<head><title>Green Transit</title></head>\n<body>\n  <h1>Green Transit</h1>\n  <p>Total CO₂ Saved: 0g</p>\n  <button>Start Journey</button>\n</body>\n</html>`,

  intermediate: `<!-- Intermediate Task -->\n<!-- Add accessibility features: proper labels, dyslexia-friendly font, high contrast -->\n<!-- Use inline CSS or a <style> block -->\n\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      background-color: #000;\n      color: #FFD700;\n      font-family: 'Arial', sans-serif;\n    }\n  </style>\n</head>\n<body>\n  <label for="name">Your Name:</label>\n  <input id="name" type="text" />\n</body>\n</html>`,

  advanced: `<!-- Advanced Task -->\n<!-- Create a responsive homepage with 3 sections: Dashboard, Rewards, Journey Log -->\n<!-- Use CSS Flex or Grid, and highlight WCAG features -->\n\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    .section { padding: 1em; border: 1px solid #ccc; margin: 1em 0; }\n    @media (min-width: 600px) {\n      .container { display: flex; gap: 1em; }\n    }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <div class="section">Dashboard</div>\n    <div class="section">Rewards</div>\n    <div class="section">Journey Log</div>\n  </div>\n</body>\n</html>`
};

