document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');
  const textWrapper = document.getElementById('text-wrapper');
  const container = document.querySelector('.container');

  // 获取容器宽度和屏幕宽度
  function getSizes() {
    return {
      wrapperWidth: textWrapper.offsetWidth,
      containerWidth: container.offsetWidth,
      screenWidth: window.innerWidth
    };
  }

  // 动画函数：从当前位置开始移动并循环
  function animateText(text, initialLeft, textWidth, wrapperWidth, screenWidth) {
    const duration = Math.random() * 8000 + 8000; // 8-16秒
    const totalDistance = wrapperWidth + textWidth + screenWidth;

    let startTime = null;

    // 逐帧更新位置
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;

      // 计算当前位置
      let newX = initialLeft - progress * totalDistance;

      // 如果文字飞出左侧，重新从右侧进入
      if (newX + textWidth < 0) {
        startTime = timestamp;  // 重置动画起点
        newX = wrapperWidth + screenWidth;  // 从右侧重新进入
      }

      // 更新位置
      text.style.left = `${newX}px`;
      requestAnimationFrame(step);  // 继续下一帧
    }

    requestAnimationFrame(step);  // 启动动画
  }

  // 启动动画，延迟1秒（确保所有元素加载完毕）
  setTimeout(() => {
    const { wrapperWidth, screenWidth } = getSizes();

    texts.forEach(text => {
      const initialLeft = parseFloat(text.style.left);
      const textWidth = text.offsetWidth;

      animateText(text, initialLeft, textWidth, wrapperWidth, screenWidth);
    });
  }, 1000);

  // 窗口大小改变时，重新加载页面以适配新大小
  window.addEventListener('resize', () => {
    location.reload();
  });
});
