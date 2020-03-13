package com.araizen.www.database.mysql

import com.araizen.www.database.mysql.account.AccountDatabaseDao
import com.araizen.www.database.mysql.auth.AuthDatabaseDao
import com.araizen.www.database.mysql.feedback.FeedbackDatabaseDao
import com.araizen.www.database.mysql.log.LogDatabaseDao
import com.araizen.www.database.mysql.settings.SettingsDatabaseDao
import com.araizen.www.database.mysql.transaction.TransactionDatabaseDao
import com.araizen.www.database.mysql.user_profile.ProfileDatabaseDao
import com.araizen.www.utils.console.Println


import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

class DatabaseObj {
    fun connect(): Database{
        Println.yellow("===============================================")
        Println.yellow("connecting to database")
        Println.yellow("===============================================")
         val db=    Database.connect("jdbc:mysql://localhost:3306/aurora", driver = "com.mysql.jdbc.Driver", user = "arthur_kamau", password = "kamau09")
        transaction {
            addLogger(StdOutSqlLogger)
            SchemaUtils.create (
                AccountDatabaseDao.AccountTable,
                AuthDatabaseDao.AuthTable,
                FeedbackDatabaseDao.FeedbackTable,
                LogDatabaseDao.LogTable,
                SettingsDatabaseDao.SettingsTable,
                TransactionDatabaseDao.TransactionTable,
                ProfileDatabaseDao.ProfileTable

            )
        }

        return db;

    }

}