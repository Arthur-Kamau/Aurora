package com.araizen.www.database.mysql.user

import com.araizen.www.models.profile.ProfileModel
import com.araizen.www.utils.console.Println
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class UserDatabaseDao {

    object ProfileTable : Table() {
        private val id = integer("id").autoIncrement() // Column<String>
        val name = varchar("name", length = 50) // Column<String>
        val userId = varchar("user_id", length = 50) // Column<String>
        val phoneNumber = varchar("phone_number", length = 50) // Column<String>
        val email = varchar("email", length = 50) // Column<String>
        val location = varchar("location", length = 50) // Column<String>
        val createdAt = varchar("created_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val updateAt = varchar("updated_at", length = 50).default(LocalDateTime.now().toString()) // Column<String>
        val avatarUrl = text("avatar_url") // Column<String>

        override val primaryKey = PrimaryKey(id, name = "PK_User_ID") // name is optional here
    }

    /**
     * insertAUsersProfile
     *
     * inserts a users profile to the database
     *
     * @param profile the profile model containing users data
     */
    fun insertAUsersProfile(profile: ProfileModel) {

        transaction {
            ProfileTable.insert {
                it[name] = profile.name
                it[userId] = profile.userId
                it[phoneNumber] = profile.phoneNumber
                it[email] = profile.email
                it[location] = profile.location
                it[avatarUrl] = profile.avatarUrl
            }
        }
    }

    /**
     * getAllUserProfile
     *  get all user profile
     *  used for admin dashboard
     *
     * @return List<ProfileModel>
     */
    fun getAllUserProfile(): List<ProfileModel> {
        var profileList = mutableListOf<ProfileModel>();
        transaction {
            val res = ProfileTable.selectAll()
            for (item in res) {
                profileList.add(
                    ProfileModel(
                        name = item[ProfileTable.name],
                        email = item[ProfileTable.email],
                        userId = item[ProfileTable.userId],
                        location = item[ProfileTable.location],
                        avatarUrl = item[ProfileTable.avatarUrl],
                        phoneNumber = item[ProfileTable.phoneNumber]

                    )
                )
            }
        }
        return profileList
    }

    /**
     * getUserProfile
     *
     * get a users profile from the database based on the users id
     *
     * @return ProfileModel?
     */
    fun getUserProfile(userId: String): ProfileModel? {
        var profileData: ProfileModel? = null;
        transaction {
            val res: Query = ProfileTable.select { ProfileTable.userId eq userId }

             if (res.fetchSize == 0) {
                 Println.red("getUserProfile at index ")
            } else {
                for ((i, item) in res.withIndex()) {
                    Println.yellow("getUserProfile at index $i ")
                    profileData = ProfileModel(
                        name = item[ProfileTable.name],
                        email = item[ProfileTable.email],
                        userId = item[ProfileTable.userId],
                        location = item[ProfileTable.location],
                        avatarUrl = item[ProfileTable.avatarUrl],
                        phoneNumber = item[ProfileTable.phoneNumber]
                    )
                }

            }
        }
        return  profileData
    }

}