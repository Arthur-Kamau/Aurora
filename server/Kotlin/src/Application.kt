package com.araizen.www

import com.araizen.www.core.websocketAction.WebSocketAction
import com.araizen.www.database.setUpConnection
import com.araizen.www.model.websocket.WebSocketPayloadModel
import com.araizen.www.utils.console.Println
import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.beust.klaxon.Klaxon
import email.emailAction
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.client.HttpClient
import io.ktor.client.engine.apache.Apache
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.close
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.PartData
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.request.isMultipart
import io.ktor.request.receiveMultipart
import io.ktor.response.respondText
import io.ktor.response.respondTextWriter
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.serialization.DefaultJsonConfiguration
import io.ktor.serialization.serialization
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.channels.mapNotNull
import kotlinx.serialization.json.Json
import java.time.Duration


fun main(args: Array<String>): Unit {


    setUpConnection()
    return io.ktor.server.netty.EngineMain.main(args)
}


data class PostSnippet(val snippet: PostSnippet.Text) {
    data class Text(val text: String)
}

private val algorithm = Algorithm.HMAC256("secret")
private fun makeJwtVerifier(issuer: String, audience: String): JWTVerifier = JWT
    .require(algorithm)
    .withAudience(audience)
    .withIssuer(issuer)
    .build()

@Suppress("unused") // Referenced in application.conf
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {

    val client = HttpClient(Apache) {
    }

    initDB()
    install(DefaultHeaders) {
        header(HttpHeaders.Server, "Aurora")
        header("System", "Aurora - core")
    }
    // This uses use the logger to log every call (request/response)
    install(CallLogging)

    install(ContentNegotiation) {
        serialization(
            contentType = ContentType.Application.Json,
            json = Json(
                DefaultJsonConfiguration.copy(
                    prettyPrint = true
                )
            )
        )
    }
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(60) // Disabled (null) by default
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE // Disabled (max value). The connection will be closed if surpassed this length.
        masking = false
    }





    routing {


        get("/register") {
            emailAction().sendEmail()
        }
        post("/register") {
            emailAction().sendEmail()
            call.respondText("Dope!", contentType = ContentType.Text.Any)
        }
        post("/login") {
            val multipart = call.receiveMultipart()
            call.respondTextWriter {
                if (!call.request.isMultipart()) {
                    appendln("Not a multipart request")
                } else {
                    while (true) {
                        val part = multipart.readPart() ?: break
                        when (part) {
                            is PartData.FormItem ->
                                appendln("FormItem: ${part.name} = ${part.value}")
                            is PartData.FileItem ->
                                appendln("FileItem: ${part.name} -> ${part.originalFileName} of ${part.contentType}")
                        }
                        part.dispose()
                    }
                }
            }
        }

        // websocketSession
        webSocket("/ws/user") {
            for (frame in incoming.mapNotNull { it as? Frame.Text }) {
                val text = frame.readText();

                outgoing.send(Frame.Text(text))
            }
        }
        webSocket("/generator") {

            for (frame in incoming.mapNotNull { it as? Frame.Text }) {
                val text = frame.readText()

                val payload = Klaxon()
                    .parse<WebSocketPayloadModel>(text)
//                Println.yellow("payload ${payload.toString()}")

                when {
                    payload?.action.equals("bye", ignoreCase = true) -> {
                        close(CloseReason(CloseReason.Codes.NORMAL, "Client said BYE"))
                    }
                    payload?.action.equals("generate_schema", ignoreCase = true) -> {
                        val result = WebSocketAction().takAction(payload = payload!!)
                        Println.green("to json received payload $payload  -- result  $result")
                        outgoing.send(Frame.Text(result))
                    }
                    payload?.action.equals("generate_json", ignoreCase = true) -> {
                        val result = WebSocketAction().takAction(payload = payload!!)
                       // Println.green("to json received payload $payload  -- result  $result")
                        outgoing.send(Frame.Text(text))
                    }
                    else -> {
                        Println.red("=>  undifned action")
                        outgoing.send(Frame.Text(text))
                    }
                }


            }
        }

        //default place holder
        get("/") {
            call.respondText("Aurora does not understand your intention", contentType = ContentType.Text.Plain)
        }
        // Static feature. Try to access `/static/ktor_logo.svg`
        static("/static") {
            resources("static")
        }
    }
}

fun initDB() {

}