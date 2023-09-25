import { io } from 'socket.io-client';
import React from 'react';

export const SocketContext = React.createContext();

export const SocketStorage = ({ children }) => {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const newSocket = io('https://server-socketio-markonha.onrender.com');
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
