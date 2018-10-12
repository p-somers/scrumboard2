import openSocket from 'socket.io-client';

class Socket {
  constructor() {
    this.io = openSocket('http://localhost:3000');
    this.io.on('connect', () => {
      this.io.emit('authentication', {userId: localStorage.getItem('userId')});
      this.io.on('authenticated', () => {
        // use the socket as usual
      });
    });
  };

  on(event, callback) {
    console.log('registering listener');
    this.io.on(event, data => callback(null, data));
  };

  emit(event, message) {
    this.io.emit(event, message);
  };
}

let singleton; // TODO: make this an ACTUAL singleton
export default () => {
  if (!singleton) {
    singleton = new Socket();
  }

  return singleton;
}
