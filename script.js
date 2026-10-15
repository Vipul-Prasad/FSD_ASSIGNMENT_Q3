/**
 * Q3: JavaScript Form Validation
 * MCA Practical Assignment
 *
 * Demonstrates:
 * 1. Form submit event handling and event.preventDefault()
 * 2. Field-level validation rules (presence, length, match)
 * 3. Regular expressions for email format and 10-digit mobile number
 * 4. DOM error feedback display and resetting
 */

// Form and input element references
const form = document.getElementById("registrationForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const resetBtn = document.getElementById("resetBtn");
const successMessage = document.getElementById("successMessage");

// Error display elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Helper function to set error on an input
function setError(inputElement, errorElement, message) {
  inputElement.classList.add("input-error");
  errorElement.textContent = message;
}

// Helper function to clear error on an input
function clearError(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  errorElement.textContent = "";
}

// Function to validate all fields
function validateForm(event) {
  // Prevent actual HTTP page submission
  event.preventDefault();

  // Hide previous success message
  successMessage.style.display = "none";

  let isValid = true;

  // 1. Full Name Validation: Required, minimum 2 characters
  const nameVal = fullNameInput.value.trim();
  if (nameVal === "") {
    setError(fullNameInput, nameError, "Name is required.");
    isValid = false;
  } else if (nameVal.length < 2) {
    setError(fullNameInput, nameError, "Name must be at least 2 characters.");
    isValid = false;
  } else {
    clearError(fullNameInput, nameError);
  }

  // 2. Email Validation: Required, valid email regex pattern
  const emailVal = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailVal === "") {
    setError(emailInput, emailError, "Email is required.");
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    setError(emailInput, emailError, "Enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // 3. Phone Validation: Required, exactly 10 numeric digits
  const phoneVal = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (phoneVal === "") {
    setError(phoneInput, phoneError, "Phone number is required.");
    isValid = false;
  } else if (!phoneRegex.test(phoneVal)) {
    setError(phoneInput, phoneError, "Phone number must contain 10 digits.");
    isValid = false;
  } else {
    clearError(phoneInput, phoneError);
  }

  // 4. Password Validation: Required, minimum 6 characters
  const passwordVal = passwordInput.value;
  if (passwordVal === "") {
    setError(passwordInput, passwordError, "Password is required.");
    isValid = false;
  } else if (passwordVal.length < 6) {
    setError(passwordInput, passwordError, "Password must contain at least 6 characters.");
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  // 5. Confirm Password Validation: Required, must match password
  const confirmPasswordVal = confirmPasswordInput.value;
  if (confirmPasswordVal === "") {
    setError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
    isValid = false;
  } else if (confirmPasswordVal !== passwordVal) {
    setError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
    isValid = false;
  } else {
    clearError(confirmPasswordInput, confirmPasswordError);
  }

  // If all validation checks pass
  if (isValid) {
    successMessage.style.display = "block";
    form.reset();
  }
}

// Function to reset the form and all error displays
function resetForm() {
  form.reset();
  clearError(fullNameInput, nameError);
  clearError(emailInput, emailError);
  clearError(phoneInput, phoneError);
  clearError(passwordInput, passwordError);
  clearError(confirmPasswordInput, confirmPasswordError);
  successMessage.style.display = "none";
}

// Event Listeners
form.addEventListener("submit", validateForm);
resetBtn.addEventListener("click", resetForm);
