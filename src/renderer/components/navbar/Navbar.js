import React, { useState, useEffect } from 'react';
import {
  BsX,
  BsFillCheckCircleFill,
  BsExclamationDiamondFill,
  BsPencilSquare,
} from 'react-icons/bs';
import { BiWindow, BiWindows } from 'react-icons/bi';
import { HiOutlineMinusSm, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import useLocalStorage from 'renderer/hooks/useLocalStorage';

export default function Navbar() {
  const [isMaximize, setIsMaximize] = useState(false);

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

  // Maximize Window Function
  const maximizeWindow = () => {
    setIsMaximize((prevState) => !prevState);
  };
  useEffect(() => {
    if (isMaximize) {
      ipcRenderer?.invoke('maximize-event');
    } else {
      ipcRenderer?.invoke('unmaximize-event');
    }
  }, [isMaximize]);

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
              style={{ textAlign: 'center', paddingTop: 25 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h4>Are you sure to close the app?</h4>
              <span className="span-text">Unsaved changes will be lost</span>
              <div
                className="flex-inline flex-justify-between gap-5"
                style={{ marginTop: 15 }}
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
      <CloseModalConfirmation />
      <div className="app-navbar">
        <div>{/* <h4 style={{ marginLeft: 7 }}>.perpustakaan</h4> */}</div>
        <div className="flex-inline">
          <div className="icon icon-status icon-status-success">
            <BsPencilSquare size={16} />
            <span id="successtext" className="span-text">
              Success
            </span>
          </div>
          <div className="icon icon-status icon-status-primary">
            <BsFillCheckCircleFill size={16} />
            <span id="primarytext" className="span-text">
              Primary
            </span>
          </div>
          <div className="icon icon-status icon-status-danger">
            <BsExclamationDiamondFill size={16} />
            <span id="dangertext" className="span-text">
              Danger
            </span>
          </div>
          <div
            className="icon icon-theme"
            onClick={() => {
              changeTheme();
            }}
          >
            {theme === 'dark' ? (
              <>
                <HiOutlineSun size={14} />
                <span>Light</span>
              </>
            ) : (
              <>
                <HiOutlineMoon size={14} />
                <span>Dark</span>
              </>
            )}
          </div>
          <div
            className="icon"
            onClick={() => {
              minimizeWindow();
            }}
          >
            <HiOutlineMinusSm size={16} />
          </div>
          <div
            className="icon"
            onClick={() => {
              maximizeWindow();
            }}
          >
            {isMaximize ? <BiWindows size={12} /> : <BiWindow size={12} />}
          </div>
          <div
            className="icon icon-close"
            onClick={() => {
              closeFunction();
            }}
          >
            <BsX size={20} />
          </div>
        </div>
      </div>
    </>
  );
}
