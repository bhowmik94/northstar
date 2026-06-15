import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import WinList from "./components/win/WinList";
import WinForm from "./components/win/WinForm";
import "./styles/wins.css";

function App() {
  const [areas, setAreas] = useState([]);
  const [wins, setWins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/areas")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
      })
      .catch((err) => {
        console.error("Error fetching areas: ", err);
      });

    fetch("http://localhost:3000/wins")
      .then((res) => res.json())
      .then((data) => {
        setWins(data || []);
      });
  }, []);

  const handleCreateWin = (newWin) => {
    setWins((prevWins) => [...prevWins, newWin]);
  };

  return (
    <>
      <div className="page">
        <h1 className="page-title">My Wins</h1>

        <section className="section">
          <h2 className="section-title">Log a win</h2>
          <WinForm areaOptions={areas} onCreateWin={handleCreateWin} />
        </section>

        <section className="section">
          <h2 className="section-title">History</h2>
          {wins.length > 0 && <WinList wins={wins} areas={areas} />}
        </section>
      </div>
    </>
  );
}

export default App;
