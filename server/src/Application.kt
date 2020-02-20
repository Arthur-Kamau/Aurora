package com.araizen.www

import com.araizen.www.core.jsonOperations.toJson.ToJsonOperations
import com.araizen.www.core.websocketAction.WebSocketAction
import com.araizen.www.model.websocket.WebSocketPayloadModel
import com.araizen.www.utils.console.Println
import com.beust.klaxon.Klaxon
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.serialization.DefaultJsonConfiguration
import io.ktor.serialization.serialization
import kotlinx.serialization.json.Json
import io.ktor.http.cio.websocket.*
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.websocket.*
import kotlinx.coroutines.channels.*
import java.time.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

data class PostSnippet(val snippet: PostSnippet.Text) {
    data class Text(val text: String)
}

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

        post("/login") {
            val multipart = call.receiveMultipart()
            call.respondTextWriter {
                if (!call.request.isMultipart()) {
                    Println.red("Not a multipart request")
                    appendln("Not a multipart request")
                } else {
                    while (true) {
                        val part = multipart.readPart() ?: break
                        when (part) {
                            is PartData.FormItem ->
                                Println.green("FormItem: ${part.name} = ${part.value}")
                            is PartData.FileItem ->
                                Println.yellow("FileItem: ${part.name} -> ${part.originalFileName} of ${part.contentType}")
                        }
                        part.dispose()
                    }
                }
            }
        }

        post("/schema-to-json") {

            val strContents = " int name ; String name ; String animal; int age ; String location"
            ToJsonOperations().generateJson(strContents)
            call.respondText("Dope!", contentType = ContentType.Text.Plain)
        }

        post("/json-to-schema") {


            call.respondText("Dope!", contentType = ContentType.Text.Plain)
        }

        // websocketSession
        webSocket("/ws/schema-to-json") {

            for (frame in incoming.mapNotNull { it as? Frame.Text }) {
                val text = frame.readText()
                if (text.equals("bye", ignoreCase = true)) {
                    close(CloseReason(CloseReason.Codes.NORMAL, "Client said BYE"))
                }



                val payload = Klaxon()
                    .parse<WebSocketPayloadModel>(text)


                val result = WebSocketAction().takAction(payload = payload!!)
                Println.green("to json received payload $payload  -- result  $result")

                outgoing.send(Frame.Text(text))



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