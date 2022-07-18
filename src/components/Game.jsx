import { createContext, useState } from "react";
import Board from "./Board";
import styles from "./Board.module.css";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [settings, setSettings] = useState({
    cols: 15,
    rows: 15,
    bees: 20,
  });

  const [{ cols, rows, bees }, setGame] = useState({
    cols: 15,
    rows: 10,
    bees: 10,
  });

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  });

  const handleChange = (e) => {
    e.preventDefault();

    // convert the value of the input to a number
    setSettings((state) => ({
      ...state,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const startGame = (e) => {
    e.preventDefault();
    setGame((state) => ({
      ...state,
      cols: settings.cols,
      rows: settings.rows,
      bees: settings.bees,
    }));
    setGameState((state) => ({
      ...state,
      gameStarted: true,
      gameOver: false,
      gameWon: false,
    }));
    i++;
  };

  const resetGame = (e) => {
    e.preventDefault();
    setGame((state) => ({
      ...state,
      cols: settings.cols,
      rows: settings.rows,
      bees: settings.bees,
    }));
    setGameState((state) => ({
      ...state,
      gameStarted: false,
      gameOver: false,
      gameWon: false,
    }));
    i = 0;
  };

  return (
    <div className="game">
      <div className="game-board">
        {gameState.gameStarted && (
          <GameContext.Provider value={{ cols, rows, bees, setGameState, i }}>
            <Board />
          </GameContext.Provider>
        )}
      </div>
      <div className="game-info">
        <form className={styles.form}>
          {!gameState.gameStarted && (
            <>
              <label>
                Cols:
                <input
                  type="number"
                  name="cols"
                  onChange={handleChange}
                  value={settings.cols}
                />
              </label>
              <label>
                Rows:
                <input
                  type="number"
                  name="rows"
                  onChange={handleChange}
                  value={settings.rows}
                />
              </label>
              <label>
                Bees:
                <input
                  type="number"
                  name="bees"
                  onChange={handleChange}
                  value={settings.bees}
                />
              </label>
            </>
          )}
          <button onClick={startGame}>
            {gameState.gameStarted ? "Restart" : "Start"}
          </button>
          <button onClick={resetGame}>Reset</button>
        </form>
      </div>
    </div>
  );
}
