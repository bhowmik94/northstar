package handlers

import (
	"database/sql"

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
	err := database.DB.Select(&wins, "SELECT id, area_id, description, created_at FROM wins ORDER BY id ASC")
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
		"INSERT INTO wins (area_id, description) VALUES ($1, $2) RETURNING id, area_id, description, created_at",
		win.AreaID, win.Description,
	).StructScan(&win)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(win)
}

func DeleteWin(c *fiber.Ctx) error {
	id := c.Params("id")

	result, err := database.DB.Exec("DELETE FROM wins WHERE id = $1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	if rows == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "win not found"})
	}

	return c.SendStatus(204)
}

func UpdateWin(c *fiber.Ctx) error {
	id := c.Params("id")

	var win models.Win
	if err := c.BodyParser(&win); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	err := database.DB.QueryRowx(
		"UPDATE wins SET area_id = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING id, area_id, description, created_at, updated_at",
		win.AreaID, win.Description, id,
	).StructScan(&win)

	if err != nil {
		if err == sql.ErrNoRows {
			return c.Status(404).JSON(fiber.Map{"error": "win not found"})
		}
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(win)
}

func HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
	})
}
