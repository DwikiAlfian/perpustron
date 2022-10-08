import React, { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

export default function Books({ books, setBooks }) {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();

  const getLatestId = () => {
    let latest = books ? books[0]?.id : 0;
    return latest;
  };

  const addNewBook = () => {
    let newId;

    if (getLatestId() > 0) {
      newId = getLatestId() + 1;
    } else {
      newId = 1;
    }

    if (title && author) {
      setBooks((prevState) => {
        if (prevState) {
          return [
            {
              id: newId,
              title: title,
              author: author,
            },
            ...prevState,
          ];
        } else {
          return [
            {
              id: newId,
              title: title,
              author: author,
            },
          ];
        }
      });
    }
  };

  const deleteBook = (num) => {
    const array = [...books];
    array?.splice(num, 1);
    setBooks(array);
  };

  return (
    <>
      <div className="flex-column gap-20" style={{ width: '100%' }}>
        <div className="flex-inline flex-justify-end gap-15">
          <button className="button-grey-alt">Add Book</button>
        </div>
        {/* <div
          className="container"
          style={{ height: 'unset', flexShrink: 0, overflow: 'hidden' }}
        >
          <div className="container-content fade-fly-in gap-15 flex-column">
            <div className="flex-inline gap-15">
              <input
                type="text"
                placeholder="Title..."
                className="input"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Author..."
                className="input"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <div className="flex-inline gap-15">
              <input
                type="text"
                placeholder="Category..."
                className="input"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Distributor..."
                className="input"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>
            <button
              className="button-confirm"
              onClick={() => {
                addNewBook();
              }}
            >
              Add Book
            </button>
          </div>
        </div> */}
        <div className="container">
          <div className="container-content fade-fly-in">
            <div className="book-list">
              {books &&
                books?.map((book, index) => {
                  return (
                    <>
                      <div className="book-list-content">
                        <h4>{book?.title}</h4>
                        <span className="span-text">{book?.author}</span>
                        <button
                          className="button-confirm-trans"
                          onClick={() => {
                            deleteBook(index);
                          }}
                        >
                          <HiOutlineTrash size="14" />
                        </button>
                      </div>
                    </>
                  );
                })}
              {!books ||
                (books.length === 0 && (
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
                      <h4>No Books is currently stored!</h4>
                      <span className="span-text">Try add new book now</span>
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
