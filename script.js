window.onload = function() {
  const wrapper = document.getElementById('text-wrapper');
  const texts = wrapper.querySelectorAll('.text');

  let minLeft = Infinity, minTop = Infinity;
  let maxRight = -Infinity, maxBottom = -Infinity;

  // 计算所有文字的包围盒范围
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

  // 设置包裹容器尺寸
  wrapper.style.width = boxWidth + 'px';
  wrapper.style.height = boxHeight + 'px';

  // 容器宽度，居中处理（横向）
  const containerWidth = wrapper.parentElement.clientWidth;
  const marginLeft = (containerWidth - boxWidth) / 2;
  wrapper.style.marginLeft = marginLeft + 'px';

  // 调整每个文字的坐标为相对包围盒起点
  texts.forEach(el => {
    const left = parseFloat(el.style.left);
    const top = parseFloat(el.style.top);
    el.style.left = (left - minLeft) + 'px';
    el.style.top = (top - minTop) + 'px';
  });
};
