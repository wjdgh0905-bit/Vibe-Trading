/* Melange Tattoo — model call form on /melbourne/ (English page; the ko strings are kept for a Korean version). */
(function () {
  "use strict";
  var L = document.documentElement.lang === "ko" ? "ko" : "en";
  var T = {
    en: {
      required: "Please fill this in.",
      contact: "Add an Instagram handle or email so we can reply.",
      emailBad: "That email doesn't look right.",
      days: "Pick at least one day and piece.",
      age: "Models need to be 18 or older.",
      consent: "Model sessions are photographed and filmed — please tick this to apply.",
      sending: "Sending…",
      ok: "Thanks — your application is in. If it's a fit, you'll hear back to plan the design and day.",
      fail: "It didn't send. Try again, or DM @melange.tattoo on Instagram."
    },
    ko: {
      required: "이 항목을 입력해주세요.",
      contact: "답장을 받을 인스타그램 아이디나 이메일을 적어주세요.",
      emailBad: "이메일 주소를 다시 확인해주세요.",
      days: "원하는 날짜·작업을 하나 이상 골라주세요.",
      age: "모델은 만 18세 이상만 지원할 수 있어요.",
      consent: "모델 작업은 촬영이 함께 진행돼요. 지원하려면 동의에 체크해주세요.",
      sending: "보내는 중…",
      ok: "지원이 접수됐어요. 잘 맞으면 도안과 날짜를 상의하는 답장을 드려요.",
      fail: "전송되지 않았어요. 다시 시도하시거나 인스타그램 @melange.tattoo 로 DM 주세요."
    }
  }[L];

  // Close the call automatically once the expo is over
  var box = document.getElementById("apply");
  var today;
  try { today = new Intl.DateTimeFormat("en-CA", { timeZone: (box && box.dataset.tz) || "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
  catch (e) { today = new Date().toISOString().slice(0, 10); }
  if (box && box.dataset.until && today > box.dataset.until) {
    box.hidden = true;
    var closed = document.getElementById("apply-closed");
    if (closed) closed.hidden = false;
    return;
  }

  var form = document.getElementById("mform");
  if (!form) return;
  var status = document.getElementById("mstatus");

  function setErr(key, msg, input) {
    var err = document.getElementById("merr-" + key);
    var field = err && err.closest(".field");
    if (field) field.classList.toggle("bad", !!msg);
    if (err) err.textContent = msg || "";
    if (input) {
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) input.setAttribute("aria-describedby", "merr-" + key); else input.removeAttribute("aria-describedby");
    }
    return !msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var el = form.elements, v = function (n) { return (el[n].value || "").trim(); };
    var ok = true;
    ok = setErr("name", v("name") ? "" : T.required, el.name) && ok;
    ok = setErr("idea", v("idea") ? "" : T.required, el.idea) && ok;
    var email = v("email"), ig = v("instagram");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("instagram", "", el.instagram); ok = setErr("email", T.emailBad, el.email) && ok; }
    else if (!email && !ig) { setErr("instagram", T.contact, el.instagram); ok = false; }
    else { setErr("email", "", el.email); setErr("instagram", "", el.instagram); }
    var days = form.querySelectorAll('input[name="days"]:checked').length;
    ok = setErr("days", days ? "" : T.days) && ok;
    [].forEach.call(form.querySelectorAll('input[name="days"]'), function (c) { c.setAttribute("aria-invalid", days ? "false" : "true"); });
    ok = setErr("age", el.age_18_plus.checked ? "" : T.age, el.age_18_plus) && ok;
    ok = setErr("consent", el.photo_consent.checked ? "" : T.consent, el.photo_consent) && ok;
    if (!ok) {
      var first = form.querySelector(".field.bad input, .field.bad textarea");
      if (first) first.focus();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = "status"; status.textContent = T.sending;
    var data = new FormData(form);
    // send the chosen days as one readable line
    data.set("days", [].map.call(form.querySelectorAll('input[name="days"]:checked'), function (c) { return c.value; }).join(", "));
    fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        status.className = "status ok"; status.textContent = T.ok; form.reset();
        if (typeof window.fbq === "function") window.fbq("track", "Lead", { content_name: "Melbourne expo model" });
      })
      .catch(function () { status.className = "status fail"; status.textContent = T.fail; })
      .then(function () { btn.disabled = false; });
  });

  form.addEventListener("input", function (e) {
    // either contact field satisfies the "Instagram or email" rule, so typing in one clears it
    if (e.target.name === "email" || e.target.name === "instagram") setErr("instagram", "", form.elements.instagram);
    if (e.target.name === "days") [].forEach.call(form.querySelectorAll('input[name="days"]'), function (c) { c.setAttribute("aria-invalid", "false"); });
    var f = e.target.closest(".field.bad");
    if (!f) return;
    var err = f.querySelector(".err");
    if (err) setErr(err.id.replace("merr-", ""), "", e.target);
  });
})();
