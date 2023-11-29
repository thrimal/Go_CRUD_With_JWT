package database

import (
	"JWTWithGORM/models"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "gorm.io/driver/mysql"
)

var (
	DBConn *gorm.DB
)

func InitDatabase() {
	var err error
	DBConn, err = gorm.Open("mysql","root:ijse@tcp(127.0.0.1:3306)/test")
	if err != nil {
		fmt.Println("failed to connect database")
	}
	DBConn.AutoMigrate(&models.Customer{})
	fmt.Println("Connection Opened to Database")
}
