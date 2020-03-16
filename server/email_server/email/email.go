package email

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/smtp"

	"Aurora/server/email_server/config"
	"Aurora/server/email_server/logger"

)

//Request data required to send an email
type Request struct {
	from    string
	to      []string
	subject string
	body    string
}

// MiMe = email 
const (
	MIME = "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
)

//NewRequest new request data
func NewRequest(to []string, subject string) *Request {
	return &Request{
		to:      to,
		subject: subject,
	}
}

func (r *Request) parseTemplate(fileName string, data interface{}) error {
	t, err := template.ParseFiles(fileName)
	if err != nil {
		return err
	}
	buffer := new(bytes.Buffer)
	if err = t.Execute(buffer, data); err != nil {
		return err
	}
	r.body = buffer.String()
	return nil
}

func (r *Request) sendMail() bool {

	configFile := config.GetConfig()
	
	emailServer := configFile.Email.Server
	emailPort := configFile.Email.Port

	emailName := configFile.Email.EmailUser
	emailPassword := configFile.Email.EmailPassword

	body := "To: " + r.to[0] + "\r\nSubject: " + r.subject + "\r\n" + MIME + "\r\n" + r.body
	SMTP := fmt.Sprintf("%s:%d", emailServer, emailPort)



	if err := smtp.SendMail(SMTP, smtp.PlainAuth("", emailName, emailPassword, emailServer), emailName, r.to, []byte(body)); err != nil {
		
		logger.ErrorLog.Println("Email not   sent error  ")
		return false
	}
	
	return true



}
//Send send action of email
func (r *Request) Send(templateName string, items interface{}) {
	err := r.parseTemplate(templateName, items)
	if err != nil {
		log.Fatal(err)
		logger.ErrorLog.Println("failed to parse email template ")
		log.Printf("failed to parse email template \n")
	}
	if ok := r.sendMail(); ok {
		logger.InfoLog.Println("Email  sent  hurray to ")
		log.Printf("Email has been sent to %s\n", r.to)
	} else {
		logger.ErrorLog.Fatal("Failed to send the email to ")
		log.Printf("Failed to send the email to %s\n", r.to)
	}
}

