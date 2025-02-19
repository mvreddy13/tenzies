import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Navbar from "./NavBar";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [rolling, setRolling] = useState(false); // new state to track if the die is rolling or not
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (rolling) return; // if the die is in rolling state i.e. setInterval() function is running return nothing or do nothing
    if (gameWon) {
      // if the user wins the game and press "New Game" then generate a new set of numbers and reset the state
      setDice(generateAllNewDice());
      return;
    }
    setRolling(true); // setting the rolling to true which helps disable the roll button
    const interval = setInterval(() => {
      // using setInterval we are going to update the die number every 100 ms
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }, 100);
    setTimeout(() => {
      // this function will run after 2 seconds setInterval starts
      clearInterval(interval); // ends the setInterval Function
      setDice(
        (
          prevDice // Finally sets the state
        ) =>
          prevDice.map((die) =>
            die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
          )
      );
      setRolling(false); //Then enable the button to re-roll again
    }, 500);
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <>
      <Navbar />
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button
          ref={buttonRef}
          className="roll-dice"
          onClick={rollDice}
          disabled={rolling}
        >
          {gameWon ? "New Game" : rolling ? "Rolling..." : "Roll"}
        </button>
      </main>
    </>
  );
}
