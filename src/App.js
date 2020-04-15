import React, { useContext } from 'react';

import { GlobalContext } from './context/GlobalState';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import FlashcardList from './components/FlashcardList';
import FormSelect from './components/FormSelect';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  width: 80vh;
  height: 80vh;
  display: flex;
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
          <LoaderContainer>
            <Loader
              type="Oval"
              color="#f2c14e"
              height={50}
              width={50}
              timeout={3000} //3 secs
            />
          </LoaderContainer>
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
