package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sourav/northstar/internal/database"
	"github.com/sourav/northstar/internal/models"
)

func CreateCheckIn(c *fiber.Ctx) error {
	var checkIn models.CheckIn
	if err := c.BodyParser(&checkIn); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	err := database.DB.QueryRowx(
		`INSERT INTO check_ins (energy, stress, available_time, mood)
		VALUES ($1, $2, $3, $4)
		RETURNING id, energy, stress, available_time, mood, created_at`,
		checkIn.Energy, checkIn.Stress, checkIn.AvailableTime, checkIn.Mood,
	).StructScan(&checkIn)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(checkIn)
}

func GetTodayCheckIn(c *fiber.Ctx) error {
	var checkIn models.CheckIn

	err := database.DB.QueryRowx(
		`SELECT id, energy, stress, available_time, mood, created_at
         FROM check_ins
         WHERE created_at::date = CURRENT_DATE
         ORDER BY created_at DESC
         LIMIT 1`,
	).StructScan(&checkIn)

	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			return c.Status(404).JSON(fiber.Map{"error": "no check-in today yet"})
		}
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(checkIn)
}
