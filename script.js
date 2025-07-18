document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');
  const screenWidth = window.innerWidth;

  // 1. 计算所有文字的左边界和右边界
  let minLeft = Infinity;
  let maxRight = -Infinity;
  const textPositions = [];

  texts.forEach(text => {
    const left = parseFloat(text.style.left);
    const width = text.offsetWidth;
    const right = left + width;

    textPositions.push({ element: text, left, width });

    if (left < minLeft) minLeft = left;
    if (right > maxRight) maxRight = right;
  });

  // 2. 计算整体中心位置
  const textCenter = (minLeft + maxRight) / 2;
  const screenCenter = screenWidth / 2;
  const offsetX = screenCenter - textCenter;

  // 3. 调整所有文字初始left，达到视觉居中
  textPositions.forEach(({ element, left }) => {
    element.style.left = (left + offsetX) + 'px';
  });

  // 4. 动画函数，实现文字从当前left向左移动，飞出屏幕后无缝重现
  function animateText(text) {
    const screenW = window.innerWidth;
    const duration = Math.random() * 8000 + 8000; // 8-16秒随机移动
    let startTime = null;

    // 初始X坐标（数字）
    let xPos = parseFloat(text.style.left);
    const textWidth = text.offsetWidth;
    const totalDistance = screenW + textWidth;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      const newX = xPos - progress * totalDistance;

      text.style.left = newX + 'px';

      if (newX + textWidth > 0) {
        requestAnimationFrame(step);
      } else {
        // 飞出左侧屏幕后，从右侧屏幕开始，重置动画
        xPos = screenW;
        startTime = null;
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // 5. 延迟1秒开始动画，确保页面渲染完整
  setTimeout(() => {
    texts.forEach(text => {
      animateText(text);
    });
  }, 1000);

  // 6. 监听窗口尺寸变化，重新计算居中和重置动画
  window.addEventListener('resize', () => {
    // 重新获取窗口宽度
    const newScreenWidth = window.innerWidth;

    // 重新计算整体中心位置和偏移量
    let newMinLeft = Infinity;
    let newMaxRight = -Infinity;

    texts.forEach(text => {
      // 清除动画，先重置left为原始值
      text.style.transition = 'none';
      const originalLeft = parseFloat(text.style.left) - offsetX; // 去掉之前的偏移，得到原始left
      text.style.left = originalLeft + 'px';

      const width = text.offsetWidth;
      if (originalLeft < newMinLeft) newMinLeft = originalLeft;
      if (originalLeft + width > newMaxRight) newMaxRight = originalLeft + width;
    });

    const newTextCenter = (newMinLeft + newMaxRight) / 2;
    const newScreenCenter = newScreenWidth / 2;
    const newOffsetX = newScreenCenter - newTextCenter;

    texts.forEach(text => {
      const currentLeft = parseFloat(text.style.left);
      text.style.left = (currentLeft + newOffsetX) + 'px';
    });

    // 重新启动动画（简单粗暴，刷新页面也可）
    location.reload();
  });
});
