/*
 *
 * Copyright (c) 2020.
 * Property of Araizen Technologies.
 * www.araizen.com
 * Nairobi, Kenya.
 *
 */

package com.araizen.www.utils.random_generator

import java.util.*

class RandomGenerator {
    fun generateRandomIntIntRange(min: Int, max: Int): Int {
        val r = Random()
        return r.nextInt(max - min + 1) + min
    }
}