package com.araizen.www

import com.araizen.www.core.generator.generate_json.GenerateJson
import com.araizen.www.core.generator.generate_json_data.GenerateJsonSeedData
import com.araizen.www.core.generator.generate_model.GenerateModel
import com.araizen.www.database.mysql.DatabaseObj
import com.araizen.www.database.mysql.auth.AuthDatabaseDao
import com.araizen.www.database.mysql.feedback.FeedbackDatabaseDao
import com.araizen.www.database.mysql.user_profile.ProfileDatabaseDao
import com.araizen.www.models.api_response.ApiResponse
import com.araizen.www.models.auth.LoginKeyModel
import com.araizen.www.models.auth.LoginModel
import com.araizen.www.models.feedback.FeedbackModel
import com.araizen.www.models.websockets.WebSocketPayloadModel
import com.araizen.www.models.websockets.WebsSocketResponse
import com.araizen.www.objects.result.HttpResult
import com.araizen.www.utils.console.Println
import com.araizen.www.utils.random_generator.RandomGenerator
import com.araizen.www.utils.validate.ValidateInput
import com.auth0.jwk.UrlJwkProvider
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import com.beust.klaxon.Klaxon
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.*
import io.ktor.client.HttpClient
import io.ktor.client.engine.apache.Apache
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.features.DefaultHeaders
import io.ktor.gson.gson
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.cio.websocket.*
import io.ktor.http.content.PartData
import io.ktor.http.content.streamProvider
import io.ktor.request.isMultipart
import io.ktor.request.receive
import io.ktor.request.receiveMultipart
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.response.respondTextWriter
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.channels.mapNotNull
import utils.post.curl.AppCurl
import java.io.*
import java.io.File
import java.net.URL
import java.security.interfaces.RSAPublicKey
import java.text.DateFormat
import java.time.Duration
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter


