package com.araizen.www

import com.araizen.www.database.mysql.DatabaseObj
import com.araizen.www.database.mysql.user.UserDatabaseDao
import com.araizen.www.models.auth.LoginModel
import com.araizen.www.models.profile.ProfileModel
import com.araizen.www.utils.console.Println

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.client.HttpClient
import io.ktor.client.engine.apache.Apache
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.gson.gson
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.cio.websocket.*
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.serialization.DefaultJsonConfiguration
import io.ktor.serialization.serialization
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.close
import io.ktor.http.cio.websocket.readText
import io.ktor.request.receive
import io.ktor.response.respond
import kotlinx.serialization.json.Json
import java.text.DateFormat
import java.time.Duration


fun main(args: Array<String>): Unit {
   val db = DatabaseObj().connect()

    io.ktor.server.netty.EngineMain.main(args)

}

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {


    val client = HttpClient(Apache) {
    }

    install(DefaultHeaders) {
        header(HttpHeaders.Server, "Aurora")
        header("System", "Aurora - core")
    }
    // This uses use the logger to log every call (request/response)
    install(CallLogging)

    install(ContentNegotiation) {

        gson {
            setDateFormat(DateFormat.LONG)
            setPrettyPrinting()

        }
    }
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(60) // Disabled (null) by default
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE // Disabled (max value). The connection will be closed if surpassed this length.
        masking = false
    }




    routing {

        post("/register") {

        }
        post("/login") {

            val post = call.receive<LoginModel>()
            Println.yellow("post data $post")



            call.respond(mapOf("OK" to true))
        }


        post("/login/key") {

        }
        post("/forgot_password") {

        }
        post("/forgot_password_key") {

        }
        post("/reset_password") {

        }

        post("/update_settings") {

        }
        post("/updateProfileImage") {

        }

        post("/error") {

        }
        post("/feedback") {

        }
        post("/logout") {

        }
        webSocket("/ws/user") {

        }
        webSocket("/generator"){

        }


        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }

   }
}
