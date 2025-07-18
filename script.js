document.addEventListener('DOMContentLoaded', () => {
  const texts = Array.from(document.querySelectorAll('.text'));
  const screenWidth = window.innerWidth;

  // 1. 计算所有文字左边界和右边界（相对viewport）
  let minLeft = Infinity;
  let maxRight = -Infinity;

  texts.forEach(text => {
    const left = parseFloat(text.style.left);
    const width = text.offsetWidth;
    if (left < minLeft) minLeft = left;
    if (left + width > maxRight) maxRight = left + width;
  });

  // 2. 计算文字包围盒中心和屏幕中心的差值，作为偏移量
  const textsCenter = (minLeft + maxRight) / 2;
  const screenCenter = screenWidth / 2;
  const offsetX = screenCenter - textsCenter;

  // 3. 应用偏移量，调整所有文字初始left，实现视觉居中
  texts.forEach(text => {
    const origLeft = parseFloat(text.style.left);
    text.style.left = (origLeft + offsetX) + 'px';
  });

  // 4. 动画函数，实现从当前位置向左移动，飞出后马上从右侧进入
  function animateText(text) {
    const textWidth = text.offsetWidth;
    const duration = Math.random() * 8000 + 8000; // 8~16秒

    let startTime = null;
    let startX = parseFloat(text.style.left);
    const totalDistance = screenWidth + textWidth;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      const newX = startX - progress * totalDistance;

      text.style.left = newX + 'px';

      if (newX + textWidth > 0) {
        requestAnimationFrame(step);
      } else {
        // 飞出左侧后从右侧重新开始
        startX = screenWidth;
        startTime = null;
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // 5. 延迟启动动画，保证渲染完成
  setTimeout(() => {
    texts.forEach(animateText);
  }, 1000);

  // 6. 窗口尺寸变化时，重新加载页面重新计算居中
  window.addEventListener('resize', () => {
    location.reload();
  });
});
