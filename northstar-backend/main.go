package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sourav/northstar/internal/handlers"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/health", handlers.HealthCheck)
	app.Get("/areas", handlers.GetAreas)
	app.Get("/wins", handlers.GetWins)
	app.Post("/wins", handlers.CreateWin)

	app.Listen(":3000")
}
