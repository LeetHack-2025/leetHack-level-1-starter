export const cybersecuritySpecialistStarter = {
  beginner: `# Beginner Task\n# Create a simple Caesar cipher to encode passwords by shifting letters by 3\n\ndef caesar_cipher(text):\n    result = ""\n    for char in text:\n        if char.isalpha():\n            result += chr((ord(char) - 97 + 3) % 26 + 97)\n        else:\n            result += char\n    return result`,

  intermediate: `# Intermediate Task\n# Validate if a password is strong\n# A strong password must be 8+ characters, contain a number and special character\n\ndef is_strong_password(password):\n    # Your code here\n    pass`,

  advanced: `# Advanced Task\n# Simulate a secure login system that stores hashed passwords\n# Use SHA-256 to hash passwords and verify login\n\nimport hashlib\n\npasswords = {}\n\ndef store_password(username, password):\n    hashed = hashlib.sha256(password.encode()).hexdigest()\n    passwords[username] = hashed\n\ndef login(username, password):\n    hashed = hashlib.sha256(password.encode()).hexdigest()\n    return passwords.get(username) == hashed`
};
