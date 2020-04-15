import React from 'react';
import styled from 'styled-components';
import Flashcard from './Flashcard';

const CardGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0 2rem;
  background-color: inherit;
`;

const FlashcardList = ({ flashcards }) => {
  return (
    <CardGrid>
      {flashcards.map((flashcard, i) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} />
      ))}
    </CardGrid>
  );
};

export default FlashcardList;
