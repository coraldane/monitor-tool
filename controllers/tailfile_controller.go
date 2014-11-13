package controllers

import (
	"bytes"
	"github.com/gorilla/websocket"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

const (
	// Time allowed to write the file to the client.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the client.
	pongWait = 60 * time.Second

	// Send pings to client with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Poll file for changes with this period.
	filePeriod = 10 * time.Second
)

type TailFileController struct {
}

func (action *TailFileController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	strFilePath := r.FormValue("filePath")
	strlastMod := r.FormValue("lastMod")
	upgrader := websocket.Upgrader{ReadBufferSize: 1024, WriteBufferSize: 1024}
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		if _, ok := err.(websocket.HandshakeError); !ok {
			log.Println(err)
		}
		return
	}

	var lastMod time.Time
	if n, err := strconv.ParseInt(strlastMod, 0, 64); nil == err {
		lastMod = time.Unix(0, n*1000*1000)
	}
	log.Printf("filePath: %s, lastMod: %v", strFilePath, lastMod)

	go writer(ws, lastMod, strFilePath)
	reader(ws)
}

/**
* @param filename
* @param offset
* @param lastMod
* @return []byte The first character identify: A - append, R - replace.
* @return time.Time
* @return error
 */
func readFileIfModified(filename string, offset int64, lastMod time.Time) ([]byte, time.Time, int64, error) {
	fi, err := os.Stat(filename)
	if err != nil {
		log.Printf("filename: %s,stat error:%v", err, filename)
		return nil, lastMod, offset, err
	}
	fileSize := fi.Size()

	data := &bytes.Buffer{}
	if fi.ModTime().After(lastMod) && offset < fileSize && offset > 0 {
		data.WriteByte('A')
		file, _ := os.OpenFile(filename, os.O_RDONLY, 0644)
		defer file.Close()

		p := make([]byte, 1024)
		for {
			n, err := file.ReadAt(p, offset)
			if err != nil && err != io.EOF {
				return nil, fi.ModTime(), offset, err
			} else if 0 == n {
				break
			}
			offset += (int64)(n)
			data.Write(p[:n])
		}
	} else {
		data.WriteByte('R')
		p, err := ioutil.ReadFile(filename)
		if err != nil {
			return nil, fi.ModTime(), offset, err
		}
		data.Write(p)
	}

	return data.Bytes(), fi.ModTime(), offset, nil
}

func reader(ws *websocket.Conn) {
	defer ws.Close()
	ws.SetReadLimit(512)
	ws.SetReadDeadline(time.Now().Add(pongWait))
	ws.SetPongHandler(func(string) error { ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			break
		}
	}
}

func writer(ws *websocket.Conn, lastMod time.Time, filename string) {
	lastError := ""
	pingTicker := time.NewTicker(pingPeriod)
	fileTicker := time.NewTicker(filePeriod)
	defer func() {
		pingTicker.Stop()
		fileTicker.Stop()
		ws.Close()
	}()
	var offset int64
	for {
		select {
		case <-fileTicker.C:
			var p []byte
			var err error

			p, lastMod, offset, err = readFileIfModified(filename, offset, lastMod)

			if err != nil {
				if s := err.Error(); s != lastError {
					lastError = s
					p = []byte(lastError)
				}
			} else {
				lastError = ""
			}

			if p != nil {
				ws.SetWriteDeadline(time.Now().Add(writeWait))
				if err := ws.WriteMessage(websocket.TextMessage, p); err != nil {
					return
				}
			}
		case <-pingTicker.C:
			ws.SetWriteDeadline(time.Now().Add(writeWait))
			if err := ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}
