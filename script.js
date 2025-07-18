window.onload = function () {
  const wrapper = document.getElementById('text-wrapper');
  const texts = wrapper.querySelectorAll('.text');

  // 计算文字的边界，用于设置 wrapper 宽高和居中
  let minLeft = Infinity,
    minTop = Infinity,
    maxRight = -Infinity,
    maxBottom = -Infinity;

  texts.forEach(el => {
    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    if (left < minLeft) minLeft = left;
    if (top < minTop) minTop = top;
    if (left + width > maxRight) maxRight = left + width;
    if (top + height > maxBottom) maxBottom = top + height;
  });

  const boxWidth = maxRight - minLeft;
  const boxHeight = maxBottom - minTop;

  wrapper.style.width = boxWidth + 'px';
  wrapper.style.height = boxHeight + 'px';

  // 横向居中 margin
  const containerWidth = wrapper.parentElement.clientWidth;
  const marginLeft = (containerWidth - boxWidth) / 2;
  wrapper.style.marginLeft = marginLeft + 'px';

  // 调整文字坐标，相对于最左和最上
  texts.forEach(el => {
    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);
    el.style.left = (left - minLeft) + 'px';
    el.style.top = (top - minTop) + 'px';
  });

  // ==== 动画代码 ====

  // 文字动画速度范围，单位ms
  const MIN_DURATION = 6000;
  const MAX_DURATION = 13000;

  function animateText(el) {
    // 起始位置X为当前位置left
    const startX = parseFloat(el.style.left);

    // 文字宽度
    const width = el.offsetWidth;

    // 终点X（向左移动，直至完全看不见）
    // 这里减去宽度和一点缓冲，使文字完全移出视野
    const endX = -width - 50;

    // 生成随机动画时长
    const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);

    // 清除之前动画（如果有）
    el.style.transition = 'none';
    el.style.transform = `translateX(0px)`;

    // 先强制重排，确保transition可用
    el.offsetWidth;

    // 设置过渡动画
    el.style.transition = `transform ${duration}ms linear`;
    el.style.transform = `translateX(${endX - startX}px)`;

    // 动画结束后重置位置并重新开始动画（无限循环）
    const onTransitionEnd = () => {
      el.style.transition = 'none';
      el.style.transform = 'translateX(0px)';

      // 强制重排，防止transition失效
      el.offsetWidth;

      // 重新调用动画
      el.style.transition = `transform ${duration}ms linear`;
      el.style.transform = `translateX(${endX - startX}px)`;
    };

    el.addEventListener('transitionend', onTransitionEnd, { once: true });
  }

  // 启动所有文字动画，延迟启动防止页面阻塞
  texts.forEach((el, index) => {
    setTimeout(() => {
      animateText(el);
    }, 100 * index); // 按序错开启动动画，防止同时大量动画卡顿
  });
};
