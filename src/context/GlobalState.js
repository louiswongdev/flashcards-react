import React, { createContext, useState, useEffect } from 'react';
import { fetchFlashcards, fetchCategories } from '../api';

// Initial State
// const initialState = {
//   flashcards: [],
//   categories: [],
// };

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      setFlashcards(await fetchFlashcards());
      setLoading(false);
    };
    fetchAPI();
  }, [setFlashcards, setLoading]);

  useEffect(() => {
    const fetchCatAPI = async () => {
      setCategories(await fetchCategories());
    };

    fetchCatAPI();
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleCountChange = (count) => {
    setCount(count);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchAPI = async () => {
      setFlashcards(await fetchFlashcards(category, count));
      setLoading(false);
    };
    fetchAPI();
  };

  return (
    <GlobalContext.Provider
      value={{
        flashcards,
        categories,
        loading,
        handleCategoryChange,
        handleCountChange,
        handleSubmit,
        setCategory,
        setCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
