package handlers

import (
	"database/sql"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sourav/northstar/internal/database"
	"github.com/sourav/northstar/internal/models"
)

func GetActivitySessions(c *fiber.Ctx) error {
	days := c.QueryInt("days", 7) // default to last 7 days

	var sessions []models.ActivitySession
	err := database.DB.Select(&sessions,
		`SELECT id, area_id, description, duration_minutes, date, created_at
         FROM activity_sessions
         WHERE date >= CURRENT_DATE - ($1 || ' days')::INTERVAL
         ORDER BY date DESC, created_at DESC`,
		days,
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(sessions)
}

func GetActivitySessionsByDate(c *fiber.Ctx) error {
	date := c.Params("date") // "2026-06-25"

	var sessions []models.ActivitySession
	err := database.DB.Select(&sessions,
		`SELECT id, area_id, description, duration_minutes, date, created_at
         FROM activity_sessions
         WHERE date = $1
         ORDER BY created_at DESC`,
		date,
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(sessions)
}

func CreateActivitySession(c *fiber.Ctx) error {
	var session models.ActivitySession
	if err := c.BodyParser(&session); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	// if frontend sends no date, fall back to today
	if session.Date == "" {
		session.Date = time.Now().Format("2006-01-02")
	}

	err := database.DB.QueryRowx(
		`INSERT INTO activity_sessions (area_id, description, duration_minutes, date)
         VALUES ($1, $2, $3, $4)
         RETURNING id, area_id, description, duration_minutes, date, created_at`,
		session.AreaID, session.Description, session.DurationMinutes, session.Date,
	).StructScan(&session)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(session)
}

func DeleteActivitySession(c *fiber.Ctx) error {
	id := c.Params("id")

	result, err := database.DB.Exec(
		"DELETE FROM activity_sessions WHERE id = $1", id,
	)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "session not found"})
	}

	return c.SendStatus(204)
}

func UpdateActivitySession(c *fiber.Ctx) error {
	id := c.Params("id")

	var session models.ActivitySession
	if err := c.BodyParser(&session); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	err := database.DB.QueryRowx(
		`UPDATE activity_sessions
         SET area_id = $1, description = $2, duration_minutes = $3, date = $4
         WHERE id = $5
         RETURNING id, area_id, description, duration_minutes, date, created_at`,
		session.AreaID, session.Description, session.DurationMinutes, session.Date, id,
	).StructScan(&session)

	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(404).JSON(fiber.Map{"error": "session not found"})
		}
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(session)
}
