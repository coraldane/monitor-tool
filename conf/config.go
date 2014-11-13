package conf

import (
	"encoding/json"
	"os"
)

type Configuration struct {
	Port int
}

var CONFIG = Configuration{}

func init() {
	file, _ := os.Open("config.json")
	buf := make([]byte, 2048)

	n, err := file.Read(buf)
	if nil != err {
		panic(err)
	}
	err = json.Unmarshal(buf[:n], &CONFIG)
	if err != nil {
		panic(err)
	}
}
