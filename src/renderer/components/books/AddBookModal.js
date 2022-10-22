import React, { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { RiBook2Fill, RiAddCircleLine } from 'react-icons/ri';

const AddBookModal = ({
  bookModal,
  setBookModal,
  title,
  author,
  distributor,
  category,
  year,
  stock,
  rack,
  setTitle,
  setAuthor,
  setDistributor,
  setCategory,
  setYear,
  setStock,
  setRack,
  addNewBook,
  modalFunction,
}) => {
  return (
    <>
      {bookModal && (
        <div
          className="app-modal app-modal-alt fade-in in-app-modal"
          style={{ zIndex: 10 }}
          onClick={() => {
            modalFunction();
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
                flexShrink: 0,
                overflow: 'hidden',
                padding: 25,
              }}
            >
              <div className="container-content fade-left-in gap-15 flex-column">
                <h1>Add New Book to lists</h1>
                <div className="flex-column gap-15 flex-align-end">
                  <input
                    type="text"
                    placeholder="Title..."
                    className="input"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                  />
                  <input
                    type="text"
                    placeholder="Author..."
                    className="input"
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    value={author}
                  />
                  <input
                    type="text"
                    placeholder="Category..."
                    className="input"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                  />
                  <div className="flex-inline gap-15">
                    <input
                      type="text"
                      placeholder="Distributor..."
                      className="input"
                      onChange={(e) => {
                        setDistributor(e.target.value);
                      }}
                      value={distributor}
                    />
                    <input
                      type="text"
                      placeholder="Year..."
                      className="input"
                      style={{ width: '50%' }}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                      value={year}
                    />
                    <input
                      type="text"
                      placeholder="Stock..."
                      className="input"
                      style={{ width: '50%' }}
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                      value={stock}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Rack Number..."
                    className="input"
                    onChange={(e) => {
                      setRack(e.target.value);
                    }}
                    value={rack}
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
                        addNewBook();
                      }}
                    >
                      Add Book
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

export default AddBookModal;
