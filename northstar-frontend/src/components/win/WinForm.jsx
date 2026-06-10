export default function WinForm({ areaOptions, onCreateWin }) {
  const postArea = async (formData) => {
    console.log(formData);

    const payload = {
      area_id: parseInt(formData.get("area_id")),
      description: formData.get("description"),
    };
    console.log(payload);

    try {
      const res = await fetch("http://localhost:3000/wins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      if (res.ok) {
        const newWin = await res.json();
        onCreateWin(newWin);
        console.log("Success: ", newWin);
      }
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  return (
    <>
      <form className="win-form" action={postArea}>
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
          placeholder="Describe your win…"
          required
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
