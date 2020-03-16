package controllers


import (
	"github.com/labstack/echo"
	"github.com/logrusorgru/aurora"
	"Aurora/server/email_server/constant"
	post "Aurora/server/email_server/model/notification"
	response "Aurora/server/email_server/model/response"
	"Aurora/server/email_server/logger"
	"fmt"
	"net/http"
	"Aurora/server/email_server/email"
 ) 

//welcomeEmail welcome email
func NotificationEmail(c echo.Context) error {
	u := new(post.NotificationData)
	if err := c.Bind(u); err != nil {
		fmt.Println(aurora.BgRed("notofcation bind parameters   :" + err.Error()))
		// write error  to log  file
		logger.ErrorLog.Printf("Notification  :" + err.Error())
		return c.JSON(http.StatusOK, &response.ResponseData{
			Status: constants.ErrorResponse,
			Reason: "internal server error",
			Data:   "internal server error",
		})
	}
	fmt.Println(aurora.BgYellow("model email " + u.Email))

	email.SendNotificationMail(u.Email, u.Data)



	return c.JSON(http.StatusOK, &response.ResponseData{
		Status: constants.OkResponse,
		Reason: "okay",
		Data:   "okay",
	})

}