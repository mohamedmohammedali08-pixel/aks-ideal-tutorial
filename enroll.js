/**
 * AK's Ideal Tutorials - Admission System Logic
 * Features: Form Validation, Accessibility (Focus Trap), WhatsApp Integration, Loading Animations
 */

// Configuration
const WHATSAPP_NUMBER = "919133389503  "; // Replace with actual institute number (e.g. 917032212345)

// DOM Elements
const btnEnrollTrigger = document.getElementById("btnEnrollTrigger");
const modalOverlay = document.getElementById("modalOverlay");
const enrollModal = document.getElementById("enrollModal");
const btnCloseModal = document.getElementById("btnCloseModal");
const enrollmentForm = document.getElementById("enrollmentForm");

// Form Inputs
const inputName = document.getElementById("studentName");
const inputAge = document.getElementById("studentAge");
const selectClass = document.getElementById("studentClass");
const inputMobile = document.getElementById("studentMobile");
const selectTiming = document.getElementById("preferredTiming");
const textareaComments = document.getElementById("additionalComments");
const btnSubmit = document.getElementById("btnSubmitAdmission");

// Status Overlay Elements
const statusOverlay = document.getElementById("statusOverlay");
const statusTitle = document.getElementById("statusTitle");
const statusSubtitle = document.getElementById("statusSubtitle");
const statusSpinner = document.getElementById("statusSpinner");
const statusCheckmark = document.getElementById("statusCheckmark");

// Focusable Elements inside Modal for Focus Trapping
let focusableElements = [];
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([-tabindex="-1"])';

// Helper: Open Modal
function openModal() {
  modalOverlay.classList.add("active");
  btnEnrollTrigger.setAttribute("aria-expanded", "true");
  
  // Update focusable elements list
  focusableElements = Array.from(enrollModal.querySelectorAll(focusableSelectors));
  
  // Set focus to the first input field after animation begins
  setTimeout(() => {
    inputName.focus();
  }, 100);

  // Prevent background scrolling
  document.body.style.overflow = "hidden";
}

// Helper: Close Modal
function closeModal() {
  modalOverlay.classList.remove("active");
  btnEnrollTrigger.setAttribute("aria-expanded", "false");
  
  // Clear any existing errors
  clearErrors();
  
  // Restore background scrolling
  document.body.style.overflow = "";

  // Return focus to trigger button
  btnEnrollTrigger.focus();
}

// Helper: Focus Trap logic
function handleKeyDown(e) {
  if (!modalOverlay.classList.contains("active")) return;

  // Escape key to close
  if (e.key === "Escape") {
    closeModal();
    return;
  }

  // Focus trapping logic for Tab
  if (e.key === "Tab") {
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}

// Event Listeners for Modal controls
btnEnrollTrigger.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

// Close modal when clicking outside the container
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Bind accessibility keydowns
document.addEventListener("keydown", handleKeyDown);

// Real-time input focus styles & error removal
const inputs = [inputName, inputAge, selectClass, inputMobile, selectTiming];
inputs.forEach(input => {
  const group = input.closest(".form-group");
  
  input.addEventListener("focus", () => {
    group.classList.add("focused");
  });
  
  input.addEventListener("blur", () => {
    group.classList.remove("focused");
  });

  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      validateField(input);
    }
  });

  if (input.tagName === "SELECT") {
    input.addEventListener("change", () => {
      if (input.classList.contains("invalid")) {
        validateField(input);
      }
    });
  }
});

// Helper: Clear validation errors
function clearErrors() {
  inputs.forEach(input => {
    input.classList.remove("invalid");
    const errorMsg = document.getElementById("error" + input.id.replace("student", "").replace("preferred", ""));
    if (errorMsg) {
      errorMsg.classList.remove("active");
    }
  });
}

// Helper: Validate a single field
function validateField(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorId = "error" + input.id.replace("student", "").replace("preferred", "");
  const errorMsg = document.getElementById(errorId);

  // Specific validation checks
  if (input === inputName) {
    isValid = value.length > 0;
  } else if (input === inputAge) {
    const ageVal = parseInt(value, 10);
    isValid = !isNaN(ageVal) && ageVal >= 4 && ageVal <= 100;
  } else if (input === selectClass) {
    isValid = value !== "";
  } else if (input === inputMobile) {
    // Exactly 10 digits check
    const mobilePattern = /^[0-9]{10}$/;
    isValid = mobilePattern.test(value);
  } else if (input === selectTiming) {
    isValid = value !== "";
  }

  // Update styles and aria attributes
  if (!isValid) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    if (errorMsg) {
      errorMsg.classList.add("active");
    }
  } else {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("active");
    }
  }

  return isValid;
}

// Form Submission Event
enrollmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate all fields
  let isFormValid = true;
  let firstInvalidElement = null;

  inputs.forEach(input => {
    const isFieldValid = validateField(input);
    if (!isFieldValid) {
      isFormValid = false;
      if (!firstInvalidElement) {
        firstInvalidElement = input;
      }
    }
  });

  if (!isFormValid) {
    // Focus the first invalid element for accessibility
    if (firstInvalidElement) {
      firstInvalidElement.focus();
    }
    return;
  }

  // Prevent duplicate submissions: disable controls
  btnSubmit.disabled = true;
  btnCloseModal.disabled = true;
  inputs.forEach(input => input.disabled = true);
  textareaComments.disabled = true;

  // Show status overlay (Phase 1: Validating/Simulating request submission)
  statusOverlay.classList.remove("success");
  statusOverlay.classList.add("active");
  statusTitle.textContent = "Validating Details...";
  statusSubtitle.textContent = "Please wait while we secure your connection.";

  // Phase 2: Show success animation (Simulating a premium API check)
  setTimeout(() => {
    statusOverlay.classList.add("success");
    statusTitle.textContent = "Admission Request Ready!";
    statusSubtitle.innerHTML = 'Connecting to WhatsApp...<br><span style="font-size: 11px; opacity: 0.8; display: block; margin-top: 8px;">If you are not redirected, <a href="#" id="whatsappFallbackLink" style="color: var(--color-accent); text-decoration: underline; font-weight: 600;">click here</a>.</span>';
    
    // Construct message template
    const name = inputName.value.trim();
    const age = inputAge.value.trim();
    const courseClass = selectClass.value;
    const phone = inputMobile.value.trim();
    const timing = selectTiming.value;
    const comments = textareaComments.value.trim() || "None";

    const message = `Hello AK's Ideal Tutorials,

I would like to take admission.

Student Name: ${name}
Age: ${age}
Class: ${courseClass}
Mobile Number: ${phone}
Preferred Timing: ${timing}

Additional Message:
${comments}

Please contact me regarding admission details.

Thank You.`;

    // Encode message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Update fallback link href
    const fallbackLink = document.getElementById("whatsappFallbackLink");
    if (fallbackLink) {
      fallbackLink.href = whatsappUrl;
      fallbackLink.target = "_blank";
    }

    // Phase 3: Open WhatsApp click-to-chat API after success checkmark animation
    setTimeout(() => {
      // Open in a new tab
      window.open(whatsappUrl, "_blank");

      // Reset form and UI state for when user navigates back
      setTimeout(() => {
        statusOverlay.classList.remove("active", "success");
        enrollmentForm.reset();
        
        // Re-enable form controls
        btnSubmit.disabled = false;
        btnCloseModal.disabled = false;
        inputs.forEach(input => input.disabled = false);
        textareaComments.disabled = false;

        closeModal();
      }, 1000);
    }, 1500);

  }, 1200);
});

