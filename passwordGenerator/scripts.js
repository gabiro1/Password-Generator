// Get DOM elements
const passwordOutput = document.getElementById("password");
const rangeInput = document.getElementById("range");
const charLengthDisplay = document.getElementById("char-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generatePasswordButton = document.getElementById("generatePassword");
const copyButton = document.getElementById("copy-btn");
const passwordStrength = document.getElementById("strength");

// Character pools
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/";

// Update character length display
rangeInput.addEventListener("input", () => {
    charLengthDisplay.textContent = rangeInput.value;
});

// Generate password event
generatePasswordButton.addEventListener("click", () => {
    const length = parseInt(rangeInput.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    let allChars = "";
    let password = "";

    // Add character sets based on criteria
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    // Ensure at least one character from each selected set
    if (includeUppercase) password += getRandomChar(uppercaseChars);
    if (includeLowercase) password += getRandomChar(lowercaseChars);
    if (includeNumbers) password += getRandomChar(numberChars);
    if (includeSymbols) password += getRandomChar(symbolChars);

    // Fill the remaining length with random characters
    for (let i = password.length; i < length; i++) {
        password += getRandomChar(allChars);
    }

    // Shuffle the password to mix guaranteed and random characters
    password = shuffle(password);

    // Update the password field
    passwordOutput.value = password;

    // Update password strength
    updateStrength(password);
});

// Copy password to clipboard
copyButton.addEventListener("click", () => {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value);
        alert("Password copied to clipboard!");
    } else {
        alert("No password to copy!");
    }
});

// Function to get a random character from a string
function getRandomChar(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

// Function to shuffle the password
function shuffle(password) {
    return password.split("").sort(() => Math.random() - 0.5).join("");
}

// Function to update password strength
function updateStrength(password) {
    if (password.length >= 16 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        passwordStrength.textContent = "Strong";
        passwordStrength.style.color = "green";
    } else if (password.length >= 10) {
        passwordStrength.textContent = "Moderate";
        passwordStrength.style.color = "orange";
    } else {
        passwordStrength.textContent = "Weak";
        passwordStrength.style.color = "red";
    }
}
 