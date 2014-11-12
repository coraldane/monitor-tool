package controllers

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
	"os/exec"
	"runtime"
	"strings"
)

type CmdController struct {
}

func (action *CmdController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	cmdName := r.FormValue("cmdName")
	var cmd *exec.Cmd
	if strings.Contains(runtime.GOOS, "windows") {
		cmd = exec.Command("cmd.exe", "/c", cmdName)
	} else {
		cmd = exec.Command("/bin/sh", "-c", cmdName)
	}

	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &out

	log.Println("Execute Command:", cmd.Args)
	err := cmd.Run()
	if err != nil {
		log.Printf("Command run with error: %v", err)
		strText := fmt.Sprintf("Command run with error: %v", err)
		io.WriteString(w, strText)
	}
	log.Printf("output:%v", string(out.Bytes()))
	w.Write(out.Bytes())
}
