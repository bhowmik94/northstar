package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sourav/northstar/internal/database"
	"github.com/sourav/northstar/internal/models"
)

func CreateCheckIn(c *fiber.Ctx) error {
	var checkIn models.CheckIn
	if err := c.BodyParser(&checkIn); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if checkIn.Date == nil {
		today := time.Now().Format("2006-01-02")
		checkIn.Date = &today
	}

	err := database.DB.QueryRowx(
		`INSERT INTO check_ins (date, energy, stress, available_time, mood)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, date, energy, stress, available_time, mood, created_at`,
		checkIn.Date, checkIn.Energy, checkIn.Stress, checkIn.AvailableTime, checkIn.Mood,
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
         WHERE date = CURRENT_DATE
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
