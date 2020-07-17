const sockets = {io: {}}

sockets.initWith = server => {
  sockets.io = require('socket.io')(server);

  sockets.io.on('connection', (socket) => {
    // console.log('a user connected', {socket});
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        socket.on(event, events[event].bind(sockets.io, socket));
      }
    }
  });
};

const events = {

  joinToRoom: (socket, {rooms, userId}) => {
    socket.userOwner = userId
    rooms.forEach(room => {
      socket.join(room, ((joinedRoom) => {
        console.log("joinedRoom", {joinedRoom, userId})
      }).bind(undefined, room))
    });
    message.toMultipleRooms({rooms, event: message.events.USER_CONNECTED, data: { user: socket.userOwner }});
  },
  disconnect: socket => {
    console.log('user disconnected', socket.id);
  }
};

const message = {
  events: {
    USER_CONNECTED: 'USER_CONNECTED',
    NEW_MESSAGE: 'NEW_MESSAGE'
  },
  to: ({event, data}) => {
    sockets.io.emit(event, data);
  },
  toRoom: ({room, event, data}) => {
    sockets.io.to(room).emit(event, data);
  },
  toMultipleRooms: ({rooms, event, data}) => {
    rooms.reduce((result, room) => result.to(room), sockets.io).emit(event, data);
  },
  toAvoidingSenderSocket: ({senderSocket, event, data}) => {
    senderSocket.emit(event, data);
  },
  toMultipleRoomsAvoidingSenderSocket: ({rooms, senderSocket, event, data}) => {
    rooms.reduce((result, room) => result.to(room), senderSocket).emit(event, data);
  }
}

module.exports = {
  sockets,
  socketMessage: message
};
