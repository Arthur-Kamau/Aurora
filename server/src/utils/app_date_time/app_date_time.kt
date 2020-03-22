/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package utils.app_date_time

import java.util.*


class AppDateTime {

    fun addHoursToJavaUtilDate(date: Date?, hours: Int): Date? {
        val calendar = Calendar.getInstance()
        calendar.time = date
        calendar.add(Calendar.HOUR_OF_DAY, hours)
        return calendar.time
    }





}