package com.araizen.www.core.websocketAction

import com.araizen.www.core.jsonOperations.toJson.ToJsonOperations
import com.araizen.www.model.websocket.WebSocketPayloadModel
import com.araizen.www.objects.websockets.WebSocketActions
import com.araizen.www.utils.console.Println

class WebSocketAction{
  fun  takAction( payload: WebSocketPayloadModel) :String {
    return  when (payload.action){
        WebSocketActions.schemaToJSON ->{
            ToJsonOperations().generateJson(payload.payload)
        }
        else ->{
            Println.green("Alert web sockets action plan last clause")
            ""
        }
    }


  }
}