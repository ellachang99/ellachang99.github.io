document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');

  // 延迟1秒后启动动画（可改成按钮点击或立即执行）
  setTimeout(() => {
    texts.forEach(text => {
      const initialLeft = parseFloat(text.style.left); // 初始X坐标
      const top = parseFloat(text.style.top);           // 固定Y坐标
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

          // 新的X坐标 = 当前起始点 - 进度 * 总距离
          const newX = xPos - progress * totalDistance;
          text.style.left = `${newX}px`;
          text.style.top = `${top}px`; // 保持Y不变

          if (newX + textWidth > 0) {
            requestAnimationFrame(step);
          } else {
            // 飞出屏幕左边，立即从屏幕右边重新开始
            animateFromCurrent(screenWidth);
          }
        }

        requestAnimationFrame(step);
      }

      // 第一次动画从HTML定义的初始位置开始
      animateFromCurrent(initialLeft);
    });
  }, 1000);
});
