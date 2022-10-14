import React from 'react';
import CheckCircleFill from '../../assets/icons/check-circle-fill.svg';
import ExclamationDiamondFill from '../../assets/icons/exclamation-diamond-fill.svg';
import ChatSquareDotsFill from '../../assets/icons/chat-square-dots-fill.svg';
import PencilSquare from '../../assets/icons/pencil-square.svg';

export default function useAdvancedAlert(type, text, sub) {
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
        <div class="flex-column">
        
        <span class="span-text" style="font-size: 0.9rem">
            ${text}
        </span>
        ${
          sub
            ? `<span class="span-text span-text-alt">
        ${sub}
    </span>`
            : ``
        }
        </div>
    </div>
    `;
  obj.innerHTML = words;
  return;
}
