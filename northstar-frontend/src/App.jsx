import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import WinList from "./components/win/WinList";
import WinForm from "./components/win/WinForm";
import ActivityList from "./components/activity/ActivityList";
import ActivityForm from "./components/activity/ActivityForm";
import "./styles/wins.css";
import "./styles/activity.css";
import CheckInSummary from "./components/checkin/CheckInSummary";
import CheckInForm from "./components/checkin/CheckInForm";

function App() {
  const [areas, setAreas] = useState([]);
  const [wins, setWins] = useState([]);
  const [activities, setActivities] = useState([]);
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

    fetch("http://localhost:3000/activity-sessions")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data || []);
      })
      .catch((err) => {
        console.error("Error fetching activity sessions:", err);
      });
  }, []);

  const handleCreateWin = (newWin) => {
    setWins((prevWins) => [...prevWins, newWin]);
  };

  const handleCreateActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  async function handleUpdateWin(id, updatedWin) {
    const res = await fetch(`http://localhost:3000/wins/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedWin),
    });
    const data = await res.json();
    setWins((prevWins) => prevWins.map((w) => (w.id === id ? data : w)));
  }

  async function handleDeleteWin(id) {
    await fetch(`http://localhost:3000/wins/${id}`, { method: "DELETE" });
    setWins((prevWins) => prevWins.filter((w) => w.id !== id));
  }

  async function handleUpdateActivity(id, updatedActivity) {
    const res = await fetch(`http://localhost:3000/activity-sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedActivity),
    });
    const data = await res.json();
    setActivities((prevActivities) =>
      prevActivities.map((item) => (item.id === id ? data : item))
    );
  }

  async function handleDeleteActivity(id) {
    await fetch(`http://localhost:3000/activity-sessions/${id}`, {
      method: "DELETE",
    });
    setActivities((prevActivities) => prevActivities.filter((item) => item.id !== id));
  }

  return (
    <>

      <div className="page">
      <section className="section">
        {/* {todayCheckIn ? ( */}
          <CheckInSummary checkIn={todayCheckIn} />
        {/* ) : ( */}
          <CheckInForm onCheckInSaved={setTodayCheckIn} />
        {/* )} */}
      </section>
        <h1 className="page-title">My Wins</h1>

        <section className="section">
          <h2 className="section-title">Log a win</h2>
          <WinForm areaOptions={areas} onCreateWin={handleCreateWin} />
        </section>

        <section className="section">
          <h2 className="section-title">Log activity session</h2>
          <ActivityForm areaOptions={areas} onCreateActivity={handleCreateActivity} />
        </section>

        <section className="section">
          <h2 className="section-title">Activity history</h2>
          <ActivityList
            activities={activities}
            areas={areas}
            onUpdateActivity={handleUpdateActivity}
            onDeleteActivity={handleDeleteActivity}
          />
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
