import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiBook2Fill, RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import useStatus from 'renderer/hooks/useStatus';
import AddBookModal from './AddBookModal';
import DataLists from './DataLists';
import EditBookModal from './EditBookModal';

export default function DataLists({
  books,
  openDrawer,
  deleteBook,
  setCurrentData,
}) {
  return (
    <>
      {books &&
        books?.map((book, index) => {
          return (
            <>
              <div
                className="book-list-content fade-fly-in"
                onClick={(e) => {
                  openDrawer(e);
                }}
              >
                <HiChevronDown className="book-chevron-icon" size={20} />
                <h4>{book?.title}</h4>
                <span className="span-text" style={{ marginTop: 10 }}>
                  {book?.author}
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
                        Category : {book?.category}
                      </span>
                      <span className="span-text">
                        Distributor : {book?.distributor}
                      </span>
                      <span className="span-text">Year : {book?.year}</span>
                      <span className="span-text">Stock : {book?.stock}</span>
                      <span className="span-text">Rack : {book?.rack}</span>
                    </div>
                  </div>
                </div>
                <div className="book-buttons">
                  <button
                    className="button-confirm-trans"
                    onClick={(e) => {
                      setCurrentData({
                        index: index,
                        id: book?.id,
                        title: book?.title,
                        author: book?.author,
                        category: book?.category,
                        distributor: book?.distributor,
                        year: book?.year,
                        stock: book?.stock,
                        rack: book?.rack,
                      });
                      e.stopPropagation();
                    }}
                  >
                    <RiEdit2Fill size="14" />
                    Edit Data
                  </button>
                  <button
                    className="button-danger-trans"
                    onClick={(e) => {
                      deleteBook(index);
                      e.stopPropagation();
                    }}
                  >
                    <HiOutlineTrash size="14" />
                  </button>
                </div>
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
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <h4 className="fade-fly-in">No Books is currently stored!</h4>
              <span className="span-text fade-fly-in">
                Try add new book now
              </span>
            </div>
          </>
        ))}
    </>
  );
}
