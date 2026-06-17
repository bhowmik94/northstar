package models

import "time"

type CheckIn struct {
	ID            int       `json:"id"             db:"id"`
	Energy        int       `json:"energy"         db:"energy"`
	Stress        int       `json:"stress"         db:"stress"`
	AvailableTime int       `json:"available_time" db:"available_time"`
	Mood          int       `json:"mood"           db:"mood"`
	CreatedAt     time.Time `json:"created_at"     db:"created_at"`
}
