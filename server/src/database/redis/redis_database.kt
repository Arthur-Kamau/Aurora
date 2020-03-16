package com.araizen.www.database.redis

import redis.clients.jedis.Jedis




class RedisDatabase {
    fun storeLoginToken( userId: String, loginToken : String ){
        val jedis = Jedis("localhost",6379)
        jedis.set(userId, loginToken)
    }

    fun getLoginToken(userId:String):String{
        val jedis = Jedis("localhost",6379)
        return jedis[userId]
    }
}