package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/sourav/northstar/internal/database"
	"github.com/sourav/northstar/internal/handlers"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	godotenv.Load()

	database.Connect()

	app.Get("/health", handlers.HealthCheck)

	app.Get("/areas", handlers.GetAreas)

	app.Get("/wins", handlers.GetWins)
	app.Post("/wins", handlers.CreateWin)
	app.Put("/wins/:id", handlers.UpdateWin)
	app.Delete("/wins/:id", handlers.DeleteWin)

	app.Post("/check-ins", handlers.CreateCheckIn)
	app.Get("/check-ins/today", handlers.GetTodayCheckIn)

	app.Listen(":3000")
}
