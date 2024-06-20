import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  let playersList = [
    { name: "Ratão", wins: 3, losses: 5 },
    { name: "Coruja", wins: 10, losses: 2 },
    { name: "Dog", wins: 8, losses: 20 },
  ];

  function addPlayer(name) {
    let players = JSON.parse(localStorage.getItem("players")) || playersList;
    if (!players.some((player) => player.name === name)) {
      players.push({ name: name, wins: 0, losses: 0 });
    }
    localStorage.setItem("players", JSON.stringify(players));
  }

  function loginPlayer(event) {
    event.preventDefault();
    if (name.trim() === "") {
      alert("Por favor, insira um nome válido.");
      return;
    }

    localStorage.setItem("userInfo", name);
    addPlayer(name);
    navigate("/app");
  }

  return (
    <section className="Login">
      <div className="box-login">
        <h1>Login</h1>
        <div>
          <form onSubmit={loginPlayer}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
