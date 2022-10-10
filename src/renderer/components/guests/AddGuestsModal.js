import React, { useEffect, useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

const AddGuestsModal = ({
  guestModal,
  setGuestModal,
  name,
  title,
  desc,
  setTitle,
  setDesc,
  setName,
  addNewGuest,
  modalFunction,
}) => {
  return (
    <>
      {guestModal && (
        <div
          className="app-modal fade-in in-app-modal"
          style={{ zIndex: 10 }}
          onClick={() => {
            modalFunction();
          }}
        >
          <div
            className="app-modal-content"
            style={{ padding: 0, borderRadius: 7 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="container"
              style={{
                height: 'unset',
                flexShrink: 0,
                overflow: 'hidden',
                padding: 25,
              }}
            >
              <div className="container-content fade-fly-in gap-15 flex-column">
                <h3>Add New Guest</h3>
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
                        modalFunction();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="button-confirm"
                      onClick={() => {
                        addNewGuest();
                      }}
                    >
                      Add Guest
                      <RiAddCircleLine size={20} />
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

export default AddGuestsModal;
