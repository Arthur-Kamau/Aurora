package email

import com.araizen.www.utils.console.Println

class emailAction {
    fun sendEmail() {
        val sender = GMailSender(
            "kennkamau09@gmail.com",
            "@Githurai45"
        )
        try {
            sender.sendMail("subject", "alert", "kamau", "kamaukenn11@gmail.com")
        } catch (ex: Exception) {
                   Println.red("====================================================");
                   Println.red("Email Send Error ");
                   Println.red("====================================================");
        }
    }
}