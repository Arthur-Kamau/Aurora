package models

//ResponseData response to a request
type ResponseData struct {
	Status    int `gorm:"type:varchar(200);index:status;column:status" json:"status,omitempty"`
	Reason     string `gorm:"type:varchar(200);index:reason;column:reason" json:"reason,omitempty"`
	Data     interface{} `json:"data"` //`gorm:"type:varchar(200);index:company_id;column:company_id" json:"company_id,omitempty"`
}