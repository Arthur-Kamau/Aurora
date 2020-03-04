# Email
This package is used to send email.
Currently supports smtp.
All emails are store under static/html/email you can find them [here](../static/html/email)

## Email types.
various events cause emails to be sent, these include :
* User Register.
* Company Register.
* Forgot password.
* Schedule reminder `a day before the intended reminder date`
* folder being watched was accessed.
* server up. (INTERNAL)
* server down. (INTERNAL)
* cloud space `running out of server space based on package`
* transaction succefull (COMMING SOON) `transfer funds from wallet`
* archive created `when a back up of all the company data is zipped and to be downloaded`
* user notification `this include promotion, reminder and suspicious activity(comming soon)`