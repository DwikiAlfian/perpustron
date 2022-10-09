import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import useStatus from 'renderer/hooks/useStatus';
import AddGuestsModal from './AddGuestsModal';
import EditGuestsModal from './EditGuestsModal';

export default function Guests({ guests, setGuests }) {
  const [currentId, setCurrentId] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const [guestModal, setGuestModal] = useState(false);
  const [editGuestModal, setEditGuestModal] = useState(false);

  const modalFunction = () => {
    setName('');
    setTitle('');
    setDesc('');
    if (!guestModal) {
      setGuestModal((prevState) => !prevState);
    } else {
      document
        ?.getElementsByClassName('in-app-modal')[0]
        ?.classList.add('fade-out');
      setTimeout(() => {
        setGuestModal((prevState) => !prevState);
      }, 225);
    }
  };

  const setCurrentData = ({ id, index, name, title, desc }) => {
    setCurrentId(id);
    setCurrentIndex(index);
    setName(name);
    setTitle(title);
    setDesc(desc);
    saveModalFunction();
  };

  const saveModalFunction = () => {
    if (!editGuestModal) {
      setEditGuestModal((prevState) => !prevState);
    } else {
      document
        ?.getElementsByClassName('in-app-modal')[0]
        ?.classList.add('fade-out');
      setTimeout(() => {
        setCurrentId('');
        setName('');
        setTitle('');
        setDesc('');
        setEditGuestModal((prevState) => !prevState);
      }, 225);
    }
  };

  const getLatestId = () => {
    let latest = guests ? guests[0]?.id : 0;
    return latest;
  };

  const addNewGuest = () => {
    let newId;

    if (getLatestId() > 0) {
      newId = getLatestId() + 1;
    } else {
      newId = 1;
    }

    if (name) {
      setGuests((prevState) => {
        if (prevState) {
          return [
            {
              id: newId,
              name: name,
              title: title,
              desc: desc,
            },
            ...prevState,
          ];
        } else {
          return [
            {
              id: newId,
              name: name,
              title: title,
              desc: desc,
            },
          ];
        }
      });
      useStatus('primary', 'Guest Added');
      modalFunction();
    }
  };

  const deleteGuest = (num) => {
    const array = [...guests];
    array?.splice(num, 1);
    setGuests(array);
    useStatus('danger', 'Successfully Deleted');
  };

  const saveGuest = (num) => {
    const array = [...guests];
    array?.splice(num, 1, {
      id: currentId,
      name: name,
      title: title,
      desc: desc,
    });
    // Custom Function to Call Status
    useStatus('success', 'Updated Succesfully');
    setGuests(array);
    setCurrentId('');
    setCurrentIndex('');
    saveModalFunction();
  };

  const openDrawer = (e) => {
    if (e.currentTarget.classList.contains('book-list-open')) {
      e.currentTarget.classList.remove('book-list-open');
    } else {
      e.currentTarget.classList.add('book-list-open');
    }
  };

  return (
    <>
      <AddGuestsModal
        guestModal={guestModal}
        setGuestModal={setGuestModal}
        // ==========
        // Input Data
        name={name}
        title={title}
        desc={desc}
        setTitle={setTitle}
        setDesc={setDesc}
        setName={setName}
        // ==========
        addNewGuest={addNewGuest}
        modalFunction={modalFunction}
      />
      <EditGuestsModal
        currentIndex={currentIndex}
        editGuestModal={editGuestModal}
        setEditGuestModal={setEditGuestModal}
        // ==========
        // Input Data
        name={name}
        title={title}
        desc={desc}
        setTitle={setTitle}
        setDesc={setDesc}
        setName={setName}
        // ==========
        saveGuest={saveGuest}
        saveModalFunction={saveModalFunction}
      />
      <div className="flex-column gap-20" style={{ width: '100%' }}>
        <div className="flex-inline flex-justify-end gap-15">
          <button
            className="button-grey-alt"
            onClick={() => {
              modalFunction();
            }}
          >
            <BsFillPersonPlusFill size={20} />
            Add Guest
          </button>
        </div>
        <div className="container">
          <div className="container-content fade-fly-in">
            <div className="book-list">
              {guests &&
                guests?.map((guest, index) => {
                  return (
                    <>
                      <div
                        className="book-list-content"
                        onClick={(e) => {
                          openDrawer(e);
                        }}
                      >
                        <HiChevronDown
                          className="book-chevron-icon"
                          size={20}
                        />
                        <h4>{guest?.name}</h4>
                        <span className="span-pill" style={{ marginTop: 7 }}>
                          {guest?.title}
                        </span>
                        <div
                          className="container flex-column gap-5"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="flex-inline flex-align-start flex-justify-between">
                            <div className="flex-column gap-5">
                              <span className="span-text">
                                Purpose : {guest?.desc}
                              </span>
                            </div>
                            <button
                              className="button-confirm-trans"
                              onClick={() => {
                                setCurrentData({
                                  index: index,
                                  id: guest?.id,
                                  name: guest?.name,
                                  title: guest?.title,
                                  desc: guest?.desc,
                                });
                              }}
                            >
                              <RiEdit2Fill size="14" />
                              Edit Data
                            </button>
                          </div>
                        </div>
                        <button
                          className="button-confirm-trans"
                          onClick={(e) => {
                            deleteGuest(index);
                            e.stopPropagation();
                          }}
                        >
                          <HiOutlineTrash size="14" />
                        </button>
                      </div>
                    </>
                  );
                })}
              {!guests ||
                (guests.length === 0 && (
                  <>
                    <div
                      style={{
                        textAlign: 'center',
                        height: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <h4>No guests is written!</h4>
                      <span className="span-text">Try add list a guest</span>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
