// React package
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';

// Import Components
import Navbar from './components/navbar/Navbar';
import Books from './components/books/Books';
import useLocalStorage from './hooks/useLocalStorage';
import Guests from './components/guests/Guests';

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
            <Tab>Guests</Tab>
            <Tab>Books</Tab>
            <Tab>Category</Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanel>
            <Guests guests={guests} setGuests={setGuests} />
          </TabPanel>
          <TabPanel>
            <Books books={books} setBooks={setBooks} />
          </TabPanel>
          <TabPanel>
            <div className="fade-fly-in">
              <h3>Still in Development</h3>
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
      <div id="overlay"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container />} />
      </Routes>
    </Router>
  );
}
