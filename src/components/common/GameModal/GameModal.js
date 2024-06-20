import React from "react";
import "./GameModal.scss";
import Game from "../Game/Game";

const GameModal = ({active, closeModal}) => {
  return (
    <div className={`GameModal ${active ? "active" : ""}`}>
      <div className="modal">
        <p className="title_modal">MINI-GAME</p>
        <Game closeModal={closeModal} />
      </div>
    </div>
  );
};

export default GameModal;
