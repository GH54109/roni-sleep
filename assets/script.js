/* ==========================================================================
   רוני · סקריפט קל ונגיש (ללא ספריות חיצוניות)
   ========================================================================== */

/* --- מספר הוואטסאפ של רוני (לעריכה) ---
   בפורמט בינלאומי ללא + וללא 0 מוביל. דוגמה: 972501234567 */
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
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ----- שנה נוכחית בפוטר ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- עדכון קישורי וואטסאפ לפי המספר שהוגדר ----- */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var text = encodeURIComponent(el.getAttribute("data-wa") || "היי רוני, אשמח לשמוע פרטים על הליווי 🙂");
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

  /* ----- טופס יצירת קשר → פתיחת וואטסאפ עם הודעה מוכנה ----- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name  = (form.elements["name"].value  || "").trim();
      var phone = (form.elements["phone"].value || "").trim();
      var baby  = (form.elements["baby"].value  || "").trim();
      var msg   = (form.elements["message"].value || "").trim();

      var lines = ["היי רוני! הגעתי דרך האתר 🙂"];
      if (name)  lines.push("שמי: " + name);
      if (phone) lines.push("טלפון: " + phone);
      if (baby)  lines.push("גיל התינוק/ת: " + baby);
      if (msg)   lines.push("");
      if (msg)   lines.push(msg);

      var url = "https://wa.me/" + window.RONI_WHATSAPP +
                "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank");
    });
  }
});
