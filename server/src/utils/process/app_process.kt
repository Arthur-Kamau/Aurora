/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.utils.process

import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader


class AppProcess {
     fun watch(process: Process) {
        object : Thread() {
            override fun run() {
                val input = BufferedReader(InputStreamReader(process.inputStream))
                var line: String? = null
                try {
                    while (input.readLine().also { line = it } != null) {
                        println(line)
                    }
                } catch (e: IOException) {
                    e.printStackTrace()
                }
            }
        }.start()
    }
}