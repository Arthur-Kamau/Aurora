package config

import (
	"encoding/json"
	"log"
	"os"
	// "Aurora/server/Go/applogger"
	// For stripping comments from JSON config
	jcr "github.com/DisposaBoy/JsonConfigReader"
	//time module
	"time"

	
)

const (
	// Local path to config content
	defaultConfigPath = "/src/secreat/aurora/config.json"
)

type redis struct {
	Auth string `json:"auth"`
	Lifetime string `json:"lifetime"`
	Port string `json:"port"`
	Host string `json:"localhost"`
	Enabled string `json:"enabled"`
	Timeout string `json:"timeout"`
	SessionLifetime string `json:"session_lifetime"`
	
}

// remote db configs
type Db struct {
	// adapter.
	Adapter string `json:"adapter"`
	// host name or ip
	Host string `json:"host"`
	Port string `json:"port"`
	User string `json:"user"`
	// db password
	Password string `json:"password"`
	// db name
	Dbname string `json:"dbname"`
	// db charset
	Charset string `json:"charset"`
	// sslmode
	Sslmode string `json:"sslmode"`
	//userBlocking
	UserBlocking string `json:"userBlocking"`
}

// remote db configs
type logs struct {
	// adapter.
	Directory string `json:"directory"`
	// host name or ip
	Info string `json:"info"`
	// Garbage collection timeout
	Error string `json:"error"`
	// db password
	Debug string `json:"Debug"`
	// db name
	Security string `json:"security"`
}

// bulk sms folders
type sms struct {
	URL    string `json:"url"`
	Token  string `json:"token"`
	UserID string `json:"user_id"`
}

// Server configs
type Server struct {
	// host name
	Host string `json:"host"`
	// server port to listen to
	Port string `json:"port"`
	// server default database
	Database string `json:"database"`
	
}

//Chat  config
type Chat struct {
	Host      string `json:"host"`
	Port      string `json:"port"`
	Pprof     string `json:"pprof"`
	Workers   int    `json:"workers"`
	Queue     int    `json:"queue"`
	Timeout   int    `json:"timeout"`
	IoTimeout time.Duration
}

//JwtConf configuration
type JwtConf struct {
	Key      string `json:"key"`
	Date      string `json:"date"`
	
}
//App configuration
type App struct {
	Name      string `json:"name"`
	Desciption      string `json:"desciption"`
	
}
//Email configuration
type Email struct {
	Server      string `json:"server"`
	Port      int `json:"port"`
	EmailUser     string `json:"emailUser"`
	EmailPassword   string    `json:"emailPassword"`
	
}

// Config Contentx of the configuration file
type Config struct {
	PostgreDb     *Db     `json:"db"`
	MySQLDb     *Db     `json:"db2"`
	MSSQLDb   *Db   `json:"db3"`
	Redis    *redis    `json:"redis"`
	Sms    *sms    `json:"sms"`
	Server *Server `json:"server"`
	Chat   *Chat   `json:"chat"`
	Email  *Email  `json:"email"`
	App  *App  `json:"app"`
	Logs  *logs  `json:"logs"`
	Jwt  *JwtConf  `json:"jwt"`
}

//GetConfig get json data from config.json with the use  of structs
func GetConfig() Config {

	path := os.Getenv("GOPATH") ///C:\Users\Arthur-Kamau\go\src\

	path += defaultConfigPath

	//logger.InfoLog.Printf("Using config from '%s'", path)
	
	jsonConfig := Config{}

	if file, err := os.Open(path); err != nil {
		log.Fatal("Failed to read config file:", err)
	} else if err = json.NewDecoder(jcr.New(file)).Decode(&jsonConfig); err != nil {
		log.Fatal("Failed to parse config file:", err)
	}

	jsonConfig.Chat.IoTimeout = time.Millisecond * time.Duration(jsonConfig.Chat.Timeout)

	return jsonConfig
}
