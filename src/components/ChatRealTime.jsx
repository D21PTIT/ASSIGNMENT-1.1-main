import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080'); // Kết nối với server Node.js

function ChatRealTime() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState(''); // ID của người nhận
  const [userId, setUserId] = useState(''); // ID của người dùng

  // Lắng nghe sự kiện nhận tin nhắn từ server
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected as: ', socket.id);
      setUserId(socket.id);
    });

    socket.on('receive_message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('receive_message');
    };
  }, []);

  // Xử lý gửi tin nhắn
  const sendMessage = (e) => {
    e.preventDefault();

    const messageData = {
      sender: userId,
      receiver: receiver,
      message: message,
    };

    // Gửi tin nhắn tới server
    socket.emit('private_message', messageData);

    // Cập nhật nội dung chat của người gửi
    setChat((prevChat) => [...prevChat, messageData]);
    setMessage('');
  };

  return (
    <div className="App">
      <h2>Real-time Chat</h2>
      <div>
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h3>Chat:</h3>
        <ul>
          {chat.map((chatItem, index) => (
            <li key={index}>
              {chatItem.sender === userId ? 'You' : chatItem.sender}: {chatItem.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatRealTime;
