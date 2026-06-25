package models

import "time"

type ActivitySession struct {
	ID              int       `json:"id"               db:"id"`
	AreaID          int       `json:"area_id"          db:"area_id"`
	Description     string    `json:"description"      db:"description"`
	DurationMinutes int       `json:"duration_minutes" db:"duration_minutes"`
	Date            string    `json:"date"             db:"date"`
	CreatedAt       time.Time `json:"created_at"       db:"created_at"`
}

// Date is not a pointer here. Because date is required,
// if date does not come from frontend, backend enters current date
