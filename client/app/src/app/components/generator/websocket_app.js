export default class WebsocketController {
    static instance = WebsocketController.instance || new WebsocketController()

    webscoketConnection() {
        console.log("Hello World... \(^_^)/ !!");
        var web =new WebSocket("wss://echo.websocket.org")
        web.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('web skt connected')
        }
return web;
    }
}