package controllers

import (
	"html/template"
	"log"
	"net/http"
)

type TailController struct {
}

func (action *TailController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	strFilePath := r.FormValue("filePath")
	t, err := template.ParseFiles("template/tail.html")
	if err != nil {
		log.Println(err)
	}

	var v = struct {
		Host     string
		FilePath string
	}{
		r.Host,
		strFilePath,
	}

	t.Execute(w, &v)
}
