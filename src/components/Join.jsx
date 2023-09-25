import React from 'react';
import styles from './Join.module.css';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';
import { useSocket } from '../contexts/SocketContext';

const Join = () => {
  const [error, setError] = React.useState(null);
  const usernameRef = React.useRef();
  const navigate = useNavigate();
  const { socket } = useSocket();

  React.useEffect(() => {
    if (socket && socket.connected) {
      navigate('/chat');
    }
  }, [socket]);

  const joinChat = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return setError(true);
    setError(null);

    socket.emit('setUsername', username);

    navigate('/chat');
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') joinChat();
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Chat do @Markonha</h1>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          ref={usernameRef}
          onKeyDown={getEnterKey}
          type="text"
          placeholder="Coloque seu username"
        />
        {error && (
          <p className={styles.error}>
            É obrigatório pôr um <b>username</b>
          </p>
        )}
        <button onClick={joinChat} className={styles.send}>
          Entrar no chat
        </button>
      </div>
    </section>
  );
};

export default Join;
