import React, { createContext, useState, useEffect } from 'react';
import { fetchFlashcards, fetchCategories } from '../api';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
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

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchAPI = async () => {
      setFlashcards(await fetchFlashcards(category, difficulty, count));
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
        handleDifficultyChange,
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
