import React, { useEffect } from 'react';
import useOverlay from './useOverlay';

export default function useTooltip(e, text) {
  let currentTop = e?.currentTarget?.getBoundingClientRect().y;
  let currentLeft = e?.currentTarget?.getBoundingClientRect().x;

  const words = `
  <div class="tooltip" style="top: ${currentTop}px; left: ${
    currentLeft + e?.currentTarget?.clientWidth / 2
  }px;">
      ${text}
  </div>
`;

  const usingOverlay = () => {
    console.log('Moving mouse');
    useOverlay(words, 'tooltip', true);
  };

  const tooltipFunction = () => {
    const theTimeout = setTimeout(() => {
      usingOverlay();
    }, 800);
    e.currentTarget.onmouseleave = () => {
      clearTimeout(theTimeout);
      useOverlay('', 'tooltip', false);
    };
  };

  e.currentTarget.addEventListener(
    'mousemove',
    () => {
      currentTop = e?.currentTarget?.getBoundingClientRect().y;
      currentLeft = e?.currentTarget?.getBoundingClientRect().x;
    },
    false
  );

  tooltipFunction();
  // document.body.addEventListener(
  //   'mousemove',
  //   () => console.log('Moving part II'),
  //   false
  // );
  // document.body.addEventListener('mouseover', tooltipFunction(), false);
  return;
}
