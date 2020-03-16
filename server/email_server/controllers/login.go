package controllers
import (
	"github.com/labstack/echo"
	"github.com/logrusorgru/aurora"
	"Aurora/server/email_server/constant"
	post "Aurora/server/email_server/model/login"
	response "Aurora/server/email_server/model/response"
	"Aurora/server/email_server/logger"
	"fmt"
	"net/http"
	"Aurora/server/email_server/email"
 ) 
//LoginEmail login the user with email
func LoginEmail(c echo.Context) error {
	u := new(post.LoginModel)
	if err := c.Bind(u); err != nil {
		fmt.Println(aurora.BgRed("Login bind parameters   :" + err.Error()))
		// write error  to log  file
		logger.ErrorLog.Printf("Login  :" + err.Error())
		return c.JSON(http.StatusOK, &response.ResponseData{
			Status: constants.ErrorResponse,
			Reason: "internal server error",
			Data:   "internal server error",
		})
	}
	fmt.Println(aurora.BgYellow("model email " + u.Email))

	email.SendLoginKeyMail(u.Email, u.Key)



	return c.JSON(http.StatusOK, &response.ResponseData{
		Status: constants.OkResponse,
		Reason: "okay",
		Data:   "okay",
	})
}