package models

type Win struct {
	ID          int    `json:"id"          db:"id"`
	AreaID      int    `json:"area_id"     db:"area_id"`
	Description string `json:"description" db:"description"`
}
