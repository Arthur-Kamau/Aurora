/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package utils.jwt

import io.jsonwebtoken.JwtBuilder
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.Key
import java.util.*
import javax.crypto.spec.SecretKeySpec
import javax.xml.bind.DatatypeConverter


class AppJwt {
companion object {
   var secreatKey = "1234567890qwerty"
}
    //Sample method to construct a JWT
     fun createJWT(
        id: String,
        issuer: String,
        subject: String,
        ttlMillis: Long
    ): String? { //The JWT signature algorithm we will be using to sign the token
        val signatureAlgorithm: SignatureAlgorithm = SignatureAlgorithm.HS256
        val nowMillis = System.currentTimeMillis()
        val now = Date(nowMillis)
        //We will sign our JWT with our ApiKey secret
        val apiKeySecretBytes: ByteArray = DatatypeConverter.parseBase64Binary(secreatKey)
        val signingKey: Key = SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName())
        //Let's set the JWT Claims
        val builder: JwtBuilder = Jwts.builder().setId(id)
            .setIssuedAt(now)
            .setSubject(subject)
            .setIssuer(issuer)
            .signWith(signatureAlgorithm, signingKey)
        //if it has been specified, let's add the expiration
        if (ttlMillis >= 0) {
            val expMillis = nowMillis + ttlMillis
            val exp = Date(expMillis)
            builder.setExpiration(exp)
        }
        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact()
    }


    //Sample method to validate and read the JWT
     fun parseJWT(jwt: String) : String { //This line will throw an exception if it is not a signed JWS (as expected)
        val claims = Jwts.parser()
            .setSigningKey(DatatypeConverter.parseBase64Binary(secreatKey))
            .parseClaimsJws(jwt).body
        println("ID: " + claims.id)
        println("Subject: " + claims.subject)
        println("Issuer: " + claims.issuer)
        println("Expiration: " + claims.expiration)

        return claims.subject;
    }


}