import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const sharedCard = css`
  grid-area: 1 / 1 / 2 / 2;
  padding: 2rem 3rem;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  background-color: #fff;
`;

const Card = styled.div`
  cursor: pointer;
  display: grid;
  /* background-color: #fff; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transform: perspective(1000px) translateY(var(--translate-y, 0))
    ${({ flipped }) =>
      // flipped ? `rotateY(var(--rotate-y, 0))` : `--rotate-y: 180deg`};
      flipped ? `rotateY(180deg)` : `rotateY(0)`};
  transition: all 0.2s;
  position: relative;

  &:hover {
    --translate-y: -2px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  }
`;

const CardFront = styled.div`
  ${sharedCard}
  left: 0;
  font-size: 1.5rem;
`;

const CardBack = styled.div`
  ${sharedCard}
  grid-auto-rows: minmax(min-content, max-content);
  transform: rotateY(180deg);
  text-align: center;
  font-size: 2.2rem;
  align-self: stretch;
`;

const CardBackContent = styled.div`
  display: grid;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const FlashcardOptions = styled.div`
  margin-top: 0.5rem;
`;

const FlashcardOption = styled.div`
  margin-top: 0.25rem;
  color: #565656;
  font-size: 1.2rem;

  &:first-child {
    margin-top: 0;
  }
`;

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <Card onClick={() => setFlip(!flip)} flipped={flip}>
      <CardFront>
        {flashcard.question}
        <FlashcardOptions>
          {flashcard.options.map((option) => (
            <FlashcardOption key={option}>{option}</FlashcardOption>
          ))}
        </FlashcardOptions>
      </CardFront>
      <CardBack>
        <CardBackContent>{flashcard.answer}</CardBackContent>
      </CardBack>
    </Card>
  );
};

export default Flashcard;
