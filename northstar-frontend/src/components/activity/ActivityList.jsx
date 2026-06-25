import ActivityItem from "./ActivityItem";
import "../../styles/activity.css";

export default function ActivityList({ activities, areas, onUpdateActivity, onDeleteActivity }) {
  if (!activities?.length) {
    return <p className="activity-empty">No activity sessions yet — add one above.</p>;
  }

  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          areas={areas}
          onUpdateActivity={onUpdateActivity}
          onDeleteActivity={onDeleteActivity}
        />
      ))}
    </ul>
  );
}
