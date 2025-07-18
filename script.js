document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');

  setTimeout(() => {
    texts.forEach(text => {
      const initialLeftPx = parseFloat(getComputedStyle(text).left);
      const textWidth = text.offsetWidth;

      function animate(xStart) {
        const screenWidth = window.innerWidth;
        const totalDistance = screenWidth + textWidth;
        const duration = Math.random() * 8000 + 8000;

        let startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = elapsed / duration;

          const newX = xStart - progress * totalDistance;
          text.style.left = `${newX}px`;

          if (newX + textWidth > 0) {
            requestAnimationFrame(step);
          } else {
            animate(screenWidth);
          }
        }

        requestAnimationFrame(step);
      }

      animate(initialLeftPx);
    });
  }, 1000);
});
