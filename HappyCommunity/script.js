document.addEventListener("DOMContentLoaded", () => {
  const targets = [document.getElementById("notice-top"), document.getElementById("notice-bottom"), document.getElementById("top-hero-text")];
  const junkChars = "！？~%?…,# *'&℃$︿?（）死※·～＾".split("");
  const animating = new WeakSet();
  const scrambleSound = document.getElementById("scramble-sound");

  function splitText(container) {
    function recursiveSplit(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return;
        const fragment = document.createDocumentFragment();
        for (let char of text) {
          const span = document.createElement("span");
          span.classList.add("char");
          span.textContent = char === " " ? "\u00A0" : char;
          span.dataset.original = span.textContent;
          fragment.appendChild(span);
        }
        node.replaceWith(fragment);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        [...node.childNodes].forEach(recursiveSplit);
      }
    }
    recursiveSplit(container);
  }

  targets.forEach(splitText);

  const chars = [...document.querySelectorAll("#notice-top .char, #notice-bottom .char")];
  document.querySelector(".container").addEventListener("pointermove", e => {
    chars.forEach(char => {
      if (animating.has(char)) return;
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        animating.add(char);
        scramble(char);
      }
    });
  });

  function scramble(charEl) {
    const original = charEl.dataset.original;
    let frame = 0;
    const totalFrames = 10;

    charEl.classList.add("scrambling");

    if (scrambleSound) {
      scrambleSound.currentTime = 0;
      scrambleSound.play().catch(() => {});
    }

    const interval = setInterval(() => {
      if (frame < totalFrames) {
        charEl.textContent = junkChars[Math.floor(Math.random() * junkChars.length)];
        frame++;
      } else {
        charEl.textContent = original;
        charEl.classList.remove("scrambling");
        animating.delete(charEl);
        clearInterval(interval);
      }
    }, 30 + Math.random() * 20);
  }
});
