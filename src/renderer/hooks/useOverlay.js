import React from 'react';

export default function useOverlay(text, position, status) {
  const obj = position
    ? document.getElementById(position)
    : document.getElementById('otheroverlay');
  if (status) {
    obj.innerHTML += text;
  } else {
    obj.innerHTML = '';
  }
  return;
}
