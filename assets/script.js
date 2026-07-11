/* ==========================================================================
   Baby Vibes · סקריפט קל ונגיש (ללא ספריות חיצוניות)
   ========================================================================== */

/* מספר הוואטסאפ (בינלאומי, ללא + וללא 0 מוביל) */
window.RONI_WHATSAPP = "972527807377";

document.addEventListener("DOMContentLoaded", function () {

  /* ----- תפריט נייד ----- */
  var toggle = document.querySelector(".nav-toggle");
  var links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- שנה נוכחית בפוטר ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- קישורי וואטסאפ (Hero / יצירת קשר / פוטר / פס תחתון) ----- */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var text = encodeURIComponent(el.getAttribute("data-wa") || "היי רוני, אשמח לשמוע פרטים 🙂");
    el.setAttribute("href", "https://wa.me/" + window.RONI_WHATSAPP + "?text=" + text);
  });

  /* ----- חשיפה הדרגתית בגלילה ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  /* ----- אקורדיון שאלות: פותחים אחד — סוגרים את השאר ----- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ----- טופס יצירת קשר → פתיחת וואטסאפ עם הודעה מוכנה ----- */
  var form = document.getElementById("contact-form");
  if (form) {
    var val = function (n) {
      var el = form.elements[n];
      return el && el.value ? el.value.trim() : "";
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name  = val("name");
      var phone = val("phone");
      var msg   = val("message");

      var lines = ["היי רוני! הגעתי דרך האתר של Baby Vibes 🙂"];
      if (name)  lines.push("שמי: " + name);
      if (phone) lines.push("טלפון: " + phone);
      if (msg)   { lines.push(""); lines.push(msg); }

      var url = "https://wa.me/" + window.RONI_WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank");
    });
  }
});
