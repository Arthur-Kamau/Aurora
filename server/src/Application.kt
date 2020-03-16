package com.araizen.www

import com.araizen.www.core.generator.generate_json.GenerateJson
import com.araizen.www.core.generator.generate_json_data.GenerateJsonSeedData
import com.araizen.www.core.generator.generate_model.GenerateModel
import com.araizen.www.database.mysql.DatabaseObj
import com.araizen.www.models.api_response.ApiResponse
import com.araizen.www.models.auth.LoginModel
import com.araizen.www.models.websockets.WebSocketPayloadModel
import com.araizen.www.objects.result.HttpResult
import com.araizen.www.utils.console.Println
import com.araizen.www.utils.random_generator.RandomGenerator
import com.araizen.www.utils.validate.ValidateInput
import com.beust.klaxon.Klaxon
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
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.channels.mapNotNull
import java.io.BufferedReader
import java.io.File
import java.io.IOException
import java.io.InputStreamReader
import java.text.DateFormat
import java.time.Duration


fun main(args: Array<String>): Unit {
    val db = DatabaseObj().connect()
     startGoServer()
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

            val currentPath = File(".").canonicalPath
            println("Current dir:$currentPath")

            var isValidEmail = ValidateInput().isValidEmail(post.email)
            if (isValidEmail) {

                //generate key
                val key = RandomGenerator().generateRandomIntIntRange(1000, 9999)



                khttp.post(
                    url = "http://127.0.0.1:4000/login",
                    json = mapOf("email" to post.email, "key" to "$key"))




                val apiResponse = ApiResponse(
                    status = HttpResult.okResponse,
                    data = "",
                    reason = "invalid  email"
                )
                call.respond(Klaxon().toJsonString(apiResponse))
            } else {

                val apiResponse = ApiResponse(
                    status = HttpResult.errResponse,
                    data = "",
                    reason = "invalid  email"
                )
                call.respond(Klaxon().toJsonString(apiResponse))
            }

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
            for (frame in incoming.mapNotNull { it as? Frame.Text }) {
                val text = frame.readText()

                val payload = Klaxon()
                    .parse<WebSocketPayloadModel>(text)
                Println.yellow("ws/user - payload ${payload.toString()}")

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
                        val result = GenerateModel().generate(payload = payload!!.payload)
                        Println.green("to json received payload $payload  -- result  $result")
                        outgoing.send(Frame.Text(result))
                    }
                    payload?.action.equals("generate_json", ignoreCase = true) -> {
                        val result = GenerateJson().convertToJsonFromRawSchemaString(payload = payload!!.payload)
//                         Println.green("to json received payload $payload  -- result  $result")
                        outgoing.send(Frame.Text(result))
                    }

                    payload?.action.equals("generate_json_data", ignoreCase = true) -> {
                        val result = GenerateJsonSeedData().generate(payload = payload!!.payload)
                        // Println.green("to json received payload $payload  -- result  $result")
                        outgoing.send(Frame.Text(text))
                    }
                    else -> {
                        Println.red("=> undifned action")
                        outgoing.send(Frame.Text(text))
                    }
                }


            }
        }


        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }

    }
}

fun startGoServer(){
    try {

        // -- Linux --
        val current = File(".").canonicalPath
        println("Current dir:$current")
        var execPath = current+File.separator+"email_server"+File.separator+"main_server.go"
        // Run a shell command
         var process = Runtime.getRuntime().exec("go run $execPath");

        // Run a shell script
        // Process process = Runtime.getRuntime().exec("path/to/hello.sh");

        // -- Windows --

        // Run a command
        //Process process = Runtime.getRuntime().exec("cmd /c dir C:\\Users\\mkyong");

        //Run a bat file
//        var process = Runtime.getRuntime().exec(
//            "cmd /c hello.bat", null,  File("C:\\Users\\mkyong\\"));

        var output =  StringBuilder();

        var reader =  BufferedReader(
             InputStreamReader(process.getInputStream())
        );

        var line : String = "";
//        while ((line = reader.readLine()) != null) {
//            output.append(line + "\n");
//        }

        var exitVal = process.waitFor();
        if (exitVal == 0) {
            System.out.println("Success!");
            System.out.println(output);
            System.exit(0);
        } else {
            //abnormal...
        }

    } catch ( e: IOException) {
        e.printStackTrace();
    } catch ( e : InterruptedException) {
        e.printStackTrace();
    }

}




