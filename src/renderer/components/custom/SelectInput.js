import React from 'react';

export default function SelectInput({ options, selectedOption }) {
  return (
    <>
      <div className="select-input" tabIndex={1}>
        <input className="input" placeholder="Text..." value="" />
        <div className="select-list">
          {options?.map((option) => {
            return <span>{option?.display}</span>;
          })}
        </div>
      </div>
    </>
  );
}
