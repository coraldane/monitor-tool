package main

import (
	"./conf"
	"encoding/binary"
	"fmt"
	"github.com/codeskyblue/go-uuid"
	"log"
	"net"
	"os"
	"runtime"
	"sync"
	"time"
)

const (
	CONNECTION_MAX = 1024
)

var (
	poolLock   sync.RWMutex
	poolClient map[string]*ClientInfo
)

type ClientInfo struct {
	AssignId   string
	Conn       net.Conn  //The TCP/IP connectin to the player.
	GmtConnect time.Time //The time connect with server.
	ClientType string
	HostIp     string
	HostPort   string
	ClientIp   string
	ClientPort string
}

func (cli *ClientInfo) disconnect() {
	cli.Conn.Close()
	log.Printf("client %s quit.", cli.AssignId)
}

func (cli *ClientInfo) Handle() {
	defer cli.Conn.Close()

	cli.Conn.SetReadDeadline(time.Now().Add(1 * time.Minute))

	//head buffer stream size is 8, the first 4 byte is client type and the other 4 byte is body length.
	headBuf := make([]byte, 8)
	for {
		readHeadNum, readHeadErr := cli.Conn.Read(headBuf)
		if nil != readHeadErr {
			log.Printf("client %s read head error: %v.", cli.Conn.RemoteAddr().String(), readHeadErr)
			break
		}

		if readHeadNum == cap(headBuf) {
			var packLen uint32
			cli.ClientType, packLen = parsePackageHead(headBuf)
			bodyBuf := make([]byte, packLen)
			readBodyNum, readBodyErr := cli.Conn.Read(bodyBuf)
			if nil != readBodyErr {
				log.Printf("client %s read body error: %v.", cli.AssignId, readBodyErr)
				break
			}
			if readBodyNum == int(packLen) {
				fmt.Printf("readBodyNum:%d,Client %s, Type is: %s, body len: %d, content: %s",
					readBodyNum, cli.AssignId, cli.ClientType, packLen, string(bodyBuf))
			}
		}
	}
}

func parsePackageHead(headBuf []byte) (string, uint32) {
	headType := string(headBuf[:4])
	packLen := binary.BigEndian.Uint32(headBuf[4:])
	fmt.Printf("Head Buffer, clientType:%v, packLen: %v.\n", headBuf[:4], headBuf[4:])
	return headType, packLen
}

func assignConnection(conn net.Conn) (bool, *ClientInfo, error) {
	cli := new(ClientInfo)
	cli.Conn = conn
	cli.AssignId = uuid.New()
	cli.GmtConnect = time.Now()
	cli.HostIp, cli.HostPort, _ = net.SplitHostPort(conn.LocalAddr().String())
	cli.ClientIp, cli.ClientPort, _ = net.SplitHostPort(conn.RemoteAddr().String())

	// poolClient[cli.AssignId] = cli
	log.Printf("Client Assign ok, client info is %#v.", cli)
	return true, cli, nil
}

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile | log.LstdFlags)
	logFile, _ := os.OpenFile("server.log", os.O_APPEND|os.O_CREATE|os.O_RDWR, 0644)
	log.SetOutput(logFile)

	ln, err := net.Listen("tcp", fmt.Sprintf(":%d", conf.CONFIG.Port))
	if nil != err {
		log.Fatalf("Start service at port %d error, %v", conf.CONFIG.Port, err)
	} else {
		log.Printf("Server start success at port %d.", conf.CONFIG.Port)
	}
	for {
		conn, err := ln.Accept()
		if nil != err {
			log.Printf("failed accept new connection, error is %v.", err)
		}
		if ok, client, connErr := assignConnection(conn); ok {
			go client.Handle()
		} else {
			log.Printf("connection assign error, %v", connErr)
		}
	}
}
