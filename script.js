document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');

  // 可选：延迟1秒后启动动画（或改成按钮点击）
  setTimeout(() => {
    texts.forEach(text => {
      const initialLeft = parseFloat(text.style.left); // 初始 X
      const top = parseFloat(text.style.top);           // 固定 Y
      const textWidth = text.offsetWidth;

      function animateFromCurrent(xPos) {
        const screenWidth = window.innerWidth;
        const duration = Math.random() * 8000 + 8000; // 8s - 16s
        const totalDistance = screenWidth + textWidth;

        let startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = elapsed / duration;

          const newX = xPos - progress * totalDistance;
          text.style.left = `${newX}px`;

          if (newX + textWidth > 0) {
            requestAnimationFrame(step);
          } else {
            // 飞出后，马上从屏幕右侧重新开始
            animateFromCurrent(screenWidth);
          }
        }

        requestAnimationFrame(step);
      }

      // 第一次动画从原始位置开始
      animateFromCurrent(initialLeft);
    });
  }, 500); // 1秒延迟，可自定义或改为按钮触发
});