package com.araizen.www.database

import com.araizen.www.database.UserAccount.primaryKey
import com.araizen.www.utils.console.Println
import me.liuwj.ktorm.database.Database
import me.liuwj.ktorm.dsl.select
import me.liuwj.ktorm.schema.*
import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.Statement


fun setUpConnection()
{
    Database.connect("jdbc:mysql://localhost:3306/aurora", driver = "com.mysql.jdbc.Driver", user = "arthur_kamau", password = "kamau09")

}


fun getUserSettings(userId:String){

  for (row in appLog.select()) {
    println(row[appLog.location])
  }

//  val settings =
//
//  val query = database
//    .from(Employees)
//    .select(Employees.salary)
//    .where { (Employees.departmentId eq 1) and (Employees.name like "%vince%") }

}

//fun old(){
//    try{
//        Class.forName("com.mysql.jdbc.Driver");
//        //here sonoo is database name, root is username and password
//        var con : Connection = DriverManager.getConnection(
//            "jdbc:mysql://localhost:3306/aurora","arthur_kamau","kamau09")
//        if(con.isClosed){
//            Println.red("connection closed")
//        }else{
//            Println.green("Connection open")
//        }
//
//        var stmt : Statement =con.createStatement()
//        var rs : ResultSet =stmt.executeQuery("select * from auth")
//        while(rs.next()) {
//            Println.green("1-> ${rs.getInt(1)}   2 -> ${rs.getString(2)}  3 -> ${rs.getString(3)}")
//        }
//
//        con.close();
//    }catch( e: Exception){
//        Println.red("Connecting to database ${e.cause} Error  ${e.stackTrace} \n ${e.message}");
//    }
//}