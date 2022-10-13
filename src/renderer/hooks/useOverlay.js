import React from 'react';

export default function useOverlay(text, status, delay) {
  const obj = document.getElementById('overlay');
  if (status) {
    if (delay > 0) {
      setTimeout(() => {
        obj.innerHTML = text;
      }, delay);
    } else {
      obj.innerHTML = text;
    }
  } else {
    obj.innerHTML = '';
  }
  return console.log('Overlay function used');
}
