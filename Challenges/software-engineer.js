export const softwareEngineerChallenges = {
  beginner: {
    description: "Challenge Beginner:\nThe gates of the Pixel Temple are locked!\nWrite a function called unlockTemple() that prints \"Access granted!\" to the console.",
    expectedOutput: "Access granted!",
    starterCode: `function unlockTemple() {\n  // Your code here\n}`,
    hint: "Use console.log('Access granted!') inside your function."
  },

  intermediate: {
    description: "Challenge Intermediate:\nYou're inside the temple! Write a function that returns the sum of all even numbers from 1 to 100.",
    expectedOutput: "2550",
    starterCode: `function sumEvens() {\n  // Your code here\n}`,
    hint: "Use a for loop and check if numbers are divisible by 2."
  },

  advanced: {
    description: "Challenge Advanced:\nA door requires a secret passcode!\nWrite a function that checks if a string is a palindrome and prints true or false.",
    expectedOutput: "true",
    starterCode: `function isPalindrome(str) {\n  // Your code here\n}`,
    hint: "A string is a palindrome if it reads the same backward and forward."
  }
};
