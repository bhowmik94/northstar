package models

type Win struct {
	ID          int    `json:"id"`
	AreaID      int    `json:"area_id"`
	Description string `json:"description"`
}
