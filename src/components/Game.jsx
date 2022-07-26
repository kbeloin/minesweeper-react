import { createContext, useState } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
import Setup from "./Setup";
import Header from "./Header";
import History from "./History";
import Dialog from "./Dialog";

export const GameContext = createContext();

let i = 0;

export default function Game() {
  const [{ cols, rows, bees }, setGame] = useState({
    cols: 15,
    rows: 10,
    bees: 10,
  });

  const [gameHistory, setGameHistory] = useState([]);
  const [time, setTime] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const [gameState, setGameState] = useState({
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  });

  const newGame = ({ attempt, time, gameState }) => {
    setGameHistory((state) => [
      ...state,
      { attempt: attempt, time: time, gameState },
    ]);
    i++;
  };

  const screenWidth = window.innerWidth;
  const boardSize = cols * 30 + 22;

  return (
    <>
      {showHistory && (
        <GameContext.Provider
          value={{
            gameState,
            setGameState,
            newGame,
            gameHistory,
            setShowHistory,
          }}
        >
          <History />
        </GameContext.Provider>
      )}
      <div
        className={styles.game}
        style={{
          "--board-height":
            boardSize > screenWidth
              ? `${boardSize * (screenWidth / boardSize)}px`
              : "100%",
          "--board-width":
            boardSize > screenWidth
              ? `${boardSize * (screenWidth / boardSize)}px`
              : `${boardSize - 22}px`,
        }}
      >
        <div className={styles["game-info"]}>
          <GameContext.Provider
            value={{ gameState, i, setShowHistory, showHistory, time, setTime }}
          >
            <Header />
          </GameContext.Provider>
        </div>
        <div className={styles["game-board"]}>
          {gameState.gameStarted && (
            <GameContext.Provider
              value={{ cols, rows, bees, setGameState, i, gameState }}
            >
              <Board />
            </GameContext.Provider>
          )}
        </div>
        <div className={styles["game-controls"]}>
          <GameContext.Provider
            value={{ setGame, setGameState, gameState, newGame, time, i }}
          >
            <Setup />
          </GameContext.Provider>
        </div>
        <GameContext.Provider
          value={{
            setGame,
            setGameState,
            gameState,
            newGame,
            time,
            setTime,
            i,
          }}
        >
          <Dialog />
        </GameContext.Provider>
      </div>
    </>
  );
}
