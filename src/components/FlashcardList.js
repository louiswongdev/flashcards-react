import React from 'react';
import styled from 'styled-components';
import Flashcard from './Flashcard';

const CardGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 2rem;
  background-color: inherit;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const NothingFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: #fff;
  width: 270px;
  padding: 2rem 2rem;
  font-size: 1.3rem;
  text-align: center;
`;

const FlashcardList = ({ flashcards }) => {
  return (
    <>
      {flashcards.length > 0 ? (
        <CardGrid>
          {flashcards.map((flashcard, i) => (
            <Flashcard key={flashcard.id} flashcard={flashcard} />
          ))}
        </CardGrid>
      ) : (
        <NothingFound>
          <p>
            Sorry no flashcards were found. Please select another Category
            and/or difficulty
          </p>
        </NothingFound>
      )}
    </>
  );
};

export default FlashcardList;
