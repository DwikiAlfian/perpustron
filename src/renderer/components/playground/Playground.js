import React, { useState } from 'react';
import useTooltip from 'renderer/hooks/useTooltip';
import SelectInput from '../custom/SelectInput';

export default function Playground() {
  const [category, setCategory] = useState();

  return (
    <>
      <div className="container flex-column gap-20">
        <div className="flex-column gap-5">
          <h3>About Playground</h3>
          <span className="span-text">
            Playground is just a place for the developer to test some "under
            development" feature before it is applied to the main function. Feel
            free to check on what's happening
          </span>
        </div>
        {/* CUSTOM SELECT-OPTION */}
        <div className="flex-column gap-5">
          <span className="span-text">CUSTOM SELECT INPUT</span>
          <div>
            <SelectInput
              value={category}
              inputHandler={setCategory}
              options={[
                {
                  value: '1',
                  display: 'Fantasy',
                },
                {
                  value: '2',
                  display: 'Fable',
                },
                {
                  value: '3',
                  display: 'Novel',
                },
              ]}
              selectedOption="1"
            />
          </div>
        </div>
        {/* TOOLTIP */}
        <div className="flex-column gap-5">
          <span className="span-text">TOOLTIP TEST</span>
          <div className="flex-inline gap-5">
            <button
              className="button-confirm"
              onMouseEnter={(e) => {
                useTooltip(e, 'Tooltip executed perfectly');
                // console.log(e.currentTarget.);
              }}
            >
              Hover to see
            </button>
            <button
              className="button-confirm"
              onMouseEnter={(e) => {
                useTooltip(
                  e,
                  'A very long Tooltip has been executed perfectly and surely nothing is goes wrong right??? Nothing is goes wrong right???'
                );
              }}
            >
              TEST
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
