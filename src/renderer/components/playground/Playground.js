import React, { useState } from 'react';
import useAdvancedAlert from 'renderer/hooks/useAdvancedAlert';
import useMouseOver from 'renderer/hooks/useMouseOver';
import useTooltip from 'renderer/hooks/useTooltip';
import SelectInput from '../custom/SelectInput';

export default function Playground() {
  const [category, setCategory] = useState();

  const [primaryAlert, setPrimaryAlert] = useState();
  const [successAlert, setSuccessAlert] = useState();
  const [dangerAlert, setDangerAlert] = useState();

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
          <span className="span-text">TOOLTIP TEST // still a buggy mess</span>
          <div className="flex-inline gap-5">
            <button
              className="button-confirm"
              onMouseEnter={(e) => {
                useTooltip(e, 'Tooltip executed perfectly');
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
        {/* ADVANCED ALERT */}
        <div className="flex-column gap-5">
          <span className="span-text">ADVANCED ALERT</span>
          <div className="flex-inline gap-10">
            <input
              className="input"
              placeholder="Primary Alert..."
              onChange={(e) => setPrimaryAlert(e.target.value)}
              value={primaryAlert}
            />
            <button
              className="button-primary"
              onClick={() => useAdvancedAlert('primary', primaryAlert)}
            >
              Show Alert
            </button>
          </div>
          <div className="flex-inline gap-10">
            <input
              className="input"
              placeholder="Success Alert..."
              onChange={(e) => setSuccessAlert(e.target.value)}
              value={successAlert}
            />
            <button
              className="button-success"
              onClick={() => useAdvancedAlert('success', successAlert)}
            >
              Show Alert
            </button>
          </div>
          <div className="flex-inline gap-10">
            <input
              className="input"
              placeholder="Danger Alert..."
              onChange={(e) => setDangerAlert(e.target.value)}
              value={dangerAlert}
            />
            <button
              className="button-danger"
              onClick={() => useAdvancedAlert('danger', dangerAlert)}
            >
              Show Alert
            </button>
          </div>
        </div>
        {/* MOUSE TOOLTIP (HOVER TO TRY) */}
        <div className="flex-column gap-5">
          <span className="span-text">
            MOUSE TOOLTIP DEFAULT (HOVER TO TRY)
          </span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'right', true)
            }
            onMouseMove={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'right', true)
            }
            style={{ height: 150 }}
          >
            <div id="mouseTooltip"></div>
          </div>
          <span className="span-text">MOUSE TOOLTIP CENTER (HOVER TO TRY)</span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'center', true)
            }
            onMouseMove={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'center', true)
            }
            style={{ height: 150 }}
          >
            <div id="mouseTooltip"></div>
          </div>
          <span className="span-text">
            MOUSE TOOLTIP REVERSED (HOVER TO TRY)
          </span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'left', true)
            }
            onMouseMove={(e) =>
              useMouseOver(e, 'Insert tooltip message', 'left', true)
            }
            style={{ height: 150 }}
          >
            <div id="mouseTooltip"></div>
          </div>
        </div>
      </div>
    </>
  );
}
