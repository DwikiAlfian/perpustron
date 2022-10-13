import React from 'react';

export default function SelectInput({
  options,
  selectedOption,
  inputHandler,
  value,
}) {
  const handleClick = (e, text) => {
    inputHandler(text);
    e.currentTarget.parentElement.parentElement.blur();
  };

  return (
    <>
      <div className="select-input" tabIndex={0}>
        <input className="input" placeholder="Text..." value={value} />
        <div className="select-list">
          {options?.map((option) => {
            return (
              <span onClick={(e) => handleClick(e, option?.display)}>
                {option?.display}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
