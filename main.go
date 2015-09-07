package main

import (
	"conf"
	"controllers"
	"fmt"
	"github.com/coraldane/utils"
	"log"
	"net/http"
	"os"
	"reflect"
	"strings"
	"time"
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
	logFileWriter, _ := os.OpenFile("monitor.log", os.O_APPEND|os.O_CREATE|os.O_RDWR, 0644)

	// log.SetOutput(io.MultiWriter(logFileWriter, os.Stdout))
	log.SetOutput(logFileWriter)

	http.Handle("/static/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/login/", loginHandler)
	http.Handle("/cmd", &controllers.CmdController{})
	http.Handle("/tail", &controllers.TailController{})
	http.Handle("/tailfile", &controllers.TailFileController{})

	strPort := fmt.Sprintf(":%d", conf.CONFIG.Port)

	//register client
	go registerClient()

	log.Printf("Http Server start at port %s.", strPort)
	err := http.ListenAndServe(strPort, nil)
	if nil != err {
		log.Fatal("Server start fail.", err)
	}
}

func registerClient() {
	timer1 := time.NewTicker(10 * time.Second)
	for {
		select {
		case <-timer1.C:
			ret := notifyRecordClient()
			if true == ret {
				log.Printf("Register client to monitor server success.")
				timer1.Stop()
			} else {
				log.Printf("Register client to monitor server fail, retry after 10 seconds.")
			}
		}
	}

}

func notifyRecordClient() bool {
	strUrl := fmt.Sprintf("%s?port=%d", conf.CONFIG.RegisterServer, conf.CONFIG.Port)
	strBody, err := utils.DoGet(strUrl, "UTF-8")
	if nil == err {
		log.Printf("register to %s, result is:[%s]", strUrl, strBody)
		return strings.Contains(strBody, `"success":true`)
	} else {
		log.Printf("register to %s, error: %v", strUrl, err)
	}
	return false
}
