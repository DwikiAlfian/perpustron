import React, { useState, useEffect } from 'react';

export default function useStatus(type, text) {
  let obj = document.getElementsByClassName(`icon-status-${type}`)[0];
  const objText = document.getElementById(`${type}text`);
  objText.innerHTML = `${text}`;
  if (obj?.classList.contains('icon-start')) {
    obj?.classList.remove('icon-start');
    setTimeout(() => {
      obj?.classList.add('icon-start');
    }, 50);
  } else {
    obj?.classList.add('icon-start');
  }
  return console.log('Status Called');
}
