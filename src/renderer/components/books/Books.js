import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiBook2Fill, RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import useStatus from 'renderer/hooks/useStatus';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';

export default function Books({ books, setBooks }) {
  const [currentId, setCurrentId] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState();
  const [distributor, setDistributor] = useState();
  const [year, setYear] = useState();
  const [stock, setStock] = useState();
  const [rack, setRack] = useState();

  const [bookModal, setBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);

  const modalFunction = () => {
    setAuthor('');
    setTitle('');
    setCategory('');
    setDistributor('');
    setYear('');
    setStock('');
    setRack('');
    if (!bookModal) {
      setBookModal((prevState) => !prevState);
    } else {
      document
        ?.getElementsByClassName('in-app-modal')[0]
        ?.classList.add('fade-out');
      setTimeout(() => {
        setBookModal((prevState) => !prevState);
      }, 225);
    }
  };

  const setCurrentData = ({
    id,
    index,
    author,
    title,
    category,
    distributor,
    year,
    stock,
    rack,
  }) => {
    setCurrentId(id);
    setCurrentIndex(index);
    setAuthor(author);
    setTitle(title);
    setCategory(category);
    setDistributor(distributor);
    setYear(year);
    setStock(stock);
    setRack(rack);
    saveModalFunction();
  };

  const saveModalFunction = () => {
    if (!editBookModal) {
      setEditBookModal((prevState) => !prevState);
    } else {
      document
        ?.getElementsByClassName('in-app-modal')[0]
        ?.classList.add('fade-out');
      setTimeout(() => {
        setCurrentId('');
        setAuthor('');
        setTitle('');
        setCategory('');
        setDistributor('');
        setYear('');
        setStock('');
        setRack('');
        setEditBookModal((prevState) => !prevState);
      }, 225);
    }
  };

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
              category: category,
              distributor: distributor,
              year: year,
              stock: stock,
              rack: rack,
            },
            ...prevState,
          ];
        } else {
          return [
            {
              id: newId,
              title: title,
              author: author,
              category: category,
              distributor: distributor,
              year: year,
              stock: stock,
              rack: rack,
            },
          ];
        }
      });
      useStatus('primary', 'Book Added');
      modalFunction();
    }
  };

  const deleteBook = (num) => {
    const array = [...books];
    array?.splice(num, 1);
    setBooks(array);
    useStatus('danger', 'Successfully Deleted');
  };

  const saveBook = (num) => {
    const array = [...books];
    array?.splice(num, 1, {
      id: currentId,
      title: title,
      author: author,
      category: category,
      distributor: distributor,
      year: year,
      stock: stock,
      rack: rack,
    });
    // Custom Function to Call Status
    useStatus('success', 'Updated Succesfully');
    setBooks(array);
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
      <AddBookModal
        bookModal={bookModal}
        setBookModal={setBookModal}
        title={title}
        author={author}
        category={category}
        distributor={distributor}
        year={year}
        stock={stock}
        rack={rack}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setCategory={setCategory}
        setDistributor={setDistributor}
        setYear={setYear}
        setStock={setStock}
        setRack={setRack}
        addNewBook={addNewBook}
        modalFunction={modalFunction}
      />
      <EditBookModal
        currentIndex={currentIndex}
        editBookModal={editBookModal}
        setEditBookModal={setEditBookModal}
        title={title}
        author={author}
        category={category}
        distributor={distributor}
        year={year}
        stock={stock}
        rack={rack}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setCategory={setCategory}
        setDistributor={setDistributor}
        setYear={setYear}
        setStock={setStock}
        setRack={setRack}
        saveBook={saveBook}
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
            <RiBook2Fill size={20} />
            Add Book
          </button>
        </div>
        <div className="container">
          <div className="container-content fade-fly-in">
            <div className="book-list">
              {books &&
                books?.map((book, index) => {
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
                        <h4>{book?.title}</h4>
                        <span className="span-text">{book?.author}</span>
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
                              <span className="span-text">
                                Year : {book?.year}
                              </span>
                              <span className="span-text">
                                Stock : {book?.stock}
                              </span>
                              <span className="span-text">
                                Rack : {book?.rack}
                              </span>
                            </div>
                            <button
                              className="button-confirm-trans"
                              onClick={() => {
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
                            deleteBook(index);
                            e.stopPropagation();
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
