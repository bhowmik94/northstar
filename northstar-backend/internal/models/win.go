package models

import "time"

type Win struct {
	ID          int       `json:"id"          db:"id"`
	AreaID      int       `json:"area_id"     db:"area_id"`
	Description string    `json:"description" db:"description"`
	CreatedAt   time.Time `json:"created_at"  db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"  db:"updated_at"`
}
