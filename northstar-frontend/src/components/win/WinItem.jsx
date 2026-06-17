import { useState } from "react";
import "../../styles/wins.css";

export default function WinItem({ win, areas, onUpdateWin, onDeleteWin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [areaId, setAreaId] = useState(win.area_id);
  const [description, setDescription] = useState(win.description);

  const getAreaName = (areaID) => {
    const area = areas.find((a) => a.id == areaID);
    return area ? area.name : "Unknown Area";
  };

  function handleSave() {
    onUpdateWin(win.id, { area_id: parseInt(areaId), description });
    setIsEditing(false);
  }

  function handleCancel() {
    setAreaId(win.area_id);
    setDescription(win.description);
    setIsEditing(false);
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (isEditing) {
    return (
      <li className="win-item win-item-editing">
        <div className="win-item-content">
          <select
            className="win-edit-select"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="win-edit-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="win-item-actions">
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
    <li className="win-item">
      <span className="win-area-tag">{getAreaName(win.area_id)}</span>
      <span className="win-description">{win.description}</span>
      <span className="win-date">{formatDate(win.created_at)}</span>
      <div className="win-item-actions">
        <button className="btn-ghost" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-ghost" onClick={() => onDeleteWin(win.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
