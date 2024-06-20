import React, { useState, useEffect, useRef } from "react";
import "./Game.scss";
import lossSound from "../../../assets/sounds/loss.wav";
import clickSound from "../../../assets/sounds/click.mp3";
import fireworkSound from "../../../assets/sounds/firework.mp3";
import Confetti from 'react-confetti'

const Game = ({ closeModal }) => {
  const [sequence, setSequence] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState("init");
  const timerRef = useRef(null);
  const [feedback, setFeedback] = useState(null);
  const [correctIndices, setCorrectIndices] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [lossAudio] = useState(new Audio(lossSound));
  const [clickAudio] = useState(new Audio(clickSound));
  const [fireworkAudio] = useState(new Audio(fireworkSound));
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  function updatePlayerStats(winsToAdd, lossesToAdd) {
    if (userInfo) {
      let players = JSON.parse(localStorage.getItem("players"));
      let playerIndex = players.findIndex((player) => player.name === userInfo);
      if (playerIndex !== -1) {
        players[playerIndex].wins += winsToAdd;
        players[playerIndex].losses += lossesToAdd;
        localStorage.setItem("players", JSON.stringify(players));
      }
    }
  }

  function handleWin() {
    updatePlayerStats(1, 0);
    fireworkAudio.play();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }
  
  function handleLoss() {
    updatePlayerStats(0, 1);
    lossAudio.play();
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameStatus !== "playing") return;

      const keyPressed = event.key.toUpperCase();
      if (keyPressed === sequence[currentIndex]) {
        if (!correctIndices.includes(currentIndex)) {
          setCorrectIndices((prev) => [...prev, currentIndex]);
        }
        setFeedback("correct");
        clickAudio.play();
        if (currentIndex === sequence.length - 1) {
          setTimeout(() => {
            endGame("won");
            handleWin();
          }, 500);
        } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setFeedback("incorrect");
        setTimeout(() => {
          setFeedback(null);
          endGame("lost");
          handleLoss();
        }, 200);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sequence, currentIndex, gameStatus, correctIndices]);

  const endGame = (status) => {
    clearInterval(timerRef.current);
    setGameStatus(status);
  };

  const restartGame = () => {
    const newSequence = generateNewSequence();
    setSequence(newSequence);
    setCurrentIndex(0);
    setTimeLeft(30);
    setCorrectIndices([]);
    setGameStatus("playing");
    clearInterval(timerRef.current);

    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "100%";

      setTimeout(() => {
        progressBar.style.transition = "width 1s linear";
      }, 100);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          endGame("lost");
          return prevTimeLeft;
        }
        return prevTimeLeft - 1;
      });
    }, 500);

    return () => clearInterval(timerRef.current);
  };

  const generateNewSequence = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const sequenceLength = 6;
    const newSequence = [];

    for (let i = 0; i < sequenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      newSequence.push(alphabet[randomIndex]);
    }

    return newSequence;
  };

  const exitGame = () => {
    setGameStatus("init");
  };

  const progressBarWidth = `${(timeLeft / 30) * 100}%`;

  return (
    <div className="game-container">
      {gameStatus === "init" && (
        <div className="game-over">
          <button className="initial-game-button" onClick={restartGame}>
            Iniciar
          </button>
        </div>
      )}
      {gameStatus === "playing" && (
        <>
          <p className="description-sequence">
            Pressione as teclas em ordem correta
          </p>

          <div className="sequence-display">
            {sequence.map((key, index) => (
              <div
                key={index}
                className={`key ${currentIndex === index ? "highlight" : ""} ${
                  correctIndices.includes(index) ? "correct" : ""
                } ${
                  feedback === "incorrect" && currentIndex === index
                    ? "incorrect"
                    : ""
                }`}
              >
                {key}
              </div>
            ))}
          </div>
          <div className="timer">
            <div
              className="progress-bar"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
          <div className="container-restart">
            <button className="restart-button" onClick={restartGame}>
              Recomeçar
            </button>
          </div>
        </>
      )}
      {gameStatus !== "init" && gameStatus !== "playing" && (
        <div className="game-over">
          <p>{gameStatus === "won" ? "Sucesso!" : "Você Falhou!"}</p>
          <div className="button-container">
            <button
              className="exit-button"
              onClick={() => {
                closeModal();
                exitGame();
              }}
            >
              Sair
            </button>
            <button onClick={restartGame}>Jogar Novamente</button>
          </div>
        </div>
      )}
       {showConfetti && (
          <Confetti
          width={1900}
          height={1000}
        />
        )}
    </div>
  );
};

export default Game;
