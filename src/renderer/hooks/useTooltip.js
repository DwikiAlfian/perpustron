import React, { useEffect } from 'react';
import useOverlay from './useOverlay';

export default function useTooltip(e, text) {
  console.log(e.currentTarget.onmouseenter);
  useOverlay(
    `
            <div class="tooltip" style="top: ${
              e?.currentTarget?.offsetTop
            }px; left: ${
      e?.currentTarget?.offsetLeft + e?.currentTarget?.clientWidth / 2
    }px;">
                ${text}
            </div>
        `,
    true,
    0
  );
  e.currentTarget.onmouseleave = () => {
    setTimeout(() => {
      useOverlay('', false, 0);
    }, 0);
  };
  return <div>useTooltip</div>;
}
