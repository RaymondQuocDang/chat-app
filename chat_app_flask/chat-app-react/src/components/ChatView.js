import './ChatView.css'
import { useState, useEffect, useRef } from 'react';

function ChatView({ current_user }) {

    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    function sendMessageOnEnter(keyPress) {

        if (keyPress === 'Enter') {
            sendMessage();
        }

    }

    function sendMessage() {
        if (messageText === '') {
            return;
        }
    
        setMessages((prevMessages) => {
            return [...prevMessages, { 'username': 'Newt King', 'message': messageText }]
        });
        setMessageText('')


    }

    function displayMessages() {
        const jsxMessages = []
        messages.forEach((message, i) => {

            var prevIndex = i - 1
            if (i === 0) {
                jsxMessages.push(
                    <div key={i} className='message-username-container'>
                        <p className='username'>{message.username}</p>
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
                    <div key={i} className='message-container'>
                        <p className='username'>{message.username}</p>
                        <p>{message.message}</p>
                    </div>
                )
            }
        });

        return jsxMessages;
    }

    useEffect(() => {
        console.log('use effect fired')
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