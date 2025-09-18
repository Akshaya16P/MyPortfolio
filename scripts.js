const roles = ["Software Developer", "Web Developer", "Competitive Coder"];
let roleIndex = 0;
const roleElement = document.getElementById("role-text");

function showRole() {
  roleElement.textContent = roles[roleIndex];
  roleElement.classList.remove("fade-out");
  roleElement.classList.add("pop-in");

  // After display, wait then fade out
  setTimeout(() => {
    roleElement.classList.remove("pop-in");
    roleElement.classList.add("fade-out");

    // Switch role after fade-out completes
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      showRole();
    }, 600); // fade-out duration
  }, 2000); // visible duration
}

// Start cycle
document.addEventListener("DOMContentLoaded", showRole);
