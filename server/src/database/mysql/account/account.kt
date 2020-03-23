package com.araizen.www.database.mysql.account

import com.araizen.www.models.account.AccountModel
import com.araizen.www.objects.plan_types.PlanTypes
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.BatchUpdateException
import java.sql.SQLIntegrityConstraintViolationException
import java.time.LocalDateTime

class AccountDatabaseDao {

    object AccountTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50) .uniqueIndex()// Column<String>
        val userPlan = varchar("user_plan", length = 50).default(PlanTypes.freePlan.toString()) // Column<String>
        val accountBalance = integer("account_balance")// Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }

  fun  createAccount (accountModel : AccountModel){
    try{  transaction {
          AccountTable.insert {

              it[userId] = accountModel.userId
              it[userPlan] = accountModel.userPlan
              it[accountBalance] = accountModel.accountBalance
          }
      } } catch (e: Exception) {
        when ((e as? ExposedSQLException)?.cause) {
            is SQLIntegrityConstraintViolationException ->
                Println.red("createAccount SQL constraint violated")
            is BatchUpdateException ->
                Println.red("createAccount SQL constraint violated")
            else ->
                Println.red("createAccount Error ${e.message}")
        }
    }
  }

    fun getAllAccounts(): List<AccountModel>{
        var accountsList = mutableListOf<AccountModel>();
        transaction {
            val res = AccountTable.selectAll()
            for (item in res) {
                accountsList.add(
                    AccountModel(
                        userId = item[AccountTable.userId],
                        accountBalance = item[AccountTable.accountBalance],
                        userPlan = item[AccountTable.userPlan]

                    )
                )
            }
        }
        return accountsList
    }
    fun getAccountDetails(userId: String){

        var accountModel: AccountModel? = null;
        transaction {
            val res: Query = AccountTable.select { AccountTable.userId eq userId }

            if (res.fetchSize == 0) {
                Println.red("getUserProfile at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    accountModel = AccountModel(
                        userId = item[AccountTable.userId],
                        accountBalance = item[AccountTable.accountBalance],
                        userPlan = item[AccountTable.userPlan]

                    )
                }
            }
        }
    }
    fun updateUserPlan(userId: String, userPlan : String){

    }

    fun updateAccountBalance(userId: String, accountBalance : Int){

    }




}