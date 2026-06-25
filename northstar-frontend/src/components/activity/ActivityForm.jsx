import "../../styles/activity.css";

const today = new Date().toISOString().split("T")[0];

export default function ActivityForm({ areaOptions, onCreateActivity }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      area_id: parseInt(formData.get("area_id"), 10),
      description: formData.get("description"),
      duration_minutes: parseInt(formData.get("duration_minutes"), 10),
      date: formData.get("date"),
    };

    try {
      const res = await fetch("http://localhost:3000/activity-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save activity session");
      }

      const newActivity = await res.json();
      onCreateActivity(newActivity);
      event.target.reset();
      event.target.date.value = today;
    } catch (error) {
      console.error("Error saving activity session:", error);
    }
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <select name="area_id" required>
        <option value="">Select area</option>
        {areaOptions.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="description"
        placeholder="Describe the activity session…"
        required
      />

      <input
        type="number"
        name="duration_minutes"
        min="1"
        step="1"
        placeholder="Duration in minutes"
        required
      />

      <input type="date" name="date" max={today} defaultValue={today} required />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
