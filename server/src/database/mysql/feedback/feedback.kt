
package com.araizen.www.database.mysql.feedback

import com.araizen.www.database.mysql.auth.AuthDatabaseDao
import com.araizen.www.models.feedback.FeedbackModel
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class FeedbackDatabaseDao {

    object FeedbackTable : Table() {
        val id = integer("id").autoIncrement() // Column<String>

        val isAddressed = bool("is_addressed") // Column<String>
        val userId = varchar("user_id", length = 50) // Column<String>
        val name = varchar("name", length = 50).nullable() // Column<String>
        val description = varchar("description", length = 50).nullable() // Column<String>
        val fileLocation = text("fileLocation")// Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID")
    }


    /**
     * getAllFeedBackData
     * get all feeddbacks from the database
     *
     * @param
     * @return List<FeedbackModel> -> list of feedback model object
     */
    fun getAllFeedBackData(): List<FeedbackModel> {
        var getFeedback = mutableListOf<FeedbackModel>()
        transaction {
            val res = FeedbackTable.selectAll()
            for (item in res) {

                getFeedback.add(

                    FeedbackModel(
                        id = item[FeedbackTable.id],
                        isAddressed = item[FeedbackTable.isAddressed],
                        name = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no name provided"
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        description = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no description provided "
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        fileLocation = item[FeedbackTable.fileLocation],
                        userId = item[FeedbackTable.userId]
                    )
                )
            }
        }
        return getFeedback
    }

    /**
     * getAllUnaddressedFeedback
     * get all feedback from the database that have not beed adresed
     *
     * @param
     * @return List<FeedbackModel> -> list of feedback model object
     */
    fun getAllUnaddressedFeedback(): List<FeedbackModel> {
        var getFeedback = mutableListOf<FeedbackModel>()
        transaction {
            val res = FeedbackTable.select { FeedbackTable.isAddressed eq false }
            for (item in res) {

                getFeedback.add(

                    FeedbackModel(
                        id = item[FeedbackTable.id],
                        isAddressed = item[FeedbackTable.isAddressed],
                        name = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no name provided"
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        description = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no description provided "
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        fileLocation = item[FeedbackTable.fileLocation],
                        userId = item[FeedbackTable.userId]
                    )
                )
            }
        }
        return getFeedback
    }


    /**
     * getAllReportsByUser
     * get all the feedback of a spceific user
     *
     * @param userId
     */
    fun getAllReportsByUser(userId: String): List<FeedbackModel> {
        var getFeedback = mutableListOf<FeedbackModel>()
        transaction {
            val res = FeedbackTable.select { FeedbackTable.userId eq userId }
            for (item in res) {

                getFeedback.add(

                    FeedbackModel(
                        id = item[FeedbackTable.id],
                        isAddressed = item[FeedbackTable.isAddressed],
                        name = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no name provided"
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        description = if (item[FeedbackTable.description].isNullOrBlank()) {
                            "no description provided "
                        } else {
                            "${item[FeedbackTable.description]}"
                        },
                        fileLocation = item[FeedbackTable.fileLocation],
                        userId = item[FeedbackTable.userId]
                    )
                )
            }
        }
        return getFeedback
    }

    /**
     * updateFeedbackAsAddressed
     *
     * @param feedbackId
     *
     */
    fun updateFeedbackAsAddressed(feedbackId: Int) {
        transaction {
            FeedbackTable.update({ FeedbackTable.id.eq(feedbackId) }) {
                it[FeedbackTable.isAddressed] = true
            }
        }
    }


    /**
     * insertFeedback
     *
     * get the data from the model and insert into the database
     * the model is constructed using feedback received
     *
     * @param feedbackModel
     */
    fun insertFeedback(feedbackModel: FeedbackModel) {
        transaction {
            val result = FeedbackTable.insert {

                it[name] = feedbackModel.name
                it[isAddressed] = false
                it[fileLocation] = feedbackModel.fileLocation
                it[description] = feedbackModel.description
                it[userId] = feedbackModel.userId

            }
            Println.yellow("result result");
        }
    }

    /**
     * deleteFeedBackItem
     *
     * @param id the feedback id to delete
     */
    fun deleteFeedBackItem(id: Int) {
        transaction {
            FeedbackTable.deleteWhere { FeedbackTable.id eq id }
        }
    }


}