const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.socket = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening peers connections on port: ${P2P_PORT}`);
  }

  connectSocket(socket) {
    this.socket.push(socket);
    console.log('Socket connected');

    this.messageHandler(socket);
    this.sendChain(socket);
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);

      this.blockchain.replaceChain(data);
    });
  }

  syncChain() {
    this.socket.forEach(socket => this.sendChain(socket));
  }
}

module.exports = P2pServer;