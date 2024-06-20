import React from 'react';
import './RankingTable.scss';

const RankingTable = () => {
  const infosPlayers = localStorage.getItem('players');
  const players = JSON.parse(infosPlayers);
  
  const sortedPlayers = players.sort((a, b) => b.wins - a.wins);

  return (
    <div className="RankingTable">
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Vitórias</th>
            <th>Derrotas</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {index < 3 && <span className="medal">🏅</span>}
                {player.name}
              </td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
