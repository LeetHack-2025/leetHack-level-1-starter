export const dataAnalystStarter = {
  beginner: `# Beginner Task\n# Load trip data and calculate total CO₂ saved\ntrips = [\n    {"user": "Aisha", "distance": 4},\n    {"user": "Aisha", "distance": 6},\n]\n\ndef total_savings(trips):\n    # Your code here\n    pass`,

  intermediate: `# Intermediate Task\n# Plot CO₂ savings over time using matplotlib\nimport matplotlib.pyplot as plt\n\ndata = [\n    {"date": "2025-05-01", "co2": 600},\n    {"date": "2025-05-02", "co2": 720},\n]\n\n# Your code here to plot date vs co2`,

  advanced: `# Advanced Task\n# Manually group users by green travel frequency\n# Frequent: 5+ trips, Occasional: 2–4 trips, Rare: <2 trips\n\nusers = {\n    "Aisha": 6,\n    "Ben": 3,\n    "Chi": 1\n}\n\n# Output suggestions based on category`
};