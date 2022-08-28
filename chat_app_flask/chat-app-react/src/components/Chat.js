import './Chat.css'
import { useState } from 'react';

function Chat() {

    const [textBox, setTextBox] = useState('');
    const [messages, setMessages] = useState ([]);

    function sendMessageOnEnter(keyPress) {
        
        if (keyPress === 'Enter') {
            sendMessage();
        }

    }

    function sendMessage() {
        if (textBox === '') {
            return;
        }

        const messageList = messages;
        messageList.push(textBox);
        setMessages(messageList);
        setTextBox('')
    } 

    function displayMessages() {
        const jsxMessages = []
        messages.forEach((message, i) => {
            jsxMessages.push(
                <div key={i} className='message-container'><p>{message}</p></div>
            )
        });

        return jsxMessages;
    }

    return(
        <div className='chat-container'>
            <div className='chat-box'>
                {displayMessages()}
            </div>
            <div className='text-box-container'>
                <input className='text-box' type='text' placeholder='Message...' onKeyDown={(e) => sendMessageOnEnter(e.key)} onChange={(e) => setTextBox(e.target.value)} value={textBox} ></input>
                <button className='send-button' onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    );
}

export default Chat;