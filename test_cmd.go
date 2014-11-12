package main

import (
	"fmt"
	"os/exec"
)

func main() {
	cmdName := "ping baidu.com"
	cmd := exec.Command("cmd.exe", "/c", cmdName)
	out, err := cmd.Output()
	fmt.Println(string(out), err)
}
