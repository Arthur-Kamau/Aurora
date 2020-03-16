package com.araizen.www.database.mysql.transaction


import com.araizen.www.database.mysql.auth.AuthDatabaseDao
import com.araizen.www.database.mysql.settings.SettingsDatabaseDao
import com.araizen.www.models.transaction.TransactionModel
import com.araizen.www.models.user_settings.UserSettingsModel
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime


class TransactionDatabaseDao {


    object TransactionTable : Table() {
         val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50) // Column<String>
        val transactionType = varchar("transaction_type", length = 50) // Column<String>
        val transactionId = varchar("transaction_id", length = 50).uniqueIndex() // Column<String>
        val transactionAmount = integer("amount") // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }

    /**
     * insertTransaction
     * insert a transaction based on the amount
     *
     * @param transactionItem -> the transaction model to be inserted
     */
  fun    insertTransaction (transactionItem: TransactionModel){
      transaction {

          val result = TransactionTable.insert{
              it[transactionAmount] = transactionItem.amount
              it[userId] = transactionItem.userId
              it[transactionType] = transactionItem.transactionType
              it[transactionId] = transactionItem.transactionId

          } get TransactionTable.id
      }
  }

    /**
     * getTransactionByTransactionId
     *
     * @param transactionId
     * @return TransactionModel
     */
    fun getTransactionByTransactionId(transactionId: String):TransactionModel?{
        var aTransaction : TransactionModel?  = null
        transaction {
            val res: Query = TransactionTable.select { TransactionTable.transactionId eq transactionId  }

            if (res.fetchSize == 0) {
                Println.red("Settings at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    Println.yellow("getUserProfile at index $i ")

                    aTransaction=  TransactionModel(
                            transactionId = item[TransactionTable.transactionId],
                            transactionType = item[TransactionTable.transactionType],
                            amount= item[TransactionTable.transactionAmount],
                            userId = item[TransactionTable.userId]
                        )


                }
            }
        }
        return  aTransaction
    }

    /**
     * getAllTransactions
     *
     * @return List<TransactionModel>
     */
    fun  getAllTransactions(): List<TransactionModel>{

        var allTransactions  = mutableListOf<TransactionModel>()
        transaction {
            val res: Query = TransactionTable.selectAll()

            if (res.fetchSize == 0) {
                Println.red("Settings at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    Println.yellow("getUserProfile at index $i ")
                    allTransactions.add(
                        TransactionModel(
                            transactionId = item[TransactionTable.transactionId],
                            transactionType = item[TransactionTable.transactionType],
                            amount= item[TransactionTable.transactionAmount],
                            userId = item[TransactionTable.userId]
                        )
                    )

                }
            }
        }
        return  allTransactions
    }


    /**
     * getAllUserTransactions
     *
     * @param userId
     * @return  List<TransactionModel>
     */
    fun getAllUserTransactions(userId: String): List<TransactionModel>{
        var allTransactions  = mutableListOf<TransactionModel>()
        transaction {
            val res: Query = TransactionTable.select { TransactionTable.userId  eq userId}

            if (res.fetchSize == 0) {
                Println.red("Settings at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    Println.yellow("getUserProfile at index $i ")
                    allTransactions.add(
                        TransactionModel(
                            transactionId = item[TransactionTable.transactionId],
                            transactionType = item[TransactionTable.transactionType],
                            amount= item[TransactionTable.transactionAmount],
                            userId = item[TransactionTable.userId]
                        )
                    )

                }
            }
        }
        return  allTransactions
    }



}