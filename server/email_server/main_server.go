package main

import (
	"Aurora/server/email_server/config"
	
	"net/http"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
"fmt"
controllers "Aurora/server/email_server/controllers"
	"github.com/logrusorgru/aurora"
)

func main() {
	e := echo.New()

	fmt.Println(aurora.BgGreen("========================================"))
	fmt.Println(aurora.BgGreen("Email sening utility"))
	fmt.Println(aurora.BgGreen("========================================"))


	e.Static("/static", "static")
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

		// CORS restricted
	// Allows requests from any `https://labstack.com` or `https://labstack.net` origin
	// wth GET, PUT, POST or DELETE method.
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://127.0.0.1:4000/website_tracker", "http://127.0.0.1:4000/website_tracker/post"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))


	configFile := config.GetConfig()

	serverPort := configFile.Server.Port

	//login key
	e.POST("/login", controllers.LoginEmail)
	e.POST("/notitifation", controllers.NotificationEmail)



	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":" + serverPort))
}