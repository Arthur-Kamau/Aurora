package main

import (
	"Aurora/server/Golang/email"
	"flag"
	"fmt"

	"github.com/logrusorgru/aurora"
)

func main() {
	fmt.Println("\n\n\n 		")
	fmt.Println(aurora.BgGreen("========================================"))
	fmt.Println(aurora.BgGreen("Email sening utility"))
	fmt.Println(aurora.BgGreen("========================================"))

	//command line args  default value and description
	emailPtr := flag.String("email", "kamaukenn11@gmail.com", "choose the email you want to send the mail")
	typePtr := flag.String("type", "welcome", "the email you want to sen the other pesron")
	keyPtr := flag.String("key", "0000", "the email you want to sen the other pesron")
	notificationPtr := flag.String("notification", "notification", "notify the user with a custom message")

	flag.Parse()

	fmt.Println("\n         ")
	fmt.Println("sending email to :", *emailPtr)
	fmt.Println("type of email sent :", *typePtr)
	fmt.Println("key of email sent :", *keyPtr)
	fmt.Println("notifcation data :", *notificationPtr)
	fmt.Println("tail:", flag.Args())

	fmt.Println("\n         ")
	fmt.Println(aurora.BgYellow("========================================"))

	if *typePtr == "welcome" {
		email.SendWelcomeMail(*emailPtr, *notificationPtr)
	} else if *typePtr == "login" {
		email.SendLoginKeyMail(*emailPtr, *keyPtr)
	} else if *typePtr == "notifcation" {
		email.SendNotificationMail(*emailPtr, *notificationPtr)
	} else {
		fmt.Println(aurora.BgRed("========================================"))
		fmt.Println(aurora.BgRed("Email sening utility failure type " + *typePtr + " is not known "))
		fmt.Println(aurora.BgRed("========================================"))
	}

}
