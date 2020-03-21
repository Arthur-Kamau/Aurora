package com.araizen.www.database.mysql.auth

import com.araizen.www.database.mysql.account.AccountDatabaseDao.AccountTable.uniqueIndex
import com.araizen.www.database.mysql.user_profile.ProfileDatabaseDao
import com.araizen.www.models.profile.ProfileModel
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class AuthDatabaseDao {


    object AuthTable : Table() {
         val id = integer("id").autoIncrement() // Column<String>
        val userId = varchar("user_id", length = 50).uniqueIndex() // Column<String>
        val resetKey = varchar("reset_key", length = 50).nullable() // Column<String>
        val isBlocked = bool("is_blocked").default(false) // Column<String>
        val loginKey = varchar("login_key", length = 50).default("0") // Column<String>
        val email = varchar("email", length = 50) // Column<String>
        val password = varchar("password", length = 50).nullable() // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>


        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }


    /**
     * doesUserExist
     *
     * @param email the email to check
     * @return Boolean whether the user exist or not
     */
    fun doesUserExist(email: String): Boolean {
        var userExist = false
        transaction {
            val res: Query = AuthTable.select { AuthTable.email eq email }

            if (res.fetchSize == 0) {
                Println.red("doesUserExist no he does not ")

            } else {
                Println.red("doesUserExist yes he does ")
                userExist = true

            }
        }
        return userExist
    }





    /**
     *
     * loginUserWithEmailKey
     * check if email and key exit in the database
     *
     * @param email
     * @param key
     *
     * @return Boolean whether success
     */
    fun loginUserWithEmailKey(email: String, key: String): Pair<Boolean, String> {
        var isUserAuth = false
        var userId = ""
        transaction {
            val res: Query = AuthTable.select { AuthTable.email.eq(email) and AuthTable.loginKey.eq(key) }

            Println.yellow("loginUserWithEmailKey user id ${res.toString()}")
            if (res.fetchSize == 0) {
                Println.red("loginUser wrong email and passsword ")

            } else {
                Println.red("loginUser correct email and password ")
                isUserAuth = true



                for ((i, item) in res.withIndex()) {
                    Println.yellow("loginUserWithEmailKey at index $i ")
                    userId = item[AuthTable.userId]
                }

            }
        }
        return Pair(isUserAuth, userId)
    }
    /**
     *
     * loginUser
     * check if email and password exit in the database
     *
     * @param email
     * @param password
     *
     * @return Boolean whether success
     */
    fun loginUser(email: String, password: String): Boolean {
        var isUserAuth = false
        transaction {
            val res: Query = AuthTable.select { AuthTable.email.eq(email) and AuthTable.password.eq(password) }

            if (res.fetchSize == 0) {
                Println.red("loginUser wrong email and passsword ")

            } else {
                Println.red("loginUser correct email and password ")
                isUserAuth = true

            }
        }
        return isUserAuth
    }


    /** blockOrUnBlockUser
     * This function blocks and unblocks a user if true the user is blocked if false the user is blocked.
     *
     * @param  email -> email the user who should be blocked
     * @param blockOrUnblock -> the state is it to block or unblock
     * @return Boolean -> was the operation successful.
     *
     * */
    fun blockOrUnBlockUser(email: String, blockOrUnblock: Boolean): Boolean {
        return if (doesUserExist(email = email)) {
            transaction {
                AuthTable.update({ AuthTable.email.eq(email) }) {
                    it[AuthTable.isBlocked] = blockOrUnblock
                }
            }
            true
        } else {
            false
        }
    }


    /**
     *
     *  @param emailPar -> user email
     *  @param userIdPar -
     */
    fun registerUser(emailPar: String, userIdPar: String,loginKeyPar : String) {
      transaction {

          val result = AuthTable.insert{
               it[email] = emailPar
               it[userId] = userIdPar
               it[loginKey] = loginKeyPar
          } get AuthTable.id
      }

    }


}