import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';

const EditGuestsModal = ({
  editGuestModal,
  setEditGuestModal,
  name,
  title,
  desc,
  setTitle,
  setDesc,
  setName,
  saveGuest,
  saveModalFunction,
  currentIndex,
}) => {
  return (
    <>
      {editGuestModal && (
        <div
          className="app-modal app-modal-alt fade-in in-app-modal"
          style={{ zIndex: 10 }}
          onClick={() => {
            saveModalFunction();
          }}
        >
          <div
            className="app-modal-content fade-left-in"
            style={{ padding: 0, borderRadius: 7 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="container"
              style={{
                // height: 'unset',
                flexShrink: 0,
                overflow: 'hidden',
                padding: 25,
              }}
            >
              <div className="container-content fade-left-in gap-15 flex-column">
                <h1>Edit Guest Data</h1>
                <div className="flex-column gap-15 flex-align-end">
                  <input
                    type="text"
                    placeholder="Name..."
                    className="input"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                  <input
                    type="text"
                    placeholder="Title..."
                    className="input"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                  />
                  <textarea
                    type="text"
                    placeholder="Purpose..."
                    className="input"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    value={desc}
                  />
                  <div
                    className="flex-inline flex-justify-between"
                    style={{ width: '100%' }}
                  >
                    <button
                      className="button-grey"
                      onClick={() => {
                        saveModalFunction();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="button-confirm button-confirm-alt"
                      onClick={() => {
                        saveGuest(currentIndex);
                      }}
                    >
                      Save Data
                      <FaSave size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditGuestsModal;
