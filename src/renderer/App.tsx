// React package
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import { GoBeaker, GoBook, GoPerson } from 'react-icons/go';

// Import Components
import Navbar from './components/navbar/Navbar';
import Books from './components/books/Books';
import useLocalStorage from './hooks/useLocalStorage';
import Guests from './components/guests/Guests';
import Playground from './components/playground/Playground';

// CSS Import
import './App.css';

const Container = () => {
  // Data State
  const [books, setBooks] = useState();
  const [guests, setGuests] = useState();

  // Local Storage Data State
  const [savedBooks, setSavedBooks] = useLocalStorage('books');
  const [savedGuests, setSavedGuests] = useLocalStorage('guests');

  // Saving data from Local Storage to State in first laucnh of App
  useEffect(() => {
    setBooks(savedBooks);
    setGuests(savedGuests);
  }, []);

  // Store Books data to Local Storage whenever there is an update
  useEffect(() => {
    setSavedBooks(books);
  }, [books]);

  // Store Guests data to Local Storage whenever there is an update
  useEffect(() => {
    setSavedGuests(guests);
  }, [guests]);

  return (
    <>
      <div className="app-container">
        <Tabs>
          <TabList>
            <h4 style={{ margin: '5px 0 25px 0' }}>Library</h4>
            {/* <span className="span-text span-text-bold">LABEL</span> */}
            <Tab>
              <div className="flex-inline gap-10">
                <span className="span-pill">
                  <GoPerson size={10} />
                </span>
                Guests
              </div>
            </Tab>
            <Tab>
              <div className="flex-inline gap-10">
                <span className="span-pill">
                  <GoBook size={10} />
                </span>
                Books
              </div>
            </Tab>
            <Tab>
              <div className="flex-inline gap-10">
                <span className="span-pill">
                  <GoBeaker size={10} />
                </span>
                Playground
              </div>
            </Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanel>
            <Guests guests={guests} setGuests={setGuests} />
          </TabPanel>
          <TabPanel>
            <Books books={books} setBooks={setBooks} />
          </TabPanel>
          <TabPanel>
            <div className="fade-fly-in" style={{ width: '100%' }}>
              <Playground />
            </div>
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
      <div id="overlay">
        <div id="tooltip"></div>
        <div id="mouseTooltip"></div>
        <div id="advancedAlert"></div>
        <div id="otheroverlay"></div>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </Router>
  );
}
