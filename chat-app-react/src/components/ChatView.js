import './ChatView.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:5000');

function ChatView({ current_user }) {

    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {

        const socket = io.connect('http://127.0.0.1:5000');

        socket.on("connect",(data) => {
            console.log(data)
        });

        return function cleanup() {
            socket.disconnect();
        };

    }, []);

    useEffect(() => {
        fetchAllMessages();
    }, []);

    useEffect(() => {
        socket.on("new_message_recieved", (data) => {
            setMessages((prevMessages) => {
                return [...prevMessages, { 'username': data.username, 'message': data.message, 'timestamp': data.timestamp }]
            });
        })
    }, []);

    function sendMessageOnEnter(keyPress) {
        if (keyPress === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        if (messageText === '') {
            return;
        }

        setMessageText('')

        socket.emit("new_message_sent", {
            'username': current_user,
            'message': messageText,
        })
    }

    async function fetchAllMessages() {
        let response = await axios.get('/api/all-messages')
        setMessages(response.data.message_list)
    }

    function displayMessages() {

        const jsxMessages = []
        messages.forEach((message, i) => {

            var prevIndex = i - 1
            if (i === 0) {
                jsxMessages.push(
                    <div key={i} className='message-username-container'>
                        <div className='username-date'>
                            <p className='username'>{message.username}</p>
                            <p className='timestamp'>{message.timestamp}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                )
            } else if (messages[prevIndex].username === messages[i].username) {
                jsxMessages.push(
                    <div key={i} className='message-container'>
                        <p>{message.message}</p>
                    </div>
                )
            } else {
                jsxMessages.push(
                    <div key={i} className='message-username-container'>
                        <div className='username-date'>
                            <p className='username'>{message.username}</p>
                            <p className='timestamp'>{message.timestamp}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                )
            }
        });
        return jsxMessages;
    }

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='chat-container'>
            <div className='chat-box'>
                <div className='welcome-message-container'>
                    <h1 className='welcome-message'>Welcome to the chat</h1>
                </div>
                {displayMessages()}
                <div ref={bottomRef}></div>
            </div>
            <div className='text-box-container'>
                <input className='text-box' type='text' placeholder='Message...' onKeyDown={(e) => sendMessageOnEnter(e.key)} onChange={(e) => setMessageText(e.target.value)} value={messageText} ></input>
                <button className='send-button' onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    );
}

export default ChatView;