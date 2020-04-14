import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import FlashcardList from './components/FlashcardList';
import { useFlashcardsAPI } from './api';
import FormSelect from './components/FormSelect';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { flashcards, loading, error } = useFlashcardsAPI();
  // console.log(data);
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <GlobalStyle />
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <FormSelect />
            <FlashcardList flashcards={flashcards} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
