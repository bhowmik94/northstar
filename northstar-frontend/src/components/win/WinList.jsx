export default function WinList({ wins, areas }) {
  const getAreaName = (areaID) => {
    const area = areas.find((a) => a.id == areaID);
    return area ? area.name : "Unknown Area";
  };

  return (
    <>
      <ul className="win-list">
        {wins?.map((win, index) => (
          <li key={win.id ?? index} className="win-item">
            <div className="win-item-content">
              <span className="win-area-tag">{getAreaName(win.area_id)}</span>
              <span className="win-description">{win.description}</span>
            </div>
            {/* Ready for edit/delete — just add handlers and buttons here */}
            <div className="win-item-actions">
              {/* <button className="btn-ghost">Edit</button>
              <button className="btn-ghost">Delete</button> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
