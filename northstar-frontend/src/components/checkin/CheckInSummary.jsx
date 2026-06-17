import "../../styles/checkin.css";

const moodMap = { 1: "😫", 2: "☹️", 3: "😐", 4: "🙂", 5: "😀"};
const timeMap = { 30: "30m", 60: "1h", 120: "2h", 240: "4h", 360: "6h+" };

export default function CheckInSummary({ checkIn }) {
  if (!checkIn) return null;

  return (
    <div className="checkin-summary">
      <span className="checkin-summary-item">
        ⚡ {checkIn.energy}/10
      </span>
      <span className="checkin-summary-item">
        🧘 {checkIn.stress}/10
      </span>
      <span className="checkin-summary-item">
        🕐 {timeMap[checkIn.available_time]}
      </span>
      <span className="checkin-summary-item">
        {moodMap[checkIn.mood]}
      </span>
    </div>
  );
}