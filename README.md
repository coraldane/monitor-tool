monitor-tool
##系统监控工具
===============
```text
为被监控的客户端提供远程执行命令的HTTP服务
```

##使用方式

###执行系统命令
```html
http://{host:port}/cmd?cmdName=ps -ef|grep java
```
其中的host是被监控客户端的IP

cmdName后面的参数，就是需要执行的系统命令

###监控日志输出
```html
http://{host:port}/tail?filePath=/home/mixuan/fastdfs/logs/storaged.log
```
filePath后面的路径，就是需要监控的日志文件全路径

