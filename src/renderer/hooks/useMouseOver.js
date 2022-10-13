import React from 'react';

export default function useMouseOver(e, text, pos, pg) {
  const obj = pg
    ? e.currentTarget.firstChild
    : document.getElementById('mouseTooltip');
  const words = `
    
    <div class="mouse-tooltip ${pos}" style="top: ${e?.pageY - 30}px; left: ${
    e?.pageX
  }px;">
          ${text}
      </div>

    `;

  const changePos = () => {
    obj.innerHTML = words;
  };
  obj.addEventListener('mousemove', changePos(), false);
  obj.addEventListener('mouseenter', changePos(), false);
  obj.addEventListener('mouseleave', changePos(), false);
  obj.addEventListener('mouseover', changePos(), false);
  return;
}
