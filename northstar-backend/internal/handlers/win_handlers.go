package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sourav/northstar/internal/models"
)

var Areas = []models.Area{
	{ID: 1, Name: "Career"},
	{ID: 2, Name: "German"},
	{ID: 3, Name: "Photography"},
	{ID: 4, Name: "Health"},
	{ID: 5, Name: "Projects"},
}

var Wins = []models.Win{}

func GetAreas(c *fiber.Ctx) error {
	return c.JSON(Areas)
}

func GetWins(c *fiber.Ctx) error {
	return c.JSON(Wins)
}

func CreateWin(c *fiber.Ctx) error {
	var win models.Win
	if err := c.BodyParser(&win); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	Wins = append(Wins, win)
	return c.Status(201).JSON(win)
}

func HealthCheck(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status": "ok",
	})
}
