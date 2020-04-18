import React, { createContext, useState, useEffect } from 'react';
import { fetchFlashcards, fetchCategories, fetchSessionToken } from '../api';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sessionToken, setSessionToken] = useState();
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();

  useEffect(() => {
    const fetchInitialData = async () => {
      setCategories(await fetchCategories());
      setSessionToken(await fetchSessionToken());
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      setFlashcards(
        await fetchFlashcards(category, difficulty, count, sessionToken)
      );
      setLoading(false);
    };

    if (sessionToken !== undefined) {
      fetchCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

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

    setLoading(true);
    const fetchAPI = async () => {
      setFlashcards(
        await fetchFlashcards(category, difficulty, count, sessionToken)
      );
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
