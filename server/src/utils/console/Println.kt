package com.araizen.www.utils.console

object Println {
    fun green(str: String) {
        println(ConsoleColors.GREEN + str + ConsoleColors.RESET + " \n")
    }

    fun red(str: String) {
        println(ConsoleColors.RED + str + ConsoleColors.RESET + " \n")
    }

    fun yellow(str: String) {
        println(ConsoleColors.YELLOW + str + ConsoleColors.RESET + " \n")
    }

    fun purple(str: String) {
        println(ConsoleColors.PURPLE + str + ConsoleColors.RESET + " \n")
    }

    fun cyan(str: String) {
        println(ConsoleColors.CYAN + str + ConsoleColors.RESET + " \n")
    }

    fun blue(str: String) {
        println(ConsoleColors.BLUE + str + ConsoleColors.RESET + " \n")
    }
}