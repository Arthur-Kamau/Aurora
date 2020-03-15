package util

import (	
	"os"
    "io"
    "fmt"
    "path/filepath"
    "path"
    "github.com/logrusorgru/aurora"
)

// FolderOrFileExists reports whether the named file or directory exists.
func FolderOrFileExists(name string) bool {
    if _, err := os.Stat(name); err != nil {
        if os.IsNotExist(err) {
            return false
        }
    }
    return true
}


//FolderOrFileExistsWithError reports whether the named file or directory exists with error
func FolderOrFileExistsWithError(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

//FolderIsEmpty reports whether dir is empty by checking its ontents
func FolderIsEmpty(name string) (bool, error) {
    f, err := os.Open(name)
    if err != nil {
        return false, err
    }
    defer f.Close()

    _, err = f.Readdirnames(1) // Or f.Readdir(1)
    if err == io.EOF {
        return true, nil
    }
    return false, err // Either not empty or error, suits both cases
}

//StringSliceContainsString check if a variable is contained in a slice 
func StringSliceContainsString(slice []string, item string) bool {
    set := make(map[string]struct{}, len(slice))
    for _, s := range slice {
        set[s] = struct{}{}
    }

    _, ok := set[item] 
    return ok
}

//MapContainsValue loop through a map checkin value
func MapContainsValue(maps map[int]string, item string) bool{

	for _, x := range maps {
		if x == item {
			return true
		}
	}
	return false
}

//DirSize of folder and sub folders
func DirSize(path string) (int64, error) {
    var size int64
    err := filepath.Walk(path, func(_ string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        if !info.IsDir() {
            size += info.Size()
        }
        return err
    })
    return size, err
}



//LogFolderPermissions chec logs folder permission
func LogFolderPermissions(appName string) {

	folderPath := "/var/www/logs/"+appName+"/go"
	if FolderOrFileExists(folderPath) {
		fmt.Println(aurora.BgGreen("logs folder " + folderPath + "	exists"))
	} else {
		mkdirErr := os.MkdirAll(folderPath, os.ModePerm)
		if mkdirErr != nil {

			fmt.Println(aurora.BgRed("==========================="))
			fmt.Println(aurora.BgRed("error creating log folder  "+folderPath))
			fmt.Println(aurora.BgYellow(mkdirErr.Error))
			fmt.Println(aurora.BgRed("================================"))
			panic(mkdirErr)
		}
	}

	info, err := os.Stat(folderPath)
	mode := info.Mode()
	if err != nil {

		fmt.Println(aurora.BgRed("==========================="))
		fmt.Println(aurora.BgRed("error checking log folder  statistics"))
		fmt.Println(aurora.BgYellow(err.Error))
		fmt.Println(aurora.BgRed("================================"))
		panic(err)
	}
	fmt.Print(aurora.BgMagenta("App log folder mode is "))
	fmt.Print(mode)
	fmt.Println("\n	")

}

func getWkDir() string{
	mydir, err := os.Getwd()
	if err != nil {
		fmt.Println(aurora.BgRed("==========================="))
		fmt.Println(aurora.BgRed("error checking log folder  statistics"))
		fmt.Println(aurora.BgYellow(err.Error))
		fmt.Println(aurora.BgRed("================================"))
		panic(err)
	}
	fmt.Println(aurora.BgYellow("================= get wkdir===================="))
	fmt.Println(aurora.BgYellow(mydir))
	fmt.Println(mydir)
	return mydir
}
//LogFileExistElseCreateTheLogFiles check the log files
func LogFileExistElseCreateTheLogFiles(appName string) {
	logFiles := [...]string{
		"/var/www/logs/"+appName+"/go/info.log",
		"/var/www/logs/"+appName+"/go/error.log",
		"/var/www/logs/"+appName+"/go/debug.log",
		"/var/www/logs/"+appName+"/go/security.log",
	}
	for index, item := range logFiles {
		fileName := path.Base(item)
		dataToPrint := fmt.Sprintf("%d checking file %s", index, item)
		fmt.Println(aurora.BgYellow(dataToPrint))
		if FolderOrFileExists(item) {

			fmt.Println(aurora.BgGreen(fileName + " file exists"))
		} else {
			fmt.Println(aurora.BgYellow("creating " + fileName))
			emptyFile, err := os.Create(os.ExpandEnv(item))
			if err != nil {

				fmt.Println(aurora.BgRed("==========================="))
				fmt.Println(aurora.BgRed("error creating file "))
				fmt.Println(aurora.BgYellow(err.Error))
				fmt.Println(aurora.BgRed("================================"))
				panic(err)
			}
			fmt.Println(aurora.BgGreen(fileName + " file created"))
			emptyFile.Close()

		}
	}

}
