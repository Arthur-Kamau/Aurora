/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.objects.result

class HttpResult {


    companion object{
        //OkResponse return ok in response data struct
       var  okResponse = 200

        //UnAuthroizedResponse return unauthorized in response data struct
       var  unAuthenticatedResponse = 300


        //ErrorResponse return err in response data struct
       var errResponse = 400

        // email not registered
        var userShouldRegister = 405

        // load login page
        var loadLoginPage = 410
    }
}