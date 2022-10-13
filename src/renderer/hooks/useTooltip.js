import React, { useEffect } from 'react';
import useOverlay from './useOverlay';

export default function useTooltip(e, text) {
  const words = `
  <div class="tooltip" style="top: ${e?.currentTarget?.offsetTop}px; left: ${
    e?.currentTarget?.offsetLeft + e?.currentTarget?.clientWidth / 2
  }px;">
      ${text}
  </div>
`;
  const theTimeout = setTimeout(() => {
    useOverlay(words, 'tooltip', true);
  }, 800);
  e.currentTarget.onmouseleave = () => {
    clearTimeout(theTimeout);
    useOverlay('', 'tooltip', false);
  };
  return;
}
