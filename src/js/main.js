import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//main.js
// Mosiah added for the Newsletter Homepage button 
document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signup-button");
  if (signupButton) {
    signupButton.addEventListener("click", () => {
      location.href = "../other_pages/newsletter.html";
    });
  }
});