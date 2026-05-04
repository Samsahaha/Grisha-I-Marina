(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocus = null;

  function open(trigger) {
    lastFocus = document.activeElement;
    const src = trigger.currentSrc || trigger.src;
    if (!src) return;
    lightboxImg.src = src;
    lightboxImg.alt = trigger.alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll(".lightbox-trigger").forEach(function (img) {
    img.addEventListener("click", function (e) {
      e.preventDefault();
      open(img);
    });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(img);
      }
    });
    if (!img.hasAttribute("tabindex")) {
      img.setAttribute("tabindex", "0");
    }
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) {
      e.preventDefault();
      close();
    }
  });
})();
