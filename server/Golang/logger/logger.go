package logger

import (
	"Aurora/server/Golang/config"
	"Aurora/server/Golang/util"
	"flag"
	"log"
	"os"
)

var (
	Directory string
)

var (
	InfoLog *log.Logger
)

var (
	ErrorLog *log.Logger
)

var (
	DebugLog *log.Logger
)

var (
	SecurityLog *log.Logger
)

func init() {
	jsonConfig := config.GetConfig()
	//check if log folder exist and check the permissions
	// loop through the log files check if they exist
	util.LogFolderPermissions(jsonConfig.App.Name)

	util.LogFileExistElseCreateTheLogFiles(jsonConfig.App.Name)

	

	log.Println(jsonConfig.Logs.Error)

	dir := jsonConfig.Logs.Directory

	sz := len(dir)

	if sz > 0 && dir[sz-1] == '/' {
		dir = dir[:sz-1]
	}

	sz = len(dir)

	if sz > 0 && dir[0] == '/' {
		dir = dir[1:sz]
	}

	info := "" + dir + "/" + jsonConfig.Logs.Info

	erro := "" + dir + "/" + jsonConfig.Logs.Error

	debug := "" + dir + "/" + jsonConfig.Logs.Debug

	security := "" + dir + "/" + jsonConfig.Logs.Security

	flag.Parse()

	var infofFile, err = os.OpenFile(info, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		panic(err)
	}

	var errorFile, err1 = os.OpenFile(erro, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err1 != nil {
		panic(err1)
	}

	var debugFile, err2 = os.OpenFile(debug, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err2 != nil {
		panic(err2)
	}

	var securityFile, err3 = os.OpenFile(security, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err3 != nil {
		panic(err3)
	}

	InfoLog = log.New(infofFile, "", log.LstdFlags|log.Lshortfile)
	DebugLog = log.New(debugFile, "", log.LstdFlags|log.Lshortfile)
	ErrorLog = log.New(errorFile, "", log.LstdFlags|log.Lshortfile)
	SecurityLog = log.New(securityFile, "", log.LstdFlags|log.Lshortfile)

}

func Info(tag string, message string) {

	InfoLog.Println(tag + " : " + message)

}

func Error(tag string, message string) {

	ErrorLog.Println(tag + " : " + message)

}

func Debug(tag string, message string) {

	DebugLog.Println(tag + " : " + message)

}

func Security(tag string, message string) {

	SecurityLog.Println(tag + " : " + message)

}
