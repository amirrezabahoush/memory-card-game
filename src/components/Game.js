import React, { useState, useEffect } from "react";
import Card from "./Card";
import { cardsData } from '../cards';

function Game() {
  const [cards, setCards] = useState(cardsData);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (cards.every(item => item.isFlipped)) {
      alert('Congrats! You Win')
    }
  }, [cards])

  const checkCards = (card) => {
    if (!selectedCard) {
      setSelectedCard(card);
    } else {
      if (card[0].name !== selectedCard[0].name) {
        setTimeout(() => {
          const newCardsList = cards.map(item => {
            if ((item.name === selectedCard[0].name)) {
              return { ...item, isFlipped: false };
            } else {
              return item;
            }
          });
          setCards(newCardsList);
        }, 550)
      }
      setSelectedCard(null);
    }
  }

  const onClick = e => {
    const attributes = Array.from(e.currentTarget.attributes);
    const dataTestId = attributes.find(item => item.name === 'data-testid');
    const card = cards.filter(item => item.id === +dataTestId?.value);

    const newCardsList = cards.map(item => {
      if (item.id === card[0].id) {
        return { ...item, isFlipped: true };
      } else {
        return item;
      }
    });
    setCards(newCardsList);

    checkCards(card)
  }

  return (
    <section className="memory-game">
      {cards.map(item =>
        <Card card={item} onClick={onClick} key={item.id} />
      )}
    </section>
  );
}

export default Game;