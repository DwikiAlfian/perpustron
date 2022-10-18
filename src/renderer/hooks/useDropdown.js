import React from 'react';
import useOverlay from './useOverlay';

export default function useDropdown(e) {
  let currentTop = e?.currentTarget?.getBoundingClientRect().y;
  let currentLeft =
    e?.currentTarget?.getBoundingClientRect().x +
    e?.currentTarget?.clientWidth / 2;

  let status = false;

  const event = () => {
    console.log('CLICKED');
    status = !status;
  };

  document.addEventListener('scroll', event(), true);

  setTimeout(() => {
    document.addEventListener('click', () => {
      document.removeEventListener('scroll', event(), false);
      useOverlay('', 'dropdown', false);
    });
  }, 50);

  const words = `
        <div>
            <div class="element-dropdown" style="top: ${currentTop}px; left: ${currentLeft}px">
                <span class="span-text">Some List</span>
            </div>
        </div>
    `;
  useOverlay(words, 'dropdown', true);
  return;
}
