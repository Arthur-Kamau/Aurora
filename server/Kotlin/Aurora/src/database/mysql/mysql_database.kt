package com.araizen.www.database.mysql

import com.araizen.www.database.account.AccountDatabaseDao
import com.araizen.www.database.auth.AuthDatabaseDao
import com.araizen.www.database.feedback.FeedbackDatabaseDao
import com.araizen.www.database.log.LogDatabaseDao
import com.araizen.www.database.settings.SettingsDatabaseDao
import com.araizen.www.database.transaction.TransactionDatabaseDao
import com.araizen.www.database.mysql.user.UserDatabaseDao
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
                UserDatabaseDao.ProfileTable



            )
        }

        return db;

    }

}