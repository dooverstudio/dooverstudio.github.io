// Do-Over Studio — site scripts
// Mobile nav toggle, footer year, and the quote form's mailto submission.

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a link is tapped.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Quote form -> mailto ---------- */
  var QUOTE_EMAIL = "theofficialdooverstudio@gmail.com";
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.elements["name"].value.trim();
      var business = form.elements["business"].value.trim();
      var currentUrl = form.elements["currentUrl"].value.trim();
      var details = form.elements["details"].value.trim();
      var email = form.elements["email"].value.trim();

      if (!name || !business || !details || !email) {
        if (status) {
          status.textContent = "Please fill in the required fields before sending.";
        }
        return;
      }

      var subject = "Free quote request — " + business;

      var bodyLines = [
        "Name: " + name,
        "Business name: " + business,
        "Current website: " + (currentUrl || "N/A"),
        "Email: " + email,
        "",
        "What they want changed:",
        details
      ];

      var mailtoUrl =
        "mailto:" +
        encodeURIComponent(QUOTE_EMAIL) +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailtoUrl;

      if (status) {
        status.textContent = "Opening your email app… if nothing happens, email us directly at " + QUOTE_EMAIL;
      }
    });
  }
})();
