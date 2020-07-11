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
  newConversationWith: (socket, user) => {
    console.log('message: ', {socket_id: socket.id, user});
    const room = `${socket.id}_${user ? user.id : 'alone'}`;
    socket.join(room, () =>
      // message.toRoom({room, event: 'newConversation', data: { room, user }})
      message.toMultipleRooms({rooms: [room], event: 'newConversation', data: { room, user }})
      // message.toMultipleRoomsAvoidingSenderSocket({senderSocket: socket, rooms: [room], event: 'newConversation', data: { room, user }})
    );
  },
  message: (socket, msg) => {
    console.log('message: ', msg, socket.id);
  },
  disconnect: socket => {
    console.log('user disconnected', socket.id);
  }
};

const message = {
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
  message
};
