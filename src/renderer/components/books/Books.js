import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiBook2Fill, RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import useStatus from 'renderer/hooks/useStatus';
import AddBookModal from './AddBookModal';
import DataLists from './DataLists';
import EditBookModal from './EditBookModal';
import useTooltip from 'renderer/hooks/useTooltip';

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
  const [search, setSearch] = useState();
  const [savedSearch, setSavedSearch] = useState();

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

  useEffect(() => {
    try {
      const array = books && books.length > 0 && [...books];
      let result = array?.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.author?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.category?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.distributor?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.year?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.stock?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.rack?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setSavedSearch(result);
    } catch (e) {}
  }, [search]);

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
      <div className="flex-column gap-15" style={{ width: '100%' }}>
        <div className="flex-inline flex-justify-between panel-title">
          <div className="flex-column gap-5">
            <h2 className="fade-fly-in">Books Lists</h2>
            <span
              className="span-text fade-fly-in"
              style={{ fontSize: '0.7rem' }}
            >
              TOTAL BOOKS : {books?.length}
            </span>
          </div>
          <button
            className={`fade-fly-in button-primary ${
              search ? 'button-hide' : ''
            }`}
            onClick={() => {
              modalFunction();
            }}
            onMouseEnter={(e) => {
              useTooltip(e, 'Add new book to lists');
            }}
          >
            <RiBook2Fill size={20} />
            Add Book
          </button>
        </div>
        <div className="flex-inline flex-justify-between gap-15 fade-fly-in">
          <div className="input-alt">
            <BsSearch size={12} />
            <input
              className="input input-alt"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, etc..."
            />
          </div>
        </div>
        <div className="container">
          <div className="container-content">
            <div className="book-list book-list-alt">
              {!search && books ? (
                <DataLists
                  books={books}
                  deleteBook={deleteBook}
                  openDrawer={openDrawer}
                  setCurrentData={setCurrentData}
                />
              ) : search && savedSearch ? (
                <DataLists
                  books={savedSearch}
                  deleteBook={deleteBook}
                  setCurrentData={setCurrentData}
                  openDrawer={openDrawer}
                />
              ) : (
                <h4></h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
