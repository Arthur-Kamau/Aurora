const AppResponseStatus = {

    //OkResponse return ok in response data struct
    okResponse: 200,

    //UnAuthroizedResponse return unauthorized in response data struct
    unAuthenticatedResponse: 300,

    //ErrorResponse return err in response data struct
    errResponse: 400,

    // email not registered
    emailNotExistInDatabase: 405, 

    




}
module.exports = AppResponseStatus;
