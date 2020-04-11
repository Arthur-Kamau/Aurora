const AppUrls = {
    baseUrl: "http://0.0.0.0:8080/", 
  
    //post urls
    toJsonWebSocket: "ws://0.0.0.0:8080/ws/schema-to-json",
    errrorPost: "http://0.0.0.0:8080/error",
    loginPost: "http://0.0.0.0:8080/login",
    loginKeyPost: "http://0.0.0.0:8080/login/key",
    loginPostProfileDetails: "http://0.0.0.0:8080/login/profile-details",
  
    registerPost: "http://0.0.0.0:8080/register",
    forgotPasswordPost: "http://0.0.0.0:8080/forgot_password",
    forgotPasswordKeyPost: "http://0.0.0.0:8080/forgot_password_key",
  
    resetPasswordPost: "http://0.0.0.0:8080/reset_password",
    settingsUpdatePost: "http://0.0.0.0:8080/update_settings",
    settingsUpdateProfile: "http://0.0.0.0:8080/updateProfileImage",
    
    
    feedbackPost: "http://0.0.0.0:8080/feedback",
    logoutPost: "http://0.0.0.0:8080/logout",
  
  
  
    // app pages
    generatorPage: "http://127.0.0.1:4040/aurora/generator", 
    dumpServerPage: "http://127.0.0.1:4040/aurora/dump_server", 
    connectionToolPage: "http://127.0.0.1:4040/aurora/connection_tool", 
    pageNotFoundPage: "http://127.0.0.1:4040/aurora/404", 
    errorPage: "http://127.0.0.1:4040/aurora/505", 
    settingsPage: "http://127.0.0.1:4040/aurora/settings", 
    loginPage: "http://127.0.0.1:4040/aurora/login", 
    loginKeyPage: "http://127.0.0.1:4040/aurora/login-key", 
    loginPersonalDetailsPage: "http://127.0.0.1:4040/aurora/login-personal-details", 
    logoutPage: "http://127.0.0.1:4040/aurora/logout", 
    registerPage: "http://127.0.0.1:4040/aurora/register", 
    forgotPasswordPage: "http://127.0.0.1:4040/aurora/forgot-password", 
    forgotPasswordKeyPage: "http://127.0.0.1:4040/aurora/forgot-password-key", 
    resetPasswordPage: "http://127.0.0.1:4040/aurora/reset-password", 
   
  
  
  
  
  }
  export default AppUrls;