import React, { useState } from "react";
import "./Dashboard.scss";
import GameModal from "../../components/common/GameModal/GameModal";
import RankingTable from "../../components/common/RankingTable/RankingTable";
import keyboard from "../../assets/images/games/keyboard.jpg";

const Dashboard = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const closeGame = () => {
    setGameStarted(!gameStarted);
  };

  return (
    <section className="Dashboard">
      <div className="expand-dashboard">
        <div className="container-ranking">
          <h2>Ranking</h2>
          <RankingTable />
        </div>
        <div className="container-games">
          <h2>Jogos</h2>
          <div className="cards-container">
            <div className="card-button" onClick={() => closeGame()}>
              <div
                className="card-image"
                style={{ backgroundImage: `url(${keyboard})` }}
              />
              <div className="card-description">
                <p>Jogo do teclado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameModal active={gameStarted} closeModal={closeGame} />
    </section>
  );
};

export default Dashboard;
