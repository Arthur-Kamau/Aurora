package email



//SendWelcomeMail when a users registers
func SendWelcomeMail(destinationEmail string, userName string) {
	subject := "Welcome to Aurora "

	r := NewRequest([]string{destinationEmail}, subject)
	r.Send("static/html/email/welcome.html", map[string]string{"username": userName})
}


//SendNotificationMail when a users need to be notfied
func SendNotificationMail(destinationEmail string, nofication string) {
	subject := "Aurora  Notification Mail."

	r := NewRequest([]string{destinationEmail}, subject)
	r.Send("static/html/email/notification_email.html", map[string]string{"nofication": nofication,"subject":subject})
}

//SendLoginKeyAndLinkMail send login key and the link
func SendLoginKeyAndLinkMail(destinationEmail string,userName string, key string, link string) {
	subject := "Login Key and Link "

	r := NewRequest([]string{destinationEmail}, subject)
	r.Send("static/html/email/login_key _link.html", map[string]string{"username": userName, "link": link, "passkey" : key})
}


//SendLoginKeyMail send login key and the link
func SendLoginKeyMail(destinationEmail string, key string) {
	subject := "Login Key  "

	r := NewRequest([]string{destinationEmail}, subject)
	r.Send("static/html/email/login_code.html", map[string]string{"passkey" : key})
}