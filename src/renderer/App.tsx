import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Books from './components/books/Books';
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const Container = () => {
  const [books, setBooks] = useState();
  // [
  // {
  //   id: 2,
  //   title: 'Red Dead Redemption 2',
  //   author: 'Rockstar Games',
  // },
  // {
  //   id: 1,
  //   title: 'Grand Theft Auto V',
  //   author: 'Rockstar Games',
  // },
  // ]

  const [savedBooks, setSavedBooks] = useLocalStorage('books');

  useEffect(() => {
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    setSavedBooks(books);
  }, [books]);

  const closeWindow = () => {
    const ipcRenderer = window.require('electron')?.ipcRenderer;
    ipcRenderer?.invoke('minimize-event');
  };

  return (
    <>
      <div className="app-container">
        <Tabs>
          <TabList>
            <Tab>Books</Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanel>
            <Books books={books} setBooks={setBooks} />
          </TabPanel>
          <TabPanel>
            <div>
              <div className="fade-fly-in">
                <h1>Copyright 2022</h1>
                <span className="span-text">Dwiki Alfian @xxevnxxe</span>
                <br></br>
                <span className="span-text">
                  Crafted using React and Electron (Electron Boilerplate)
                </span>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </Router>
  );
}
