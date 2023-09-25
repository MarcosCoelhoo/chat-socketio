import React from 'react';
import styles from './Chat.module.css';
import sendIcon from '../assets/send.svg';
import { useSocket } from '../contexts/SocketContext';
import { useNavigate } from 'react-router';

const Chat = () => {
  const [messagesList, setMessagesList] = React.useState([]);
  const messageRef = React.useRef();
  const bottomRef = React.useRef();
  const { socket } = useSocket();
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessagesList((current) => [...current, data]);
      console.log(messagesList);
    });

    return () => socket.off('receiveMessage');
  }, [socket]);

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesList]);

  React.useEffect(() => {
    window.addEventListener('popstate', (event) => {
      event.preventDefault();

      navigate('/');
    });
  }, []);

  const sendMessage = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit('message', message);

    clearInput();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <section className={styles.container}>
      <ul className={styles.chat} ref={bottomRef}>
        {messagesList.map((message, index) => (
          <li
            key={index}
            className={styles.messageContainer}
            ref={index === messagesList.length - 1 ? bottomRef : null}
          >
            <div className={styles.infos}>
              <h1 className={styles.author}>@{message.author}</h1>
              <span className={styles.time}>{message.time}</span>
            </div>
            <div className={styles.messageBox}>
              <p className={styles.messageText}>{message.text}</p>
            </div>
          </li>
        ))}
        {/* <div ref={bottomRef}></div> */}
      </ul>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          ref={messageRef}
          onKeyDown={getEnterKey}
          type="text"
          placeholder="Escreva sua mensagem..."
        />
        <button className={styles.send}>
          <img
            className={styles.icon}
            src={sendIcon}
            onClick={sendMessage}
            alt=""
          />
        </button>
      </div>
    </section>
  );
};

export default Chat;
