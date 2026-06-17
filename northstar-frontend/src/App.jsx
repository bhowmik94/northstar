import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import WinList from "./components/win/WinList";
import WinForm from "./components/win/WinForm";
import "./styles/wins.css";
import CheckInSummary from "./components/checkin/CheckInSummary";
import CheckInForm from "./components/checkin/CheckInForm";

function App() {
  const [areas, setAreas] = useState([]);
  const [wins, setWins] = useState([]);
  const [todayCheckIn, setTodayCheckIn] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/check-ins/today")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setTodayCheckIn(data));

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

  async function handleUpdateWin(id, updatedWin) {
    const res = await fetch(`http://localhost:3000/wins/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWin),
    });
    const data = await res.json();
    console.log(data);
    setWins((prevWins) => prevWins.map((w) => (w.id === id ? data : w)));
  }

  async function handleDeleteWin(id) {
    await fetch(`http://localhost:3000/wins/${id}`, { method: "DELETE" });
    setWins((prevWins) => prevWins.filter((w) => w.id !== id));
  }

  return (
    <>
      <section className="section">
        {todayCheckIn ? (
          <CheckInSummary checkIn={todayCheckIn} />
        ) : (
          <CheckInForm onCheckInSaved={setTodayCheckIn} />
        )}
      </section>

      <div className="page">
        <h1 className="page-title">My Wins</h1>

        <section className="section">
          <h2 className="section-title">Log a win</h2>
          <WinForm areaOptions={areas} onCreateWin={handleCreateWin} />
        </section>

        <section className="section">
          <h2 className="section-title">History</h2>
          {wins.length > 0 && (
            <WinList
              wins={wins}
              areas={areas}
              onUpdateWin={handleUpdateWin}
              onDeleteWin={handleDeleteWin}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
