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

	n, _ := file.Read(buf)
	err := json.Unmarshal(buf[:n], &CONFIG)
	if err != nil {
		panic(err)
	}
}
