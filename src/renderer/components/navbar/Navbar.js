import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import { HiOutlineMinusSm, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import useLocalStorage from 'renderer/hooks/useLocalStorage';

export default function Navbar() {
  // Calling IPC Renderer
  const ipcRenderer = window.require('electron')?.ipcRenderer;

  // Close Window Function
  const closeWindow = () => {
    ipcRenderer?.invoke('close-event');
  };

  // Minimize Window Function
  const minimizeWindow = () => {
    ipcRenderer?.invoke('minimize-event');
  };

  // Open Close Modal
  const [closeModal, setCloseModal] = useState(false);
  const closeFunction = () => {
    if (!closeModal) {
      setCloseModal((prevState) => !prevState);
    } else {
      document
        ?.getElementsByClassName('app-modal')[0]
        ?.classList.add('fade-out');
      setTimeout(() => {
        setCloseModal((prevState) => !prevState);
      }, 225);
    }
  };

  // Change Theme
  const [savedTheme, setSavedTheme] = useLocalStorage('theme');
  const [theme, setTheme] = useState(savedTheme ? savedTheme : 'light');

  const changeTheme = () => {
    if (theme === 'dark') {
      document.body.classList.remove('dark-layout');
      setTheme('light');
      setSavedTheme('light');
    } else {
      document.body.classList.add('dark-layout');
      setTheme('dark');
      setSavedTheme('dark');
    }
  };

  const setDefaultTheme = () => {
    if (theme === 'dark') {
      document.body.classList.add('dark-layout');
    } else {
      document.body.classList.remove('dark-layout');
    }
  };

  useEffect(() => {
    setDefaultTheme();
    setTheme(savedTheme);
  }, [savedTheme]);

  const CloseModalConfirmation = () => {
    return (
      <>
        {closeModal && (
          <div
            className="app-modal fade-in"
            onClick={() => {
              closeFunction();
            }}
          >
            <div
              className="app-modal-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h4>Are you sure to close the app?</h4>
              <span className="span-text">Unsaved changes will be lost</span>
              <div
                className="flex-inline gap-5"
                style={{ marginLeft: 'auto', marginTop: 15 }}
              >
                <button
                  className="button-grey"
                  onClick={() => {
                    closeFunction();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="button-confirm"
                  onClick={() => {
                    closeWindow();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="app-navbar">
        <CloseModalConfirmation />
        <div>
          <h4 style={{ marginLeft: 7 }}>.perpustakaan</h4>
        </div>
        <div className="flex-inline gap-5">
          <div
            className="icon"
            onClick={() => {
              changeTheme();
            }}
          >
            {theme === 'dark' ? (
              <HiOutlineSun size={14} />
            ) : (
              <HiOutlineMoon size={14} />
            )}
          </div>
          <div
            className="icon"
            onClick={() => {
              minimizeWindow();
            }}
          >
            <HiOutlineMinusSm size={18} />
          </div>
          <div
            className="icon"
            onClick={() => {
              closeFunction();
            }}
          >
            <BsX size={24} />
          </div>
        </div>
      </div>
    </>
  );
}
