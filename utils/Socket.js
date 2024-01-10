import io from 'socket.io-client';

const socket = io('http://192.168.0.110:5000'); // Replace with your server address

export default socket;