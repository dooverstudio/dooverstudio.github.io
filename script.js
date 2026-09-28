// Do-Over Studio — site scripts
// Mobile nav toggle, footer year, and the quote form's Formspree submission.

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

  /* ---------- Quote form -> Formspree ---------- */
  // 1. Create a free form at https://formspree.io (50 submissions/month free).
  // 2. Paste the form ID below, replacing YOUR_FORM_ID. Redeploy the site.
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/mbglpbje";
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
      var referral = form.elements["referral"] ? form.elements["referral"].value.trim() : "";

      if (!name || !business || !details || !email) {
        if (status) {
          status.textContent = "Please fill in the required fields before sending.";
        }
        return;
      }

      if (FORMSPREE_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
        if (status) {
          status.textContent =
            "The form isn't connected yet — email us directly at " + QUOTE_EMAIL + " and we'll get you sorted.";
        }
        return;
      }

      if (status) {
        status.textContent = "Sending…";
      }

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name,
          business: business,
          "current website": currentUrl || "N/A",
          email: email,
          details: details,
          "how they heard about us": referral || "N/A",
          _subject: "Free audit request — " + business,
          _gotcha: form.elements["_gotcha"] ? form.elements["_gotcha"].value : ""
        })
      }).then(function (response) {
        if (response.ok) {
          if (status) {
            status.textContent = "Thanks! Your audit request is in — we'll reply within one business day.";
          }
          // Analytics: count this as a lead (safe to call before the tag is installed).
          if (typeof gtag === "function") {
            gtag("event", "generate_lead", {
              event_category: "engagement",
              event_label: referral || "not specified"
            });
          }
          form.reset();
        } else {
          if (status) {
            status.textContent =
              "Something went wrong sending that. Email us directly at " + QUOTE_EMAIL + " instead.";
          }
        }
      }).catch(function () {
        if (status) {
          status.textContent =
            "Something went wrong sending that. Email us directly at " + QUOTE_EMAIL + " instead.";
        }
      });
    });
  }
})();
