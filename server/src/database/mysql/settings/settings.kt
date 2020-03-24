package com.araizen.www.database.mysql.settings

import com.araizen.www.models.user_settings.UserSettingsModel
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.exceptions.ExposedSQLException
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.BatchUpdateException
import java.sql.SQLIntegrityConstraintViolationException
import java.time.LocalDateTime


class SettingsDatabaseDao {

    object SettingsTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>

        val userId = varchar("user_id", length = 50).uniqueIndex() // Column<String>
        val theme = varchar("theme", length = 50) // Column<String>
        val reportStats = bool("report_stats") // Column<String>
        val notifySmallVersion = bool("notify_small_version") // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }


    /**
     * getUserSettings
     *
     * @param userIdPar -> the user id to get the settings
     */
    fun getUserSettings(userIdPar: String): UserSettingsModel? {

        var userSettings: UserSettingsModel? = null
        transaction {
            val res: Query = SettingsTable.select { SettingsTable.userId eq userIdPar }

            if (res.fetchSize == 0) {
                Println.red("Settings at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    Println.yellow("getUserProfile at index $i ")
                    userSettings = UserSettingsModel(
                        userId = userIdPar,
                        theme = item[SettingsTable.theme],
                        reportStats = item[SettingsTable.reportStats].toString(),
                        notifySmallVersions = item[SettingsTable.notifySmallVersion].toString()
                    )
                }
            }
        }
        return userSettings
    }

    /**
     * insertAUserSettings
     * @param userSettings -> the user setting model
     *
     */
    fun insertAUserSettings(userSettings: UserSettingsModel) {
        try {
            transaction {
                SettingsTable.insert {
                    it[userId] = userSettings.userId
                    it[theme] = userSettings.theme
                    it[reportStats] = userSettings.reportStats == "true"
                    it[notifySmallVersion] = userSettings.notifySmallVersions== "true"
                }

            }
        } catch (e: Exception) {
            when ((e as? ExposedSQLException)?.cause) {
                is SQLIntegrityConstraintViolationException ->
                    Println.red("insertAUserSettings SQL constraint violated")
                is BatchUpdateException ->
                    Println.red("insertAUserSettings SQL constraint violated")
                else ->
                    Println.red("insertAUserSettings Error ${e.message}")
            }
        }

    }


        /**
         * updateUserReportStats
         *
         * @param userId -> the users unique id
         * @param theme -> whether to report a stat or not ie tru == report
         */
        fun updateUserTheme(userId: String, theme: String) {
            transaction {
                SettingsTable.update({ SettingsTable.userId.eq(userId) }) {
                    it[SettingsTable.theme] = theme
                }
            }
        }


    /**
     * updateMinorVersions
     *
     * @param userId -> the users unique id
     * @param minorVersionNotify -> whether to report to get notification or not ie tru == report
     */
    fun updateMinorVersions(userId: String, minorVersionNotify: Boolean) {
        transaction {
            SettingsTable.update({ SettingsTable.userId.eq(userId) }) {
                it[SettingsTable.notifySmallVersion] = minorVersionNotify
            }
        }
    }

        /**
         * updateUserReportStats
         *
         * @param userId -> the users unique id
         * @param reportStat -> whether to report a stat or not ie tru == report
         */
        fun updateUserReportStats(userId: String, reportStat: Boolean) {
            transaction {
                SettingsTable.update({ SettingsTable.userId.eq(userId) }) {
                    it[SettingsTable.reportStats] = reportStat
                }
            }
        }


    }