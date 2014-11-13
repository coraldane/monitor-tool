package main

import (
	"./conf"
	"./controllers"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	pathInfo := strings.Trim(r.URL.Path, "/")
	parts := strings.Split(pathInfo, "/")
	var action = ""
	if len(parts) > 1 {
		action = strings.Title(parts[1]) + "Action"
	}

	login := &controllers.LoginController{}
	controller := reflect.ValueOf(login)
	method := controller.MethodByName(action)
	if !method.IsValid() {
		method = controller.MethodByName(strings.Title("index") + "Action")
	}
	requestValue := reflect.ValueOf(r)
	responseValue := reflect.ValueOf(w)
	method.Call([]reflect.Value{responseValue, requestValue})
}

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	http.Handle("/static/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/login/", loginHandler)
	http.Handle("/cmd", &controllers.CmdController{})
	http.Handle("/tail", &controllers.TailController{})
	http.Handle("/tailfile", &controllers.TailFileController{})

	strPort := fmt.Sprintf(":%d", conf.CONFIG.Port)
	log.Printf("Http Server start at port %s.", strPort)
	err := http.ListenAndServe(strPort, nil)
	if nil != err {
		log.Fatal("Server start fail.", err)
	}
}
