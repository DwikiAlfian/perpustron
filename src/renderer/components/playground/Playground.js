import React, { useState } from 'react';
import useAdvancedAlert from 'renderer/hooks/useAdvancedAlert';
import useMouseOver from 'renderer/hooks/useMouseOver';
import useTooltip from 'renderer/hooks/useTooltip';
import SelectInput from '../custom/SelectInput';

export default function Playground() {
  const [category, setCategory] = useState();

  const [primaryAlert, setPrimaryAlert] = useState();
  const [successAlert, setSuccessAlert] = useState();
  const [successSub, setSuccessSub] = useState();
  const [dangerAlert, setDangerAlert] = useState();

  const [tooltip, setTooltip] = useState();

  return (
    <>
      <div id="testingGround" className="container flex-column gap-20">
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
            <input
              className="input"
              placeholder="Success Sub Message..."
              onChange={(e) => setSuccessSub(e.target.value)}
              value={successSub}
            />
            <button
              className="button-success"
              onClick={() =>
                useAdvancedAlert('success', successAlert, successSub)
              }
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
        <div className="flex-column gap-10">
          <span className="span-text">MOUSE TOOLTIP (HOVER TO TRY)</span>
          <input
            className="input"
            placeholder="Tooltip message..."
            onChange={(e) => setTooltip(e.target.value)}
          />
          <span className="span-text">DEFAULT</span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'right',
                true
              )
            }
            onMouseMove={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'right',
                true
              )
            }
            style={{ height: 150 }}
          >
            <div id="mouseTooltip"></div>
          </div>
          <span className="span-text">CENTER</span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'center',
                true
              )
            }
            onMouseMove={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'center',
                true
              )
            }
            style={{ height: 150 }}
          >
            <div id="mouseTooltip"></div>
          </div>
          <span className="span-text">REVERSED</span>
          <div
            id="mouseOverlay"
            className="container"
            onMouseOver={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'left',
                true
              )
            }
            onMouseMove={(e) =>
              useMouseOver(
                e,
                tooltip ? tooltip : 'Insert tooltip message',
                'left',
                true
              )
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
