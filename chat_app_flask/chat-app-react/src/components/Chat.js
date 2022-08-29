import './Chat.css'
import { useState, useEffect, useRef } from 'react';

function Chat() {

    const [messageComposerValue, setMessageComposerValue] = useState('');
    const [messages, setMessages] = useState ([]);
    const bottomRef = useRef(null);

    function sendMessageOnEnter(keyPress) {
        
        if (keyPress === 'Enter') {
            sendMessage();
        }

    }

    function sendMessage() {
        if (messageComposerValue === '') {
            return;
        }

        const messageList = messages;
        messageList.push({'username': 'Newt King', 'message':messageComposerValue});
        setMessages(messageList);
        setMessageComposerValue('')
    } 

    function displayMessages() {
        const jsxMessages = []
        messages.forEach((message, i) => {
            jsxMessages.push(
                <div key={i} className='message-container'>
                    <p className='username'>{message.username}</p>
                    <p>{message.message}</p>
                </div>
            )
        });

        return jsxMessages;
    }

    useEffect(() => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'});
      }, [messageComposerValue]);

    return(
        <div className='chat-container'>
            <div className='chat-box'>
                <div className='welcome-message-container'>
                    <h1 className='welcome-message'>Welcome to the chat</h1>
                </div>
                {displayMessages()}
                <div ref={bottomRef}></div>
            </div>
            <div className='text-box-container'>
                <input className='text-box' type='text' placeholder='Message...' onKeyDown={(e) => sendMessageOnEnter(e.key)} onChange={(e) => setMessageComposerValue(e.target.value)} value={messageComposerValue} ></input>
                <button className='send-button' onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    );
}

export default Chat;