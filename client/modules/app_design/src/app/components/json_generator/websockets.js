// var SingletonFactory = (function(){
//     function SingletonClass() {
//         //do stuff
//     }
//     var instance;
//     return {
//         getInstance: function(){
//             if (instance == null) {
//                 instance = new SingletonClass();
//                 // Hide the constructor so the returned object can't be new'd...
//                 instance.constructor = null;
//             }
//             return instance;
//         }
//    };
// })();
// var test = SingletonFactory.getInstance();

// export   const websocket = new WebSocket("wss://echo.websocket.org")
export   const websocket = new WebSocket("ws://0.0.0.0:8080/ws/schema-to-json")