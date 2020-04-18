import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const sharedCard = css`
  grid-area: 1 / 1 / 2 / 2;
  padding: 2rem;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  background-color: #fff;
  border-radius: 1rem;
`;

const Card = styled.div`
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  transform-style: preserve-3d;
  transform: perspective(1000px) translateY(var(--translate-y, 0))
    ${({ flipped }) => (flipped ? `rotateY(180deg)` : `rotateY(0)`)};
  transition: all 0.2s;
  position: relative;

  &:hover {
    --translate-y: -2px;
  }
`;

const CardFront = styled.div`
  ${sharedCard}
  left: 0;
  width: 100%;
`;

const CardBack = styled.div`
  ${sharedCard}
  grid-auto-rows: minmax(min-content, max-content);
  transform: rotateY(180deg);
  text-align: center;
  font-size: 2.2rem;
  align-self: stretch;
  background: #00bcd4;
  color: #fff;
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
  color: #686868;
  font-size: 1.1rem;

  &:first-child {
    margin-top: 0;
  }
`;

const FlashcardQuestion = styled.div`
  font-size: 1.2rem;
`;

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);

  return (
    <Card onClick={() => setFlip(!flip)} flipped={flip}>
      <CardFront>
        <FlashcardQuestion>{flashcard.question}</FlashcardQuestion>
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
