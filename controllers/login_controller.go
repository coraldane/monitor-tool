package controllers

import (
	"html/template"
	"log"
	"net/http"
)

type LoginController struct {
}

func (this *LoginController) IndexAction(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("template/login.html")
	if err != nil {
		log.Println(err)
	}
	t.Execute(w, nil)
}
