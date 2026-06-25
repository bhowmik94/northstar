import { useState } from "react";
import "../../styles/activity.css";

export default function ActivityItem({ activity, areas, onUpdateActivity, onDeleteActivity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [areaId, setAreaId] = useState(activity.area_id);
  const [description, setDescription] = useState(activity.description);
  const [duration, setDuration] = useState(activity.duration_minutes);
  const [date, setDate] = useState(activity.date);

  const getAreaName = (id) => {
    const area = areas.find((area) => area.id === id);
    return area ? area.name : "Unknown area";
  };

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  function handleSave() {
    onUpdateActivity(activity.id, {
      area_id: parseInt(areaId, 10),
      description,
      duration_minutes: parseInt(duration, 10),
      date,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setAreaId(activity.area_id);
    setDescription(activity.description);
    setDuration(activity.duration_minutes);
    setDate(activity.date);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="activity-item activity-item-editing">
        <div className="activity-item-content">
          <select value={areaId} onChange={(e) => setAreaId(e.target.value)}>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            min="1"
            step="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="activity-item-actions">
          <button className="btn-ghost" onClick={handleSave}>
            Save
          </button>
          <button className="btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="activity-item">
      <span className="activity-area-tag">{getAreaName(activity.area_id)}</span>
      <span className="activity-description">{activity.description}</span>
      <span className="activity-date">{formatDate(activity.date)}</span>
      <span className="activity-duration">{activity.duration_minutes} min</span>
      <span className="activity-created-at">{formatDate(activity.created_at)}</span>
      <div className="activity-item-actions">
        <button className="btn-ghost" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-ghost" onClick={() => onDeleteActivity(activity.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
