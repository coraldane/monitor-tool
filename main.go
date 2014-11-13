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

	port := conf.CONFIG.Port
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if nil == err {
		log.Printf("Http Server started at port %d.", port)
	} else {
		log.Fatal("Server start fail.", err)
	}
}
