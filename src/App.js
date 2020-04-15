import React, { useContext } from 'react';

import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import FlashcardList from './components/FlashcardList';
import { useFlashcardsAPI } from './api';
import FormSelect from './components/FormSelect';
import { GlobalContext } from './context/GlobalState';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { loading, flashcards, categories } = useContext(GlobalContext);
  return (
    <>
      <GlobalStyle />
      <FormSelect categories={categories} />
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <FlashcardList flashcards={flashcards} />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
