import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { BsFillPersonPlusFill, BsSearch } from 'react-icons/bs';
import useStatus from 'renderer/hooks/useStatus';
import AddGuestsModal from './AddGuestsModal';
import EditGuestsModal from './EditGuestsModal';
import DataLists from './DataLists';
import useOverlay from 'renderer/hooks/useOverlay';
import useTooltip from 'renderer/hooks/useTooltip';

export default function Guests({ guests, setGuests }) {
  // Input & State
  const [currentId, setCurrentId] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [search, setSearch] = useState();
  const [savedSearch, setSavedSearch] = useState();

  // Modals State
  const [guestModal, setGuestModal] = useState(false);
  const [editGuestModal, setEditGuestModal] = useState(false);

  // Show / Hide Add Modal
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

  // Set current data for editing
  const setCurrentData = ({ id, index, name, title, desc }) => {
    setCurrentId(id);
    setCurrentIndex(index);
    setName(name);
    setTitle(title);
    setDesc(desc);
    saveModalFunction();
  };

  // Set guests new ID when adding
  const getLatestId = () => {
    let latest = guests ? guests[0]?.id : 0;
    return latest;
  };

  // Show / Hide Edit Modal
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

  // ==============
  // ADD New Guests
  // ==============
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

  // ==================
  // DELETE Guests Data
  // ==================
  const deleteGuest = (num) => {
    const array = [...guests];
    array?.splice(num, 1);
    setGuests(array);
    useStatus('danger', 'Successfully Deleted');
  };

  // ================
  // EDIT Guests Data
  // ================
  const saveGuest = (num) => {
    const array = [...guests];
    array?.splice(num, 1, {
      id: currentId,
      name: name,
      title: title,
      desc: desc,
    });
    // Custom Function to Call Status
    useStatus('success', 'Guest Updated');
    setGuests(array);
    setCurrentId('');
    setCurrentIndex('');
    saveModalFunction();
  };

  // ================
  // Open List Detail
  // ================
  const openDrawer = (e) => {
    if (e.currentTarget.classList.contains('book-list-open')) {
      e.currentTarget.classList.remove('book-list-open');
    } else {
      e.currentTarget.classList.add('book-list-open');
    }
  };

  useEffect(() => {
    try {
      const array = guests && guests.length > 0 && [...guests];
      let result = array?.filter((item) =>
        item?.name?.toLowerCase().includes(search?.toLowerCase())
      );
      setSavedSearch(result);
    } catch (e) {}
  }, [search]);

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
        <div className="flex-inline flex-justify-between gap-15 fade-fly-in">
          <div className="input-alt">
            <BsSearch size={12} />
            <input
              className="input input-alt"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
            />
          </div>

          <button
            className={`button-grey-alt ${search ? 'button-hide' : ''}`}
            onClick={() => {
              modalFunction();
            }}
            onMouseEnter={(e) => {
              useTooltip(e, 'Add new guests');
            }}
          >
            <BsFillPersonPlusFill size={20} />
            Add Guest
          </button>
        </div>
        <div className="container">
          <div className="container-content fade-fly-in">
            <div className="book-list">
              {!search && guests ? (
                <DataLists
                  datas={guests}
                  deleteGuest={deleteGuest}
                  setCurrentData={setCurrentData}
                  openDrawer={openDrawer}
                />
              ) : search && savedSearch ? (
                <DataLists
                  datas={savedSearch}
                  deleteGuest={deleteGuest}
                  setCurrentData={setCurrentData}
                  openDrawer={openDrawer}
                />
              ) : (
                <h4>No Data to be shown</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
