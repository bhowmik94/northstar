package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sourav/northstar/internal/database"
	"github.com/sourav/northstar/internal/models"
)

func GetAreas(c *fiber.Ctx) error {
	areas := []models.Area{}
	err := database.DB.Select(&areas, "SELECT id, name from areas")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(areas)
}

func GetWins(c *fiber.Ctx) error {
	wins := []models.Win{}
	err := database.DB.Select(&wins, "SELECT id, area_id, description FROM wins")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(wins)
}

func CreateWin(c *fiber.Ctx) error {
	var win models.Win
	if err := c.BodyParser(&win); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	err := database.DB.QueryRowx(
		"INSERT INTO wins (area_id, description) VALUES ($1, $2) RETURNING id, area_id, description",
		win.AreaID, win.Description,
	).StructScan(&win)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(win)
}

func HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
	})
}
