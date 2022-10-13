import React from 'react';
import CheckCircleFill from '../../assets/icons/check-circle-fill.svg';
import ExclamationDiamondFill from '../../assets/icons/exclamation-diamond-fill.svg';
import ChatSquareDotsFill from '../../assets/icons/chat-square-dots-fill.svg';
import PencilSquare from '../../assets/icons/pencil-square.svg';

export default function useAdvancedAlert(type, text) {
  const obj = document.getElementById('advancedAlert');
  const words = `
    <div class="advanced-alert alert-${
      type === 'primary'
        ? `primary`
        : type === 'success'
        ? `success`
        : type === 'danger'
        ? `danger`
        : ''
    }">
        ${type === 'primary' ? `<img src=${CheckCircleFill} />` : ''}
        ${type === 'success' ? `<img src=${ChatSquareDotsFill} />` : ''}
        ${type === 'danger' ? `<img src=${ExclamationDiamondFill} />` : ''}
        <span class="span-text">
            ${text}
        </span>
    </div>
    `;
  obj.innerHTML = words;
  return;
}
