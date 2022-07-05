import {io} from 'socket.io-client';

class SocketService {
  constructor(){
    this.ws = null;
  }
    /**
     * 单例
     */
    static instance = null
    static get Instance() {
      if (!this.instance) {
        this.instance = new SocketService()
      }
      return this.instance
    }
    //  定义连接服务器的方法
    connect(token) {
      return new Promise((resolve, reject) => {
        this.ws = io(`http://localhost:3030?token=${token}`);

        console.log('websocket客户端连接成功');
        resolve(this.ws)
        // if(!this.ws.id){
        //   this.ws.io.reconnect()
        //   this.timer = setTimeout(() => {
        //     this.ws.io.disconnect();
        //   }, 1000 * 60)
        // }else {
        //   console.log('websocket客户端连接成功');
        //   clearInterval(this.timer);
        //   resolve(this.ws)
        // }
      })
    }
    // 获取客户端实例 
    getClient() {
        return this.ws
    }
  }
export default SocketService