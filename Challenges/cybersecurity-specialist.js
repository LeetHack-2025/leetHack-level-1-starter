export const softwareEngineerStarter = {
  beginner: `# Beginner Task\n# Write a function calculate_savings(km) that returns CO₂ saved (assume 120g/km)\ndef calculate_savings(km):\n    return km * 120`,

  intermediate: `# Intermediate Task\n# Log user trips and total CO₂ saved\ntrips = [\n    {"date": "2025-05-01", "distance": 5},\n    {"date": "2025-05-02", "distance": 3}\n]\n\n# Your code here`,

  advanced: `# Advanced Task\n# Create Trip and User classes to simulate green travel and calculate savings\nclass Trip:\n    def __init__(self, date, distance):\n        self.date = date\n        self.distance = distance\n\nclass User:\n    def __init__(self, name):\n        self.name = name\n        self.trips = []\n\n    def add_trip(self, trip):\n        self.trips.append(trip)\n\n    def total_savings(self):\n        return sum([t.distance * 120 for t in self.trips])`
};

