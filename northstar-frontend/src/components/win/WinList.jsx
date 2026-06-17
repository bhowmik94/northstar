import WinItem from "./WinItem";
import "../../styles/wins.css";

export default function WinList({ wins, areas, onUpdateWin, onDeleteWin }) {
  if (!wins?.length) {
    return <p className="win-empty">No wins yet — log your first one above.</p>;
  }

  return (
    <ul className="win-list">
      {wins.map((win, index) => (
        <WinItem
          key={win.id ?? index}
          win={win}
          areas={areas}
          onUpdateWin={onUpdateWin}
          onDeleteWin={onDeleteWin}
        />
      ))}
    </ul>
  );
}