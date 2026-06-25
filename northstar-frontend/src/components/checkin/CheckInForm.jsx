import { useState } from "react";
import "../../styles/checkin.css";

const TIME_OPTIONS = [
  { label: "30m", value: 30 },
  { label: "1h", value: 60 },
  { label: "2h", value: 120 },
  { label: "4h", value: 240 },
  { label: "6h+", value: 360 },
];

const MOOD_OPTIONS = [
  { label: "😀", value: 5 },
  { label: "🙂", value: 4 },
  { label: "😐", value: 3 },
  { label: "☹️", value: 2 },
  { label: "😫", value: 1 },
];

const today = new Date().toISOString().split('T')[0];
const DEFAULT_STATE = {
  date: today,
  energy: 5,
  stress: 5,
  available_time: null,
  mood: null,
};

export default function CheckInForm({ onCheckInSaved }) {
  const [form, setForm] = useState(DEFAULT_STATE);

  const isComplete = form.available_time !== null && form.mood !== null;

  async function handleSubmit() {
    const res = await fetch("http://localhost:3000/check-ins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onCheckInSaved(data);
    setForm(DEFAULT_STATE);
  }

  return (
    <div className="checkin-form">
      <h2 className="section-title">Morning check-in</h2>

      <div className="checkin-row">
        <label className="checkin-label">Date</label>
        <input
          type="date"
          className="checkin-date"
          value={form.date}
          max={today}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <div className="checkin-row">
        <label className="checkin-label">
          Energy <span className="checkin-value">{form.energy}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={form.energy}
          onChange={(e) => setForm({ ...form, energy: Number(e.target.value) })}
          className="checkin-slider"
        />
      </div>

      <div className="checkin-row">
        <label className="checkin-label">
          Stress <span className="checkin-value">{form.stress}</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={form.stress}
          onChange={(e) => setForm({ ...form, stress: Number(e.target.value) })}
          className="checkin-slider"
        />
      </div>

      <div className="checkin-row">
        <span className="checkin-label">Available time</span>
        <div className="checkin-pills">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`pill ${form.available_time === opt.value ? "pill-active" : ""}`}
              onClick={() => setForm({ ...form, available_time: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="checkin-row">
        <span className="checkin-label">Mood</span>
        <div className="checkin-pills">
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`pill pill-emoji ${form.mood === opt.value ? "pill-active" : ""}`}
              onClick={() => setForm({ ...form, mood: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!isComplete}
      >
        Save check-in
      </button>
    </div>
  );
}
