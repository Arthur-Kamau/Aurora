package com.araizen.www.core.websocketAction

import com.araizen.www.core.generator.generateJson.GenerateJson
import com.araizen.www.core.generator.generateSchema.GenerateSchema
import com.araizen.www.model.websocket.WebSocketPayloadModel
import com.araizen.www.objects.websockets.WebSocketActions
import com.araizen.www.utils.console.Println
import com.beust.klaxon.Klaxon

class WebSocketAction {
    fun takAction(payload: WebSocketPayloadModel): String {
        var result: String = ""
        when (payload.action) {
            WebSocketActions.schemaToJSON -> {
                val jsonData = GenerateJson().convertToJsonFromRawSchemaString(payload.payload)
                val data = WebSocketPayloadModel(action = payload.action, payload = jsonData)
                Println.cyan("json data $jsonData and $data")
                result = Klaxon().toJsonString(data)
            }
            WebSocketActions.jsonToSchema -> {
                val schemaData = GenerateSchema().convertToSchemaFromRawJsonString(payload.payload)
                val data = WebSocketPayloadModel(action = payload.action, payload = schemaData)
                Println.cyan("schema data $schemaData and $data")
                result = Klaxon().toJsonString(data)

            }
            else -> {
                Println.green("Alert web sockets action plan last clause")
                result = Klaxon().toJsonString(payload)
            }
        }

        return result
    }
}