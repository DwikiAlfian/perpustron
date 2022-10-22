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
                className="book-list-content book-list-open fade-fly-in"
                // onClick={(e) => {
                //   openDrawer(e);
                // }}
                style={{ padding: 25 }}
              >
                {/* <HiChevronDown className="book-chevron-icon" size={20} /> */}
                <div className="flex-inline flex-justify-between fw">
                  <div className="flex-column flex-align-start">
                    <h3>{book?.title}</h3>
                    <span className="span-pill" style={{ marginTop: 5 }}>
                      {book?.author}
                    </span>
                  </div>
                </div>
                <div
                  className="flex-inline flex-align-start flex-justify-between"
                  style={{ marginTop: 15 }}
                >
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
                <div className="flex-inline flex-justify-end fw">
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
              {/* <h4 className="fade-fly-in">No Books is currently stored!</h4>
              <span className="span-text fade-fly-in">
                Try add new book now
              </span> */}
            </div>
          </>
        ))}
    </>
  );
}