fun main(args: Array<String>): Unit {
    val db = DatabaseObj().connect()


    var one = object : Thread() {
        override fun run() {
            try {
                Println.blue("==========================================")
                Println.blue("Starting go server")
                Println.blue("==========================================")
                startGoServer()
            } catch (v: InterruptedException) {
                Println.red("Error $v")
            }
        }
    }

    one.start()
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


                var doesUserExist = AuthDatabaseDao().doesUserExist(email = post.email)

                //generate key
                val key = RandomGenerator().generateRandomIntIntRange(1000, 9999)


                AppCurl().sendLoginEmail(post.email, key.toString())


                AuthDatabaseDao().registerUser(
                    emailPar = post.email,
                    userIdPar = RandomGenerator().getAlphaNumericString(10)!!,
                    loginKeyPar = key.toString()
                )

                val apiResponse = ApiResponse(
                    status = HttpResult.okResponse,
                    data = "",
                    reason = "login key sent to email"
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

            val post = call.receive<LoginKeyModel>()
            Println.yellow("login key post data $post")
            var doesUserExistWithKey = AuthDatabaseDao().loginUserWithEmailKey(email = post.email, key = post.key)

            if (doesUserExistWithKey.first) {
                Println.yellow("user exist and the user id is ${doesUserExistWithKey.second}")

                var userProfile = ProfileDatabaseDao().getUserProfile(userId = doesUserExistWithKey.second)


                if (userProfile?.name.isNullOrEmpty() || userProfile?.email.isNullOrEmpty() || userProfile?.userId.isNullOrEmpty()) {

                    val apiResponse = ApiResponse(
                        status = HttpResult.userShouldRegister,
                        data = "",
                        reason = "user has no profile"
                    )
                    call.respond(Klaxon().toJsonString(apiResponse))
                } else {
                    val apiResponse = ApiResponse(
                        status = HttpResult.okResponse,
                        data = Klaxon().toJsonString(userProfile),
                        reason = "ok"
                    )
                    call.respond(Klaxon().toJsonString(apiResponse))
                }
            } else {
                val apiResponse = ApiResponse(
                    status = HttpResult.errResponse,
                    data = "",
                    reason = "invalid  email or key"
                )
                call.respond(Klaxon().toJsonString(apiResponse))
            }

        }
        post("/forgot_password") {
            val post = call.receive<LoginModel>()
            Println.yellow("post data $post")

            val currentPath = File(".").canonicalPath
            println("Current dir:$currentPath")

            var isValidEmail = ValidateInput().isValidEmail(post.email)
            if (isValidEmail) {


                var doesUserExist = AuthDatabaseDao().doesUserExist(email = post.email)

                //generate key
                val key = RandomGenerator().generateRandomIntIntRange(1000, 9999)


                AppCurl().sendLoginEmail(post.email, key.toString())


                AuthDatabaseDao().registerUser(
                    emailPar = post.email,
                    userIdPar = RandomGenerator().getAlphaNumericString(10)!!,
                    loginKeyPar = key.toString()
                )

                val apiResponse = ApiResponse(
                    status = HttpResult.okResponse,
                    data = "",
                    reason = "login key sent to email"
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
        post("/forgot_password_key") {

        }
        post("/reset_password") {

        }

        post("/update_settings") {

        }
        post("/update_profile_image") {
            val multipart = call.receiveMultipart()
            call.respondTextWriter {
                if (!call.request.isMultipart()) {
                    Println.red("Not a multipart request")
                } else {

                    var mapOfUserForm = mutableMapOf<String, String>()
                    while (true) {
                        val part = multipart.readPart() ?: break
                        when (part) {
                            is PartData.FormItem -> {
                                appendln("FormItem: ${part.name} = ${part.value}")
                            }
                            is PartData.FileItem -> {

                                appendln("FileItem: ${part.name} -> ${part.originalFileName} of ${part.contentType}")

                                try {

                                    var stream   = part.streamProvider() // as InputStream
                                    val buffer = ByteArray(stream.available())
                                    stream.read(buffer)

                                    val current = File(".").canonicalPath
                                    val utc = ZonedDateTime.now(ZoneOffset.UTC)
                                    var finalDir = "$current/assets/profile/${utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))}"

                                    //Creating a File object
                                    val file = File(finalDir)
                                    //Creating the directory
                                    val bool: Boolean = file.mkdir()
                                    if (bool) {
                                        println("Directory created successfully")
                                    } else {
                                        println("Sorry couldn’t create specified directory")
                                    }

                                    val targetFile = File("$finalDir/${part.originalFileName}")
                                    mapOfUserForm.putIfAbsent("avatar_url", targetFile.absolutePath)
                                    val outStream: OutputStream = FileOutputStream(targetFile)
                                    outStream.write(buffer)


                                } catch (e: IOException) {
                                    println("An error occurred.")
                                    e.printStackTrace()
                                }
                            }
                        }
                        part.dispose()
                    }

//

                    ProfileDatabaseDao().updateUserProfile(
                        column = "avatar_url",
                        userId = if (mapOfUserForm["user_id"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("user_id")!!},
                        newValue = if (mapOfUserForm["avatar_url"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("avatar_url")!!}
                    )
                }
            }
        }

        post("/error") {

        }
        post("/feedback") {
            val multipart = call.receiveMultipart()
            call.respondTextWriter {
                if (!call.request.isMultipart()) {
                    Println.red("Not a multipart request")
                } else {

                    var mapOfUserForm = mutableMapOf<String, String>()
                    while (true) {
                        val part = multipart.readPart() ?: break
                        when (part) {
                            is PartData.FormItem -> {
                                appendln("FormItem: ${part.name} = ${part.value}")
                                mapOfUserForm.putIfAbsent(part.name!!, part.value)
                            }
                            is PartData.FileItem -> {

                                appendln("FileItem: ${part.name} -> ${part.originalFileName} of ${part.contentType}")

                                try {

                                    var stream   = part.streamProvider() // as InputStream
                                    val buffer = ByteArray(stream.available())
                                    stream.read(buffer)

                                    val current = File(".").canonicalPath
                                    val utc = ZonedDateTime.now(ZoneOffset.UTC)
                                    var finalDir = "$current/assets/feedback/${utc.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))}"

                                    //Creating a File object
                                    val file = File(finalDir)
                                    //Creating the directory
                                    val bool: Boolean = file.mkdir()
                                    if (bool) {
                                        println("Directory created successfully")
                                    } else {
                                        println("Sorry couldn’t create specified directory")
                                    }

                                    val targetFile = File("$finalDir/${part.originalFileName}")
                                    mapOfUserForm.putIfAbsent("file", targetFile.absolutePath)

//                                    if(!targetFile.exists()){
//                                        if (targetFile.createNewFile()) {
//                                            println("File created: " + targetFile.name);
//                                        } else {
//                                            println("File already exists.");
//                                        }
//                                    }

                                    val outStream: OutputStream = FileOutputStream(targetFile)
                                    outStream.write(buffer)


                                } catch (e: IOException) {
                                    println("An error occurred.")
                                    e.printStackTrace()
                                }
                            }
                        }

                        part.dispose()
                    }
//                    var feedbackModel = FeedbackModel(
//                        userId = if (mapOfUserForm["user_id"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("user_id")!!},
//                        fileLocation =  if (mapOfUserForm["file"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("file")!!},
//                        description =  if (mapOfUserForm["description"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("description")!!},
//                        isAddressed = false,
//                        name = if (mapOfUserForm["name"].isNullOrEmpty()){"none"}else{mapOfUserForm.get("name")!!},
//                        id = 0
//                    )
//                    FeedbackDatabaseDao().insertFeedback(feedbackModel = feedbackModel)


                }
            }
        }
        post("/logout") {
            call.respond("ok")
        }

        post("/account/data") {
            val authHeader = call.request.parseAuthorizationHeader()
            if (!(authHeader == null || authHeader !is HttpAuthHeader.Single || authHeader.authScheme != "Bearer")) {
                try {
                    val jwt = verifyToken(authHeader.blob)
                    context.authentication.principal =
                        UserIdPrincipal(jwt.subject ?: jwt.getClaim("client_id").asString())
                } catch (e: Exception) {
                    // ignore invalid token
                    Println.red("invalid token")
                }
            }

            if (call.principal<UserIdPrincipal>() != null) {
                call.respondText("Hello ${call.principal<UserIdPrincipal>()?.name}!")
            } else {
                call.respond(UnauthorizedResponse(HttpAuthHeader.Parameterized("Bearer", mapOf("realm" to "api1"))))
            }

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

                when {
                    payload?.action.equals("bye", ignoreCase = true) -> {
                        close(CloseReason(CloseReason.Codes.NORMAL, "Client said BYE"))
                    }
                    payload?.action.equals("generate_schema", ignoreCase = true) -> {
                        val result = GenerateModel().generate(payload = payload!!.payload)
                        val response = WebsSocketResponse(message = result, action = "generate_schema")
                        outgoing.send(Frame.Text(Klaxon().toJsonString(response)))
                    }
                    payload?.action.equals("generate_json", ignoreCase = true) -> {
                        val result = GenerateJson().convertToJsonFromRawSchemaString(payload = payload!!.payload)
                        val response = WebsSocketResponse(message = result, action = "generate_json")
                        outgoing.send(Frame.Text(Klaxon().toJsonString(response)))
                    }

                    payload?.action.equals("generate_json_data", ignoreCase = true) -> {
                        val result = GenerateJsonSeedData().generate(payload = payload!!.payload)
                        val response = WebsSocketResponse(message = result, action = "generate_json_data")
                        outgoing.send(Frame.Text(Klaxon().toJsonString(response)))
                    }
                    else -> {
                        Println.red("=> undifned action")
                        val response = WebsSocketResponse(message = text, action = "undifined_action")
                        outgoing.send(Frame.Text(Klaxon().toJsonString(response)))
                    }
                }


            }
        }


        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }

    }
}

fun startGoServer() {
    try {

        // -- Linux --
        val current = File(".").canonicalPath
        println("Current dir:$current")
        var execPath = current + File.separator + "email_server" + File.separator + "main_server.go"
        // Run a shell command
        var process = Runtime.getRuntime().exec("go run $execPath")

        // Run a shell script
        // Process process = Runtime.getRuntime().exec("path/to/hello.sh");

        // -- Windows --

        // Run a command
        //Process process = Runtime.getRuntime().exec("cmd /c dir C:\\Users\\mkyong");

        //Run a bat file
//        var process = Runtime.getRuntime().exec(
//            "cmd /c hello.bat", null,  File("C:\\Users\\mkyong\\"));

        var output = StringBuilder()

        var reader = BufferedReader(
            InputStreamReader(process.inputStream)
        )

        var line: String = ""
//        while ((line = reader.readLine()) != null) {
//            output.append(line + "\n");
//        }

        var exitVal = process.waitFor()
        if (exitVal == 0) {
            println("Success!")
            println(output)
            System.exit(0)
        } else {
            //abnormal...
        }

    } catch (e: IOException) {
        e.printStackTrace()
    } catch (e: InterruptedException) {
        e.printStackTrace()
    }

}


fun verifyToken(token: String): DecodedJWT {
    val jwkProvider = UrlJwkProvider(URL("http://localhost:5000/.well-known/openid-configuration/jwks"))

    val jwt = JWT.decode(token)
    val jwk = jwkProvider.get(jwt.keyId)

    //val publicKey: RSAPublicKey = jwk.publicKey as RSAPublicKey // unsafe
    val publicKey = jwk.publicKey as? RSAPublicKey ?: throw Exception("Invalid key type") // safe

    val algorithm = when (jwk.algorithm) {
        "RS256" -> Algorithm.RSA256(publicKey, null)
        else -> throw Exception("Unsupported algorithm")
    }

    val verifier = JWT.require(algorithm) // signature
        .withIssuer("http://localhost:5000") // iss
        .withAudience("api1") // aud
        .build()

    return verifier.verify(token)
}

/**
 * Research material
 * https://www.scottbrady91.com/Kotlin/JSON-Web-Token-Verification-in-Ktor-using-Kotlin-and-Java-JWT
 */
